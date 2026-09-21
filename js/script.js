let grafico = null;

function calcularConsumo() {

    const energia = Number(document.getElementById("energia").value);
    const agua = Number(document.getElementById("agua").value);
    const transporte = Number(document.getElementById("transporte").value);

    // Verifica valores inválidos
    if (energia < 0 || agua < 0 || transporte < 0) {
        alert("Os valores não podem ser negativos.");
        return;
    }

    const total = energia + agua + transporte;

    if (total === 0) {
        alert("Informe pelo menos um valor de consumo.");
        return;
    }

    // Percentual de cada categoria
    const percentualEnergia = (energia / total) * 100;
    const percentualAgua = (agua / total) * 100;
    const percentualTransporte = (transporte / total) * 100;

    // Identifica o maior gasto
    const maiorGasto = Math.max(energia, agua, transporte);

    let recomendacao = "";

    if (energia === maiorGasto && agua === maiorGasto && transporte === maiorGasto) {

        recomendacao = `
            <h5>💡💧🚗 Atenção às três categorias</h5>
            <p>
                Seus gastos estão distribuídos igualmente entre energia,
                água e transporte. Procure aplicar práticas sustentáveis
                nas três áreas.
            </p>
        `;

    } else if (energia === maiorGasto && agua === maiorGasto) {

        recomendacao = `
            <h5>💡💧 Energia e água</h5>
            <p>
                Energia e água representam seus maiores gastos.
                Procure reduzir desperdícios e adotar hábitos de consumo
                mais conscientes nessas áreas.
            </p>
        `;

    } else if (energia === maiorGasto && transporte === maiorGasto) {

        recomendacao = `
            <h5>💡🚗 Energia e transporte</h5>
            <p>
                Energia e transporte representam seus maiores gastos.
                Avalie formas de reduzir o consumo de energia e,
                quando possível, utilizar alternativas de transporte
                mais econômicas.
            </p>
        `;

    } else if (agua === maiorGasto && transporte === maiorGasto) {

        recomendacao = `
            <h5>💧🚗 Água e transporte</h5>
            <p>
                Água e transporte representam seus maiores gastos.
                Procure reduzir desperdícios de água e avaliar alternativas
                de transporte mais econômicas.
            </p>
        `;

    } else if (energia === maiorGasto) {

        recomendacao = `
            <h5>💡 Seu maior gasto é energia</h5>
            <p>
                Procure desligar luzes e equipamentos quando não estiverem
                sendo utilizados e considere o uso de lâmpadas mais econômicas.
            </p>
        `;

    } else if (agua === maiorGasto) {

        recomendacao = `
            <h5>💧 Seu maior gasto é água</h5>
            <p>
                Evite deixar torneiras abertas, reduza o tempo de banho
                e procure reutilizar água sempre que possível.
            </p>
        `;

    } else {

        recomendacao = `
            <h5>🚗 Seu maior gasto é transporte</h5>
            <p>
                Quando possível, considere alternativas de transporte
                mais econômicas, como bicicleta, transporte público
                ou deslocamentos compartilhados.
            </p>
        `;
    }

    const resultado = document.getElementById("resultado");

    resultado.classList.remove("d-none");

    resultado.innerHTML = `
        <h4 class="mb-4">Resultado do seu consumo</h4>

        <div class="row g-3">

            <div class="col-md-4">
                <div class="card h-100 border-0 bg-light">
                    <div class="card-body text-center">
                        <h6>Gasto mensal</h6>
                        <h3>R$ ${total.toFixed(2)}</h3>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100 border-0 bg-light">
                    <div class="card-body text-center">
                        <h6>Energia</h6>
                        <h3>R$ ${energia.toFixed(2)}</h3>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100 border-0 bg-light">
                    <div class="card-body text-center">
                        <h6>Água</h6>
                        <h3>R$ ${agua.toFixed(2)}</h3>
                    </div>
                </div>
            </div>

        </div>

        <div class="card mt-3 border-0 bg-light">
            <div class="card-body">
                <h6>🚗 Transporte</h6>
                <h3>R$ ${transporte.toFixed(2)}</h3>
            </div>
        </div>

        <hr class="my-4">

        <h5>Distribuição dos gastos</h5>

        <p class="mb-1">
            💡 Energia — ${percentualEnergia.toFixed(1)}%
        </p>

        <div class="progress mb-3">
            <div
                class="progress-bar"
                style="width: ${percentualEnergia}%">
            </div>
        </div>

        <p class="mb-1">
            💧 Água — ${percentualAgua.toFixed(1)}%
        </p>

        <div class="progress mb-3">
            <div
                class="progress-bar"
                style="width: ${percentualAgua}%">
            </div>
        </div>

        <p class="mb-1">
            🚗 Transporte — ${percentualTransporte.toFixed(1)}%
        </p>

        <div class="progress">
            <div
                class="progress-bar"
                style="width: ${percentualTransporte}%">
            </div>
        </div>

        <div class="mt-4">
            ${recomendacao}
        </div>

        <div class="mt-4">
            <canvas id="graficoConsumo"></canvas>
        </div>
    `;

    // Remove gráfico anterior
    if (grafico !== null) {
        grafico.destroy();
    }

    // Cria novo gráfico
    const canvas = document.getElementById("graficoConsumo");

    grafico = new Chart(canvas, {

        type: "doughnut",

        data: {
            labels: [
                "Energia",
                "Água",
                "Transporte"
            ],

            datasets: [{
                data: [
                    energia,
                    agua,
                    transporte
                ]
            }]
        },

        options: {
            responsive: true,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

function avaliarHabitos() {

    const luzes = document.getElementById("luzes").value;
    const torneira = document.getElementById("torneira").value;
    const transporte = document.getElementById("transporteHabito").value;
    const reciclagem = document.getElementById("reciclagemHabito").value;

    if (
        luzes === "" ||
        torneira === "" ||
        transporte === "" ||
        reciclagem === ""
    ) {
        alert("Responda todas as perguntas antes de continuar.");
        return;
    }

    const habitos = [
        {
            nome: "Energia",
            resposta: luzes,
            icone: "💡",
            dica: "Apague as luzes quando não estiver utilizando o ambiente e evite deixar equipamentos ligados sem necessidade."
        },
        {
            nome: "Água",
            resposta: torneira,
            icone: "💧",
            dica: "Evite deixar torneiras abertas sem necessidade e procure reduzir desperdícios de água."
        },
        {
            nome: "Transporte",
            resposta: transporte,
            icone: "🚗",
            dica: "Quando possível, considere alternativas como bicicleta, transporte público ou deslocamentos compartilhados."
        },
        {
            nome: "Reciclagem",
            resposta: reciclagem,
            icone: "♻️",
            dica: "Separe os materiais recicláveis e procure conhecer os pontos de coleta disponíveis na sua região."
        }
    ];

    let pontos = 0;
    let areasAtencao = [];

    habitos.forEach(function(habito) {

        if (habito.resposta === "sim") {
            pontos += 2;
        }

        if (habito.resposta === "as-vezes") {
            pontos += 1;
        }

        if (habito.resposta !== "sim") {
            areasAtencao.push(habito);
        }

    });

    let mensagem = "";

    if (pontos >= 7) {

        mensagem = `
            <h5>🌱 Seus hábitos estão bem desenvolvidos!</h5>
            <p>
                Você já adota várias práticas de consumo consciente.
                Continue mantendo esses hábitos e procure novas formas
                de reduzir desperdícios.
            </p>
        `;

    } else if (pontos >= 4) {

        mensagem = `
            <h5>🌿 Você está no caminho!</h5>
            <p>
                Você já possui alguns hábitos sustentáveis, mas existem
                oportunidades para melhorar.
            </p>
        `;

    } else {

        mensagem = `
            <h5>🌎 Existem oportunidades para melhorar.</h5>
            <p>
                Pequenas mudanças no dia a dia podem ajudar a reduzir
                desperdícios e tornar seu consumo mais consciente.
            </p>
        `;
    }

    let dicas = "";

    if (areasAtencao.length > 0) {

        dicas = `
            <h6 class="mt-4">Áreas que podem receber mais atenção:</h6>

            <div class="list-group">
        `;

        areasAtencao.forEach(function(area) {

            dicas += `
                <div class="list-group-item">

                    <strong>
                        ${area.icone} ${area.nome}
                    </strong>

                    <p class="mb-0 mt-1">
                        ${area.dica}
                    </p>

                </div>
            `;

        });

        dicas += `</div>`;

    } else {

        dicas = `
            <div class="alert alert-success mt-4">
                🎉 Você marcou "Sempre" em todas as áreas!
                Continue praticando o consumo consciente.
            </div>
        `;

    }

    const resultado = document.getElementById("resultadoHabitos");

    resultado.classList.remove("d-none");

    resultado.innerHTML = `
        ${mensagem}

        <div class="text-center mt-4">

            <h4>
                ${pontos}/8 pontos
            </h4>

            <p>
                Resultado da avaliação
            </p>

        </div>

        ${dicas}
    `;
}

function consultarMaterial() {

    const material = document.getElementById("material").value;
    const resultado = document.getElementById("resultadoReciclagem");

    if (material === "") {
        alert("Selecione um material antes de continuar.");
        return;
    }

    let titulo = "";
    let orientacoes = [];

    if (material === "papel") {

        titulo = "📄 Papel";

        orientacoes = [
            "Separe o papel dos resíduos comuns.",
            "Remova materiais que não pertencem ao papel antes da separação.",
            "Evite misturar papel reciclável com resíduos contaminados.",
            "Quando possível, encaminhe o material para a coleta seletiva ou ponto de reciclagem."
        ];

    } else if (material === "plastico") {

        titulo = "🧴 Plástico";

        orientacoes = [
            "Separe as embalagens plásticas dos resíduos comuns.",
            "Remova o excesso de líquidos e alimentos das embalagens.",
            "Compacte as embalagens quando possível para ocupar menos espaço.",
            "Encaminhe os materiais para a coleta seletiva ou ponto de reciclagem disponível."
        ];

    } else if (material === "vidro") {

        titulo = "🥛 Vidro";

        orientacoes = [
            "Separe os materiais de vidro dos demais resíduos.",
            "Remova o excesso de líquidos ou alimentos das embalagens.",
            "Tenha cuidado durante o manuseio para evitar acidentes.",
            "Procure os pontos de coleta ou sistemas de reciclagem disponíveis na sua região."
        ];

    } else if (material === "metal") {

        titulo = "🥫 Metal";

        orientacoes = [
            "Separe latas e outros materiais metálicos dos resíduos comuns.",
            "Remova o excesso de líquidos ou alimentos das embalagens.",
            "Quando possível, compacte as embalagens para ganhar espaço.",
            "Encaminhe os materiais para a coleta seletiva ou ponto de reciclagem."
        ];

    } else if (material === "bateria") {

        titulo = "🔋 Pilhas e baterias";

        orientacoes = [
            "Nunca descarte pilhas e baterias junto ao lixo comum.",
            "Não coloque esse tipo de resíduo no ralo ou em locais inadequados.",
            "Guarde os materiais de forma segura até encontrar um ponto de coleta.",
            "Procure pontos de coleta específicos para resíduos especiais."
        ];
    } else if (material === "oleo") {

    titulo = "🛢️ Óleo de cozinha";

    orientacoes = [
        "Nunca descarte óleo de cozinha no ralo.",
        "Não despeje óleo de cozinha no jardim ou diretamente no solo.",
        "Armazene o óleo usado em um recipiente adequado.",
        "Procure um ponto de coleta apropriado para esse resíduo."
    ];

    } else if (material === "especial") {

    titulo = "⚠️ Resíduos especiais";

    orientacoes = [
        "Não misture resíduos especiais com o lixo comum.",
        "Procure identificar os pontos de coleta adequados.",
        "Mantenha esses resíduos separados até realizar o descarte.",
        "Siga as orientações do ponto de coleta responsável."
    ];

    }


    let lista = "";

    orientacoes.forEach(function(orientacao) {

        lista += `
            <li class="mb-2">
                ${orientacao}
            </li>
        `;

    });

    resultado.classList.remove("d-none");

    resultado.innerHTML = `
        <h5>${titulo}</h5>

        <p>
            Orientações:
        </p>

        <ul class="mb-0">
            ${lista}
        </ul>
    `;
}