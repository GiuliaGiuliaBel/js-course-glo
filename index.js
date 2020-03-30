'use strict';

let money = 700;
let income = 'фриланс';
let addExpenses = 'Коммунальные, Питание, Бытовые расходы, Интернет, Проезд, Развлечения';
let deposit = true;
const mission = 1400;
let period = 6;
let budgetDay = money/30;

console.log(typeof(money), typeof(income), typeof(deposit));
console.log('длина строки addExpenses',addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
addExpenses = addExpenses.toLowerCase().split(',');
console.log('addExpenses', addExpenses);

console.log('budgetDay', budgetDay);

money = prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

let depositBank = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов');

let expenses2 = prompt('Введите обязательную статью расходов');

let amount1 = prompt('Во сколько это обойдется?');

let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
console.log(`Бюджет на месяц: ${budgetMonth}`);

mission/budgetMonth;
console.log(`Цель будет достигнута за: ${Math.ceil(mission/budgetMonth)} месяцев`);

budgetDay = Math.floor(budgetMonth/30);
console.log(`Бюджет на день: ${budgetDay}`);

if (budgetDay >= 1200 && budgetDay < 600) {
    console.log('У вас высокий уровень дохода');   
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
    console.log('К сожалению, ваш уровень дохода ниже среднего');   
} else if (budgetDay < 0) {
    console.log('Что-то пошло не так');
}
