# Instalação - InfraBox TCC

Este documento contém as orientações validadas para instalação física da versão TCC do InfraBox.

As orientações de segurança devem ser respeitadas durante toda a instalação.

---

## Qualificação do instalador

A instalação do InfraBox deve ser realizada por profissional com treinamento ou qualificação técnica adequada.

O técnico deve possuir experiência com:

- instalações de infraestrutura;
- alarmes por contato seco;
- telecomandos;
- instalações elétricas relacionadas ao sistema;
- redes Ethernet quando necessário para a instalação.

Antes de instalar ou operar o equipamento, a documentação técnica deve ser consultada.

---

## Condição do equipamento durante a instalação

Durante:

- instalação;
- ligação dos alarmes;
- conexão dos sensores;
- intervenções internas;
- manutenção;

o InfraBox deve permanecer desligado.

Não realizar conexões internas com o painel energizado.

---

## Local de instalação

O InfraBox deve ser instalado em ambiente climatizado.

Faixa de temperatura ambiente documentada:

- mínima: 2 °C;
- máxima: 40 °C.

O painel deve ser instalado em local que permita:

- acesso para instalação;
- acesso para manutenção;
- passagem adequada dos cabos;
- conexão com a infraestrutura Ethernet;
- aterramento adequado.

---

## Instalação do gabinete

O gabinete utilizado no InfraBox TCC é fabricado pela SCHUHMACHER.

O gabinete é destinado à instalação em parede.

As dimensões e os desenhos de fixação estão disponíveis no Manual do Usuário.

Durante a instalação:

- instalar o conjunto completo;
- não retirar componentes internos para realizar a fixação;
- utilizar os elementos de fixação previstos;
- preservar a disposição interna dos componentes.

Não modificar a posição dos componentes internos sem procedimento técnico documentado.

---

## Furação para entrada dos cabos

Quando for necessário realizar furos para:

- eletrodutos;
- alimentação;
- comunicação;
- sensores;
- demais cabos previstos;

verificar previamente a posição dos componentes internos.

A furação deve ser realizada de maneira que não danifique:

- placa eletrônica;
- sensores;
- módulos;
- cabeamento interno;
- demais componentes do painel.

Os caminhos destinados aos cabos de comunicação devem permanecer separados dos caminhos destinados aos cabos de energia AC e DC.

---

## Posicionamento em relação à rede Ethernet

O painel deve ser instalado o mais próximo possível do:

- switch;
- roteador;
- ponto de conexão da rede Ethernet.

A distância documentada entre o InfraBox e o ponto de conexão Ethernet é de no máximo:

- 50 metros.

A conexão deve utilizar cabo Ethernet/UTP blindado.

---

## Separação entre comunicação e energia

O cabeamento Ethernet não deve compartilhar a mesma tubulação utilizada pelos cabos de energia.

Devem ser utilizados caminhos separados para:

- comunicação Ethernet;
- alimentação AC;
- alimentação DC.

Nunca utilizar a mesma tubulação para cabos de comunicação Ethernet e cabos de energia AC/DC.

Essa separação deve ser mantida para reduzir interferências na comunicação e preservar a instalação adequada do sistema.

---

## Aterramento

O aterramento deve ser realizado antes da energização do painel.

O InfraBox deve ser conectado ao ponto comum ou à malha única de aterramento da instalação.

O aterramento é necessário para:

- segurança operacional;
- redução de ruídos;
- redução de problemas de comunicação;
- redução de flutuações dos sinais.

Nunca utilizar o neutro da instalação elétrica como aterramento.

Quando houver cabo blindado, a blindagem deve seguir o procedimento de aterramento previsto na documentação.

---

## Alimentação da versão TCC

A alimentação nominal do InfraBox TCC é:

- 12 Vcc.

O estágio conversor utilizado na versão TCC admite entrada entre:

- 9 e 16 Vcc.

A versão TCC não deve receber diretamente alimentação de -48 Vcc.

Em uma instalação de telecomunicações baseada em -48 Vcc, deve ser utilizado conversor DC/DC isolado adequado, com entrada compatível com o sistema -48 Vcc e saída apropriada de 12 Vcc para o painel TCC.

---

## Proteção da alimentação

A instalação documentada utiliza proteção por fusíveis.

Valores máximos documentados:

- alimentação DC: fusível de no máximo 1 A;
- circuito de monitoramento AC: fusível de no máximo 250 mA.

Não aumentar os valores dos fusíveis sem procedimento técnico documentado.

---

## Instalação da medição AC

O circuito de monitoramento AC possui tensão máxima documentada de:

- 250 Vca.

Não aplicar 380 Vca diretamente às entradas dos sensores de tensão AC.

Em instalações onde existam 380 Vca entre fases, a documentação orienta realizar a medição utilizando:

- fase e neutro,

de forma que a tensão aplicada ao sensor permaneça dentro da faixa permitida.

Não ultrapassar 250 Vca na entrada do sensor.

---

## Cabeamento da medição AC

Para as conexões dos sensores de tensão AC, a documentação recomenda:

- cabo PP;
- 3 x 1 mm²;
- cobre flexível.

Cabos de seção superior podem dificultar a instalação e podem comprometer fisicamente as conexões internas.

Os detalhes de cabeamento devem ser consultados também no documento específico de cabeamento.

---

## Cabeamento da alimentação DC

Para a alimentação DC:

- seção máxima documentada: 1,5 mm²;
- recomendação: cabo PP 2 x 1 mm²;
- condutor de cobre flexível.

Não utilizar cabos de seção superior à permitida sem procedimento técnico documentado.

---

## Instalação dos alarmes

Os alarmes de infraestrutura são conectados às entradas digitais previstas no InfraBox.

Não executar paralelismo de um mesmo contato de alarme com entradas de outros equipamentos de:

- transmissão;
- comutação;
- dados;
- outros sistemas de monitoramento,

quando esse paralelismo não estiver previsto no projeto.

A documentação informa que equipamentos diferentes podem trabalhar com tensões de circuito aberto diferentes, provocando interferência entre os sistemas.

Quando houver necessidade de compartilhar um mesmo sinal de alarme entre equipamentos, a solução deve ser avaliada pelo suporte técnico.

---

## Conexão Ethernet

A comunicação Ethernet utiliza:

- conector RJ45;
- cabo Ethernet/UTP blindado.

O cabo deve ser conectado entre o InfraBox e a infraestrutura de rede disponível.

A instalação deve evitar proximidade e compartilhamento de infraestrutura com cabos de potência.

---

## Verificações antes da energização

Antes de energizar o InfraBox, verificar:

- fixação correta do gabinete;
- ausência de danos durante a instalação;
- aterramento conectado;
- alimentação compatível com a versão TCC;
- polaridade das conexões DC;
- fusíveis corretos;
- conexões dos sensores;
- conexões dos alarmes;
- conexão Ethernet;
- separação entre comunicação e energia;
- ausência de conexões soltas.

Não energizar o painel enquanto houver dúvida sobre uma conexão elétrica.

---

## Sequência de energização

Após concluir e verificar todas as conexões:

1. confirmar que o painel está corretamente instalado;
2. confirmar o aterramento;
3. conferir as conexões elétricas;
4. conferir os sensores e alarmes;
5. conferir a conexão Ethernet;
6. confirmar os valores dos fusíveis;
7. realizar a conexão final da alimentação DC.

O fusível da alimentação DC deve ser a última conexão realizada durante a inicialização do sistema.

---

## Após a energização

Após energizar o painel, verificar:

- inicialização do Mega 2560;
- inicialização do display Nextion;
- funcionamento da interface local;
- indicação das grandezas monitoradas;
- estado dos alarmes;
- comunicação Ethernet.

Caso o equipamento apresente comportamento diferente do documentado, não realizar modificações internas não previstas.

Utilizar o procedimento de diagnóstico documentado ou encaminhar a situação ao suporte técnico.

---

## Alterações durante a instalação

Não realizar, sem documentação específica:

- alteração do circuito eletrônico;
- mudança da posição dos componentes;
- inclusão de sensores;
- inclusão de relés;
- expansão de entradas;
- alteração da alimentação interna;
- alteração do firmware;
- alteração da programação do Nextion.

Essas situações devem ser encaminhadas ao fornecedor ou suporte técnico.