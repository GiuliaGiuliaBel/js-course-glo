'use strict';

let startBtn = document.getElementById('start');
let cancelBtn = document.getElementById('cancel');

let depositCheck = document.querySelector('#deposit-check');

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

//получаем 2 главных дива из разметки
let data = document.querySelector('.data');
let resultDiv = document.querySelector('.result');

let allInputText = data.querySelectorAll('input[type=text]');
let resultDivItems = resultDiv.querySelectorAll('input[type=text]');

// устанавливаем начальные значения свойства disabled
startBtn.disabled = true;
allInputText.disabled = false;

let expensesMonth,
    accumulatedMonth,
    budgetDay;
   
let expenses = [];

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

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();   
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
  
        this.getBudget();
        this.showResult();

        startBtn.style.display = "none";
        cancelBtn.style.display = "block";
        
        //Блокировать все input[type=text] 

        allInputText = data.querySelectorAll('input[type=text]');
        allInputText.forEach(item => {
            item.disabled = true;  
        });
        
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
    },
    showResult: function() {
        budgetMonthValue.value =  this.budgetMonth;   
        budgetDayValue.value = Math.round( this.budgetDay);
        expensesMonthValue.value =  this.expensesMonth;
        additionalExpensesValue.value =  this.addExpenses.join(', ');
        additionalIncomeValue.value =  this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil( this.getTargetMonth());
        incomePeriodValue.value =  this.calcSavedMoney();    
   
        periodSelect.addEventListener('input', () => { 
            incomePeriodValue.value =  appData.calcSavedMoney();
        });
    },
    // Метод reset должен всю программу возвращать в исходное состояние
    reset: function() {
        incomePlus.disabled = false;
        expensesPlus.disabled = false;
        allInputText.forEach(item => {
            item.disabled = false;  
            item.value = '';
        });  
        
        resultDivItems.forEach(item => {
            item.value = '';
        });
        
        incomeItems = document.querySelectorAll('.income-items');
        
        if(incomeItems.length > 1){
            incomeItems = Array.from(incomeItems).slice(1);
            incomeItems.forEach(item => {
                item.remove();
            })

            // показать кнопку
            incomePlus.style.display = 'block';
        }

        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length > 1){
            expensesItems = Array.from(expensesItems).slice(1);
            expensesItems.forEach(item => {
                item.remove();
            })
        // показать кнопку, нажатие по которой клонирует поля
            expensesPlus.style.display = 'block';
        };
          
          cancelBtn.style.display = 'none';
          startBtn.style.display = 'block';
          startBtn.disabled = false;
          allInputText.disabled = false;
        //  appData.start();
    },
    addExpensesBlock: function() {
        expensesItems = document.querySelectorAll('.expenses-items');
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        incomeItems = document.querySelectorAll('.income-items');
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach((item, index) => {
              let itemExpenses = item.querySelector('.expenses-title').value;
              let cashExpenses = item.querySelector('.expenses-amount').value;
              if (itemExpenses !== '' && cashExpenses !== '') {
                  appData.expenses[itemExpenses+index] = cashExpenses;
              }        
        })
    },
    getIncome: function() {
        incomeItems.forEach((item, index) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome+index] = cashIncome;
            }
        })
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '' ){
                this.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function() {
        additionalIncome.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        })
    },
    getExpensesMonth: function() {
        for(let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
        return  this.expensesMonth;
    },
    getIncomeMonth: function() {
        for(let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
        return  this.incomeMonth;
    },
    getBudget: function() {
        appData.budgetMonth =  appData.budget +  appData.incomeMonth -  appData.expensesMonth;
             
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function() {
        if (  this.budgetDay >= 1200 &&  this.budgetDay < 600) {
            return('У вас высокий уровень дохода');   
        } else if  ( this.budgetDay >= 600 &&  this.budgetDay < 1200) {
            return('У вас средний уровень дохода');
        } else if (  this.budgetDay < 600 &&  this.budgetDay >= 0) {
            return('К сожалению, ваш уровень дохода ниже среднего');   
        } else if (  this.budgetDay < 0) {
            return('Что-то пошло не так');
        }
    },
    getInfoDeposit: function() {
       if(  this.deposit) {

         do {
            this.percentDeposit = prompt('Какой годовой процент?');          
         } while (!isNumber(  this.percentDeposit));

          do {
            this.moneyDeposit = +prompt('Какая сумма заложена');            
         } while (!isNumber(  this.moneyDeposit));
       }
    },
    calcSavedMoney: function() {
      return appData.budgetMonth * periodSelect.value;
    }
};

salaryAmount.addEventListener('input', () => {
    if(salaryAmount.value.trim() !== '' && isNumber(salaryAmount.value)){
        startBtn.disabled = false;
    } else if (salaryAmount.value.trim() === '' && !isNumber(salaryAmount.value)){
        start.disabled = true;
    };   
})

// Привязать контекст вызова функции start к appData 
startBtn.addEventListener('click', appData.start.bind(appData));
// появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
cancelBtn.addEventListener('click', appData.reset.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', () => {  
    periodAmount.textContent = periodSelect.value;   
});

appData.getInfoDeposit();

