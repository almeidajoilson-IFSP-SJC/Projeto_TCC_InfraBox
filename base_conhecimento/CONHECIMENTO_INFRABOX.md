
# Base de Conhecimento Técnica - InfraBox TCC

## Finalidade

O InfraBox é um equipamento desenvolvido para monitoramento de infraestrutura em estações de telecomunicações.

O sistema permite monitorar alarmes digitais e grandezas físicas, além de disponibilizar telecomandos por relé.

A versão atual desta documentação corresponde ao projeto TCC.

---

## Autoria

O InfraBox foi idealizado, projetado e desenvolvido pelo engenheiro Joilson Almeida, graduado em Engenharia de Controle e Automação pelo IFSP.

---

## Alimentação do painel - versão TCC

A alimentação nominal do painel InfraBox TCC é de:

- 12 Vcc

O conversor utilizado aceita entrada na faixa de:

- 9 a 16 Vcc

A versão TCC não deve ser alimentada diretamente por -48 Vcc.

Em sistemas de telecomunicações alimentados em -48 Vcc, deve ser utilizado um conversor DC/DC isolado adequado, com entrada compatível com -48 Vcc e saída de 12 Vcc para alimentação do painel.

---

## Display Nextion

O InfraBox TCC utiliza display Nextion de 7 polegadas.

Características:

- tela touch capacitiva;
- alimentação de 5 Vcc;
- comunicação com o Mega 2560 pela Serial 2;
- apresenta grandezas monitoradas;
- apresenta alarmes;
- permite operar os dois relés locais.

A placa Mega 2560 permanece como responsável pelo estado efetivo dos relés.

Tensões de alimentação abaixo de aproximadamente 4,5 Vcc podem comprometer ou impedir o funcionamento correto do display.

A fonte deve possuir capacidade suficiente de fornecimento de corrente.

O valor mínimo exato de corrente necessário para o display ainda não está documentado.

---

## Sensor de temperatura

O sensor utilizado é o DS18B20.

Características:

- alimentação de 5 Vcc;
- comunicação pelo protocolo 1-Wire;
- resistor pull-up de 4,7 kΩ entre o pino de dados e +5 Vcc;
- utilizado para medição de temperatura ambiente.

---

## Interface Ethernet

A comunicação Ethernet é realizada através do módulo W5500.

Características:

- alimentação em 3,3 Vcc;
- os 3,3 Vcc são fornecidos pelo microcontrolador;
- conexão física através de Ethernet.

---

## Condições ambientais

O InfraBox deve ser instalado e operado em ambiente climatizado.

Faixa de temperatura ambiente recomendada:

- mínima: 2 °C;
- máxima: 40 °C.

Operação fora desta faixa pode:

- comprometer as medições;
- causar funcionamento irregular;
- reduzir a vida útil dos componentes;
- causar danos ao equipamento.

---

## Entradas digitais

As entradas digitais trabalham com os níveis de referência do microcontrolador.

Faixa normal de operação:

- 0 a 5 Vcc.

Não é permitida aplicação direta de tensão externa acima da faixa normal de operação.

O circuito possui proteção ou tolerância até aproximadamente +30 Vcc sem comprometer o microcontrolador.

Esse valor representa proteção do circuito e não deve ser interpretado como tensão normal de entrada.

Portanto, não se deve afirmar que uma entrada digital do InfraBox pode operar normalmente com 24 Vcc ou 30 Vcc.

---

## Alarmes digitais

A versão atual utiliza os seguintes alarmes:

1. Porta
2. Retificador
3. Ar-condicionado
4. Gerador
5. Inversor
6. Incêndio

Pinagem atual:

- Porta: D30
- Retificador: D31
- Ar-condicionado: D32
- Gerador: D33
- Inversor: D34
- Incêndio: D35

---

## Telecomandos

O InfraBox TCC possui dois canais de telecomando por relé.

Os relés podem ser acionados localmente pela interface Nextion e remotamente pela interface web.

A placa Mega 2560 é responsável pelo estado efetivo dos relés.

Solicitações para adicionar novos relés, alterar firmware ou modificar a interface Nextion devem ser encaminhadas ao fornecedor ou suporte técnico.

---

## Calibração

As medições devem ser comparadas com instrumento de referência adequado, como multímetro calibrado ou verificado.

Os ajustes devem ser realizados lentamente nos potenciômetros correspondentes.

Existem ajustes independentes para:

- tensão DC;
- fase AC 1;
- fase AC 2;
- fase AC 3.

Não realizar alterações de calibração fora do procedimento documentado.

---

## Segurança

Antes de realizar instalação, manutenção ou alteração de cabeamento:

- desligar a alimentação do equipamento;
- respeitar normas aplicáveis de instalações elétricas;
- manter separação entre cabeamento de sinal e cabeamento de potência;
- não utilizar o neutro como aterramento;
- garantir aterramento adequado do painel.

O painel deve ser conectado à malha de aterramento comum da instalação.

---

## Alterações e customizações

Não estão cobertos pela documentação padrão:

- aumento da quantidade de canais;
- alteração do firmware;
- alteração da programação do Nextion;
- modificação do circuito eletrônico;
- inclusão de novos sensores;
- modificações internas não previstas.

Essas solicitações devem ser encaminhadas ao fornecedor ou suporte técnico.

---

## Suporte técnico

Quando a documentação não possuir informação suficiente, orientar o usuário a procurar o suporte técnico.

E-mail de suporte:

[almeida.joilson@aluno.ifsp.edu.br]