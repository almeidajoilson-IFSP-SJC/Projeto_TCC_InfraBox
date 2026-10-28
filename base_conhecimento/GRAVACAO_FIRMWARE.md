# Gravação de Firmware, HMI e Atualização da Aplicação – InfraBox TCC

Este documento trata de **três procedimentos diferentes**, que não devem ser confundidos:

| Procedimento | O que atualiza | Ferramenta |
|---|---|---|
| Gravação do firmware do Mega | Programa do ATmega2560 | AVRDUDESS 2.17 (arquivo .HEX) |
| Gravação da HMI do Nextion | Telas do display | Nextion Editor + adaptador CP2102 |
| Implantação da aplicação web | Aplicação Flask no Render | GitHub (branch main) + Auto-Deploy |

---

# Parte 1 – Firmware do Mega 2560

## Firmware de referência

- O firmware em uso é identificado pelo arquivo **TCC_ARDUINO_DISPLAY_V4(1).ino**. [firmware]
- Ao receber um arquivo de firmware, conferir se corresponde a essa versão. Não substituir pela versão V1 antiga apenas por ela aparecer em material histórico.
- O arquivo gravado deve ser o .HEX compilado a partir do firmware validado para o painel. Não usar .HEX de origem desconhecida ou de outro equipamento.

## Microcontrolador

- Placa: Arduino Mega 2560 Pro Mini; microcontrolador **ATmega2560**.
- Na ferramenta de gravação, selecionar o ATmega2560. Não testar outros microcontroladores por tentativa.

## Procedimento informado (AVRDUDESS)

O procedimento existente do projeto utiliza o **AVRDUDESS 2.17, versão portable**, que dispensa instalação e dispensa a IDE Arduino para gravar um .HEX já compilado.

Materiais:

- computador com porta USB;
- cabo USB compatível com o conector da placa (tipo de conector não documentado; identificar pela placa física);
- AVRDUDESS 2.17 portable;
- arquivo .HEX validado.

Passos informados:

1. Descompactar o pacote do AVRDUDESS em uma pasta e executar o programa.
2. Conectar o Mega ao computador e verificar se o sistema reconheceu a porta serial.
3. No AVRDUDESS, selecionar o microcontrolador ATmega2560 e a porta serial correspondente (o número da porta COM varia de um computador para outro).
4. Usar a função de detecção e conferir no rodapé se a placa foi detectada. Não gravar se a detecção falhar.
5. No campo **Flash**, selecionar o arquivo .HEX correto e conferir que corresponde ao equipamento.
6. Executar a gravação e aguardar a mensagem de conclusão (**PRONTO**) no rodapé. Não desconectar o cabo USB nem interromper o processo durante a gravação.

### Parâmetros não documentados [pendente]

Programmer, baud rate, bootloader, fuse bits e lock bits não estão documentados para o InfraBox. Por isso este procedimento é o **procedimento informado pelo projeto, não um roteiro plenamente validado**. Sem esses parâmetros:

- não sugerir valores de programmer ou baud;
- não alterar fuse bits ou lock bits;
- não fornecer comandos manuais do avrdude nem recuperação de bootloader.

## Porta COM não encontrada

- Verificar conexão e cabo USB (alguns cabos só fornecem alimentação).
- Verificar se o computador reconheceu o dispositivo; desconectar e reconectar.
- Não escolher porta COM aleatória.
- Persistindo, contatar o desenvolvedor.

## Falha na detecção

- Não gravar.
- Conferir porta, cabo e seleção do ATmega2560 e repetir a detecção.
- Persistindo, interromper e contatar o desenvolvedor. Não alterar parâmetros desconhecidos por tentativa.

## Verificação após a gravação

- Inicialização do Mega e do display Nextion.
- Leituras dos sensores e estados dos alarmes.
- Comando dos relés pela tela local.
- Comunicação com a interface web.
- Monitor Serial: mensagens de diagnóstico (incluindo o IP obtido).

## Firmware e rede

O firmware atual usa DHCP com fallback (192.168.100.50). Não gravar firmware com IP fixo individual com base em procedimentos antigos. Ver REDE_COMUNICACAO.md.

## Gravação × alteração de firmware

Gravar o .HEX validado é diferente de alterar o código-fonte. Este procedimento não cobre editar código, alterar pinos, sensores, relés, protocolos ou temporizações. Essas demandas devem ser tratadas com o desenvolvedor.

## Tutorial complementar

Material externo de referência visual para o AVRDUDESS:

- https://redinfor.migueldc.com/avrdudes-para-arduino/
- https://www.youtube.com/watch?v=2AGWIazNdmQ

Parâmetros, microcontrolador, baud, programmer, fuse bits ou procedimentos de recuperação mostrados nesses materiais não se aplicam automaticamente ao InfraBox.

---

# Parte 2 – HMI do display Nextion

## Arquivos

- Display: **NX8048P050-011C-Y** (5 polegadas, 800 × 480, capacitivo).
- Projeto HMI em uso: **DisplayTCC.HMI** (arquivo editável no Nextion Editor). [autor]
- O arquivo editável (.HMI) é diferente do arquivo compilado que é transferido para o display.
- Versão do Nextion Editor usada no projeto: **não confirmada**. [pendente]
- Velocidade serial (baud) de comunicação com o Mega e de transferência: **não confirmada**. [pendente]

## Meio de programação [autor]

- A programação do Nextion é feita com **adaptador USB–serial TTL CP2102 (seis pinos)**, ligado diretamente ao notebook.
- O sinal é **serial TTL**, não RS-232. Não usar adaptador RS-232 com níveis bipolares.
- Tensão dos sinais e da alimentação do adaptador não identificadas. Não garantir que o USB/CP2102 alimente adequadamente o display e não indicar ligação ao pino de tensão do adaptador sem especificação. [pendente]
- Na operação normal, o display liga-se à Serial2 do Mega (TX2 D16 → RX do display; RX2 D17 ← TX do display; GND comum).

## Limites deste procedimento

Sem baud rate, versão do editor e ligação de alimentação confirmados, não há roteiro completo validado de gravação da HMI. Informar os dados conhecidos e indicar os que faltam. Alterações nas telas são alterações de projeto e devem ser tratadas com o desenvolvedor.

---

# Parte 3 – Implantação da aplicação web (Render)

Atualizar a aplicação web **não grava** nada no Mega nem no display.

## Configuração identificada [autor – print do Render]

- Repositório: **almeidajoilson-IFSP-SJC/Projeto_TCC_InfraBox** (visibilidade pública/privada não confirmada).
- Branch vinculada: **main**.
- Build command: `pip install -r requirements.txt`.
- Start command: `gunicorn app:app` (o Gunicorn carrega o objeto `app` do arquivo `app.py`).
- **Auto-Deploy: On Commit**.
- URL: https://projeto-tcc-infrabox.onrender.com.

## Estrutura da aplicação

app.py, templates/index.html, static/js/app.js, arquivos CSS, requirements.txt e a pasta base_conhecimento (arquivos Markdown do assistente técnico).

## Como atualizar

1. Editar os arquivos localmente.
2. Fazer commit e enviar (push) para a branch **main** do repositório vinculado.
3. O Render inicia a implantação automaticamente (Auto-Deploy On Commit), executando o build e o start.
4. Acompanhar o resultado da implantação no painel do Render; a implantação pode falhar (por exemplo, erro de dependência ou de inicialização).

Salvar um arquivo no editor (VS Code ou outro) **não publica** a alteração. É preciso que o commit chegue à branch vinculada.

## Base de conhecimento do assistente

- A pasta base_conhecimento deve conter apenas os sete arquivos operacionais. Relatórios de revisão, backups ou versões antigas na mesma pasta são carregados junto e podem contaminar as respostas.
- Credenciais (chave da API Gemini e outras) não fazem parte desta base e não devem ser expostas.
