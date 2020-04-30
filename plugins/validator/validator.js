class Validator{
    // деструктуризируем options
    // в pattern по умолчанию запишем пустой объект(если пользователь не передал данных, используем пустой объект)
    constructor({selector, pattern = {}, method}){
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
         // создать массив при помощи spread-оператора
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && 
            item.type !== 'button';
        });
        // переменная для записи ошибок. Присваиваем коллекцию. Если есть ошибки, тогда нужно запрещать submit
        this.error = new Set();
    }

    init(){ 
        this.applyStyle();      
        this.setPattern();    
        // забиндим с checkIt this, привяжем к форме
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', event => {
            if(this.error.size){
                event.preventDefault();
            }
        });
    }

    isValid(elem){
        
        const validatorMethod = {
            notEmpty(elem) {
                if(elem.value.trim() === ''){
                    return false;
                }
                return true;
            },
            pattern(elem, pattern){
                // метод test возвращает булево значение
                return pattern.test(elem.value);
            }
        };
        // в случае если пользователь не передал методы
        if(this.method) {
        // обратиться к свойствам объекта, Свойства названы по id элемента, который проверяем. Получим массив
        const method = this.method[elem.id];    
    
        // перебрать все массивы внутри полученного массива
        if(method) {
            return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
                //вызвать метод(тщеуьзен или pattern)
        }
    }else {
        console.warn('Для работы валидатора передайте id полей ввода и методы проверки полей');
    }
        
        // возвратить true, чтобы даже если пользователь ничего не передал, можно было отправлять submit
        // Другими словами, если пользователь передал несуществующий id нужно вернуть true, чтобы программа продолжила работу
        return true;
    }

    // Если Input прошел проверку на валидность, вызвать showSucces,  не прошел - showError
    checkIt(event){
        
       const target = event.target;   
       
       if(this.isValid(target)){
           this.showSuccess(target);
           //Даже если элемента не окажется в коллекции, ошибки не будет
           this.error.delete(target);
       } else {
           this.showError(target);
           // Добавить target к коллекцию. Коллекцию может хранить любой тип данных
           this.error.add(target);
       }
    //    console.log(this.error)
    }
    

    showError(elem){
        elem.classList.remove('success');
        elem.classList.add('error');
      
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        // после elem добавить errorDiv
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem){    
   
        elem.classList.remove('error');
        elem.classList.add('success');   
       
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            elem.nextElementSibling.remove();
        }
    }

    applyStyle(){
        const style = document.createElement('style');
        style.textContent = `
            input.success {
                border: 5px solid green !important
            }
            input.error {
                border: 5px solid red !important
            }
            .validator-error {
                font-size: 12px;
                font-family: sans-serif;
                color: red;
                z-index: 1;
                position: relative;  
            }
        `;
        document.head.appendChild(style);
    }

    setPattern(){
        // если пользователь передал паттерн с именем, как уже есть, использовать этот паттерн . Если нет - то свой
        
        this.pattern.phone = this.pattern.phone ? this.pattern.phone : /^\+?[78]([-()]*\d){10}$/;   

        if(!this.pattern.email){
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }  

         if(!this.pattern.name){
            this.pattern.name = /^[а-яА-Я]{3,}/;
        }   

         if(!this.pattern.message){
          this.pattern.message = /^[а-яА-Я\s]{20,}/;
        }        
    }
}
