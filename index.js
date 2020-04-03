'use strict';

let isNumber = function(n) {
   
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
        do {
             money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));
    };

  start();

let expensesMonth,
    accumulatedMonth,
    budgetDay;
   
let expenses = [];

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 1400,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            for (let i = 0; i < 2; i++) { 
              let cost,
                  expensesItem = prompt('Введите обязательную статью расходов');  
              do {
                    (cost = prompt('Во сколько это обойдется?'));
              } while (!isNumber(cost));

            appData.expenses[expensesItem] = +cost;
            console.log(appData.expenses);
            
          }
    },
    getExpensesMonth: function() {
        for(let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
        return appData.expensesMonth;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function() {

        return Math.sign(appData.mission/appData.budgetMonth) === 1 ?
         `Цель будет достигнута через ${appData.mission/appData.budgetMonth} месяца(ев)`  :
            'Цель не будет достигнута';
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200 && appData.budgetDay < 600) {
            return('У вас высокий уровень дохода');   
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return('К сожалению, ваш уровень дохода ниже среднего');   
        } else if (appData.budgetDay < 0) {
            return('Что-то пошло не так');
        }
    }  
};

appData.asking();
appData.getBudget();

let expensesAmount = appData.getExpensesMonth();

console.log('Расходы за месяц: ' +  expensesAmount);

console.log(appData.getTargetMonth());

console.log(appData.getStatusIncome());



