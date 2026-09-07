from datetime import datetime, timezone

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

ultimo_dado_mega = None
ultima_atualizacao_mega = None


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


if __name__ == "__main__":
    app.run(debug=True)