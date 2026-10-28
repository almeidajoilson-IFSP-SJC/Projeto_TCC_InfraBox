# Hardware – InfraBox TCC

Descrição do hardware da versão TCC. Legenda de origem dos dados: [firmware], [autor], [datasheet], [ensaio], [cálculo], [pendente] (ver CONHECIMENTO_INFRABOX.md).

Informações da versão de produção (V2, -48 V) aparecem apenas quando identificadas como tal e não se aplicam ao TCC.

---

## Placas de circuito impresso

- O InfraBox TCC utiliza **duas PCBs de desenvolvimento próprio**: a **placa principal** e a **placa de medição AC**. [autor]
- Ambas foram projetadas pelo autor no Proteus e depois fabricadas e montadas. [autor]
- Os sensores ZMPT101B são componentes comerciais. A placa que integra os três canais de medição AC é de autoria do desenvolvedor; o transformador sensor não foi fabricado por ele. [autor]
- Existem orçamentos de fabricação das placas de 2025; preços e quantidades não constam desta base. [pendente]

### Conectores

- Passo adotado nos bornes/conectores: **3,5 mm**. [autor]
- O autor teve maior dificuldade de aquisição de conectores de 3,5 mm do que de 3,81 mm, que encontrou com mais facilidade. Isso é experiência de compra do projeto, não regra de mercado. [autor]
- Conectores de oito vias: sete machos e sete fêmeas. [autor]
- Resistor do LED do painel: **470 Ω**. Esse valor refere-se a esse LED; não deve ser aplicado a outros LEDs da placa sem conferir o esquema. [autor]

---

## Microcontrolador

- Placa: **Arduino Mega 2560 Pro Mini** (também chamada Mega 2560 Mini), microcontrolador **ATmega2560**. [autor]
- Funções: leitura das entradas e sensores, processamento dos alarmes, controle dos dois relés, comunicação com o display Nextion (Serial2) e com o W5500 (SPI).
- O tipo de conector USB da placa não está documentado. Não confundir a Pro Mini com a placa Mega 2560 Rev3 convencional; identificar o conector pela placa física. [pendente]

O Mega é a fonte do estado lógico informado de entradas e relés. Esse estado não é confirmação mecânica dos contatos nem retorno do equipamento externo.

---

## Pinagem confirmada no firmware [firmware]

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
| UART Serial2 TX2 | D16 |
| UART Serial2 RX2 | D17 |

- Cada pino tem uma única função; D33 é exclusivamente o gerador e D31 o retificador.
- A placa possui espaço para entradas adicionais, mas os pinos reservados dependem do layout e **não estão confirmados**. Não informar D36–D45 como pinos verificados. [pendente]

---

## Alimentação, consumo e bateria

### Componentes e ligação

- Fonte: **12 V, 2 A, 24 W**, entrada informada de **100–220 V AC**. [autor]
- O painel TCC é alimentado nominalmente em **12 V**.
- Conversor instalado: módulo **XL4015 step-down (abaixador)**, com saída ajustada fisicamente em **5 V**. [autor]
- O XL4015 **não é conversor isolado**.
- Ligação relatada pelo autor: fonte → conjunto de bateria → **fusível de vidro de 1 A na via positiva** → conversor XL4015 → saída de 5 V alimentando os circuitos e o display. [autor]

### Características comerciais do XL4015 [datasheet/comercial]

- Entrada: 5–32 V.
- Saída ajustável: 1–30 V, sempre menor que a entrada.
- Corrente: 3,5 A nominal, 5 A máximo.

Esses valores comerciais não garantem desempenho contínuo na montagem e **não definem a faixa de alimentação autorizada do painel nem da entrada de medição DC**. A faixa 5–32 V é do módulo conversor; o painel é especificado em 12 V nominais. Não aplicar 32 V ao painel ou ao divisor de medição com base nesse valor.

### Bateria

- Capacidade informada pelo usuário como **“2400 mA”**. A unidade correta não está confirmada: “mA” é unidade de corrente, enquanto capacidade se expressa em mAh ou Ah. Não converter automaticamente para 2400 mAh ou 2,4 Ah. [pendente]
- Química da bateria, capacidade correta, BMS/proteções e controlador de carga ainda não foram identificados. [pendente]
- A descrição da ligação fonte → bateria não comprova que o carregamento é adequado. Não orientar ligação direta de fonte a bateria nem procedimento de carga sem identificar esses componentes.
- **Não há autonomia calculada nem ensaio de autonomia realizado.** A autonomia real depende de capacidade útil, química, tensão de corte, temperatura, estado da bateria e variação do consumo.

### Ensaio de consumo [ensaio]

Condição do ensaio:

- dois relés acionados;
- multímetro Minipa ET-2042F em série **antes do XL4015**, na faixa de 600 mA.

Resultados:

- corrente registrada: **420,2 mA (0,4202 A)**;
- tensão registrada: **12,09 V**, em fotografia separada (leituras não simultâneas/sincronizadas);
- potência aproximada na condição ensaiada: P = 12,09 V × 0,4202 A = 5,080218 W ≈ **5,08 W**. [cálculo]

Interpretação:

- O valor inclui as perdas do conversor XL4015 e as cargas alimentadas por esse caminho (Mega, W5500, display, relés, sensores).
- Não inclui as perdas da fonte AC/DC externa nem as cargas externas comutadas pelos contatos dos relés.
- **Não aplicar novamente eficiência do conversor (por exemplo, 91%) sobre os 5,08 W**: as perdas do conversor já estão dentro do valor medido antes do XL4015.
- É o consumo observado na condição de ensaio, não potência máxima absoluta garantida.
- Uma leitura anterior de 2,44 mA foi descartada após a correção da configuração de medição e não deve ser usada.
- O InfraBox **não possui sensor de corrente**. Corrente e potência não são grandezas disponíveis na interface.

---

## Medição de tensão DC (versão TCC)

- Entrada analógica: **A7**. [firmware]
- Divisor resistivo: R1 = **5,8 kΩ** entre a entrada e o nó analógico; R2 = **2 kΩ** entre o nó e a referência; resistores de 0,5 W, tolerância 5%. [autor]
- Relação ideal: V_ADC = V_IN × 2 / (5,8 + 2) = **V_IN / 3,9**. [cálculo]
- Para 12 V: V_ADC ≈ **3,08 V**. [cálculo]
- Fator teórico inverso: **3,9**. Fator utilizado no firmware: **3,87**. A origem do ajuste para 3,87 não está documentada; não se trata de calibração rastreável. [firmware]
- Aquisição: **50 amostras** espaçadas de **2 ms**, média, seguida de filtro exponencial com **alfa = 0,15**; a primeira leitura inicializa o filtro. [firmware]
- Referência nominal do cálculo: 5 V; ADC de 10 bits. Degrau nominal ≈ 4,88 mV no pino, ≈ 19 mV referido à entrada com o fator 3,87. Resolução não é exatidão; a exatidão depende da tensão real de 5 V, das tolerâncias dos resistores e do ADC. [cálculo]
- Corrente aproximada drenada pelo divisor em 12 V: 12 / 7,8 kΩ ≈ 1,54 mA. [cálculo]

Limites:

- O divisor ideal atingiria 5 V no ADC com 19,5 V na entrada. **Esse valor não é limite operacional validado** e não autoriza aplicar tensões até 19,5 V. [cálculo]
- Não há trimpot de calibração neste divisor. **O trimpot do XL4015 ajusta a alimentação de 5 V e não deve ser usado para calibrar a indicação da bateria**; alterar a saída de 5 V afeta a alimentação de todo o circuito e a própria referência da conversão.

### Medição -48 V (somente versão de produção V2)

A versão de produção usa medição de -48 V com offset positivo: resistores de 47 kΩ e 2,2 kΩ (0,5 W, 1%), trimpot de 1 MΩ e filtro. **Esse circuito e seu procedimento de ajuste não se aplicam ao TCC.**

---

## Medição de tensão AC (placa própria)

### Composição [autor]

- Placa com **três canais ZMPT101B**, amplificadores **LM358** e **trimpot individual por canal**, projetada pelo autor no Proteus.
- Entradas no Mega: **A0, A1 e A2**. [firmware]
- Esquemático: arquivo ZMPT_3F_v2(1).pdf. Conforme o esquema, há resistores de entrada **R13, R20 e R22 de 820 kΩ** e resistores de amostragem de **100 Ω**. O arquivo não está no pacote desta base.
- Proteção AC: **fusíveis de vidro de 250 mA**. Os fusíveis não são limitadores precisos da corrente de medição nem proteção suficiente contra qualquer sobretensão.

### Firmware [firmware]

- Biblioteca: **ZMPT101B.h**, objetos configurados com **60 Hz** e sensibilidade **308**.
- Biblioteca compatível de referência: Abdurraziq/ZMPT101B-arduino. A versão instalada e o autor exato dependem do arquivo library.properties, não disponível. [pendente]
- `getRmsVoltage` calcula a leitura RMS; `setSensitivity` ajusta o fator da biblioteca.
- O conjunto não é instrumento true-RMS certificado; não há garantia de precisão independente da forma de onda.
- O firmware está configurado para 60 Hz. Uso em outra frequência exige avaliar a configuração e a resposta do circuito.
- A alimentação e a referência de 5 V afetam o condicionamento e a conversão.

### Ajuste dos canais

- Cada canal é ajustado no seu trimpot, comparando a leitura do InfraBox com um multímetro na mesma tensão. Girar lentamente e aguardar a estabilização da leitura.
- Os ensaios de ajuste foram feitos com Monitor Serial, Serial Plotter e comparação com multímetro. [ensaio]
- As três curvas no Serial Plotter mostram o acompanhamento dos canais no ensaio; por si só não comprovam defasagem, frequência ou tensão de linha.

### Ligação conforme a rede

| Rede | Ligação dos canais | Tensão por canal |
|---|---|---|
| Trifásica 220 V entre fases | Canal 1: A-B; canal 2: B-C; canal 3: C-A | 220 V (configuração prevista para 220 V por canal) |
| Trifásica 380 V entre fases **com neutro disponível** | Canal 1: A-N; canal 2: B-N; canal 3: C-N | ≈ 220 V (380/√3 ≈ 219,4 V em estrela equilibrada) [cálculo] |

- Não presumir neutro disponível. Sem neutro, a rede 380 V não tem ligação documentada.
- **Não aplicar 380 V diretamente aos canais.** Nem P = V²/R nem a faixa do componente sensor autorizam essa ligação.
- Ensaio bifásico realizado: canal 1 A-B, canal 2 A-N, canal 3 B-N. Nesse arranjo os canais não representam três fases independentes; a rede não é trifásica apenas por haver três leituras. [ensaio]

### Limite de entrada

- O valor genérico **0–250 V** que constava da base é informação **legada, a verificar** para a placa própria. Não é limite validado da placa AC.
- O limite real depende de potência e tensão de trabalho dos resistores, tolerâncias, isolamento, distâncias na PCB, condições do transformador e saturação do condicionamento. Não há análise completa nem ensaio de limite. [pendente]
- Estimativa para o resistor de 820 kΩ em 220 V RMS, supondo que a queda de tensão se concentre no resistor: I ≈ 220 / 820 000 ≈ **0,268 mA**; P ≈ 220² / 820 000 ≈ **0,059 W**. Não é caracterização completa do transformador. [cálculo]

---

## Sensor de temperatura DS18B20

- Sonda DS18B20 com cabo padrão de **1 m**, alimentação **5 V**, dados em **D2**. [autor/firmware]
- Bibliotecas: **OneWire.h** e **DallasTemperature.h**. [firmware]
- Resistor de **4,7 kΩ entre a linha de dados e +5 V**: é o **pull-up** do barramento 1-Wire. Mantém a linha em nível alto quando nenhum dispositivo a puxa para nível baixo, permitindo a comunicação. Não é divisor analógico nem resistor de calibração.
- Vantagens da sonda: ponto de leitura afastado da placa, proteção física do elemento sensor e adequação construtiva à instalação. Grau IP, material, blindagem ou impermeabilidade não estão documentados para a sonda adquirida. [pendente]
- Resoluções suportadas: 9, 10, 11 e 12 bits (incrementos 0,5; 0,25; 0,125 e 0,0625 °C). O firmware não define `setResolution` explicitamente; a resolução efetiva não foi conferida. [datasheet/pendente]
- Exatidão especificada pelo fabricante para o CI: **±0,5 °C de -10 °C a +85 °C**, nas condições do datasheet. Não é certificado de exatidão do conjunto montado. [datasheet]
- Comprimento do cabo: o DS18B20 transmite o valor digital, portanto o comprimento não altera a temperatura por resistência do fio como em um divisor analógico. Cabos mais longos afetam a integridade do barramento 1-Wire (capacitância, pull-up, alimentação, ruído), podendo causar falhas de leitura. Alteração de comprimento deve ser avaliada com o desenvolvedor.
- O DS18B20 mede apenas temperatura. A versão TCC não mede umidade.

---

## Entradas digitais (alarmes)

### Configuração [firmware/autor]

- Seis entradas utilizadas: **D30 a D35** (porta, retificador, ar-condicionado, gerador, inversor, incêndio).
- Modo: **INPUT_PULLUP**.
- Resistor série de cada entrada: **20 kΩ, 0,25 W, 5%, filme, PTH**.
- Zener de referência do projeto: **1N5230B, 4,7 V, 500 mW, ±5%**. O datasheet especifica a tensão nominal na corrente de ensaio de 20 mA; a corrente real no circuito não é 20 mA. A peça montada deve ser conferida com o esquema; o fabricante do componente comprado não está identificado. [datasheet/pendente]
- A lógica de qual nível corresponde a “alarme” é definida no firmware.

### Níveis lógicos do ATmega2560 a 5 V [datasheet]

- LOW garantido até 0,3 × VCC = **1,5 V**.
- HIGH garantido a partir de 0,6 × VCC = **3,0 V**.
- Entre 1,5 V e 3,0 V o estado não é garantido.

### Simulação e ensaios

- Simulação Tinkercad: tensão positiva de 0 a 55 V aplicada com potenciômetro virtual. Com 0 V externos, o pino do Arduino ficou em cerca de **1,43 V**. Esse valor tem margem pequena em relação ao limite LOW de 1,5 V e não deve ser generalizado para todas as portas e montagens. [ensaio – simulação]
- Ensaio físico **da versão de produção V2**: variação de 0 a -50 V com potenciômetro de 10 kΩ, funcionamento esperado relatado pelo autor, sem registro fotográfico. Não vale como ensaio positivo do TCC nem como comprovação de ±50 V. [ensaio – produção]
- 70 V foi condição de análise de dimensionamento, não faixa de uso nem ensaio realizado. [cálculo]

### Uso

- A base anterior previa alarmes por **contato seco** e citava faixa de 0 a 5 V; essa faixa refere-se ao nível lógico no pino do Mega.
- Não há faixa de tensão externa validada para os bornes de entrada. Não orientar a ligação de potencial externo (24 V, 48 V etc.) sem conhecer topologia, polaridade e referência do circuito.
- Distinguir: contato seco (sem tensão própria), entrada protegida (borne com resistor série e Zener) e pino do Mega (níveis lógicos de 5 V).
- A proteção por resistor série e Zener não define faixa normal de operação. A antiga referência a proteção até +30 V foi retirada por não ter comprovação.

---

## Relés de telecomando

- Dois canais, bobina 5 V, relés de referência **SRD-05VDC-SL-C**. [autor]
- Contatos: **COM**, **NA (NO)** e **NF (NC)**.
- Pinos: Relé 1 em D22 e Relé 2 em D24. [firmware]
- Comandos: pela tela Nextion e pela interface web.
- Os valores nominais do relé individual não representam capacidade certificada do módulo, das trilhas, dos conectores ou de carga indutiva. A capacidade de carga do conjunto não está documentada. [pendente]
- Presença de optoacoplamento e nível lógico ativo dependem do módulo e do código; não confirmados. [pendente]
- Estado na partida, comportamento após reinicialização, intertravamento e acionamento por pulso/momentâneo não estão confirmados no código disponível. [pendente]
- O estado mostrado é o estado lógico definido pelo Mega, não confirmação de que o contato fechou ou de que o equipamento externo atuou.

---

## Display Nextion

- Modelo: **NX8048P050-011C-Y**; **5 polegadas**; **800 × 480**; touch **capacitivo**; alimentação nominal **5 V**. [autor/datasheet]
- Projeto HMI em uso: **DisplayTCC.HMI**. [autor]
- Comunicação: **Serial2** do Mega (TX2 = D16, RX2 = D17), ligação cruzada com RX/TX do display e GND comum. [firmware]
- NexConfig.h: `nexSerial` = Serial2; `dbSerial` = Serial; DEBUG_SERIAL_ENABLE habilitado. [firmware]
- Velocidade serial (baud) e versão do Nextion Editor: **não confirmadas**. [pendente]
- Corrente de alimentação do display: não documentada. A base anterior registrava que tensões abaixo de cerca de 4,5 V podem impedir a inicialização ou provocar reinicializações; a faixa de alimentação do datasheet não foi conferida nesta revisão. [pendente]
- Funções locais: exibir leituras e alarmes e comandar os dois relés, com o painel energizado e o firmware em operação. Ver REDE_COMUNICACAO.md sobre funcionamento sem Internet.

---

## Módulo Ethernet W5500

- Interface Ethernet do Mega via SPI (CS D53, MOSI D51, MISO D50, SCK D52). [firmware]
- Alimentação: 3,3 V, informada como fornecida pela placa do microcontrolador. O regulador que fornece esses 3,3 V e sua capacidade não estão documentados. [autor/pendente]

---

## Gabinete

- Fabricante informado no documento original: **SCHUHMACHER**, para instalação em parede.
- Dimensões e desenhos de fixação constavam como disponíveis em um “Manual do Usuário”, que **não está no pacote desta base**. Não informar dimensões. [pendente]

---

## Modificações de hardware

Não fazem parte dos procedimentos documentados: alterar circuitos, adicionar sensores, relés ou entradas, alterar a alimentação interna, substituir componentes por outros modelos, adaptar o painel para -48 V ou modificar o Mega e o display. Essas demandas devem ser tratadas com o desenvolvedor.
