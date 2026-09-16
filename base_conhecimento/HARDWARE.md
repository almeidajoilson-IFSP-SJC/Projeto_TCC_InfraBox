# Hardware - InfraBox TCC

Este documento descreve o hardware validado da versão TCC do InfraBox.

Informações não documentadas não devem ser presumidas.

---

## Placa de Circuito Impresso

O InfraBox utiliza uma PCI (Placa de Circuito Impresso) como base para montagem e interligação dos componentes eletrônicos do sistema.

---

## Microcontrolador

O controlador principal da versão TCC é o:

- Mega 2560 Pro Mini

Funções principais:

- processamento das entradas e sensores;
- controle dos alarmes;
- controle efetivo dos dois relés;
- comunicação com o display Nextion;
- comunicação com o módulo Ethernet W5500.

O Mega 2560 mantém o estado efetivo dos relés.

---

## Alimentação do painel

A versão TCC utiliza:

- tensão nominal: 12 Vcc;
- faixa de entrada do estágio conversor: 9 a 16 Vcc.

A versão TCC não deve ser alimentada diretamente por -48 Vcc.

Para aplicação em instalações de telecomunicações alimentadas em -48 Vcc, deve ser utilizado conversor DC/DC isolado adequado, com entrada compatível com o sistema -48 Vcc e saída adequada à alimentação de 12 Vcc do painel.

A versão definitiva destinada à alimentação direta a partir de sistemas -48 Vcc será documentada separadamente.

---

## Conversor DC/DC

O hardware da versão TCC utiliza conversor isolado 12 V / 5 Vcc para obtenção da alimentação de 5 V necessária aos circuitos correspondentes.

O estágio de entrada utilizado no protótipo admite alimentação entre 9 e 16 Vcc.

Não assumir outras faixas de entrada ou características elétricas que não estejam documentadas.

---

## Display Nextion

O InfraBox TCC utiliza:

- display Nextion de 7 polegadas;
- tela touch capacitiva;
- alimentação: 5 Vcc;
- comunicação com o Mega 2560: Serial 2.

Funções da interface local:

- visualização das grandezas monitoradas;
- indicação de alarmes;
- operação dos dois relés.

O Mega 2560 permanece responsável pelo estado efetivo dos relés.

### Alimentação do Nextion

A alimentação nominal é 5 Vcc.

Tensões inferiores a aproximadamente 4,5 Vcc podem:

- impedir a inicialização;
- provocar reinicializações;
- provocar travamentos;
- causar funcionamento irregular da interface.

A fonte deve possuir capacidade suficiente de fornecimento de corrente.

A corrente mínima ou recomendada ainda não está documentada.

Não fornecer um valor de corrente por estimativa.

---

## Módulo Ethernet W5500

O W5500 é responsável pela interface Ethernet do InfraBox.

Características documentadas:

- alimentação: 3,3 Vcc;
- alimentação fornecida pelo microcontrolador;
- realiza a interface entre o Mega 2560 e a rede Ethernet.

---

## Sensor de temperatura DS18B20

O InfraBox utiliza o sensor DS18B20 para medição da temperatura ambiente.

Características:

- alimentação: 5 Vcc;
- protocolo: 1-Wire;
- resistor pull-up: 4,7 kΩ (4K7);
- resistor conectado entre a linha de dados e +5 Vcc.

---

## Sensor de tensão AC

O sistema utiliza módulo:

- ZMPT101B_3F.

Função:

- medição das tensões alternadas monitoradas pelo InfraBox.

Faixa documentada do módulo:

- 0 a 250 Vca.

Não aplicar tensão superior à faixa documentada do sensor.

---

## Medição de tensão DC

O InfraBox possui circuito para medição da tensão DC monitorada pelo sistema.

A versão TCC foi adaptada para utilização com alimentação positiva de 12 Vcc.

Os valores de calibração e o procedimento de ajuste devem seguir exclusivamente a documentação específica de calibração.

Não utilizar parâmetros da antiga versão -48 Vcc como especificação da versão TCC.

---

## Módulo de relés

O InfraBox TCC utiliza:

- módulo de relé de 2 canais;
- alimentação: 5 Vcc;
- módulo com optoacoplamento.

Existem dois canais de telecomando disponíveis na versão TCC.

Os relés podem receber comandos pela interface local Nextion e pela interface web.

O Mega 2560 é responsável pelo estado efetivo dos relés.

Expansões ou alterações na quantidade de relés não fazem parte dos procedimentos documentados e devem ser encaminhadas ao suporte técnico.

---

## Entradas digitais

As entradas digitais utilizam os níveis de referência do microcontrolador.

Faixa normal de operação:

- 0 a 5 Vcc.

Não é permitida a aplicação direta de tensão externa acima dessa faixa como condição normal de operação.

O circuito possui proteção/tolerância até aproximadamente +30 Vcc sem comprometer o microcontrolador.

IMPORTANTE:

A proteção até aproximadamente +30 Vcc não significa que a entrada possa operar normalmente em 24 Vcc ou 30 Vcc.

O valor representa uma condição de proteção/tolerância e não uma faixa normal de operação.

---

## Gabinete

O gabinete utilizado no painel InfraBox TCC é fabricado pela:

- SCHUHMACHER.

As dimensões mecânicas e os desenhos de fixação estão disponíveis no Manual do Usuário do InfraBox.

Não inventar ou estimar dimensões do gabinete quando elas não estiverem disponíveis no contexto fornecido.

---

## Condições ambientais

O painel deve operar em área climatizada.

Faixa de temperatura ambiente documentada:

- mínima: 2 °C;
- máxima: 40 °C.

A operação fora dessa faixa pode:

- comprometer as medições;
- provocar funcionamento irregular;
- reduzir a vida útil dos componentes;
- causar danos ao equipamento.

---

## Modificações de hardware

Não fornecer procedimentos não documentados para:

- alterar o circuito eletrônico;
- adicionar sensores;
- adicionar relés;
- alterar alimentação interna;
- substituir componentes por modelos não homologados;
- modificar o Mega 2560;
- modificar o display Nextion;
- expandir entradas ou saídas.

Essas situações devem ser encaminhadas ao fornecedor ou suporte técnico.