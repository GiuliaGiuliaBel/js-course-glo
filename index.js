'use strict';

let start = document.getElementById('start');

let depositCheck = document.querySelector('.deposit-check');

let buttons = document.getElementsByTagName('button');

// Работаем с HTML коллекцией
// HTMLCollection, хранящая элементы DOM, является динамической. При изменении документа она моментально отражает все произведённые изменения.
let btnPlusIncomeAdd = buttons.item(0);
let btnPlusExpensesAdd = buttons.item(1);

// resultTotal 
let budgetMonthValue = document.getElementsByClassName('result-total budget_month-value');
let budgetDayValue = document.getElementsByClassName('result-total budget_day-value');
let expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value');
let additionalIncomeValue = document.getElementsByClassName('result-total additional_income-value');
let additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value');
let incomePeriodValue = document.getElementsByClassName('result-total income_period-value');
let targetMonthValue = document.getElementsByClassName('result-total target_month-value');

// Работаем с NodeList
// Метод querySelectorAll() Document возвращает статический (не динамический) NodeList, содержащий все найденные элементы документа, которые соответствуют указанному селектору.
let additional_incomeItem = document.querySelectorAll('.additional_income-item')[0];
let additional_incomeItem2 = document.querySelectorAll('.additional_income-item')[1];

// получаем оставшиеся Input со страницы
let salaryAmount = document.querySelector('salary-amount');
let incomeTitle = document.querySelector('income-title');
let incomeAmount = document.querySelector('income-amount');
let expensesTitle = document.querySelector('expenses-title');
let expensesAmount = document.querySelector('expenses-amount');
let additionalExpensesItem = document.querySelector('additional_expenses-item');
let depositAmount = document.querySelector('deposit-amount');
let depositPercent = document.querySelector('deposit-percent');
let targetAmount = document.querySelector('target-amount');
let periodSelect = document.querySelector('period-select');

