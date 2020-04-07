'use strict';

let start = document.getElementById('start');

let depositCheck = document.querySelector('#deposit-check');

// Работаем с NodeList
// Метод querySelectorAll() Document возвращает статический (не динамический) NodeList, содержащий все найденные элементы документа, которые соответствуют указанному селектору.
let additional_income = document.querySelectorAll('.additional_income-item');
let additional_incomeItem = additional_income[0];

let additional_incomeItem2 = additional_income[1];

let buttons = document.getElementsByTagName('button');

let btnPlusIncomeAdd = buttons[0];
let btnPlusExpensesAdd = buttons[1];

// resultTotal 
let budgetMonthValue = document.getElementsByClassName('result-total budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0];

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
