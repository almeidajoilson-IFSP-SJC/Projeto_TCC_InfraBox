from flask import Flask, jsonify, render_template, request
from config import MODO_SIMULADO

app = Flask(__name__)


dados_simulados = {
    "temperatura": 24.8,
    "bateria": 12.0,
    "fase1": 218.0,
    "fase2": 230.0,
    "fase3": 110.0,
    "porta": 0,
    "retificador": 0,
    "ar_condicionado": 1,
    "gerador": 0,
    "inversor": 0,
    "incendio": 0,
    "rele1": 0,
    "rele2": 1
}


def obter_dados():
    if MODO_SIMULADO:
        return dados_simulados


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/status")
def status():
    return jsonify(obter_dados())


@app.route("/api/rele/<int:numero>", methods=["POST"])
def controlar_rele(numero):
    if numero not in [1, 2]:
        return jsonify({"erro": "Relé inválido"}), 400

    chave = f"rele{numero}"

    dados_simulados[chave] = 0 if dados_simulados[chave] else 1

    return jsonify({
        "rele": numero,
        "estado": dados_simulados[chave]
    })


if __name__ == "__main__":
    app.run(debug=True)