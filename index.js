'use strict';

const money = 700;
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