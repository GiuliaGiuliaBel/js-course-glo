'use strict';

let money, 
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1400,
    period = 6,
    expensesMonth,
    accumulatedMonth,
    budgetDay;

do {
  money = parseInt(prompt('Ваш месячный доход?'));
// проверяю money на NaN и 0 - единственные ложные значения, которые может вернуть parseInt
} while (!money);

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

addExpenses = addExpenses.toLowerCase().split(',');
console.log('addExpenses', addExpenses);

let expenses1 = prompt('Введите обязательную статью расходов'),
    expenses2 = prompt('Введите обязательную статью расходов'),
    amount1 = +prompt('Во сколько это обойдется?'),
    amount2 = +prompt('Во сколько это обойдется?');

const getExpensesMonth = (amount1, amount2) => {
    return amount1 + amount2;
};

const getAccumulatedMonth = (money, expensesMonth) => {
    return money - expensesMonth;
};

expensesMonth = getExpensesMonth(amount1, amount2);
console.log('Вызов getExpensesMonth: ', expensesMonth);

accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

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

const getTargetMonth = (mission, accumulatedMonth) => {
    return mission/accumulatedMonth;
};

console.log('Результат вызова getTargetMonth:', getTargetMonth(mission, accumulatedMonth));
