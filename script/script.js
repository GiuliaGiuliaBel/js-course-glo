'use strict';

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');

const depositCheck = document.querySelector('#deposit-check');

const buttons = document.getElementsByTagName('button');

const incomePlus = buttons[0];
const expensesPlus = buttons[1];

// resultTotal 
let budgetMonthValue = document.getElementsByClassName('result-total budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0];

// получаем оставшиеся Input со страницы
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let additionalExpensesItem = document.querySelectorAll('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let allSumPlaceholders = document.querySelectorAll("[placeholder = 'Сумма']");
let allNamePlaceholders = document.querySelectorAll("[placeholder = 'Наименование']");

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

//получаем 2 главных дива из разметки
const data = document.querySelector('.data');
const resultDiv = document.querySelector('.result');

let allInputText = data.querySelectorAll('input[type=text]');
let resultDivItems = resultDiv.querySelectorAll('input[type=text]');

class AppData { 
    constructor() {
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
  }  
        
check() {
    startBtn.setAttribute('disabled', 'true');
    if(salaryAmount.value !== ''){
        startBtn.removeAttribute('disabled')
    }
};
start() {  
    if(salaryAmount.value === ''){
        startBtn.setAttribute('disabled', 'true')
    }

    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpInc();
    this.getBudget();
    this.showResult();

    startBtn.style.display = "none";
    cancelBtn.style.display = "block";
    
    //Блокировать все input[type=text] 

    allInputText = data.querySelectorAll('input[type=text]');
    allInputText.forEach(item => {
        item.setAttribute('disabled', 'true');  
    });
    
    incomePlus.setAttribute('disabled', 'true');
    expensesPlus.setAttribute('disabled', 'true');
    startBtn.setAttribute('disabled', 'true');
};

showResult(){   
    budgetMonthValue.value = this.budgetMonth;   
    budgetDayValue.value = Math.round(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();    
    periodSelect.addEventListener('input', () => { 
        incomePeriodValue.value = this.calcSavedMoney();
    });
};
reset() { 

    incomePlus.removeAttribute('disabled');
    expensesPlus.removeAttribute('disabled');
    allInputText.forEach(item => {
        item.removeAttribute('disabled');
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
        });

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
       startBtn.removeAttribute('disabled');
       allInputText.forEach(item => {
        item.removeAttribute('disabled');
        item.value = '';
    });
    
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
addBlock() {   
  
    const cloneItem = item => {
        console.log(item);
        
        const expincStr = item.className.split('-')[0];
        let expincomeItems = document.querySelectorAll(`.${expincStr}-items`);
        let cloneIncomeItem = expincomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector(`.${expincStr}-title`).value = '';
        cloneIncomeItem.querySelector(`.${expincStr}-amount`).value = '';  
    
        expincomeItems[0].parentNode.insertBefore(cloneIncomeItem, `${expincStr}Plus`);
        expincomeItems = document.querySelectorAll(`.${expincStr}-items`);
        
        if(expincomeItems.length === 3){
            
            `${expincStr}Plus`.style.display = 'none';
        }      
    };
   
    incomeItems.forEach(cloneItem);
    expensesItems.forEach(cloneItem);
};
getExpInc() {
   const count = (item, index) => {
        const startStr = item.className.split('-')[0];
        
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;

        if (itemTitle !== '' && itemAmount !== '') {
            this[startStr][itemTitle+index] = itemAmount;
        }        
    };
    incomeItems.forEach(count);
    console.log(expensesItems);
    
    expensesItems.forEach(count);
    for(let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
getAddExpInc() {
 
    const count = item => {
  
        const addexpincStr = item.className.split('_')[1].split('-')[0][0].toUpperCase() +  
            item.className.split('_')[1].split('-')[0].slice(1);
        
        console.log(addexpincStr);
    
        let itemValue = item.value.trim();
                if (itemValue !== ''){
                    this.add`${addexpincStr}`.push(itemValue);
                }
    };
    
    additionalIncomeItem.forEach(count);
    additionalExpensesItem.forEach(count);
};
getExpensesMonth() {
    for(let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;        
    this.budgetDay = Math.floor(this.budgetMonth/30);
};
getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
};
getStatusIncome() {
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
getInfoDeposit() {
   if(  this.deposit) {
     do {
        this.percentDeposit = prompt('Какой годовой процент?');          
     } while (!isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = +prompt('Какая сумма заложена');            
     } while (!isNumber(this.moneyDeposit));
   }
};
calcSavedMoney() {
  return this.budgetMonth * periodSelect.value;
};
keypressFuncSum = e => {
    if (event.keyCode != 43 && event.keyCode < 48 || event.keyCode > 57)
    e.preventDefault();
};
doRussian = () => { 
    let englishAlphabet = /[A-Za-z]|[0-9]/g;
    let key = String.fromCharCode(event.which);
    if (event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || englishAlphabet.test(key)) {
       event.preventDefault()
        return true;
    }
        return false;
};
addEventListeners() {
    salaryAmount.addEventListener('input', () => {
        if(salaryAmount.value.trim() !== '' && isNumber(salaryAmount.value)){
            startBtn.removeAttribute('disabled');  
        } else if (salaryAmount.value.trim() === '' && !isNumber(salaryAmount.value)){
            startBtn.setAttribute('disabled', 'true');  
        };   
    });  
    
    startBtn.addEventListener('click', this.start.bind(this));
    // появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
    cancelBtn.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addBlock.bind(this));
    incomePlus.addEventListener('click', this.addBlock.bind(this));
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
}
};

const appData = new AppData();
appData.check();
appData.addEventListeners();

// 'use strict';

// const startBtn = document.getElementById('start');
// const cancelBtn = document.getElementById('cancel');
// const depositCheck = document.querySelector('#deposit-check');
// const buttons = document.getElementsByTagName('button');

// const incomePlus = buttons[0];
// const expensesPlus = buttons[1];

// // resultTotal 
// let budgetMonthValue = document.getElementsByClassName('result-total budget_month-value')[0];
// let budgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0];
// let expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0];
// let additionalIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0];
// let additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0];
// let incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0];
// let targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0];

// const salaryAmount = document.querySelector('.salary-amount');
// const incomeTitle = document.querySelector('.income-title');
// const incomeAmount = document.querySelector('.income-amount');
// let expensesTitle = document.querySelector('.expenses-title');
// let expensesItems = document.querySelectorAll('.expenses-items');
// let incomeItems = document.querySelectorAll('.income-items');
// let additionalExpensesItem = document.querySelector('.additional_expenses-item');
// let depositAmount = document.querySelector('.deposit-amount');
// let depositPercent = document.querySelector('.deposit-percent');
// let targetAmount = document.querySelector('.target-amount');
// let periodSelect = document.querySelector('.period-select');
// let periodAmount = document.querySelector('.period-amount');
// let additionalIncomeItems = document.querySelectorAll('.additional_income-item');

// let allSumPlaceholders = document.querySelectorAll("[placeholder = 'Сумма']");
// let allNamePlaceholders = document.querySelectorAll("[placeholder = 'Наименование']");

// const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

// const data = document.querySelector('.data');
// const resultDiv = document.querySelector('.result');

// let allInputText = data.querySelectorAll('input[type=text]');
// let resultDivItems = resultDiv.querySelectorAll('input[type=text]');

// class AppData { 
//     constructor() {
//         this.income = {};
//         this.incomeMonth = 0;
//         this.addIncome = [];
//         this.expenses = {};
//         this.addExpenses = [];
//         this.deposit = false;
//         this.percentDeposit = 0;
//         this.moneyDeposit = 0;
//         this.budget = 0;
//         this.budgetDay = 0;
//         this.budgetMonth = 0;
//         this.expensesMonth = 0;
//  }        
// check() {
//     startBtn.setAttribute('disabled', 'true');
//     if(salaryAmount.value !== ''){
//         startBtn.removeAttribute('disabled')
//     }
// };
// start() {  
//     if(salaryAmount.value === ''){
//         startBtn.setAttribute('disabled', 'true')
//     }
//     this.budget = +salaryAmount.value;
//     this.getExpenses();
//     this.getIncome();   
//     this.getExpensesMonth();
//     this.getIncomeMonth();
//     this.getAddExpenses();
//     this.getAddIncome();
//     this.getBudget();
//     this.showResult();

//     startBtn.style.display = "none";
//     cancelBtn.style.display = "block";
    
//     //Блокировать все input[type=text] 

//     allInputText = data.querySelectorAll('input[type=text]');
//     allInputText.forEach(item => {
//         item.setAttribute('disabled', 'true');  
//     });
    
//     incomePlus.setAttribute('disabled', 'true');
//     expensesPlus.setAttribute('disabled', 'true');
//     startBtn.setAttribute('disabled', 'true');
// };
// showResult(){   
//     budgetMonthValue.value = this.budgetMonth;   
//     budgetDayValue.value = Math.round(this.budgetDay);
//     expensesMonthValue.value = this.expensesMonth;
//     additionalExpensesValue.value = this.addExpenses.join(', ');
//     additionalIncomeValue.value = this.addIncome.join(', ');
//     targetMonthValue.value = Math.ceil(this.getTargetMonth());
//     incomePeriodValue.value = this.calcSavedMoney();    
//     periodSelect.addEventListener('input', () => { 
//         incomePeriodValue.value = this.calcSavedMoney();
//     });
// };
// reset() { 

//     incomePlus.removeAttribute('disabled');
//     expensesPlus.removeAttribute('disabled');
//     allInputText.forEach(item => {
//         item.removeAttribute('disabled');
//         item.value = '';
//     });  
   
//     resultDivItems.forEach(item => {
//         item.value = '';
//     });
    
//     incomeItems = document.querySelectorAll('.income-items');
    
//     if(incomeItems.length > 1){
//         incomeItems = Array.from(incomeItems).slice(1);
//         incomeItems.forEach(item => {
//             item.remove();
//         })
//         incomePlus.style.display = 'block';
//     }

//     expensesItems = document.querySelectorAll('.expenses-items');
//     if(expensesItems.length > 1){
//         expensesItems = Array.from(expensesItems).slice(1);
//         expensesItems.forEach(item => {
//             item.remove();
//         })
//         expensesPlus.style.display = 'block';
//     };      
//        cancelBtn.style.display = 'none';
//        startBtn.style.display = 'block';
//        startBtn.removeAttribute('disabled');
//        allInputText.forEach(item => {
//         item.removeAttribute('disabled');
//         item.value = '';
//     });   
//     this.income = {};
//     this.incomeMonth = 0;
//     this.addIncome = [];
//     this.expenses = {};
//     this.addExpenses = [];
//     this.deposit = false;
//     this.percentDeposit = 0;
//     this.moneyDeposit = 0;
//     this.budget = 0;
//     this.budgetDay = 0;
//     this.budgetMonth = 0;
//     this.expensesMonth = 0;
// };
// addExpensesBlock() {   
//     expensesItems = document.querySelectorAll('.expenses-items');
//     let cloneExpensesItem = expensesItems[0].cloneNode(true);

//     // Реализовать так, чтобы инпуты добавлялись пустые без value при добавлении новых полей в обязательных расходах
//     cloneExpensesItem.querySelector('.expenses-title').value = '';
//     cloneExpensesItem.querySelector('.expenses-amount').value = '';
//     expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
//     expensesItems = document.querySelectorAll('.expenses-items');
//     if(expensesItems.length === 3){
//         expensesPlus.style.display = 'none';
//     }

//     // Поля с placeholder="Сумма" разрешить ввод только цифр

//     allSumPlaceholders = document.querySelectorAll("[placeholder = 'Сумма']");
//     allSumPlaceholders.forEach(item => {
//          item.addEventListener('keypress', this.keypressFuncSum);
//     });

// /********************************************************************/
// // Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
//     allNamePlaceholders = document.querySelectorAll("[placeholder = 'Наименование']");
//     allNamePlaceholders.forEach(item => {
//         item.addEventListener('keypress', this.doRussian);
//          })
//     };
// addIncomeBlock() {   
//     incomeItems = document.querySelectorAll('.income-items');
//     let cloneIncomeItem = incomeItems[0].cloneNode(true);

//     //Реализовать так, чтобы инпуты добавлялись пустые без value при добавлении новых полей в дополнительных доходах 
//     cloneIncomeItem.querySelector('.income-title').value = '';
//     cloneIncomeItem.querySelector('.income-amount').value = '';
//     incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
//     incomeItems = document.querySelectorAll('.income-items');
//     if(incomeItems.length === 3){
//         incomePlus.style.display = 'none';
//     }

//     // Поля с placeholder="Сумма" разрешить ввод только цифр
//     allSumPlaceholders = document.querySelectorAll("[placeholder = 'Сумма']").forEach(item => {
//          item.addEventListener('keypress', this.keypressFuncSum);
//     });
//     //********************************************************************/
//     // Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
//     allNamePlaceholders = document.querySelectorAll("[placeholder = 'Наименование']").forEach(item => {
//          item.addEventListener('keypress', this.doRussian);
//     })
// };
// getExpenses() {
//     expensesItems.forEach((item, index) => {
//           let itemExpenses = item.querySelector('.expenses-title').value;
//           let cashExpenses = item.querySelector('.expenses-amount').value;
//           if (itemExpenses !== '' && cashExpenses !== '') {
//               this.expenses[itemExpenses+index] = cashExpenses;
//           }        
//     })
// };
// getIncome() {
//     incomeItems.forEach((item, index) => {
//         let itemIncome = item.querySelector('.income-title').value;
//         let cashIncome = item.querySelector('.income-amount').value;
//         if (itemIncome !== '' && cashIncome !== '') {
//             this.income[itemIncome+index] = cashIncome;
//         }
//     })
// };
// getAddExpenses() {
//     let addExpenses = additionalExpensesItem.value.split(',');
//     addExpenses.forEach(item => {
//         item = item.trim();
//         if (item !== '' ){
//             this.addExpenses.push(item);
//         }
//     })
// };
// getAddIncome() {
//     additionalIncomeItems.forEach(item => {
//         let itemValue = item.value.trim();
//         if (itemValue !== ''){
//             this.addIncome.push(itemValue);
//         }
//     })
// };
// getExpensesMonth() {
//     for(let key in this.expenses) {
//         this.expensesMonth += +this.expenses[key];
//     }
// };
// getIncomeMonth() {
//     for(let key in this.income) {
//         this.incomeMonth += +this.income[key];
//     }
// };
// getBudget() {
//     this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;        
//     this.budgetDay = Math.floor(this.budgetMonth/30);
// };
// getTargetMonth() {
//     return targetAmount.value / this.budgetMonth;
// };
// getStatusIncome() {
//     if ( this.budgetDay >= 1200 &&  this.budgetDay < 600) {
//         return('У вас высокий уровень дохода');   
//     } else if  ( this.budgetDay >= 600 &&  this.budgetDay < 1200) {
//         return('У вас средний уровень дохода');
//     } else if ( this.budgetDay < 600 &&  this.budgetDay >= 0) {
//         return('К сожалению, ваш уровень дохода ниже среднего');   
//     } else if ( this.budgetDay < 0) {
//         return('Что-то пошло не так');
//     }
// };
// getInfoDeposit() {
//    if(  this.deposit) {
//      do {
//         this.percentDeposit = prompt('Какой годовой процент?');          
//      } while (!isNumber(this.percentDeposit));

//       do {
//         this.moneyDeposit = +prompt('Какая сумма заложена');            
//      } while (!isNumber(this.moneyDeposit));
//    }
// };
// calcSavedMoney() {
//   return this.budgetMonth * periodSelect.value;
// };
// keypressFuncSum = e => {
//     if (event.keyCode != 43 && event.keyCode < 48 || event.keyCode > 57)
//     e.preventDefault();
// };
// doRussian = () => { 
//     let englishAlphabet = /[A-Za-z]|[0-9]/g;
//     let key = String.fromCharCode(event.which);
//     if (event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || englishAlphabet.test(key)) {
//        event.preventDefault()
//         return true;
//     }
//         return false;
// };
// addEventListeners() {
//     salaryAmount.addEventListener('input', () => {
//         if(salaryAmount.value.trim() !== '' && isNumber(salaryAmount.value)){
//             startBtn.removeAttribute('disabled');  
//         } else if (salaryAmount.value.trim() === '' && !isNumber(salaryAmount.value)){
//             startBtn.setAttribute('disabled', 'true');  
//         };   
//     });     
//     startBtn.addEventListener('click', this.start.bind(this));
//     // появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
//     cancelBtn.addEventListener('click', this.reset.bind(this));
//     expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
//     incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
//     periodSelect.addEventListener('input', () => {  
//         periodAmount.textContent = periodSelect.value;   
//     });
//     // Поля с placeholder="Сумма" разрешить ввод только цифр
//     allSumPlaceholders = document.querySelectorAll("[placeholder = 'Сумма']").forEach(item => {
//         item.addEventListener('keypress', this.keypressFuncSum);
//    });
//    //********************************************************************/
//    // Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
//    allNamePlaceholders = document.querySelectorAll("[placeholder = 'Наименование']").forEach(item => {
//         item.addEventListener('keypress', this.doRussian);
//    });  
//  }
// };

// const appData = new AppData();
// appData.check();
// appData.addEventListeners();

