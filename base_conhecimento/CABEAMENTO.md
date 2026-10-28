# Cabeamento – InfraBox TCC

Orientações de cabeamento da versão TCC. Usar junto com INSTALACAO.md e HARDWARE.md. Legenda de origem: ver CONHECIMENTO_INFRABOX.md.

Os tipos de cabo e seções indicados são as escolhas do projeto. Outros cabos exigem avaliação técnica considerando bornes, proteção e ligação real.

---

## Regras gerais

- Executar o cabeamento com o InfraBox e os circuitos externos desenergizados.
- Conferir a identificação de cabos e bornes antes de cada conexão.
- Evitar esforço mecânico sobre conectores, sensores e placas.
- Manter os cabos organizados e com acesso aos fusíveis e bornes.
- Manter comunicação e energia em caminhos separados.
- Não distinguir apenas pela cor: identificar neutro, terra de proteção (PE) e GND eletrônico pelo projeto. Não unir esses condutores sem esquema que determine a ligação.

---

## Separação entre comunicação e energia

O projeto adota caminhos separados para:

- Ethernet/dados;
- alimentação e medição AC;
- alimentação DC.

O cabo Ethernet não deve compartilhar a mesma tubulação com cabos de energia AC ou DC. Manter essa separação em manutenções futuras.

---

## Cabo Ethernet

- Conector: RJ45.
- Cabo: par trançado Ethernet. O tipo e a categoria do cabo adquirido não estão identificados. [pendente]
- A base anterior usava a expressão “UTP blindado”, que é contraditória: U/UTP é cabo **não blindado**. Cabos blindados têm designações como F/UTP, U/FTP ou S/FTP. Se o cabo instalado for blindado, a blindagem deve seguir o procedimento de aterramento da instalação; esse procedimento não está documentado no projeto. [pendente]
- Ligação: InfraBox ao switch, roteador ou ponto de rede previsto.
- **Distância adotada pelo projeto: até 50 m** entre o InfraBox e o ponto de conexão Ethernet, com o painel o mais próximo possível desse ponto. Trata-se de critério de instalação do projeto, não de limite do W5500 nem da norma Ethernet. [autor]

---

## Alimentação DC (12 V)

- Tensão nominal do painel: **12 V**.
- Cabo indicado pelo projeto: **PP 2 × 1 mm²**, cobre flexível. [autor]
- Seção máxima indicada: **1,5 mm²**. Esse máximo está ligado à capacidade dos bornes do projeto; a ficha técnica do borne não consta da base. Não é afirmação de que cabos maiores sejam incapazes de conduzir a corrente. [autor/pendente]
- Conferir a polaridade antes da energização.
- **A versão TCC não deve ser ligada diretamente a -48 V.** Não há conversor -48 V/12 V instalado; essa adaptação é distinta e ainda não foi dimensionada.

### Fusível DC

- Fusível de vidro de **1 A** na via positiva, entre a bateria e o conversor XL4015. [autor]
- Não substituir por fusível de corrente maior.
- Não usar a retirada ou inserção do fusível como manobra de energização sob carga. A ligação ou troca do fusível deve ser feita com o circuito desenergizado, seguindo a sequência de INSTALACAO.md.

---

## Condutor de proteção (PE)

- O painel deve ter condutor de proteção dedicado ligado ao ponto de aterramento previsto (ponto comum ou malha da instalação). [autor]
- A base anterior indicava usar no PE a mesma seção dos condutores de alimentação do painel. Essa é orientação do projeto original, não regra universal; a seção do condutor de proteção depende do projeto da instalação e das normas aplicáveis. [autor/pendente]
- O condutor de proteção é independente dos condutores de alimentação; não compartilhar conexão.
- O neutro não substitui o condutor de proteção.

---

## Medição AC

### Cabo

- Cabo indicado pelo projeto: **PP 1 mm²**, cobre flexível; a base anterior indicava **PP 3 × 1 mm²**. [autor]
- O número de condutores depende da ligação:

| Ligação | Condutores no trecho |
|---|---|
| Trifásica 220 V entre fases (A-B, B-C, C-A) | 3 (A, B, C) |
| Trifásica 380 V com neutro (A-N, B-N, C-N) | 4 (A, B, C, N) |
| Arranjo bifásico ensaiado (A-B, A-N, B-N) | 3 (A, B, N) |

- A seção de 1 mm² está vinculada aos bornes e à placa AC do projeto. Cabos de seção maior podem dificultar a acomodação e causar esforço mecânico nos bornes; não significa incapacidade elétrica de cabos maiores.

### Ligação dos canais

- Rede trifásica **220 V entre fases**: canal 1 A-B, canal 2 B-C, canal 3 C-A.
- Rede trifásica **380 V entre fases com neutro disponível**: canal 1 A-N, canal 2 B-N, canal 3 C-N (≈ 220 V por canal).
- **Não aplicar 380 V diretamente aos canais.** Se não houver neutro disponível, não há ligação documentada para 380 V.
- O limite de 250 V que constava da base é legado a verificar; não é limite validado da placa AC. Ver HARDWARE.md.

### Fusíveis AC

- Fusíveis de vidro de **250 mA** no circuito de medição AC. [autor]
- Não substituir por fusível de corrente maior.
- Os fusíveis protegem contra falhas; não limitam com precisão a corrente de medição nem protegem contra qualquer sobretensão.

---

## Entradas de alarme

| Alarme | Pino |
|---|---|
| Porta | D30 |
| Retificador | D31 |
| Ar-condicionado | D32 |
| Gerador | D33 |
| Inversor | D34 |
| Incêndio | D35 |

- Entradas previstas para **contato seco**, com INPUT_PULLUP, resistor série de 20 kΩ e Zener de referência 1N5230B. Ver HARDWARE.md.
- Não ligar potencial externo aos bornes de alarme sem conhecer topologia, polaridade e referência do circuito. Não há faixa de tensão externa validada.
- Não alterar a atribuição de pinos sem alteração de projeto documentada.

### Paralelismo de alarmes

Não ligar em paralelo um mesmo contato de alarme ao InfraBox e a entradas de outros equipamentos (transmissão, comutação, dados ou outro sistema de supervisão). Equipamentos diferentes podem ter tensões de circuito aberto e referências diferentes nas entradas de alarme, causando interferência entre sistemas. O compartilhamento de um contato deve ser avaliado tecnicamente caso a caso.

---

## Telecomandos (relés)

- Dois relés, contatos COM, NA (NO) e NF (NC).
- A capacidade de carga do conjunto (relé, trilhas, conectores) não está documentada; os valores nominais do relé SRD-05VDC-SL-C não representam capacidade certificada do módulo nem para cargas indutivas. [pendente]
- Quando a carga a comutar exigir capacidade não documentada, informar a falta do dado e encaminhar ao desenvolvedor; não estimar.

---

## Cabo do sensor de temperatura

- Sonda DS18B20 com cabo padrão de **1 m** na versão TCC.
- O DS18B20 transmite a temperatura de forma digital; o comprimento do cabo não altera a leitura por resistência do fio. Cabos mais longos, emendas ou trocas podem comprometer a comunicação 1-Wire (capacitância, pull-up, alimentação, ruído) e devem ser avaliados com o desenvolvedor.
- Não há comprimento máximo documentado para a versão TCC.

---

## Organização interna

- Evitar cabos tensionados e pressão sobre as PCBs, sensores e conectores.
- Manter acesso aos fusíveis e bornes.
- Não alterar a disposição dos componentes para acomodar cabos maiores.

---

## Verificação antes da energização

Conferir, com o painel desenergizado:

- polaridade da alimentação DC;
- seção dos cabos de alimentação e do condutor de proteção;
- conexão do condutor de proteção;
- fusível DC de 1 A e fusíveis AC de 250 mA;
- ligação dos canais AC conforme o tipo de rede e a tensão por canal;
- conexões dos alarmes e dos relés;
- conexão Ethernet;
- separação entre dados e energia;
- ausência de condutores soltos e de curtos-circuitos aparentes.

---

## Informações não documentadas

Não determinar por estimativa:

- capacidade de corrente e tensão dos contatos dos relés no conjunto montado;
- faixa de tensão externa admissível nas entradas de alarme;
- limite de tensão validado da placa AC;
- comprimento máximo do cabo do DS18B20;
- tipo/categoria e blindagem do cabo Ethernet;
- características de cabos para expansões.

Informar qual dado falta e encaminhar ao desenvolvedor quando necessário.
