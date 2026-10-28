# Instalação – InfraBox TCC

Orientações para instalação física da versão TCC. Detalhes de cabos e ligações em CABEAMENTO.md; características elétricas em HARDWARE.md.

---

## Qualificação do instalador

A instalação deve ser feita por profissional com treinamento ou qualificação técnica adequada, com experiência em:

- infraestrutura de estações;
- alarmes por contato seco;
- telecomandos;
- instalações elétricas de baixa tensão relacionadas ao sistema;
- redes Ethernet, quando necessário.

Consultar esta documentação antes de instalar ou operar o equipamento.

---

## Condição do equipamento durante a instalação

Durante instalação, ligação de alarmes e sensores, intervenções internas e manutenção, o InfraBox e os circuitos externos ligados a ele (alimentação, medição AC e cargas dos relés) devem estar desenergizados. Não há procedimento documentado para intervenção com o painel energizado.

---

## Compatibilidade de alimentação

Antes de instalar, confirmar a versão do painel:

- **Versão TCC**: alimentação positiva nominal de **12 V** (fonte 12 V / 2 A com entrada 100–220 V AC, bateria e conversor XL4015). **Não ligar diretamente a -48 V.**
- **Versão de produção V2**: alimentação de -48 V. Procedimentos da V2 não se aplicam ao TCC e vice-versa.

Em estações alimentadas em -48 V, o painel TCC exige adaptação distinta (conversão -48 V → 12 V) ainda não dimensionada nem fornecida com o painel.

---

## Local de instalação

- Ambiente climatizado, temperatura ambiente recomendada pelo projeto entre **2 °C e 40 °C**.
- Local com acesso para instalação e manutenção, passagem adequada dos cabos, conexão à rede Ethernet e ao ponto de aterramento.

---

## Gabinete

- Gabinete informado no documento original: fabricante **SCHUHMACHER**, instalação em parede.
- Dimensões e desenhos de fixação estavam referenciados a um “Manual do Usuário” que não está nesta base. Sem esse documento, não informar dimensões nem furação. [pendente]
- Instalar o conjunto completo, sem retirar componentes internos para a fixação, e preservar a disposição interna.

---

## Furação para entrada de cabos

Antes de furar o gabinete para eletrodutos e cabos, verificar a posição dos componentes internos para não danificar placas, sensores, módulos ou cabeamento. Manter caminhos separados para comunicação e para energia AC e DC.

---

## Posicionamento em relação à rede

- Instalar o painel o mais próximo possível do switch, roteador ou ponto de rede.
- Critério do projeto: até **50 m** de cabo entre o InfraBox e o ponto de conexão Ethernet.
- O tipo/categoria do cabo Ethernet a utilizar não está especificado; ver CABEAMENTO.md.

---

## Aterramento

- Ligar o condutor de proteção do painel ao ponto comum ou à malha de aterramento da instalação **antes da energização**.
- O aterramento contribui para a segurança e para a redução de ruído nos sinais e na comunicação.
- O neutro não deve ser usado como terra.
- Não unir neutro, PE e GND eletrônico sem esquema que determine essa ligação.
- Procedimento de aterramento de blindagem de cabos: não documentado.

---

## Medição AC

- Conferir o tipo de rede antes de ligar os canais:
  - 220 V entre fases: canais A-B, B-C, C-A;
  - 380 V entre fases com neutro: canais A-N, B-N, C-N (≈ 220 V por canal).
- **Não aplicar 380 V diretamente aos canais.** Sem neutro disponível, não há ligação documentada para 380 V.
- Fusíveis de 250 mA no circuito de medição AC.
- Cabo e número de condutores: ver CABEAMENTO.md.

---

## Alarmes

- Ligar contatos secos às entradas D30–D35 conforme a identificação dos bornes.
- Não ligar potencial externo aos bornes sem conhecer topologia, polaridade e referência.
- Não ligar em paralelo um mesmo contato ao InfraBox e a entradas de outros equipamentos sem avaliação técnica.

---

## Ethernet

Conectar o cabo RJ45 entre o InfraBox e a infraestrutura de rede, evitando proximidade e compartilhamento de eletroduto com cabos de potência. A rede deve oferecer DHCP e saída para a Internet (ver REDE_COMUNICACAO.md).

---

## Verificações antes da energização

Com tudo desenergizado, verificar:

- fixação do gabinete e ausência de danos;
- condutor de proteção conectado;
- alimentação compatível com a versão TCC (12 V, nunca -48 V direto);
- polaridade das conexões DC;
- fusível DC de 1 A e fusíveis AC de 250 mA;
- ligação dos canais AC conforme a rede;
- conexões dos sensores, alarmes e relés;
- cabo Ethernet conectado;
- separação entre comunicação e energia;
- ausência de conexões soltas.

Não energizar enquanto houver dúvida sobre uma conexão.

---

## Sequência de energização

1. Confirmar a instalação do painel e o condutor de proteção.
2. Conferir as conexões elétricas, sensores, alarmes e Ethernet.
3. Confirmar os valores dos fusíveis, instalados com o circuito desenergizado.
4. Energizar por último a alimentação DC do painel, pelo meio de seccionamento previsto na instalação.

A base anterior indicava o fusível DC como a última conexão. A inserção de fusível não deve ser tratada como manobra segura sob carga por padrão. O meio de seccionamento da alimentação do painel (chave, disjuntor ou outro) não está documentado. [pendente]

---

## Após a energização

Verificar:

- inicialização do Mega e do display Nextion;
- funcionamento da tela local;
- leituras de temperatura, tensão DC e tensões AC coerentes com a instalação;
- estado dos alarmes;
- comunicação com a interface web (status online).

Se o comportamento diferir do esperado, não fazer modificações internas. Seguir o diagnóstico em REDE_COMUNICACAO.md ou contatar o desenvolvedor.

---

## Alterações durante a instalação

Não fazem parte dos procedimentos documentados: alterar circuitos, mudar a posição de componentes, incluir sensores, relés ou entradas, alterar a alimentação interna, alterar o firmware ou a programação do Nextion. Encaminhar ao desenvolvedor.
