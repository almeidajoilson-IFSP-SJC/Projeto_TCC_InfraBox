# Cabeamento - InfraBox TCC

Este documento estabelece as orientações validadas para o cabeamento da versão TCC do InfraBox.

As informações apresentadas devem ser utilizadas em conjunto com as orientações de instalação e segurança do equipamento.

Não utilizar bitolas, tipos de cabos ou métodos de conexão diferentes dos documentados sem avaliação técnica.

---

## Regras gerais

Durante a instalação do cabeamento:

- manter o InfraBox desligado;
- conferir a identificação dos cabos antes da conexão;
- evitar esforços mecânicos sobre conectores, sensores e placa eletrônica;
- manter os cabos organizados no interior do painel;
- respeitar as bitolas máximas documentadas;
- manter comunicação e energia em caminhos separados.

Não realizar conexões ou intervenções internas com o painel energizado.

---

## Separação entre comunicação e energia

Os cabos de comunicação Ethernet devem utilizar infraestrutura separada dos cabos de energia.

Devem existir caminhos separados para:

- Ethernet/dados;
- alimentação AC;
- alimentação DC.

Nunca passar o cabo Ethernet na mesma tubulação utilizada pelos cabos de energia AC ou DC.

Essa separação deve ser mantida também durante alterações ou manutenções futuras.

---

## Cabo Ethernet

A comunicação Ethernet do InfraBox utiliza:

- conector RJ45;
- cabo Ethernet/UTP blindado.

O cabo deve interligar o InfraBox ao:

- switch;
- roteador;
- ou ponto de conexão Ethernet previsto na instalação.

A distância máxima documentada entre o InfraBox e o ponto de conexão Ethernet é:

- 50 metros.

O painel deve ser instalado o mais próximo possível do ponto de conexão da rede.

---

## Blindagem do cabo Ethernet

O cabo Ethernet utilizado deve ser blindado.

A blindagem deve seguir o procedimento de aterramento previsto para a instalação.

Não improvisar conexões da blindagem quando o procedimento aplicável não estiver documentado.

---

## Alimentação DC

Para a alimentação DC da versão TCC:

- tensão nominal do painel: 12 Vcc;
- faixa de entrada do estágio conversor: 9 a 16 Vcc;
- seção máxima documentada do cabo: 1,5 mm²;
- cabo recomendado: PP 2 x 1 mm²;
- condutor: cobre flexível.

A versão TCC não deve ser alimentada diretamente por -48 Vcc.

Para utilização em uma instalação de telecomunicações com alimentação -48 Vcc, deve ser utilizado conversor DC/DC isolado adequado, com entrada compatível com -48 Vcc e saída apropriada de 12 Vcc para o painel TCC.

---

## Proteção da alimentação DC

A entrada de alimentação DC deve possuir fusível de proteção.

Valor máximo documentado:

- 1 A.

Não substituir o fusível por outro de corrente superior sem procedimento técnico documentado.

O fusível da alimentação DC deve ser a última conexão realizada durante a sequência de energização do InfraBox.

---

## Condutor de aterramento

O InfraBox deve possuir condutor de aterramento dedicado.

A bitola do condutor de aterramento deve ser:

- igual à bitola do condutor utilizado para a alimentação do painel.

Exemplo:

Se a alimentação do painel utilizar condutores de 1 mm², o condutor de aterramento também deverá possuir 1 mm².

IMPORTANTE:

A regra é referente à bitola do condutor.

Isso não significa que alimentação e aterramento sejam o mesmo condutor ou que devam compartilhar a mesma conexão elétrica.

O condutor de aterramento deve ser conectado ao ponto de aterramento previsto para o painel.

---

## Aterramento do painel

O aterramento deve ser realizado antes da energização.

O InfraBox deve ser conectado ao:

- ponto comum de aterramento;
- ou malha única de aterramento da instalação.

O aterramento está relacionado à:

- segurança operacional;
- redução de ruídos;
- estabilidade dos sinais;
- comunicação do equipamento.

O neutro da instalação elétrica não deve ser utilizado como substituto do aterramento.

---

## Cabeamento da medição AC

Para as entradas de monitoramento de tensão AC, utilizar:

- cabo PP;
- 3 x 1 mm²;
- cobre flexível.

A utilização de cabos de seção superior pode dificultar a instalação e provocar esforços mecânicos inadequados sobre sensores, conexões e placa eletrônica.

---

## Limite da medição AC

A tensão máxima documentada para as entradas de medição AC é:

- 250 Vca.

Não aplicar 380 Vca diretamente aos sensores.

Em instalações com 380 Vca entre fases, utilizar medição:

- fase-neutro,

mantendo a tensão efetivamente aplicada ao sensor dentro do limite máximo de 250 Vca.

---

## Proteção da medição AC

O circuito de monitoramento AC deve possuir fusível de proteção.

Valor máximo documentado:

- 250 mA.

Não utilizar fusível de corrente superior sem procedimento técnico documentado.

---

## Cabos dos alarmes

Os alarmes de infraestrutura são conectados às entradas digitais previstas no InfraBox.

As entradas digitais possuem faixa normal de operação:

- 0 a 5 Vcc.

Não aplicar diretamente tensões externas superiores à faixa normal como condição de operação.

A proteção/tolerância existente no circuito não deve ser interpretada como autorização para operação normal em tensões superiores.

---

## Paralelismo de alarmes

Não realizar paralelismo direto de um contato de alarme conectado ao InfraBox com entradas de outros equipamentos de:

- transmissão;
- comutação;
- dados;
- outros sistemas de monitoramento.

Equipamentos diferentes podem apresentar condições elétricas diferentes em suas entradas de alarme.

Quando houver necessidade de compartilhar um contato entre equipamentos, a solução deve ser avaliada tecnicamente e encaminhada ao suporte quando não houver procedimento documentado.

---

## Identificação das entradas de alarme

As entradas documentadas da versão TCC são:

- Porta: D30;
- Retificador: D31;
- Ar-condicionado: D32;
- Gerador: D33;
- Inversor: D34;
- Incêndio: D35.

Não alterar os pinos ou utilizar outras entradas sem alteração de projeto devidamente documentada.

---

## Cabos dos telecomandos

A versão TCC possui dois canais de telecomando por relé.

Os relés podem ser comandados:

- localmente pelo display Nextion;
- remotamente pela interface web.

O Mega 2560 mantém o estado efetivo dos relés.

As conexões externas aos contatos dos relés devem respeitar as características elétricas documentadas para o circuito conectado.

Quando a capacidade elétrica necessária não estiver especificada na documentação disponível, não estimar valores.

Utilizar a seguinte orientação:

"Essa informação não está disponível na documentação técnica atual."

---

## Organização interna

Durante a passagem dos cabos no gabinete:

- evitar cabos tensionados;
- evitar pressão sobre a PCI;
- evitar pressão sobre os sensores;
- evitar pressão sobre os conectores;
- manter acesso aos fusíveis;
- manter acesso aos bornes;
- preservar a organização interna do painel.

Não alterar a disposição dos componentes para acomodar cabos maiores sem procedimento técnico documentado.

---

## Verificação antes da energização

Após concluir o cabeamento, verificar:

- polaridade da alimentação DC;
- bitola da alimentação;
- bitola do aterramento;
- conexão do aterramento;
- fusível DC;
- fusível do monitoramento AC;
- conexões das fases monitoradas;
- tensão AC dentro do limite permitido;
- conexões dos alarmes;
- conexões dos telecomandos;
- conexão Ethernet;
- separação entre dados e energia;
- ausência de condutores soltos;
- ausência de curto-circuitos aparentes.

Somente após essas verificações o painel deve ser energizado.

---

## Informações não documentadas

Não determinar por estimativa:

- bitola de cabos não especificados;
- corrente máxima dos contatos dos relés;
- tensão máxima dos contatos dos relés;
- distância máxima de cabos de sensores quando não especificada;
- características de cabos para expansões;
- capacidade de novas entradas ou saídas.

Quando essas informações forem necessárias e não estiverem disponíveis na documentação técnica, informar que o dado não está documentado e encaminhar a situação ao suporte técnico.


## Cabo do sensor de temperatura DS18B20

O sensor de temperatura DS18B20 do InfraBox é fornecido de montagem com:

- cabo de 1 metro.

O comprimento de 1 metro corresponde à configuração padrão fornecida com o equipamento.

Não alterar o comprimento do cabo do sensor sem orientação do suporte técnico.

Alterações no comprimento do cabo podem influenciar diretamente os resultados das medições devido à alteração da resistência elétrica do cabeamento.

Caso seja necessário:

- aumentar o comprimento;
- reduzir o comprimento;
- substituir o cabo;
- realizar emendas;
- modificar a instalação original do sensor;

consultar o suporte técnico antes da alteração.

Não fornecer por estimativa um comprimento máximo permitido para o cabo do DS18B20.

Quando perguntado sobre a distância máxima permitida, informar que o sensor é fornecido com cabo de 1 metro e que alterações de comprimento devem ser avaliadas pelo suporte técnico.