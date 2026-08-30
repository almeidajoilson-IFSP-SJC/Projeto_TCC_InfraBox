const MAX_PONTOS = 60;

const labelsHistorico = [];

const historicoTemperatura = [];
const historicoDC = [];

const historicoR = [];
const historicoS = [];
const historicoT = [];

let estadoAtualRele1 = 0;
let estadoAtualRele2 = 0;

const configuracaoBase = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,

    interaction: {
        intersect: false,
        mode: "index"
    },

    plugins: {
        legend: {
            labels: {
                color: "#dcecff"
            }
        }
    },

    scales: {
        x: {
            ticks: {
                color: "#7f9db7",
                maxTicksLimit: 6
            },

            grid: {
                color: "rgba(20, 174, 243, 0.10)"
            }
        },

        y: {
            ticks: {
                color: "#7f9db7"
            },

            grid: {
                color: "rgba(20, 174, 243, 0.15)"
            }
        }
    }
};


const graficoTemperatura = new Chart(
    document.getElementById("graficoTemperatura"),
    {
        type: "line",

        data: {
            labels: labelsHistorico,

            datasets: [{
                label: "Temperatura °C",
                data: historicoTemperatura,
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.25
            }]
        },

        options: configuracaoBase
    }
);


const graficoDC = new Chart(
    document.getElementById("graficoDC"),
    {
        type: "line",

        data: {
            labels: labelsHistorico,

            datasets: [{
                label: "Tensão DC",
                data: historicoDC,
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.25
            }]
        },

        options: configuracaoBase
    }
);


const graficoAC = new Chart(
    document.getElementById("graficoAC"),
    {
        type: "line",

        data: {
            labels: labelsHistorico,

            datasets: [
                {
                    label: "R",
                    data: historicoR,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.25
                },
                {
                    label: "S",
                    data: historicoS,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.25
                },
                {
                    label: "T",
                    data: historicoT,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.25
                }
            ]
        },

        options: configuracaoBase
    }
);


function definirIndicador(id, emAlarme) {
    document.getElementById(id).classList.toggle(
        "alarme",
        Boolean(emAlarme)
    );
}


function atualizarNivelBateria(tensao) {
    const minimo = 10.0;
    const maximo = 13.0;

    let percentual =
        ((tensao - minimo) / (maximo - minimo)) * 100;

    percentual = Math.max(
        0,
        Math.min(100, percentual)
    );

    document.getElementById(
        "nivel-bateria"
    ).style.height = `${percentual}%`;
}


function atualizarAlarmeGeral(dados) {
    const alarmes = [
        ["PORTA", dados.porta],
        ["RETIF.", dados.retificador],
        ["AR-COND.", dados.ar_condicionado],
        ["GERADOR", dados.gerador],
        ["INVERSOR", dados.inversor],
        ["INCÊNDIO", dados.incendio]
    ];

    const ativo = alarmes.find(
        ([, estado]) => Boolean(estado)
    );

    const painel =
        document.getElementById("alarme-painel");

    if (ativo) {
        document.getElementById(
            "alarme-texto"
        ).textContent = ativo[0];

        painel.classList.remove("oculto");

    } else {
        painel.classList.add("oculto");
    }
}


function adicionarHistorico(dados) {
    const agora = new Date();

    const horario = agora.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

    labelsHistorico.push(horario);

    historicoTemperatura.push(
        Number(dados.temperatura)
    );

    historicoDC.push(
        Number(dados.bateria)
    );

    historicoR.push(
        Number(dados.fase1)
    );

    historicoS.push(
        Number(dados.fase2)
    );

    historicoT.push(
        Number(dados.fase3)
    );


    if (labelsHistorico.length > MAX_PONTOS) {
        labelsHistorico.shift();

        historicoTemperatura.shift();
        historicoDC.shift();

        historicoR.shift();
        historicoS.shift();
        historicoT.shift();
    }


    graficoTemperatura.update();
    graficoDC.update();
    graficoAC.update();
}


async function comandarRele(numero, estadoAtual) {
    try {
        const novoEstado = !Boolean(estadoAtual);

        const resposta = await fetch(`/api/rele/${numero}`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                estado: novoEstado
            })
        });

        if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
        }

        await atualizarDados();

    } catch (erro) {
        console.error("Erro ao comandar relé:", erro);
    }
}

async function atualizarDados() {
    try {
        const resposta = await fetch(
            "/api/status",
            {
                cache: "no-store"
            }
        );

        if (!resposta.ok) {
            throw new Error(
                `HTTP ${resposta.status}`
            );
        }

        const dados =
            await resposta.json();
            let estadoAtualRele1 = 0;
            let estadoAtualRele2 = 0;
            


        adicionarHistorico(dados);


        document.getElementById(
            "temperatura"
        ).textContent =
            Number(
                dados.temperatura
            ).toFixed(1);


        document.getElementById(
            "bateria"
        ).textContent =
            Number(
                dados.bateria
            ).toFixed(1);


        document.getElementById(
            "fase1"
        ).textContent =
            Number(
                dados.fase1
            ).toFixed(1);


        const rele1 =
            document.getElementById("rele1");

        const rele2 =
            document.getElementById("rele2");


        rele1.textContent =
            dados.rele1
                ? "ON"
                : "OFF";

        rele2.textContent =
            dados.rele2
                ? "ON"
                : "OFF";


        rele1.parentElement.classList.toggle(
            "ativo",
            Boolean(dados.rele1)
        );

        rele2.parentElement.classList.toggle(
            "ativo",
            Boolean(dados.rele2)
        );


        definirIndicador(
            "porta",
            dados.porta
        );

        definirIndicador(
            "retificador",
            dados.retificador
        );

        definirIndicador(
            "ar_condicionado",
            dados.ar_condicionado
        );

        definirIndicador(
            "gerador",
            dados.gerador
        );

        definirIndicador(
            "inversor",
            dados.inversor
        );

        definirIndicador(
            "incendio",
            dados.incendio
        );


        atualizarNivelBateria(
            Number(dados.bateria)
        );

        atualizarAlarmeGeral(dados);

    } catch (erro) {
        console.error(
            "Erro ao obter dados:",
            erro
        );
    }
}

document
    .getElementById("botao-rele1")
    .addEventListener("click", () => {
        comandarRele(1, estadoAtualRele1);
    });


document
    .getElementById("botao-rele2")
    .addEventListener("click", () => {
        comandarRele(2, estadoAtualRele2);
    });

atualizarDados();

setInterval(
    atualizarDados,
    1000
);