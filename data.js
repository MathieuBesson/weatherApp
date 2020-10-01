const weatherTypes = {
    sunny : [0],
    cloud : [1, 2, 5],
    cloudy : [3, 4],
    fog : [6, 7],
    smallRain : [10, 13],
    heavyRain : [11, 12, 14, 15, 30, 31, 32, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 210, 211, 212],
    drizzle : [16],
    snow : [20, 21, 22, 220, 221, 222, 230, 231, 232, 235],
    thunderstorms : [100, 101, 102, 103, 104, 105, 106, 107, 108, 120, 121, 122, 123, 124, 125, 126, 127, 128, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142]
};


let weatherCode = {
    0 : "Soleil",

    1 : "Peu nuageux",
    2 : "Ciel voilé",
    3 : "Nuageux",
    4 : "Très nuageux",
    5 : "Couvert",

    6 : "Brouillard",
    7 : "Brouillard givrant",

    10 : "Pluie faible",
    11 : "Pluie modérée",
    12 : "Pluie forte",
    13 : "Pluie faible verglaçante",
    14 : "Pluie modérée verglaçante",
    15 : "Pluie forte verglaçante",

    16 : "Bruine",

    20 : "Neige faible",
    21 : "Neige modérée",
    22 : "Neige forte",

    30 : "Pluie et neige mêlées faibles",
    31 : "Pluie et neige mêlées modérées",
    32 : "Pluie et neige mêlées fortes",
    40 : "Averses de pluie locales et faibles",
    41 : "Averses de pluie locales",
    42 : "Averses locales et fortes",
    43 : "Averses de pluie faibles",
    44 : "Averses de pluie",
    45 : "Averses de pluie fortes",
    46 : "Averses de pluie faibles et fréquentes",
    47 : "Averses de pluie fréquentes",
    48 : "Averses de pluie fortes et fréquentes",
    60 : "Averses de neige localisées et faibles",
    61 : "Averses de neige localisées",
    62 : "Averses de neige localisées et fortes",
    63 : "Averses de neige faibles",
    64 : "Averses de neige",
    65 : "Averses de neige fortes",
    66 : "Averses de neige faibles et fréquentes",
    67 : "Averses de neige fréquentes",
    68 : "Averses de neige fortes et fréquentes",
    70 : "Averses de pluie et neige mêlées localisées et faibles",
    71 : "Averses de pluie et neige mêlées localisées",
    72 : "Averses de pluie et neige mêlées localisées et fortes",
    73 : "Averses de pluie et neige mêlées faibles",
    74 : "Averses de pluie et neige mêlées",
    75 : "Averses de pluie et neige mêlées fortes",
    76 : "Averses de pluie et neige mêlées faibles et nombreuses",
    77 : "Averses de pluie et neige mêlées fréquentes",
    78 : "Averses de pluie et neige mêlées fortes et fréquentes",

    100 : "Orages faibles et locaux",
    101 : "Orages locaux",
    102 : "Orages fort et locaux",
    103 : "Orages faibles",
    104 : "Orages",
    105 : "Orages forts",
    106 : "Orages faibles et fréquents",
    107 : "Orages fréquents",
    108 : "Orages forts et fréquents",
    120 : "Orages faibles et locaux de neige ou grésil",
    121 : "Orages locaux de neige ou grésil",
    122 : "Orages locaux de neige ou grésil",
    123 : "Orages faibles de neige ou grésil",
    124 : "Orages de neige ou grésil",
    125 : "Orages de neige ou grésil",
    126 : "Orages faibles et fréquents de neige ou grésil",
    127 : "Orages fréquents de neige ou grésil",
    128 : "Orages fréquents de neige ou grésil",
    130 : "Orages faibles et locaux de pluie et neige mêlées ou grésil",
    131 : "Orages locaux de pluie et neige mêlées ou grésil",
    132 : "Orages fort et locaux de pluie et neige mêlées ou grésil",
    133 : "Orages faibles de pluie et neige mêlées ou grésil",
    134 : "Orages de pluie et neige mêlées ou grésil",
    135 : "Orages forts de pluie et neige mêlées ou grésil",
    136 : "Orages faibles et fréquents de pluie et neige mêlées ou grésil",
    137 : "Orages fréquents de pluie et neige mêlées ou grésil",
    138 : "Orages forts et fréquents de pluie et neige mêlées ou grésil",
    140 : "Pluies orageuses",
    141 : "Pluie et neige mêlées à caractère orageux",
    142 : "Neige à caractère orageux",

    210 : "Pluie faible intermittente",
    211 : "Pluie modérée intermittente",
    212 : "Pluie forte intermittente",

    220 : "Neige faible intermittente",
    221 : "Neige modérée intermittente",
    222 : "Neige forte intermittente",
    230 : "Pluie et neige mêlées",
    231 : "Pluie et neige mêlées",
    232 : "Pluie et neige mêlées",
    235 : "Averses de grêle"
};

function getWeatherClass(weatherCode, type = false) {
    let weatherClass;
    switch (true) {
        case (weatherTypes.sunny.indexOf(weatherCode) !== -1):
            weatherClass = (type) ? "sunny" : "wi-day-sunny";
            break;
        case (weatherTypes.cloud.indexOf(weatherCode) !== -1):
            weatherClass = (type) ? "cloud" : "wi-cloud";
            break;
        case (weatherTypes.cloudy.indexOf(weatherCode) !== -1):
            weatherClass = (type) ? "cloudy" : "wi-cloudy";
            break;
        case (weatherTypes.fog.indexOf(weatherCode) !== -1):
            weatherClass = (type) ? "fog" : "wi-fog";
            break;
        case (weatherTypes.smallRain.indexOf(weatherCode) !== -1):
            weatherClass = (type) ? "smallRain" : "wi-hail";
            break;
        case (weatherTypes.heavyRain.indexOf(weatherCode) !== -1):
            weatherClass = (type) ? "heavyRain" : "wi-rain-wind";
            break;
        case (weatherTypes.drizzle.indexOf(weatherCode) !== -1):
            weatherClass = (type) ? "drizzle" : "wi-day-cloudy-windy";
            break;
        case (weatherTypes.snow.indexOf(weatherCode) !== -1):
            weatherClass = (type) ? "snow" : "wi-day-snow";
            break;
        case (weatherTypes.thunderstorms.indexOf(weatherCode) !== -1):
            weatherClass = (type) ? "thunderstorms" : "wi-day-lightning";
            break;
    }
    return weatherClass;
}