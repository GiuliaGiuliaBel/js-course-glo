'use strict';

const DAY_STRING = ['день', 'дня', 'дней'];
const declOfNum = (n, titles) =>  n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

let week = ['Воскресенье','Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const getCurrentTime = () => new Date();
const newY = (newYearDate) => {
    let dateNow = new Date().getTime();
    let dateNewYear = new Date(newYearDate).getTime();
    let remaining = (dateNewYear - dateNow) / 1000;
    let daysLeft = Math.floor(remaining / 60 / 60 / 24);
    let divDaysLeft = document.createElement('div')
    divDaysLeft.textContent = `До Нового года осталось ${declOfNum(daysLeft, DAY_STRING)}`;
 
    return divDaysLeft;
};

const log = message => {
  
    while(document.body.firstChild){
        document.body.removeChild(document.body.firstChild)
    }

 renderDate(`${message.dayda}`);
 let divTwo = document.createElement('div');
 divTwo.setAttribute('id', 'divTwo');
    divTwo.innerHTML = renderDate(`${message.dayda}`).textContent + `<br>` + `Текущее время: ${message.hours}:
        ${message.minutes}:
        ${message.seconds}
        ${message.ampm}` + '<br>' + newY('31 December 2020').textContent;
           
     document.body.append(divTwo)
};

const renderDate = (mes) => {
    let div = document.createElement('div');
    let dayOfWeek = week[`${new Date().getDay()}`];
    div.textContent = `${mes}` + '<br>' + `Сегодня: ${dayOfWeek}`;
    return div;
}

const serializeClockTime = date =>
    ({ 
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    }); 

const civilianHours = clockTime => 
({
    ...clockTime,
    hours: (clockTime.hours > 12) ?
        clockTime.hours - 12 :
        clockTime.hours
});

const appendAMPM = clockTime =>
({
    ...clockTime,
    ampm: (clockTime.hours >=12) ? 'PM' : 'AM'
});

const getDa = clockTime => ({
    ...clockTime,
    dayda: ((clockTime.hours >= 0 && clockTime.hours <= 4) && clockTime.ampm === 'AM') ?
        'Доброй ночи' :
        ((clockTime.hours >= 0 && clockTime.hours <= 5) && clockTime.ampm === 'PM') ?
        'Добрый вечер' :
        'Доброе утро'
});

const display = target => time => target(time);

const prependZero = key => clockTime => ({
...clockTime,
[key]: (clockTime[key] < 10) ?
    '0' + clockTime[key] :
    clockTime[key]
});

const convertToCivilianTime = clockTime => 
    compose(
        appendAMPM,
        civilianHours,
        getDa
    )(clockTime);

const oneSecond = () => 1000;

const compose = (...fns) => 
        arg => 
        fns.reduce(
        (composed, f) => f(composed),
            arg
    );
    
const doubleDigits = civilianTime =>
    compose(
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime);

const startTicking = () => {
  setInterval(
        compose(
            getCurrentTime,
            serializeClockTime,
            convertToCivilianTime,
            doubleDigits,
            display(log)
        ),
oneSecond()
      )

};

startTicking();


// Добрый день (утро, вечер, ночь в зависимости от времени суток)
// Сегодня: Понедельник
// Текущее время:12:05:15 PM
// До нового года осталось 175 дней