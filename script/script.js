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

let allSumPlaceholders = document.querySelectorAll("[placeholder = 'Сумма']");
let allNamePlaceholders = document.querySelectorAll("[placeholder = 'Наименование']");

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

const AppData = function() {   
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
};

AppData.prototype.check = function(){
    if(salaryAmount.value !== ''){
        startBtn.removeAttribute('disabled')
    }
};

AppData.prototype.start = function(){  
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
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value =  this.budgetMonth;   
    budgetDayValue.value = Math.round(this.budgetDay);
    expensesMonthValue.value =  this.expensesMonth;
    additionalExpensesValue.value =  this.addExpenses.join(', ');
    additionalIncomeValue.value =  this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil( this.getTargetMonth());
    incomePeriodValue.value =  this.calcSavedMoney();    
    periodSelect.addEventListener('input', () => { 
        incomePeriodValue.value = _this.calcSavedMoney();
    });
};

AppData.prototype.reset = function() {
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
};
AppData.prototype.addExpensesBlock = function() {
    expensesItems = document.querySelectorAll('.expenses-items');
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    // Реализовать так, чтобы инпуты добавлялись пустые без value при добавлении новых полей в обязательных расходах
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }

    // Поля с placeholder="Сумма" разрешить ввод только цифр

    allSumPlaceholders = document.querySelectorAll("[placeholder = 'Сумма']");
    allSumPlaceholders.forEach(item => {
         item.addEventListener('keypress', this.keypressFuncSum);
    });

/********************************************************************/
// Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
    allNamePlaceholders = document.querySelectorAll("[placeholder = 'Наименование']");
    allNamePlaceholders.forEach(item => {
        item.addEventListener('keypress', this.doRussian);
         })
    };
AppData.prototype.addIncomeBlock = function(){
    incomeItems = document.querySelectorAll('.income-items');
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    //Реализовать так, чтобы инпуты добавлялись пустые без value при добавлении новых полей в дополнительных доходах 
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        incomePlus.style.display = 'none';
    }

    // Поля с placeholder="Сумма" разрешить ввод только цифр
    allSumPlaceholders = document.querySelectorAll("[placeholder = 'Сумма']").forEach(item => {
         item.addEventListener('keypress', this.keypressFuncSum);
    });
    //********************************************************************/
    // Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
    allNamePlaceholders = document.querySelectorAll("[placeholder = 'Наименование']").forEach(item => {
         item.addEventListener('keypress', this.doRussian);
    })
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach((item, index) => {
          let itemExpenses = item.querySelector('.expenses-title').value;
          let cashExpenses = item.querySelector('.expenses-amount').value;
          if (itemExpenses !== '' && cashExpenses !== '') {
              _this.expenses[itemExpenses+index] = cashExpenses;
          }        
    })
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach((item, index) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome+index] = cashIncome;
        }
    })
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(item => {
        item = item.trim();
        if (item !== '' ){
            _this.addExpenses.push(item);
        }
    })
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncome.forEach(item => {
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    })
};
AppData.prototype.getExpensesMonth = function() {
    for(let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
    }
    return this.expensesMonth;
};
AppData.prototype.getIncomeMonth = function() {
    for(let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
    }
    return this.incomeMonth;
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;        
    this.budgetDay = Math.floor(this.budgetMonth/30);
};
AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function() {
    if ( this.budgetDay >= 1200 &&  this.budgetDay < 600) {
        return('У вас высокий уровень дохода');   
    } else if  ( this.budgetDay >= 600 &&  this.budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if ( this.budgetDay < 600 &&  this.budgetDay >= 0) {
        return('К сожалению, ваш уровень дохода ниже среднего');   
    } else if ( this.budgetDay < 0) {
        return('Что-то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function() {
   if(  this.deposit) {
     do {
        this.percentDeposit = prompt('Какой годовой процент?');          
     } while (!isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = +prompt('Какая сумма заложена');            
     } while (!isNumber(this.moneyDeposit));
   }
};
AppData.prototype.calcSavedMoney = function() {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.keypressFuncSum = e => {
    if (event.keyCode != 43 && event.keyCode < 48 || event.keyCode > 57)
    e.preventDefault();
};
AppData.prototype.doRussian = () => { 
    let englishAlphabet = /[A-Za-z]|[0-9]/g;
    let key = String.fromCharCode(event.which);
    if (event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || englishAlphabet.test(key)) {
       event.preventDefault()
        return true;
    }
        return false;
};
AppData.prototype.addEventListeners = function() {
    salaryAmount.addEventListener('input', () => {
        if(salaryAmount.value.trim() !== '' && isNumber(salaryAmount.value)){
            startBtn.disabled = false;
        } else if (salaryAmount.value.trim() === '' && !isNumber(salaryAmount.value)){
            start.disabled = true;
        };   
    });  
    
    startBtn.addEventListener('click', appData.start.bind(appData));
    // появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
    cancelBtn.addEventListener('click', appData.reset.bind(appData));
    expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
    incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
    periodSelect.addEventListener('input', () => {  
        periodAmount.textContent = periodSelect.value;   
    });
    // Поля с placeholder="Сумма" разрешить ввод только цифр
    allSumPlaceholders = document.querySelectorAll("[placeholder = 'Сумма']").forEach(item => {
        item.addEventListener('keypress', this.keypressFuncSum);
   });
   //********************************************************************/
   // Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
   allNamePlaceholders = document.querySelectorAll("[placeholder = 'Наименование']").forEach(item => {
        item.addEventListener('keypress', this.doRussian);
   });  
};

const appData = new AppData();
appData.check();
appData.addEventListeners();

