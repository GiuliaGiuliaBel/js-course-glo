'use strict';

let start = document.getElementById('start');

let depositCheck = document.querySelector('#deposit-check');
console.log(depositCheck);

// Работаем с NodeList
// Метод querySelectorAll() Document возвращает статический (не динамический) NodeList, содержащий все найденные элементы документа, которые соответствуют указанному селектору.
let additional_income = document.querySelectorAll('.additional_income-item');
let additional_incomeItem = additional_income[0];

console.log(additional_incomeItem);

let additional_incomeItem2 = additional_income[1];
console.log(additional_incomeItem2);

let buttons = document.getElementsByTagName('button');

let btnPlusIncomeAdd = buttons[0];
console.log(btnPlusIncomeAdd);

let btnPlusExpensesAdd = buttons[1];
console.log(btnPlusExpensesAdd);

// resultTotal 
let budgetMonthValue = document.getElementsByClassName('result-total budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0];

console.log(budgetMonthValue, budgetDayValue, expensesMonthValue, additionalIncomeValue, additionalExpensesValue, incomePeriodValue, targetMonthValue);

// получаем оставшиеся Input со страницы
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');

console.log(salaryAmount, incomeTitle , incomeAmount, expensesTitle, expensesAmount, additionalExpensesItem, depositAmount, depositPercent, targetAmount, periodSelect);
