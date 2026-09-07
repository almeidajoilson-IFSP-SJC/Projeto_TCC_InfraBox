const MAX_PONTOS = 60;
let consultaEmAndamento = false;

const labelsHistorico = [];

const historicoTemperatura = [];
const historicoDC = [];

const historicoR = [];
const historicoS = [];
const historicoT = [];

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

    const mensagens = {
        1: "TEMP. ALTA",
        2: "BAT. DESC.",
        3: "FALHA AC",
        4: "PORTA",
        5: "RETIF.",
        6: "AR-COND.",
        7: "GERADOR",
        8: "INVERSOR",
        9: "INCÊNDIO"
    };

    const painel = document.getElementById("alarme-painel");
    const texto = document.getElementById("alarme-texto");

    const codigo = Number(dados.alarme);

    if (codigo > 0 && mensagens[codigo]) {
        texto.textContent = mensagens[codigo];
        painel.classList.remove("oculto");
    } else {
        texto.textContent = "";
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


async function comandarRele1() {
    const elemento = document.getElementById("rele1");

    const estadoAtual =
        elemento.textContent.trim().toLowerCase();

    const novoEstado =
        estadoAtual === "on" ? 0 : 1;

    try {
        const resposta = await fetch(
            "/api/rele1",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    estado: novoEstado
                })
            }
        );

        if (!resposta.ok) {
            throw new Error(
                `HTTP ${resposta.status}`
            );
        }

        console.log(
            "Comando Relé 1 enviado:",
            novoEstado
        );

    } catch (erro) {
        console.error(
            "Erro ao comandar Relé 1:",
            erro
        );
    }
}

async function atualizarDados() {

    if (consultaEmAndamento) {
        return;
    }

    consultaEmAndamento = true;
  
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

        const dados = await resposta.json();

        atualizarStatusConexao(
            Boolean(dados.online),
            dados.ultima_atualizacao
        );

        if (!dados.temperatura && dados.temperatura !== 0) {
            return;
        }

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
    } finally {

        consultaEmAndamento = false;
    }
}

const botaoRele1 = document.getElementById("botao-rele1");
const botaoRele2 = document.getElementById("botao-rele2");

botaoRele1.addEventListener("click", function () {
    comandarRele(1);
});
/*
botaoRele2.addEventListener("click", function () {
    comandarRele(2);
});
*/
async function cicloAtualizacao() {

    await atualizarDados();

    setTimeout(
        cicloAtualizacao,
        1000
    );
}

cicloAtualizacao();

function atualizarStatusConexao(online, ultimaAtualizacao) {
    const status = document.getElementById("status-conexao");
    const texto = document.getElementById("status-texto");
    const atualizacao = document.getElementById("ultima-atualizacao");

    status.classList.toggle("online", online);
    status.classList.toggle("offline", !online);

    texto.textContent = online ? "ONLINE" : "OFFLINE";

    if (ultimaAtualizacao) {
        const dataHora = new Date(ultimaAtualizacao);

        atualizacao.textContent =
            `Última atualização: ${dataHora.toLocaleString("pt-BR")}`;
    } else {
        atualizacao.textContent =
            "Última atualização: --";
    }
}