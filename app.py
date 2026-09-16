from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, jsonify, render_template, request
from google import genai

app = Flask(__name__)

client = genai.Client()

PASTA_BASE = Path(__file__).parent / "base_conhecimento"


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

ultimo_dado_mega = None
ultima_atualizacao_mega = None

comando_rele1 = 0
comando_rele2 = 0

id_comando_rele1 = 0
id_comando_rele2 = 0


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/mega/update", methods=["POST"])
def receber_dados_mega():
    global ultimo_dado_mega, ultima_atualizacao_mega

    dados = request.get_json(silent=True)

    if not dados:
        return jsonify({
            "erro": "Dados inválidos"
        }), 400

    ultimo_dado_mega = dados
    ultima_atualizacao_mega = datetime.now(timezone.utc)

    return jsonify({
        "ok": True
    })


@app.route("/api/mega/comando")
def comando_mega():
    return jsonify({
        "rele1": comando_rele1,
        "cmd_rele1": id_comando_rele1,
        "rele2": comando_rele2,
        "cmd_rele2": id_comando_rele2
    })


@app.route("/api/rele1", methods=["POST"])
def alterar_rele1():
    global comando_rele1, id_comando_rele1

    dados = request.get_json(silent=True)

    if not dados or "estado" not in dados:
        return jsonify({
            "erro": "Estado inválido"
        }), 400

    comando_rele1 = 1 if dados["estado"] else 0
    id_comando_rele1 += 1

    return jsonify({
        "ok": True,
        "rele1": comando_rele1,
        "cmd_rele1": id_comando_rele1
    })


@app.route("/api/rele2", methods=["POST"])
def alterar_rele2():
    global comando_rele2, id_comando_rele2

    dados = request.get_json(silent=True)

    if not dados or "estado" not in dados:
        return jsonify({
            "erro": "Estado inválido"
        }), 400

    comando_rele2 = 1 if dados["estado"] else 0
    id_comando_rele2 += 1

    return jsonify({
        "ok": True,
        "rele2": comando_rele2,
        "cmd_rele2": id_comando_rele2
    })

@app.route("/api/status")
def status():
    if ultimo_dado_mega is None:
        return jsonify({
            "online": False,
            "erro": "Nenhum dado recebido do Mega"
        })

    agora = datetime.now(timezone.utc)

    tempo_sem_atualizacao = (
        agora - ultima_atualizacao_mega
    ).total_seconds()

    dados = ultimo_dado_mega.copy()

    dados["online"] = tempo_sem_atualizacao <= 10

    dados["ultima_atualizacao"] = (
        ultima_atualizacao_mega.isoformat()
    )

    return jsonify(dados)


@app.route("/api/suporte", methods=["POST"])
def suporte():
    dados = request.get_json(silent=True)

    if not dados or not dados.get("pergunta", "").strip():
        return jsonify({
            "erro": "Pergunta inválida"
        }), 400

    pergunta = dados["pergunta"].strip()

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

        return jsonify({
            "ok": True,
            "resposta": resposta.output_text
        })

    except Exception as erro:
        print("Erro no suporte Gemini:", erro)

        return jsonify({
            "erro": "Não foi possível consultar o assistente técnico."
        }), 500

if __name__ == "__main__":
    app.run(debug=True)