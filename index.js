'use strict';

let isNumber = function(n) {
   
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1400,
    period = 6,
    expensesMonth,
    accumulatedMonth,
    budgetDay,
    cost;

let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

addExpenses = addExpenses.toLowerCase().split(',');
console.log('addExpenses', addExpenses);

let expenses = [];

let getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) { 
    
        expenses[i] = prompt('Введите обязательную статью расходов');  
        do {
            (cost = prompt('Во сколько это обойдется?'));
         } while (!isNumber(cost));

        sum += +cost; 
    }         
    console.log('expenses ', expenses);    
    return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function() {
    return money - expensesAmount;
};

console.log('Расходы за месяц: ' +  expensesAmount);

accumulatedMonth = getAccumulatedMonth();

budgetDay = Math.floor(accumulatedMonth/30);
console.log(`Бюджет на день: ${budgetDay}`);

let getStatusIncome = function() {
    if (budgetDay >= 1200 && budgetDay < 600) {
        return('У вас высокий уровень дохода');   
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return('К сожалению, ваш уровень дохода ниже среднего');   
    } else if (budgetDay < 0) {
        return('Что-то пошло не так');
    }
};

console.log(getStatusIncome());

let getTargetMonth = function() {

 return Math.sign(mission/accumulatedMonth) === 1 ?
  `Цель будет достигнута через ${mission/accumulatedMonth} месяца(ев)`  :
     'Цель не будет достигнута';
};

console.log(getTargetMonth());
