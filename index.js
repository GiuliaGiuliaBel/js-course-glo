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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1400,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {

      if(confirm('Есть ли у вас дополнительный заработок')) {
         let itemIncome;
         let cashIncome;

         do {
            itemIncome = prompt('Какой у вас дополнительный заработок');
         } while (isNumber(itemIncome)|| itemIncome.trim() == '');    

         do {
            cashIncome = prompt('Сколько в месяц вы зарабатывает на этом?');
         } while (!isNumber(cashIncome));

         appData.income[itemIncome] = cashIncome;
      }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        
            let stringResult = '';
            let singleItem;
            for (let j = 0; j < addExpenses.split(',').length; j ++) {
              
               singleItem = addExpenses.split(',')[j].trim();   
           
               stringResult += (singleItem.substring(0,1).toUpperCase() + singleItem.substring(1).toLowerCase()) + ', ';
                           
            }           
            console.log('Вывести в консоль расходы (addExpenses), где каждое слово с большой буквы слова разделены запятой и пробелом', 
            stringResult.substring(0, stringResult.length - 2));
            
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            for (let i = 0; i < 2; i++) { 
              let cost,
                  expensesItem;

              do {
                    (expensesItem = prompt('Введите обязательную статью расходов'));
                  //   проверка, что введенное значение не является числом или пробелами
               } while (isNumber(expensesItem) || expensesItem.trim() == '');            
                 
              do {
                    (cost = prompt('Во сколько это обойдется?'));
              } while (!isNumber(cost));

            appData.expenses[expensesItem] = +cost;           
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
    },
    getInfoDeposit: function() {
       if(appData.deposit) {

         do {
            appData.percentDeposit = prompt('Какой годовой процент?');          
         } while (!isNumber(appData.percentDeposit));

          do {
            appData.moneyDeposit = +prompt('Какая сумма заложена');            
         } while (!isNumber(appData.moneyDeposit));
       }
    },
    calcSavedMoney: function() {
      return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getBudget();

let expensesAmount = appData.getExpensesMonth();

console.log('Расходы за месяц: ' +  expensesAmount);

console.log(appData.getTargetMonth());

console.log(appData.getStatusIncome());

appData.getInfoDeposit();

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
