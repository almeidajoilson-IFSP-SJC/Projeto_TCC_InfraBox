const MAX_PONTOS = 300;
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
    comandarRele1();
});

botaoRele2.addEventListener("click", function () {
    comandarRele2();
});

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
    }
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

async function comandarRele2() {
    const elemento = document.getElementById("rele2");

    const estadoAtual =
        elemento.textContent.trim().toLowerCase();

    const novoEstado =
        estadoAtual === "on" ? 0 : 1;

    try {
        const resposta = await fetch(
            "/api/rele2",
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
            "Comando Relé 2 enviado:",
            novoEstado
        );

    } catch (erro) {
        console.error(
            "Erro ao comandar Relé 2:",
            erro
        );
    }
}

// =========================================================
// ASSISTENTE TÉCNICO INFRABOX
// =========================================================

const suporteAbrir =
    document.getElementById("suporte-abrir");

const suporteFechar =
    document.getElementById("suporte-fechar");

const suporteJanela =
    document.getElementById("suporte-janela");

const suportePergunta =
    document.getElementById("suporte-pergunta");

const suporteEnviar =
    document.getElementById("suporte-enviar");

const suporteMensagens =
    document.getElementById("suporte-mensagens");


suporteAbrir.addEventListener("click", function () {
    suporteJanela.classList.remove("oculto");

    setTimeout(function () {
        suportePergunta.focus();
    }, 100);
});


suporteFechar.addEventListener("click", function () {
    suporteJanela.classList.add("oculto");
});


suporteEnviar.addEventListener("click", function () {
    enviarPerguntaSuporte();
});


suportePergunta.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        evento.preventDefault();
        enviarPerguntaSuporte();
    }
});


function adicionarMensagemSuporte(texto, tipo) {

    const mensagem =
        document.createElement("div");

    mensagem.className =
        `suporte-msg ${tipo}`;

    const balao =
        document.createElement("div");

    balao.className =
        "suporte-balao";

    balao.textContent = texto;

    mensagem.appendChild(balao);

    suporteMensagens.appendChild(mensagem);

    suporteMensagens.scrollTop =
        suporteMensagens.scrollHeight;

    return mensagem;
}


async function enviarPerguntaSuporte() {

    const pergunta =
        suportePergunta.value.trim();

    if (!pergunta) {
        return;
    }

    adicionarMensagemSuporte(
        pergunta,
        "usuario"
    );

    suportePergunta.value = "";
    suporteEnviar.disabled = true;

    const mensagemAguardando =
        adicionarMensagemSuporte(
            "Consultando documentação...",
            "assistente"
        );

    try {

        const resposta = await fetch(
            "/api/suporte",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    pergunta: pergunta
                })
            }
        );

        const dados =
            await resposta.json();

        mensagemAguardando.remove();

        if (!resposta.ok) {
            throw new Error(
                dados.erro ||
                `HTTP ${resposta.status}`
            );
        }

        adicionarMensagemSuporte(
            dados.resposta,
            "assistente"
        );

    } catch (erro) {

        mensagemAguardando.remove();

        console.error(
            "Erro no Assistente Técnico:",
            erro
        );

        adicionarMensagemSuporte(
            "Não foi possível consultar o assistente técnico neste momento.",
            "assistente"
        );

    } finally {

        suporteEnviar.disabled = false;
        suportePergunta.focus();
    }
}

// Janela de histórico
const botaoHistorico = document.getElementById("botao-historico");
const historicoModal = document.getElementById("historico-modal");
const historicoFechar = document.getElementById("historico-fechar");

botaoHistorico.addEventListener("click", function () {
    historicoModal.hidden = false;
});

historicoFechar.addEventListener("click", function () {
    historicoModal.hidden = true;
});

historicoModal.addEventListener("click", function (evento) {
    if (evento.target === historicoModal) {
        historicoModal.hidden = true;
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && !historicoModal.hidden) {
        historicoModal.hidden = true;
    }
});

// Consulta do histórico D1

let histPaginaAtual = 1;
let histTotalPaginas = 0;
let histConsultando = false;

const histInicio = document.getElementById("hist-inicio");
const histFim = document.getElementById("hist-fim");
const histGraficos = document.getElementById("hist-graficos");
const histTabelaContainer = document.getElementById("hist-tabela-container");
const histGraficosContainer = document.getElementById("hist-graficos-container");
const histPaginacaoContainer = document.getElementById("hist-paginacao");
let histCharts = [];
const histConsultar = document.getElementById("hist-consultar");
const histExportar = document.getElementById("hist-exportar");
const histMensagem = document.getElementById("hist-mensagem");
const histTabelaDados = document.getElementById("hist-tabela-dados");
const histAnterior = document.getElementById("hist-anterior");
const histProxima = document.getElementById("hist-proxima");
const histPagina = document.getElementById("hist-pagina");

function histDataUTC(valor) {
    if (!valor) return "";

    const data = new Date(valor.replace(" ", "T") + "Z");

    return Number.isNaN(data.getTime())
        ? valor
        : data.toLocaleString("pt-BR");
}

function histNumero(valor) {
    if (valor === null || valor === undefined) return "--";
    return Number(valor).toFixed(2);
}

function histEstado(valor) {
    return Number(valor) === 1 ? "ON" : "OFF";
}

function histCodigoAlarme(codigo) {
    const alarmes = {
        0: "Normal",
        1: "Temp. alta",
        2: "Bat. baixa",
        3: "Falha AC",
        4: "Porta",
        5: "Retificador",
        6: "Ar-cond.",
        7: "Gerador",
        8: "Inversor",
        9: "Incêndio"
    };

    return alarmes[Number(codigo)] ?? `Código ${codigo}`;
}

function histAtualizarPaginacao() {
    histPagina.textContent =
        `Página ${histPaginaAtual} de ${histTotalPaginas}`;

    histAnterior.disabled =
        histConsultando || histPaginaAtual <= 1;

    histProxima.disabled =
        histConsultando || histPaginaAtual >= histTotalPaginas;
}

function histRenderizarTabela(registros) {
    histTabelaDados.replaceChildren();

    for (const registro of registros) {
        const linha = document.createElement("tr");

        const valores = [
            histDataUTC(registro.data_hora),
            histNumero(registro.temperatura),
            histNumero(registro.bateria),
            histNumero(registro.fase1),
            histNumero(registro.fase2),
            histNumero(registro.fase3),
            histEstado(registro.porta),
            histEstado(registro.retificador),
            histEstado(registro.ar_condicionado),
            histEstado(registro.gerador),
            histEstado(registro.inversor),
            histEstado(registro.incendio),
            histEstado(registro.rele1),
            histEstado(registro.rele2),
            histCodigoAlarme(registro.alarme)
        ];

        valores.forEach((valor, indice) => {
            const celula = document.createElement("td");
            celula.textContent = valor;

            if (indice === valores.length - 1 && Number(registro.alarme) !== 0) {
                celula.classList.add("hist-alarme-ativo");
            }

            linha.appendChild(celula);
        });

        histTabelaDados.appendChild(linha);
    }
}

function histParametros() {
    const parametros = new URLSearchParams();
    if (histInicio.value) {
        parametros.set("inicio", new Date(histInicio.value).toISOString().slice(0, 19).replace("T", " "));
    }
    if (histFim.value) {
        parametros.set("fim", new Date(histFim.value).toISOString().slice(0, 19).replace("T", " "));
    }
    return parametros;
}

function histAlternarVisualizacao(graficos) {
    histTabelaContainer.hidden = graficos;
    histPaginacaoContainer.hidden = graficos;
    histGraficosContainer.hidden = !graficos;
}

function histDestruirGraficos() {
    histCharts.forEach(grafico => grafico.destroy());
    histCharts = [];
}

function histDesenharGraficos(registros) {
    histDestruirGraficos();
    const ordem = [...registros].reverse();
    const labels = ordem.map(r => histDataUTC(r.data_hora));
    const opcoes = {
        responsive: true, maintainAspectRatio: false, animation: false,
        interaction: { intersect: false, mode: "index" },
        plugins: { legend: { labels: { color: "#dcecff" } } },
        scales: {
            x: { ticks: { color: "#a9c8df", maxTicksLimit: 7, maxRotation: 0 }, grid: { color: "rgba(20,174,243,.12)" } },
            y: { ticks: { color: "#a9c8df" }, grid: { color: "rgba(20,174,243,.15)" } }
        }
    };
    const series = [
        ["hist-grafico-temperatura", [{ label: "Temperatura °C", campo: "temperatura", cor: "#14aef3" }]],
        ["hist-grafico-dc", [{ label: "Tensão DC", campo: "bateria", cor: "#32d340" }]],
        ["hist-grafico-ac", [
            { label: "R", campo: "fase1", cor: "#14aef3" },
            { label: "S", campo: "fase2", cor: "#e65c90" },
            { label: "T", campo: "fase3", cor: "#f0a33c" }
        ]]
    ];
    for (const [id, campos] of series) {
        histCharts.push(new Chart(document.getElementById(id), {
            type: "line",
            data: {
                labels,
                datasets: campos.map(s => ({
                    label: s.label,
                    data: ordem.map(r => r[s.campo] == null ? null : Number(r[s.campo])),
                    borderColor: s.cor,
                    backgroundColor: s.cor,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.15,
                    spanGaps: false
                }))
            },
            options: structuredClone(opcoes)
        }));
    }
}

async function histBuscar(pagina = 1) {
    if (histConsultando) return;
    if (histInicio.value && histFim.value && histInicio.value > histFim.value) {
        histMensagem.textContent = "A data inicial não pode ser posterior à final.";
        return;
    }
    const modoGraficos = histGraficos.checked;
    histConsultando = true;
    histConsultar.disabled = true;
    histAtualizarPaginacao();
    histMensagem.textContent = "Consultando histórico...";
    const parametros = histParametros();
    try {
        if (modoGraficos) {
            const registros = [];
            const maxRegistros = 10000;
            let total = 0;
            let numeroPagina = 1;
            do {
                parametros.set("limite", "500");
                parametros.set("pagina", String(numeroPagina));
                const resposta = await fetch(`/api/historico?${parametros}`, { cache: "no-store" });
                const dados = await resposta.json();
                if (!resposta.ok || !dados.ok) throw new Error(dados.erro || `HTTP ${resposta.status}`);
                total = Number(dados.total) || 0;
                registros.push(...dados.dados);
                numeroPagina++;
                if (!dados.dados.length) break;
            } while (registros.length < Math.min(total, maxRegistros));
            histAlternarVisualizacao(true);
            histDesenharGraficos(registros);
            histMensagem.textContent = total > registros.length
                ? `Gráficos com ${registros.length} dos ${total} registros (limite de ${maxRegistros}; refine o período para visualizar todos).`
                : `${registros.length} registros exibidos nos gráficos históricos.`;
        } else {
            parametros.set("limite", "20");
            parametros.set("pagina", String(pagina));
            const resposta = await fetch(`/api/historico?${parametros}`, { cache: "no-store" });
            const dados = await resposta.json();
            if (!resposta.ok || !dados.ok) throw new Error(dados.erro || `HTTP ${resposta.status}`);
            histPaginaAtual = dados.pagina;
            histTotalPaginas = dados.paginas;
            histRenderizarTabela(dados.dados);
            histAlternarVisualizacao(false);
            histMensagem.textContent = `${dados.total} registros encontrados. Exibindo ${dados.dados.length} nesta página.`;
        }
    } catch (erro) {
        console.error("Erro ao consultar histórico:", erro);
        histMensagem.textContent = "Não foi possível consultar o histórico.";
        if (modoGraficos) histDestruirGraficos();
        else {
            histTabelaDados.replaceChildren();
            histPaginaAtual = 1;
            histTotalPaginas = 0;
        }
    } finally {
        histConsultando = false;
        histConsultar.disabled = false;
        histAtualizarPaginacao();
    }
}

histConsultar.addEventListener("click", () => histBuscar(1));

histAnterior.addEventListener("click", () => {
    if (histPaginaAtual > 1) {
        histBuscar(histPaginaAtual - 1);
    }
});

histProxima.addEventListener("click", () => {
    if (histPaginaAtual < histTotalPaginas) {
        histBuscar(histPaginaAtual + 1);
    }
});

histAtualizarPaginacao();

// Exportação CSV de todos os registros do período selecionado.
async function histExportarCSV() {
    if (histConsultando) return;
    if (histInicio.value && histFim.value && histInicio.value > histFim.value) {
        histMensagem.textContent = "A data inicial não pode ser posterior à final.";
        return;
    }

    histConsultando = true;
    histConsultar.disabled = true;
    histExportar.disabled = true;
    histAtualizarPaginacao();

    const parametros = histParametros();
    const registros = [];
    const limiteMaximo = 50000;

    try {
        let pagina = 1;
        let total = 0;
        do {
            parametros.set("pagina", String(pagina));
            parametros.set("limite", "500");
            histMensagem.textContent = `Preparando CSV... ${registros.length} registros coletados.`;
            const resposta = await fetch(`/api/historico?${parametros}`, { cache: "no-store" });
            if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
            const dados = await resposta.json();
            if (!dados.ok || !Array.isArray(dados.dados)) {
                throw new Error(dados.erro || "Resposta inválida do histórico");
            }
            total = Number(dados.total) || 0;
            if (total > limiteMaximo) {
                throw new Error(`A consulta possui ${total} registros. Restrinja o período para até ${limiteMaximo}.`);
            }
            if (dados.dados.length === 0 && registros.length < total) {
                throw new Error("Consulta interrompida antes de receber todos os registros.");
            }
            registros.push(...dados.dados);
            pagina++;
        } while (registros.length < total);

        if (!registros.length) {
            histMensagem.textContent = "Nenhum registro encontrado para exportar.";
            return;
        }

        const colunas = [
            ["Data/hora", r => histDataUTC(r.data_hora)],
            ["Temperatura (°C)", r => histNumero(r.temperatura)],
            ["Tensão DC (V)", r => histNumero(r.bateria)],
            ["Fase R (V)", r => histNumero(r.fase1)],
            ["Fase S (V)", r => histNumero(r.fase2)],
            ["Fase T (V)", r => histNumero(r.fase3)],
            ["Porta", r => histEstado(r.porta)],
            ["Retificador", r => histEstado(r.retificador)],
            ["Ar-condicionado", r => histEstado(r.ar_condicionado)],
            ["Gerador", r => histEstado(r.gerador)],
            ["Inversor", r => histEstado(r.inversor)],
            ["Incêndio", r => histEstado(r.incendio)],
            ["Relé 1", r => histEstado(r.rele1)],
            ["Relé 2", r => histEstado(r.rele2)],
            ["Alarme", r => histCodigoAlarme(r.alarme)]
        ];

        function campoCSV(valor) {
            let texto = String(valor ?? "").replace(/\r?\n/g, " ");
            if (/^[=+@\-\t]/.test(texto)) texto = "'" + texto;
            return '"' + texto.replace(/"/g, '""') + '"';
        }

        const linhas = [colunas.map(c => campoCSV(c[0])).join(";")];
        for (const registro of registros.reverse()) {
            linhas.push(colunas.map(([, ler], indice) => {
                let valor = ler(registro);
                if (indice >= 1 && indice <= 5 && valor !== "--") {
                    valor = valor.replace(".", ",");
                }
                return campoCSV(valor);
            }).join(";"));
        }

        const blob = new Blob(["\uFEFF", linhas.join("\r\n")], {
            type: "text/csv;charset=utf-8;"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const agora = new Date();
        const dataArquivo = [agora.getFullYear(), String(agora.getMonth() + 1).padStart(2, "0"), String(agora.getDate()).padStart(2, "0")].join("");
        link.href = url;
        link.download = `InfraBox_Historico_${dataArquivo}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        histMensagem.textContent = `CSV gerado com ${registros.length} registros do período selecionado.`;
    } catch (erro) {
        console.error("Erro ao exportar CSV:", erro);
        histMensagem.textContent = `Não foi possível exportar o CSV: ${erro.message}`;
    } finally {
        histConsultando = false;
        histConsultar.disabled = false;
        histExportar.disabled = false;
        histAtualizarPaginacao();
    }
}

histExportar.addEventListener("click", histExportarCSV);
