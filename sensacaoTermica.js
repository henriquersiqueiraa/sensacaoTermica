const readline = require('readline');

function windChill(tempEmCelsius, ventoKmh) {
    if (tempEmCelsius > 10 || ventoKmh < 4.8) {
        return tempEmCelsius;
    }
    return (13.12 + 0.6215 * tempEmCelsius - 11.37 * Math.pow(ventoKmh, 0.16) + 0.3965 * tempEmCelsius * Math.pow(ventoKmh, 0.16)).toFixed(2);
}

function heatIndex(tempEmCelsius, umidade) {
    if (tempEmCelsius < 27) {
        return tempEmCelsius;
    }
    let hi = (
        -8.7847 + 1.6114 * tempEmCelsius + 2.3385 * umidade - 0.1461 * tempEmCelsius * umidade
        - 0.0123 * (tempEmCelsius ** 2) - 0.0164 * (umidade ** 2) + 0.0022 * (tempEmCelsius ** 2) * umidade
        + 0.0007 * tempEmCelsius * (umidade ** 2) - 0.0003 * (tempEmCelsius ** 2) * (umidade ** 2)
    );
    return hi.toFixed(2);
}

function calcularSensacaoTermica(tempEmCelsius, ventoKmh = null, umidade = null) {
    if (tempEmCelsius <= 10 && ventoKmh !== null) {
        return windChill(tempEmCelsius, ventoKmh);
    } else if (tempEmCelsius >= 27 && umidade !== null) {
        return heatIndex(tempEmCelsius, umidade);
    }
    return tempEmCelsius;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Digite a temperatura em °C: ", (temp) => {
    rl.question("O cálculo será baseado em (1) Vento ou (2) Umidade? Digite 1 ou 2: ", (opcao) => {
        if (opcao === "1") {
            rl.question("Digite a velocidade do vento em km/h: ", (vento) => {
                const sensacao = calcularSensacaoTermica(parseFloat(temp), parseFloat(vento));
                console.log(`Sensação térmica considerando o vento: ${sensacao}°C`);
                rl.close();
            });
        } else if (opcao === "2") {
            rl.question("Digite a umidade relativa do ar (%): ", (umidade) => {
                const sensacao = calcularSensacaoTermica(parseFloat(temp), null, parseFloat(umidade));
                console.log(`Sensação térmica considerando a umidade: ${sensacao}°C`);
                rl.close();
            });
        } else {
            console.log("Opção inválida. Por favor, escolha 1 para vento ou 2 para umidade.");
            rl.close();
        }
    });
});