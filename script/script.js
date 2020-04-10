'use strict';

let startBtn = document.getElementById('start');

let depositCheck = document.querySelector('#deposit-check');

// Работаем с NodeList
// Метод querySelectorAll() Document возвращает статический (не динамический) NodeList, содержащий все найденные элементы документа, которые соответствуют указанному селектору.
let additionalIncome = document.querySelectorAll('.additional_income-item');

let buttons = document.getElementsByTagName('button');

let incomePlus = buttons[0];
let expensesPlus = buttons[1];

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
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

let isNumber = function(n) {
   
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let expensesMonth,
    accumulatedMonth,
    budgetDay;

let expenses = [];
//  по умолчанию кнопка disabled
startBtn.disabled = true; 

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    mission: 1400,
    start: function() {          
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();   
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
  
        appData.getBudget();
        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;

    // 3) Округлить вывод дневного бюджета
        
        budgetDayValue.value = Math.round(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
    
    // 5) Добавить обработчик события внутри метода showResult, 
        periodSelect.addEventListener('input', () => { 
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
    addExpensesBlock: function() {
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },

    // 2) Создать метод addIncomeBlock аналогичный addExpensesBlock
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(item => {
              let itemExpenses = item.querySelector('.expenses-title').value;
              let cashExpenses = item.querySelector('.expenses-amount').value;
              if (itemExpenses !== '' && cashExpenses !== '') {
                  appData.expenses[itemExpenses] = cashExpenses;
              }        
        })
    },

    // 1)  Переписать метод getIncome аналогично getExpenses
    getIncome: function() {
        incomeItems.forEach(item => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        })
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '' ){
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function() {
        additionalIncome.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        })
    },
    getExpensesMonth: function() {
        for(let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
        return appData.expensesMonth;
    },
    getIncomeMonth: function() {
        for(let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
        return appData.incomeMonth;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
             
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
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
      return appData.budgetMonth * periodSelect.value;
    }
};

startBtn.addEventListener('click', appData.start);

//  6) Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой, проверку поля Месячный доход в методе Start убрать.

salaryAmount.addEventListener('input', () => {
    if(salaryAmount.value.trim() !== '' && isNumber(salaryAmount.value)){
        startBtn.disabled = false;
    } else if (salaryAmount.value.trim() === '' && !isNumber(salaryAmount.value)){
        start.disabled = true;
    };   
})

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', () => {  
    periodAmount.textContent = periodSelect.value;   
});

appData.getInfoDeposit();
