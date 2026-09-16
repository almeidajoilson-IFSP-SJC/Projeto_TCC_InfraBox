# Rede e Comunicação - InfraBox TCC

Este documento descreve a arquitetura de rede e comunicação validada da versão TCC do InfraBox.

As informações deste documento representam a arquitetura atual do projeto.

Configurações antigas de rede presentes em versões anteriores da documentação não devem ser utilizadas como referência para a versão atual.

---

## Visão geral da comunicação

A versão TCC do InfraBox utiliza comunicação Ethernet para integração entre o painel físico e o sistema web.

Os principais elementos da arquitetura são:

- Mega 2560 Pro Mini;
- módulo Ethernet W5500;
- rede Ethernet local;
- roteador com acesso à Internet;
- Cloudflare Worker;
- aplicação web hospedada no Render.

Fluxo principal:

InfraBox / Mega 2560
→ W5500
→ rede Ethernet
→ roteador / Internet
→ Cloudflare Worker
→ Render
→ interface web InfraBox.

---

## Módulo Ethernet

O InfraBox utiliza o módulo:

- W5500.

O W5500 realiza a interface Ethernet entre o Mega 2560 e a rede.

A alimentação documentada do módulo é:

- 3,3 Vcc.

Essa alimentação é fornecida pelo microcontrolador na configuração atual do projeto.

---

## Obtenção do endereço IP

A versão atual do InfraBox utiliza:

- DHCP.

O endereço IP local do painel é obtido automaticamente a partir da infraestrutura de rede disponível.

Portanto, não considerar um endereço IP local específico como configuração permanente do InfraBox.

Endereços IP fixos presentes em versões anteriores do projeto ou em documentação antiga não representam a configuração atual.

---

## Requisitos da rede local

Para funcionamento da comunicação remota, o InfraBox deve possuir:

- conexão Ethernet;
- acesso a uma rede com DHCP;
- acesso à Internet;
- rota de saída disponível para a comunicação com o serviço Cloudflare utilizado pelo projeto.

O InfraBox inicia as comunicações necessárias com os serviços externos.

---

## Comunicação iniciada pelo InfraBox

A arquitetura atual utiliza comunicação iniciada pelo próprio Mega 2560.

Isso significa que o InfraBox realiza conexões de saída para consultar comandos e enviar informações.

Não é necessário estabelecer uma conexão externa diretamente da Internet para o endereço IP local do Mega.

---

## Redirecionamento de portas

A arquitetura atual não exige:

- port forwarding;
- abertura de porta de entrada no roteador para o Mega;
- endereço IP público fixo para o InfraBox.

O painel inicia as comunicações necessárias a partir da rede local.

Não orientar o usuário a abrir portas no roteador como procedimento normal de instalação do InfraBox.

---

## Cloudflare Worker

O Cloudflare Worker utilizado pelo projeto funciona como ponte de comunicação entre o Mega 2560 e o serviço hospedado no Render.

Na arquitetura atual:

Mega 2560
→ HTTP
→ Cloudflare Worker
→ HTTPS
→ Render.

O Cloudflare Worker não é o sistema principal de supervisão.

Ele funciona como intermediário de comunicação.

---

## Motivo da ponte HTTP/HTTPS

O Mega 2560 e o W5500 utilizados no projeto não realizam diretamente a comunicação HTTPS moderna utilizada pela aplicação hospedada no Render.

Por esse motivo, a arquitetura utiliza o Cloudflare Worker como ponte.

O Mega se comunica com o Worker utilizando HTTP.

O Worker realiza a comunicação HTTPS necessária com o Render.

Não orientar a substituição dessa arquitetura por conexão HTTPS direta do Mega sem uma alteração documentada do projeto.

---

## Porta utilizada pelo Mega

Na arquitetura atual, a comunicação HTTP entre o Mega e o Cloudflare Worker utiliza:

- porta 80.

Essa informação refere-se à conexão de saída iniciada pelo Mega.

Não significa que a porta 80 do roteador da instalação deva ser aberta ou redirecionada para o InfraBox.

---

## Render

O Render hospeda a aplicação web do InfraBox.

Na arquitetura atual, o Render é responsável por:

- aplicação web;
- interface de supervisão;
- disponibilização das informações recebidas do InfraBox;
- recebimento dos estados enviados pelo Mega;
- gerenciamento dos comandos remotos utilizados pelo sistema.

O Cloudflare Worker não substitui a aplicação hospedada no Render.

---

## Envio das informações do painel

O Mega envia periodicamente as informações do InfraBox para o sistema remoto.

Na configuração atual, o envio periódico ocorre aproximadamente a cada:

- 5 segundos.

Entre as informações enviadas podem estar:

- temperatura;
- tensão DC;
- tensões AC;
- estados dos alarmes;
- estados dos relés;
- demais informações previstas pelo firmware atual.

Alterações locais importantes, como mudança do estado dos relés, podem provocar atualização antecipada sem aguardar o próximo ciclo periódico.

---

## Consulta de comandos

O Mega consulta periodicamente o sistema para verificar a existência de novos comandos.

Na configuração atual, essa consulta ocorre aproximadamente a cada:

- 1 segundo.

Os comandos remotos são tratados pelo firmware do Mega.

O Mega permanece responsável pelo estado efetivo das saídas físicas.

---

## Controle dos relés

Os dois relés podem receber comandos provenientes de:

- interface local Nextion;
- interface web.

O Mega 2560 mantém o estado efetivo dos relés.

A comunicação remota não substitui o controle local realizado pelo microcontrolador.

Quando um novo comando remoto válido é identificado, o Mega executa a alteração correspondente e sincroniza o estado do sistema.

---

## Identificação de novos comandos

A arquitetura atual utiliza identificação de eventos de comando para evitar que um estado remoto antigo seja aplicado continuamente sobre o estado físico do equipamento.

Um comando remoto somente deve ser tratado como novo quando sua identificação indicar um novo evento.

Isso permite que alterações realizadas localmente pelo Nextion não sejam continuamente sobrescritas por um comando remoto antigo.

A lógica específica pertence ao firmware e não deve ser modificada sem procedimento documentado.

---

## Interface web

A interface web consulta periodicamente o estado disponibilizado pela aplicação.

Na configuração atual, a atualização visual ocorre aproximadamente a cada:

- 1 segundo.

A frequência de atualização da interface web não significa necessariamente que todos os sensores físicos tenham realizado uma nova leitura nesse mesmo instante.

---

## Funcionamento local

As funções locais essenciais do InfraBox não dependem da disponibilidade da Internet.

O painel mantém localmente:

- leitura dos sensores;
- processamento dos alarmes;
- interface Nextion;
- controle dos relés;
- funções previstas no firmware local.

Uma falha de comunicação com a nuvem não deve ser interpretada automaticamente como falha completa do painel.

O funcionamento local e a comunicação remota devem ser analisados separadamente durante um diagnóstico.

---

## Falha de Internet

Na ausência de acesso à Internet:

- o painel continua executando suas funções locais;
- o Nextion permanece como interface local;
- o Mega continua processando sensores e alarmes;
- os relés permanecem sob controle do Mega.

As funções que dependem da comunicação com os serviços remotos podem ficar indisponíveis enquanto a conexão externa estiver ausente.

---

## Falha da aplicação remota

Caso o serviço remoto esteja temporariamente indisponível, o funcionamento local do InfraBox deve ser analisado independentemente.

Não orientar reinicialização, alteração de firmware ou modificação da rede interna apenas porque a interface web remota está temporariamente indisponível.

O diagnóstico deve primeiro identificar se a falha está:

- no painel;
- na rede local;
- no acesso à Internet;
- na comunicação com o Cloudflare;
- no serviço hospedado no Render.

---

## Endereço IP local

Como o InfraBox utiliza DHCP, o endereço IP local pode variar conforme a infraestrutura de rede.

Não informar um endereço IP específico como endereço padrão ou permanente da versão atual.

Quando for necessário identificar o endereço IP atribuído ao painel, utilizar os procedimentos de diagnóstico documentados.

---

## Configurações antigas

Informações antigas que indiquem:

- endereço IP fixo;
- configuração manual permanente de IP;
- comunicação direta com servidor antigo;
- necessidade de notebook funcionando como gateway;

não devem ser utilizadas como arquitetura atual do InfraBox TCC.

A arquitetura descrita neste documento deve prevalecer para questões de rede e comunicação da versão atual.

---

## Segurança da arquitetura

Não fornecer procedimentos não documentados para:

- abrir portas externas no roteador;
- criar redirecionamento de portas;
- expor diretamente o Mega à Internet;
- substituir o Cloudflare Worker;
- modificar protocolos de comunicação;
- alterar endpoints do sistema;
- alterar a lógica de comandos;
- alterar mecanismos de identificação dos comandos;
- modificar a infraestrutura do Render.

Alterações na arquitetura de comunicação devem ser encaminhadas ao suporte técnico.

---

## Diagnóstico básico de comunicação

Quando houver problema de comunicação remota, verificar separadamente:

1. se o InfraBox está energizado;
2. se o painel funciona localmente;
3. se o display Nextion está operando;
4. se o cabo Ethernet está conectado;
5. se existe conexão física com a rede;
6. se a rede disponibiliza DHCP;
7. se existe acesso à Internet;
8. se a comunicação com os serviços remotos está disponível.

Não concluir que o Mega ou o W5500 apresentam defeito apenas porque a interface web está offline.

O diagnóstico deve identificar em qual etapa da comunicação ocorre a falha.

---

## Informações não documentadas

Não fornecer por estimativa:

- endereço IP atual do painel;
- endereço IP que será atribuído pelo DHCP;
- configurações internas do roteador;
- usuário ou senha de equipamentos de rede;
- portas adicionais não documentadas;
- parâmetros internos do Cloudflare;
- parâmetros internos do Render;
- procedimentos para modificar a arquitetura de comunicação.

Quando uma informação necessária não estiver disponível na documentação técnica atual, informar:

"Essa informação não está disponível na documentação técnica atual."

Quando necessário, encaminhar a situação ao suporte técnico.