from pathlib import Path
from google import genai

client = genai.Client()

PASTA_BASE = Path("base_conhecimento")


def carregar_base_conhecimento():
    conteudo = []

    for arquivo in sorted(PASTA_BASE.glob("*.md")):
        texto = arquivo.read_text(encoding="utf-8")

        conteudo.append(
            f"""
===== DOCUMENTO: {arquivo.name} =====

{texto}
"""
        )

    return "\n".join(conteudo)


base_conhecimento = carregar_base_conhecimento()

while True:
    pergunta = input("\nPergunta: ").strip()

    if pergunta.lower() in ["sair", "exit", "quit"]:
        print("Assistente encerrado.")
        break

    if not pergunta:
        continue

    prompt = f"""
# Documentação técnica disponível

{base_conhecimento}

# Pergunta do usuário

{pergunta}
"""

    try:
        resposta = client.interactions.create(
            model="gemini-3.6-flash",
            input=prompt
        )

        print("\nAssistente InfraBox:")
        print(resposta.output_text)

    except Exception as erro:
        print("\nErro ao consultar o Gemini:")
        print(erro)