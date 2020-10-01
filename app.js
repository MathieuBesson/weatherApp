const HTMLElements = {
    city : document.querySelector('#city'),
    cards : document.getElementsByClassName("card"),
    app : document.querySelector('#app'),
    forecasts : document.querySelector('#forecasts'),
    mainIcon : document.querySelector('.main-icon'),
    navbarToggler : document.querySelector('button.navbar-toggler'),
    sideNav : document.querySelector('#sidenav'),
    navIcon : document.querySelector('.navicon')
}

async function main(withIP = true) {

    let userCity;
    if (withIP) {
        // Get IP user 
        const ip = await fetch('https://api.ipify.org?format=json')
            .then(result => result.json())
            .then(json => json.ip);

        // Get the city user with his IP 
        userCity = await fetch('https://freegeoip.app/json/' + ip)
            .then(result => result.json())
            .then(json => json.city);
    } else {
        userCity = city.textContent;
    }

    // Get INSEE code of user's city
    const limitResult = 1;
    const inseeCode = await fetch(`https://geo.api.gouv.fr/communes?nom=${userCity}&fields=nom&boost=population&limit=${limitResult}`)
        .then(result => result.json())
        .then(json => { return (json.length === 1) ? json[0].code : undefined });

    if (inseeCode !== undefined) {
        ErrorMessage('', 0);
        // Get meteo with INSEE code 
        const weather = await fetch(`https://api.meteo-concept.com/api/forecast/daily?token=6b21fe75eed5b1a77a380770fbbd117228d053efdb7183914ef5a9601daca4c1&insee=${inseeCode}`)
            .then(result => result.json())
            .then(result => { return (result.hasOwnProperty('code')) ? undefined : result });

        if (weather !== undefined) {
            displayWeaterInfos(weather);
            let forecastPerDays = [].slice.call(HTMLElements.cards);
            forecastPerDays.forEach((item, index) => {
                item.addEventListener('click', () => {
                    updateCurrentWeather(getWeather(weather), index)
                    document.querySelector('.current-weather').classList.remove('current-weather');
                    item.classList.add('current-weather');
                });
            });

        } else {
            ErrorMessage('Zone géographique trop large', 1);
        }
    } else {
        ErrorMessage('Ville introuvable!', 1);
    }
}

function displayWeaterInfos(data, daySelect = 0) {
    let weather = getWeather(data);
    updateCurrentWeather(weather, daySelect);

    HTMLElements.forecasts.innerHTML = '';
    weather[0].forecasts.forEach((item, index) => {
        const forecastDuration = 7;
        if (index < forecastDuration) {
            createCarrousselElement(item, weather, index);
        }
    });
}

function getWeather(data) {
    let weather = [];
    weather.push({
        city: data.city,
        forecasts: []
    });
    data.forecast.forEach(function (y) {
        weather[0].forecasts.push({
            date : y.datetime,
            wind : y.wind10m,
            windDirection : y.dirwind10m,
            rainDay : y.rr10,
            rainProbability : y.probarain,
            tmin : y.tmin,
            tmax : y.tmax,
            sunHours : y.sun_hours,
            weather : y.weather
        });
    });
    return weather;
}


function updateCurrentWeather(weather, daySelect) {
    ErrorMessage('', 0);
    // Update informations of current weather
    let currentWeatherDatas = {
        '#date': getDateString(weather[0].forecasts[daySelect].date),
        '#city': weather[0].city.name,
        '#rain-probability': weather[0].forecasts[daySelect].rainProbability + ' %',
        '#wind-speed': weather[0].forecasts[daySelect].wind + ' km/h',
        '#wind-direction': weather[0].forecasts[daySelect].windDirection + '°',
        '#temp-average': (Math.round(weather[0].forecasts[daySelect].tmax) + Math.round(weather[0].forecasts[daySelect].tmin)) / 2 + '°',
        '#temp-min': Math.round(weather[0].forecasts[daySelect].tmin) + '°',
        '#temp-max': Math.round(weather[0].forecasts[daySelect].tmax) + '°',
        '#rain-day': Math.round(weather[0].forecasts[daySelect].rainDay) + ' mm',
        '#sun-hours': Math.round(weather[0].forecasts[daySelect].sunHours) + ' h',
        '#condition': weatherCode[weather[0].forecasts[daySelect].weather]
    };
    for (let index in currentWeatherDatas) {
        document.querySelector(index).textContent = currentWeatherDatas[index];
    }

    HTMLElements.mainIcon.className = 'main-icon wi ' + getWeatherClass(weather[0].forecasts[daySelect].weather);
    HTMLElements.app.className = getWeatherClass(weather[0].forecasts[daySelect].weather, true);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function slideNav() {
    HTMLElements.navbarToggler.addEventListener('click', () => {
        HTMLElements.sideNav.classList.toggle('open');
        HTMLElements.navIcon.classList.toggle('open-burger');
    });
}


function createCarrousselElement(content, weather, index) {
    let datestring = getDateString(weather[0].forecasts[index].date, true);
    let elements = this.createElements({
        card : { 'element': 'div', 'HTMLClass': 'card row justify-content-between d-flex' + ((index === 0) ? ' current-weather' : '') },
        date : { 'element': 'div', 'HTMLClass': 'date col-4', 'content' : datestring },
        icon : { 'element': 'div', 'HTMLClass': 'wi ' + getWeatherClass(weather[0].forecasts[index].weather)},
        temp : { 'element': 'div', 'HTMLClass': 'temp col-4'},
        tempMin : { 'element': 'span', 'HTMLClass': 'temp-min', 'content' : content.tmin },
        tempMax : { 'element': 'span', 'HTMLClass': 'temp-max', 'content' : content.tmax },
        rainProbability : { 'element': 'div', 'HTMLClass': 'rain-probability', 'content' : (content.rainProbability !== 0) ? content.rainProbability + ' %' : '' },
        weatherForecasts : { 'element': 'div', 'HTMLClass': 'weather d-flex' }
    });
    elements.temp.prepend(elements.tempMax, elements.tempMin);
    elements.weatherForecasts.prepend(elements.icon, elements.rainProbability);
    elements.card.prepend(elements.date, elements.weatherForecasts, elements.temp);
    HTMLElements.forecasts.appendChild(elements.card);
}


HTMLElements.city.addEventListener('click', () => {
    HTMLElements.city.contentEditable = true;
});

HTMLElements.city.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        HTMLElements.city.contentEditable = false;
        main(false);
    }
});

main();
slideNav();


