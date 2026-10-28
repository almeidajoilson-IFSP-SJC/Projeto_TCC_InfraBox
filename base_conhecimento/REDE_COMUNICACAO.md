# Rede e Comunicação – InfraBox TCC

Arquitetura de rede, serviços web e histórico da versão TCC. Legenda de origem: ver CONHECIMENTO_INFRABOX.md.

---

## Visão geral

Fluxo dos dados:

InfraBox (Mega 2560 + W5500)
→ rede Ethernet local
→ roteador / Internet
→ **HTTP, porta 80** → Cloudflare Worker (`tcc-infrabox-bridge.almeida-joilson.workers.dev`)
→ **HTTPS** → aplicação web no Render (`https://projeto-tcc-infrabox.onrender.com`)
→ interface web.

O Worker também grava o histórico no banco **Cloudflare D1**.

- Toda comunicação é **iniciada pelo Mega** (conexões de saída). [firmware]
- **Não é necessário** port forwarding, abertura de porta no roteador nem IP público fixo.
- **Não há MQTT** nesta versão: não existe broker, tópicos nem credenciais MQTT. A troca de dados usa HTTP e APIs da aplicação. [firmware]

---

## Módulo Ethernet

- W5500, ligado ao Mega por SPI (CS D53). [firmware]
- Biblioteca de rede: cliente `EthernetClient` para as conexões de saída. [firmware]

---

## Endereçamento IP

### DHCP com fallback [firmware]

- O firmware tenta obter endereço por **DHCP**.
- Se o DHCP falhar, usa endereço de contingência:
  - IP: **192.168.100.50**
  - Máscara: **255.255.255.0**
  - Gateway: **192.168.100.1**
  - DNS: **192.168.100.1**
- O fallback não se adapta à rede real. Se a rede local usar outra faixa, o painel com o IP de contingência não terá acesso à Internet nem comunicação com o Worker.
- O IP obtido por DHCP pode variar. Não há IP permanente e o assistente não conhece o IP atual do painel.
- Para identificar o IP atribuído: diagnóstico pela porta serial do Mega (Monitor Serial) ou consulta à lista de concessões DHCP do roteador/switch da instalação.

### Endereço MAC [firmware]

- MAC no código: **DE:AD:BE:EF:FE:ED**.
- Esse MAC é um valor fixo do código, não credencial nem identificador exclusivo de fabricação.
- Vários painéis com o mesmo MAC no mesmo segmento de rede podem gerar conflito; essa situação exige avaliação antes de instalar mais de um painel na mesma rede.

### Requisitos da rede local

- Porta Ethernet ativa.
- DHCP disponível (ou rede compatível com o fallback 192.168.100.0/24).
- Acesso à Internet com saída HTTP (porta 80) para o domínio do Worker.

---

## Por que existe o Worker (ponte HTTP → HTTPS)

- O Render suporta HTTPS.
- A implementação embarcada usada no Mega/W5500 **não implementa TLS**; por isso o Mega envia HTTP ao Worker, e o Worker encaminha por HTTPS ao Render.
- Essa é uma limitação da implementação utilizada, não incapacidade universal do W5500 ou do Render.
- O Worker encaminha a requisição ao Render preservando caminho e parâmetros de consulta.
- **O trecho Mega → Worker não é criptografado.** Não afirmar que toda a comunicação é criptografada.

---

## APIs utilizadas pelo Mega [firmware/aplicação]

| Rota | Método | Função | Intervalo programado |
|---|---|---|---|
| `/api/mega/update` | POST | Envia grandezas e estados (temperatura, tensão DC, tensões AC, alarmes, relés) | 5 s |
| `/api/mega/comando` | GET | Consulta comandos pendentes para os relés | 1 s |

- O mecanismo de identificação de comandos evita que um comando antigo seja reaplicado sobre o estado atual (por exemplo, sobrescrevendo uma alteração feita na tela local). A forma exata dessa identificação deve ser conferida no código.
- Intervalos programados não garantem latência máxima, execução periódica exata ou nível de serviço.

### Como um comando chega ao relé

1. O usuário aciona o relé na interface web.
2. A aplicação no Render registra o comando.
3. O Mega, na consulta periódica a `/api/mega/comando` (via Worker), recebe o comando novo.
4. O firmware altera a saída do relé e o novo estado segue na próxima atualização.

O estado exibido é o estado lógico do Mega, não confirmação mecânica do contato nem do equipamento externo.

### Servidor local no firmware

O firmware possui `EthernetServer` na porta 80 para atendimento local. Isso é diferente da conexão de saída para o Worker. As rotas locais da versão em uso não estão documentadas; não presumir endpoint como `/status`. [pendente]

---

## Interface web

- Endereço: **https://projeto-tcc-infrabox.onrender.com**.
- A interface consulta `/api/status` com atualização visual aproximada de **1 s**.
- Na aplicação examinada, o painel é mostrado como **online** quando houve atualização nos últimos **10 s**; conferir se a versão publicada mantém esse limiar.
- A atualização da tela a cada 1 s não significa nova leitura dos sensores a cada 1 s; o Mega envia dados a cada 5 s.
- Os valores atuais ficam na memória da aplicação no Render; não há garantia de que sobrevivam a reinicialização do serviço. O histórico fica no D1.
- A disposição da interface pode variar conforme navegador, tamanho de tela e dispositivo.

---

## Histórico – Cloudflare D1

### Gravação

- O Worker recebe o POST `/api/mega/update`, consulta o último registro e **grava se for a primeira medição ou se tiverem passado ao menos 10 s** desde a última gravação. Em seguida encaminha a requisição ao Render.
- Se a gravação falhar, a falha é registrada e o encaminhamento ao Render prossegue. Isso não garante sucesso de todas as operações de rede.
- Não há armazenamento local no Mega, fila offline nem reenvio de amostras perdidas. Períodos sem comunicação geram **lacunas no histórico**.

### Estrutura da tabela [autor – console do D1]

```sql
CREATE TABLE medicoes (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 data_hora TEXT NOT NULL DEFAULT (datetime('now')),
 temperatura REAL,
 bateria REAL,
 fase1 REAL,
 fase2 REAL,
 fase3 REAL,
 porta INTEGER,
 retificador INTEGER,
 ar_condicionado INTEGER,
 gerador INTEGER,
 inversor INTEGER,
 incendio INTEGER,
 rele1 INTEGER,
 rele2 INTEGER,
 alarme INTEGER
);
```

- `data_hora` é o momento da **inserção no banco**, não o instante da leitura no Mega.
- `datetime('now')` do SQLite usa **UTC**.
- A conversão para horário local e o fuso usado nos filtros da interface **não foram conferidos**. Não afirmar que a tela mostra horário de Brasília. O Worker acrescenta `Z` ao interpretar o registro para filtros de intervalo, o que não basta para validar a exibição. [pendente]
- O campo `alarme` existe, mas sua codificação (valor numérico ou bitmask) não está documentada. [pendente]
- Não existe coluna ONLINE/OFFLINE. O banco não grava estado offline automaticamente.

### Consulta – `GET /api/historico` (atendida pelo Worker)

Parâmetros:

- `inicio` e `fim` (período);
- `alarmes=1` (filtrar registros com alarme);
- `pagina` (mínimo 1);
- `limite` (de 1 a 500; padrão 100).

Ordenação: `ORDER BY id DESC`. Resposta com os campos `ok`, `total`, `pagina`, `limite`, `paginas` e `dados`.

O limite da API é diferente da paginação de 20 linhas exibida na tela de histórico.

### Tela de histórico

- O Render consulta o Worker para o histórico.
- A interface mostra o período escolhido, tabela, gráficos e botão para exportar CSV.
- Quantidade máxima exportada no CSV e se a exportação inclui todos os registros: não conferido. [pendente]
- Não presumir que os gráficos principais e o histórico por período usam a mesma fonte de dados ou a mesma retenção. [pendente]

---

## Render e Cloudflare

- O Render hospeda a aplicação Python (Flask, servida por Gunicorn). Detalhes de implantação em GRAVACAO_FIRMWARE.md.
- O plano contratado, custos, número de workers do Gunicorn, SLA, disponibilidade e versões de runtime não estão documentados.
- Segundo a documentação do Render consultada em 28/10/2026, no plano gratuito o serviço web é suspenso após 15 minutos sem tráfego de entrada e demora cerca de 1 minuto para voltar; e o PostgreSQL gratuito expira 30 dias após a criação. Essas regras valem apenas se o plano gratuito estiver em uso e podem mudar.
- O D1 foi adotado para manter o histórico separado da aplicação. Não há gratuidade ilimitada, backup automático ou ausência de cotas documentados.

---

## Funcionamento local e falha de Internet

- Com o painel energizado e o firmware em operação, as funções locais continuam sem Internet: leitura dos sensores, processamento dos alarmes, tela Nextion e comando local dos dois relés.
- Sem Internet ficam indisponíveis: envio ao Render, comandos remotos, atualização da interface web e gravação de histórico (gerando lacunas).
- Tarefas de rede no firmware podem ser bloqueantes; não há garantia de latência fixa nem de ausência total de impacto na tela local durante falhas de rede.
- Falha de Internet não indica, por si só, falha do painel.

---

## Diagnóstico de comunicação

Verificar em sequência:

1. Painel energizado e tela Nextion operando (funcionamento local).
2. Cabo Ethernet conectado e link físico ativo no switch/roteador.
3. IP atribuído: Monitor Serial do Mega ou lista DHCP do roteador. Se aparecer 192.168.100.50, o DHCP falhou e o painel está no fallback.
4. Rede com acesso à Internet e saída HTTP (porta 80) liberada.
5. Disponibilidade da aplicação no Render (abrir a interface web).
6. Status online/offline na interface (online = atualização nos últimos 10 s na aplicação examinada).

Não concluir que o Mega ou o W5500 estão com defeito apenas porque a interface web está offline.

---

## Não fornecer por estimativa

- IP atual do painel ou IP que o DHCP atribuirá;
- configurações internas do roteador e credenciais de rede;
- senhas, chaves ou tokens do Render, Cloudflare, Gemini ou GitHub;
- portas ou rotas não documentadas;
- procedimentos para modificar a arquitetura de comunicação.

Alterações de arquitetura devem ser tratadas com o desenvolvedor.
