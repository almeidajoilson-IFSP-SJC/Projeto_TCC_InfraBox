# Base de Conhecimento Técnica – InfraBox (versão TCC)

Documento geral da base. Os detalhes estão nos arquivos temáticos:

| Assunto | Arquivo |
|---|---|
| Componentes, pinagem, alimentação, bateria, medições DC/AC, temperatura, entradas, relés, display | HARDWARE.md |
| Cabos, bitolas, fusíveis, aterramento, ligação das fases AC | CABEAMENTO.md |
| Fixação, local, verificações e sequência de energização | INSTALACAO.md |
| Ethernet, DHCP/fallback, Worker, Render, APIs, histórico D1 | REDE_COMUNICACAO.md |
| Firmware do Mega, projeto HMI do Nextion, implantação da aplicação web | GRAVACAO_FIRMWARE.md |
| Regras de conduta do assistente | REGRAS_ASSISTENTE.md |

---

## Como ler a origem de cada informação

Nesta base, os dados técnicos são identificados pela origem:

- **[firmware]** – valor identificado no código do firmware TCC examinado (arquivo TCC_ARDUINO_DISPLAY_V4(1).ino) ou nos arquivos da aplicação examinados durante a consolidação da base.
- **[autor]** – configuração ou fato informado pelo autor do projeto.
- **[datasheet]** – característica de componente publicada pelo fabricante, válida nas condições do datasheet; não é qualificação do conjunto montado.
- **[ensaio]** – resultado de ensaio realizado, válido apenas para a configuração, polaridade e condição ensaiadas.
- **[cálculo]** – cálculo ideal ou estimativa; não equivale a validação experimental.
- **[pendente]** – dado ainda não confirmado; não deve ser usado como valor nominal nem como instrução operacional.

---

## Identificação do projeto

- Nome do projeto: **InfraBox**.
- Título acadêmico: **Desenvolvimento de Sistema Modular de Telemetria e Telecomando para Estações de Telecomunicação**.
- Autor e desenvolvedor: **Joilson Correia de Almeida**, estudante de Engenharia de Controle e Automação do IFSP – Campus São José dos Campos, autor deste Trabalho de Conclusão de Curso (TCC).
- Contato de suporte técnico: almeida.joilson@aluno.ifsp.edu.br.

O InfraBox é um projeto acadêmico e de desenvolvimento próprio. Não há fabricante comercial, garantia comercial, homologação, certificação ou calibração rastreável documentada para o equipamento.

---

## Finalidade e motivação

O InfraBox supervisiona energia, temperatura e estados de infraestrutura em estações de telecomunicações e disponibiliza telecomando por relé.

Motivação do projeto:

- estações de telecomunicações, especialmente em torres, têm acesso físico difícil e demorado;
- diagnóstico remoto de energia, temperatura e alarmes de infraestrutura;
- telecomando remoto de cargas ou dispositivos por contatos de relé;
- apoio à priorização de atendimentos e à decisão de mobilizar gerador.

O InfraBox informa grandezas e estados. Ele não calcula autonomia de bateria a partir da tensão, e não há resultado medido de economia operacional obtida com o seu uso.

---

## Versões do InfraBox

| Versão | Características |
|---|---|
| V0 | Arduino Uno em protoboard, comunicação Wi-Fi, plataforma Adafruit. |
| V1 | Painéis montados e instalados em campo, Wi-Fi/Adafruit, leitura de temperatura e umidade. |
| V2 (em produção corporativa) | Ethernet, integração com Zabbix, alimentação de -48 V, 16 posições de entrada/saída, sem display. A placa AC própria foi incorporada à evolução. |
| TCC (objeto desta base) | Alimentação positiva nominal de 12 V, Arduino Mega 2560 Pro Mini, Ethernet W5500, seis entradas digitais utilizadas e posições reservadas, dois relés, display Nextion, aplicação web própria (Flask no Render), Cloudflare Worker e histórico no Cloudflare D1. |

Pontos importantes:

- **Esta base trata da versão TCC**, salvo quando indicado que a informação é da versão de produção (V2).
- Nenhuma versão do InfraBox realiza medição de corrente como função do produto. A corrente de alimentação citada na base foi medida externamente com multímetro, em ensaio de consumo.
- A umidade foi medida na V1. A versão TCC não mede umidade.
- O display Nextion é uma evolução introduzida no TCC; não entrou na produção corporativa.
- **A versão TCC não deve receber -48 V diretamente.** Uma eventual conversão de -48 V para 12 V é adaptação distinta, ainda a dimensionar; não há conversor -48 V/12 V instalado ou fornecido com o painel TCC.

---

## Arquitetura resumida da versão TCC

- Controlador: Arduino Mega 2560 Pro Mini (ATmega2560).
- Alimentação: fonte 12 V / 2 A, bateria, fusível de 1 A, conversor step-down XL4015 ajustado para 5 V.
- Medições: tensão DC positiva (A7), três canais de tensão AC (A0, A1, A2) em placa própria com ZMPT101B, temperatura por sonda DS18B20 (D2).
- Estados digitais: porta, retificador, ar-condicionado, gerador, inversor e incêndio (D30 a D35).
- Telecomando: dois relés (D22 e D24).
- Interface local: display Nextion NX8048P050-011C-Y, 5 polegadas, na Serial2.
- Comunicação: W5500 por Ethernet → HTTP → Cloudflare Worker → HTTPS → aplicação no Render.
- Histórico: banco Cloudflare D1, gravado pelo Worker.

Detalhes em HARDWARE.md e REDE_COMUNICACAO.md.

---

## Pinagem confirmada no firmware

| Recurso | Pino |
|---|---|
| Relé 1 | D22 |
| Relé 2 | D24 |
| DS18B20 (dados) | D2 |
| Porta | D30 |
| Retificador | D31 |
| Ar-condicionado | D32 |
| Gerador | D33 |
| Inversor | D34 |
| Incêndio | D35 |
| AC canal 1 | A0 |
| AC canal 2 | A1 |
| AC canal 3 | A2 |
| DC positiva | A7 |
| W5500 CS | D53 |
| SPI MOSI | D51 |
| SPI MISO | D50 |
| SPI SCK | D52 |
| Serial2 TX2 (Nextion) | D16 |
| Serial2 RX2 (Nextion) | D17 |

Cada pino tem uma única função. As seis entradas de alarme usam INPUT_PULLUP. Os pinos de reserva para entradas adicionais dependem do layout da placa e não estão confirmados.

---

## Condições ambientais

O documento original do projeto indica instalação em ambiente climatizado, com temperatura ambiente entre **2 °C e 40 °C**. Essa faixa é a recomendação do projeto; não há ensaio ambiental ou certificação associada a ela.

---

## Calibração e ajustes

- **Canais AC**: cada canal da placa AC possui trimpot individual. O ajuste é feito comparando a leitura do InfraBox com um multímetro, girando o trimpot do canal correspondente lentamente. A biblioteca do firmware também possui fator de sensibilidade (configurado em 308). Ver HARDWARE.md.
- **Tensão DC (A7)**: não há trimpot de calibração no divisor da versão TCC. A conversão usa fator fixo no firmware (3,87). O trimpot do XL4015 ajusta a tensão de alimentação de 5 V e **não deve ser usado para calibrar a indicação da bateria**.
- Não existe documento de calibração separado no pacote desta base. O procedimento disponível é o descrito em HARDWARE.md.
- Ajustes não são calibração rastreável; o resultado depende do instrumento de comparação utilizado.

---

## Segurança geral

Antes de instalação, manutenção ou alteração de cabeamento:

- desenergizar o painel e os circuitos externos ligados a ele (alimentação, medição AC e cargas dos relés);
- respeitar as normas aplicáveis de instalações elétricas;
- manter separados os caminhos de cabos de sinal/dados e de energia;
- não utilizar o neutro como condutor de proteção (terra);
- não unir neutro, terra de proteção (PE) e GND eletrônico sem esquema que determine essa ligação;
- conectar o painel ao ponto de aterramento previsto na instalação.

A medição AC envolve tensão de rede. Intervenções nos bornes AC só com o circuito desenergizado.

---

## Alterações e customizações

Não fazem parte dos procedimentos documentados:

- aumento da quantidade de canais, entradas ou relés;
- alteração do firmware ou do projeto HMI do Nextion;
- modificação dos circuitos eletrônicos ou da alimentação interna;
- inclusão de novos sensores;
- adaptação para alimentação em -48 V.

Essas demandas devem ser tratadas com o desenvolvedor pelo contato de suporte.

---

## Assistente técnico (chatbot)

- A aplicação web contém um assistente técnico. O fluxo implementado reúne os arquivos Markdown da base de conhecimento no contexto e envia a pergunta à API Gemini pela biblioteca google-genai.
- Não há treinamento do modelo, fine-tuning, busca vetorial ou RAG com recuperação seletiva.
- O código examinado utilizava o identificador de modelo `gemini-3.6-flash`. Esse é o valor encontrado no arquivo examinado, não confirmação da versão em execução no momento.
- O assistente não tem acesso em tempo real a sensores, registros, IP do painel ou estado físico, e não aciona relés.

---

## Suporte técnico

Quando a documentação não contiver a informação necessária, o usuário pode contatar o desenvolvedor:

almeida.joilson@aluno.ifsp.edu.br
