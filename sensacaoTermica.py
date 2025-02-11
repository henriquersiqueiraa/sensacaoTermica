def wind_chill(temp_c, vento_kmh):
    """Calcula a sensação térmica pelo vento (Wind Chill)"""
    if temp_c > 10 or vento_kmh < 4.8:
        return temp_c  # O Wind Chill não se aplica nessas condições
    return round(13.12 + 0.6215 * temp_c - 11.37 * (vento_kmh ** 0.16) + 0.3965 * temp_c * (vento_kmh ** 0.16), 2)


def heat_index(temp_c, umidade):
    """Calcula a sensação térmica pelo índice de calor (Heat Index)"""
    if temp_c < 27:
        return temp_c  # O índice de calor não se aplica nessas condições
    
    hi = (
        -8.7847 + 1.6114 * temp_c + 2.3385 * umidade - 0.1461 * temp_c * umidade
        - 0.0123 * (temp_c ** 2) - 0.0164 * (umidade ** 2) + 0.0022 * (temp_c ** 2) * umidade
        + 0.0007 * temp_c * (umidade ** 2) - 0.0003 * (temp_c ** 2) * (umidade ** 2)
    )
    return round(hi, 2)


def calcular_sensacao_termica(temp_c, vento_kmh=None, umidade=None):
    """Determina qual fórmula usar e calcula a sensação térmica"""
    if temp_c <= 10 and vento_kmh is not None:
        return wind_chill(temp_c, vento_kmh)
    elif temp_c >= 27 and umidade is not None:
        return heat_index(temp_c, umidade)
    return temp_c  # Se não atender aos critérios, retorna a temperatura real


# Exemplo de uso
temp = float(input("Digite a temperatura em °C: "))
opcao = input("O cálculo será baseado em (1) Vento ou (2) Umidade do Ar? Digite 1 ou 2: ")

if opcao == "1":
    vento = float(input("Digite a velocidade do vento em km/h: "))
    sensacao = calcular_sensacao_termica(temp, vento_kmh=vento)
    print(f"Sensação térmica considerando o vento: {sensacao}°C")

elif opcao == "2":
    umidade = float(input("Digite a umidade relativa do ar (%): "))
    sensacao = calcular_sensacao_termica(temp, umidade)
    print(f"Sensação térmica considerando a umidade: {sensacao}°C")

else:
    print("Opção inválida. Por favor, escolha 1 para vento ou 2 para umidade.")
