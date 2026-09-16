# Gravação de Firmware - InfraBox TCC

Este documento descreve o procedimento validado para gravação do firmware no microcontrolador da versão TCC do InfraBox.

A gravação deve utilizar somente arquivo de firmware fornecido ou validado para o equipamento correspondente.

Não modificar o firmware durante este procedimento.

---

## Microcontrolador

O controlador principal utilizado no InfraBox TCC é:

- Mega 2560 Pro Mini;
- microcontrolador da família ATmega2560.

O procedimento de gravação deve utilizar a configuração correspondente ao ATmega2560.

Não selecionar outro microcontrolador por tentativa.

---

## Método recomendado

Para gravação de firmware sem necessidade de utilizar a IDE Arduino, o procedimento documentado utiliza:

- AVRDUDESS 2.17.

É recomendada a utilização da versão:

- PORTABLE.

A versão portable pode ser utilizada sem instalação convencional do programa no computador.

---

## Materiais necessários

Para realizar a gravação são necessários:

- computador com conexão USB;
- cabo USB tipo B compatível com o Mega 2560 Pro Mini;
- AVRDUDESS 2.17;
- arquivo de firmware no formato .HEX fornecido ou validado para o InfraBox.

Não utilizar um arquivo .HEX de origem desconhecida.

---

## Preparação do AVRDUDESS

Quando utilizada a versão portable:

1. obter o pacote do AVRDUDESS 2.17;
2. descompactar o arquivo ZIP em uma pasta específica;
3. abrir a pasta descompactada;
4. executar o AVRDUDESS.

Não é necessário instalar a IDE Arduino apenas para realizar a gravação de um arquivo .HEX já fornecido.

---

## Conexão do Mega 2560

Conectar o Mega 2560 Pro Mini ao computador utilizando o cabo USB adequado.

Após conectar a placa:

- verificar se o computador reconheceu a conexão;
- identificar a porta serial correspondente;
- selecionar essa porta no AVRDUDESS.

A porta serial pode variar de um computador para outro.

Não assumir um número de porta COM fixo.

---

## Configuração do microcontrolador

No AVRDUDESS, utilizar a configuração correspondente ao:

- ATmega2560.

Selecionar corretamente:

- microcontrolador;
- porta serial;
- parâmetros previstos no procedimento de gravação.

Após configurar a porta, utilizar a função de detecção disponível no AVRDUDESS.

Verificar no rodapé do programa se a placa foi detectada corretamente.

Não iniciar a escrita do firmware se a detecção não estiver correta.

---

## Arquivo de firmware

O firmware utilizado para gravação deve estar no formato:

- .HEX.

O arquivo deve ser fornecido ou validado para a versão correspondente do InfraBox.

No campo Flash do AVRDUDESS:

1. selecionar o arquivo .HEX correto;
2. conferir se o arquivo selecionado corresponde ao equipamento;
3. conferir as configurações antes da gravação.

Não substituir o arquivo fornecido por outro firmware apenas por possuir extensão .HEX.

---

## Gravação

Após confirmar:

- conexão USB;
- porta serial;
- microcontrolador correto;
- detecção da placa;
- arquivo .HEX correto;

iniciar o processo de escrita do firmware utilizando a função de gravação do AVRDUDESS.

Durante a gravação:

- não desconectar o cabo USB;
- não interromper o processo deliberadamente;
- aguardar a conclusão indicada pelo programa.

A documentação utiliza a função de escrita/inicialização do AVRDUDESS para realizar a gravação.

---

## Confirmação da gravação

Após iniciar a gravação, aguardar a indicação de conclusão apresentada pelo AVRDUDESS.

O procedimento documentado orienta aguardar a mensagem:

- PRONTO

no rodapé do programa.

Após uma gravação bem-sucedida, verificar o funcionamento do sistema.

---

## Verificação após a gravação

Após concluir a gravação, verificar se o InfraBox:

- inicializa corretamente;
- executa o firmware;
- comunica-se adequadamente com os componentes previstos;
- apresenta funcionamento compatível com a versão instalada.

Quando aplicável, verificar também:

- display Nextion;
- leitura dos sensores;
- estados dos alarmes;
- funcionamento dos relés;
- comunicação Ethernet.

Não alterar configurações de hardware ou firmware como tentativa de correção sem procedimento documentado.

---

## Porta COM não encontrada

Se a porta serial não aparecer no AVRDUDESS:

- verificar a conexão USB;
- verificar o cabo utilizado;
- verificar se o computador reconheceu o dispositivo;
- desconectar e reconectar o cabo quando necessário;
- verificar novamente as portas disponíveis.

Não selecionar aleatoriamente uma porta COM.

Se o equipamento continuar sem ser reconhecido e não houver procedimento adicional documentado, encaminhar a situação ao suporte técnico.

---

## Falha na detecção

Se o AVRDUDESS não detectar corretamente o ATmega2560:

- não iniciar a gravação;
- conferir a porta serial selecionada;
- conferir a conexão USB;
- conferir a configuração correspondente ao ATmega2560;
- repetir a detecção após as verificações.

Se a detecção continuar falhando, interromper o procedimento e consultar o suporte técnico.

Não alterar parâmetros desconhecidos por tentativa e erro.

---

## Firmware e configuração de rede

Arquivos ou procedimentos antigos podem conter referências a firmware configurado individualmente com:

- endereço IP fixo;
- gateway específico;
- parâmetros de rede definidos para cada equipamento.

Essas referências pertencem a versões anteriores da arquitetura.

Na versão atual do InfraBox TCC:

- a rede utiliza DHCP;
- não deve ser atribuído um IP fixo ao firmware apenas porque esse procedimento aparece em documentação antiga.

Para questões relacionadas à arquitetura atual de rede, utilizar o documento REDE_COMUNICACAO.md como referência.

---

## Alteração do firmware

A gravação de um arquivo .HEX fornecido para o equipamento é diferente da alteração do código-fonte do firmware.

Este procedimento documenta:

- carregamento;
- configuração da ferramenta;
- gravação do arquivo .HEX;
- verificação básica após a gravação.

Este procedimento não autoriza:

- editar o código-fonte;
- alterar pinos;
- alterar sensores;
- alterar quantidade de relés;
- alterar protocolos de comunicação;
- alterar temporizações;
- alterar a programação do Nextion;
- modificar parâmetros internos não documentados.

Solicitações desse tipo devem ser encaminhadas ao suporte técnico.

---

## Arquivo .HEX incorreto ou desconhecido

Se houver dúvida sobre qual arquivo .HEX utilizar:

- não realizar a gravação;
- não escolher o arquivo apenas pelo nome;
- não utilizar firmware de outro equipamento como teste.

Confirmar o arquivo correto com o suporte técnico antes de prosseguir.

---

## Informações não documentadas

Não fornecer por estimativa:

- valores de parâmetros do AVRDUDESS que não estejam documentados;
- programmer não especificado;
- baud rate não especificado;
- configurações de fuse bits;
- lock bits;
- parâmetros avançados do ATmega2560;
- comandos manuais do avrdude;
- procedimentos de recuperação de bootloader;
- alterações no firmware.

Quando a informação necessária não estiver disponível na documentação técnica atual, informar:

"Essa informação não está disponível na documentação técnica atual."

Quando necessário, encaminhar a situação ao suporte técnico.

## Tutorial complementar em vídeo

Existe um tutorial externo que pode ser utilizado como referência visual para auxiliar no uso do AVRDUDESS.

O tutorial deve ser tratado apenas como material complementar.

As configurações específicas do InfraBox devem seguir a documentação técnica oficial deste projeto.

Caso o tutorial apresente:

- parâmetros diferentes;
- outro microcontrolador;
- outro método de gravação;
- valores de baud rate;
- programmer diferente;
- fuse bits;
- lock bits;
- procedimentos de recuperação;

essas informações não devem ser automaticamente aplicadas ao InfraBox.

Em caso de divergência, prevalece a documentação técnica do InfraBox.

Tutorial de referência:

[(https://redinfor.migueldc.com/avrdudes-para-arduino/)],
[https://www.youtube.com/watch?v=2AGWIazNdmQ]
