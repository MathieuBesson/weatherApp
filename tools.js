function capitalizeLetter(string) {
    string = string.split(" ");
    for (var i = 0, x = string.length; i < x; i++) {
        string[i] = string[i][0].toUpperCase() + string[i].substr(1);
    }
    return string.join(" ");
}

function getDateString(isoString, onlyWeekday = false) {
    let date = new Date(Date.parse(isoString));
    const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dateTimeFormat = (onlyWeekday) ? new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(dateTime) : new Intl.DateTimeFormat('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' }).format(dateTime);
    return capitalizeLetter(dateTimeFormat);
}

function ErrorMessage(content, opacity) {
    const tooltipError = document.querySelector('.tooltip-error');
    tooltipError.textContent = content;
    tooltipError.style.opacity = opacity;
}


function createElements(elements) {
    let createdElements = {};
    for (let property in elements) {
        createdElements[property] = document.createElement(elements[property].element);
        if (elements[property].hasOwnProperty('HTMLClass')) {
            createdElements[property].classList.add(...elements[property].HTMLClass.split(' '));
        }
        if (elements[property].hasOwnProperty('content')) {
            createdElements[property].textContent = elements[property].content;
        }
        if (elements[property].hasOwnProperty('attribute')) {
            createdElements[property].setAttribute(...elements[property].attribute);
        }
        if (elements[property].hasOwnProperty('innerHTML')) {
            createdElements[property].innerHTML = elements[property].innerHTML;
        }
    }
    return createdElements;
}