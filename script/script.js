window.addEventListener('DOMContentLoaded', () => {
  
    'use strict';
    
    const style = document.createElement('style');
    style.textContent = `
            .preloader {
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 1001;
              }
              
              .preloader__row {
                position: relative;
                top: 50%;
                left: 50%;
                width: 70px;
                height: 70px;
                margin-left: -35px;
                text-align: center;
                animation: preloader-rotate 2s infinite linear;
              }
              
              .preloader__item {
                position: absolute;
                display: inline-block;
                top: 0;
                background-color: #337ab7;
                border-radius: 100%;
                width: 35px;
                height: 35px;
                animation: preloader-bounce 2s infinite ease-in-out;
              }
              
              .preloader__item:last-child {
                top: auto;
                bottom: 0;
                animation-delay: -1s;
              }
              
              @keyframes preloader-rotate {
                100% {
                  transform: rotate(360deg);
                }
              }
              
              @keyframes preloader-bounce {
              
                0%,
                100% {
                  transform: scale(0);
                }
              
                50% {
                  transform: scale(1);
                }
              }
              
              .loaded_hiding .preloader {
                transition: 0.3s opacity;
                opacity: 0;
              }
              
              .loaded .preloader {
                display: none;
              }`;

    document.head.append(style)
    function countTimer(deadline) {
        //получить элементы со страницы
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');        

    function getTimeRemaining(){
      
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime();
           
            if(dateNow > dateStop){
                clearInterval(updateClock, 1000)
                return { 'hours' : 0, 'minutes': 0, 'seconds': 0 };
            }

        let timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),        
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            timerHours.textContent = hours;
            timerMinutes.textContent = minutes;
            timerSeconds.textContent = seconds;
            return { timeRemaining, hours, minutes, seconds }                                                 
    }
     
    function prependZero(timerValue){
        if(timerValue <= 9){
            return '0' + timerValue;
        }return timerValue;
    }

    function updateClock(){
    let timer = getTimeRemaining();
         timerHours.textContent = prependZero(timer.hours);
         timerMinutes.textContent = prependZero(timer.minutes);
         timerSeconds.textContent = prependZero(timer.seconds);

         if(timer.timeRemaining > 0) {
             setInterval(updateClock, 1000); 
    }
  }
  
   updateClock();

};

countTimer('1 May 2000');

const toggleMenu = () => {
    const menu = document.querySelector('menu');

    document.body.addEventListener('click', (e) => {
        let target = e.target;
        
        if(target.closest('.menu')){
            menu.classList.add('active-menu')
        }
        else {
            menu.classList.remove('active-menu')
        }           
    });
       
};
 
 toggleMenu();

 let count = 0;
 let idInter;
 let animatePopup = function animate() {
   
    idInter = requestAnimationFrame(animatePopup);
     const popup = document.querySelector('.popup'),
     popupContent = popup.querySelector('.popup-content');
   
     count++;    
      
         if((popupContent.style.left.slice(0, popupContent.style.left.length-2)) < (popup.clientWidth/2.5)){        
             popupContent.style.left = count*15 + 'px';
         }else{
             cancelAnimationFrame(idInter);
             count = 0;
         }
 }; 

 // табы

const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
        tab = tabHeader.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', e => {
            let target = e.target;
            while(target !== tabHeader){
                if(target.classList.contains('service-header-tab')){
                    tab.forEach((item, i) => {
                         if(item === target){
                            toggleTabContent(i);                  
                         }
                    });  
                    return;          
                 }
                 target = target.parentNode;
            }         
        });
};
tabs();

//scroll
  const scrollFunc = e => {
    const anchor = event.currentTarget.href.split('#')[1];
    console.log(anchor);
        
    const target = document.querySelector(`#${anchor}`);

    if (target) {
        e.preventDefault();
        const targetTop = target.getBoundingClientRect().y;

        function animate({duration, timing, draw}) {
            const start = performance.now();
            
            requestAnimationFrame(function animate(time) {
              
                 // timeFraction изменяется от 0 до 1
                let timeFraction = (time - start) / duration;
                
                // вычисление текущего состояния анимации
                let progress = timing(timeFraction);
    
                draw(progress); // отрисовать её
    
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        }
        
        animate({
            duration: 300,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                if (document.documentElement.scrollTop < (progress * targetTop)) {
                    document.documentElement.scrollTop = progress * targetTop;
                }
            }
        });
    }
};
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(item => item.addEventListener('click', scrollFunc));

const showNextSlideScroll = (elem) => {
    document.querySelector('#' + elem.href.split('#')[1]).scrollIntoView({
        behavior: 'smooth'
    });
}

const scrollNextSlide = (selectorName) => {
    const elemToScroll = document.querySelector(selectorName);
    elemToScroll.addEventListener('click', (e) => {
        e.preventDefault();
        showNextSlideScroll(elemToScroll);
    })
}
  scrollNextSlide('a[href="#service-block"]');
  
 //popup
 const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = popup.querySelector('.popup-content'),
        popupClose = document.querySelector('.popup-close');
      
        popupBtn.forEach(elem => {
          
            elem.addEventListener('click', () => {
                if(document.documentElement.clientWidth > 768){
                    popup.style.display = 'block';
                    idInter = requestAnimationFrame(animatePopup);
                }  
                popup.style.display = 'block';
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            popupContent.removeAttribute('style');
        });
 };
 togglePopup();


 // слайдер
 const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
        portfolioDots = document.querySelector('.portfolio-dots'),
        slider = document.querySelector('.portfolio-content');  
        
        for(let i = 0; i < slide.length; i++){
            portfolioDots.insertAdjacentHTML('beforeend', `<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>`);                            
        };

        const dot = document.querySelectorAll('.dot');
        //задать переменную для активного слайда. Он будет меняться, поэтому задаем 0
            let currentSlide = 0,
                interval;
            
            // вынести смену класса в отдельные функции
            const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            };

            const nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };

            const autoPlaySlide = () => {
                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');
                currentSlide++;
                if(currentSlide >= slide.length){
                    currentSlide = 0;
                }
                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');              
            };

            // вызвать autoPlaySlide через каждые 2 секунды
            // добавить значение time по умолчанию
            const startSlide = (time = 2000) => {
                // к интервалу присваиваем счетсчик setInterval
                interval = setInterval(autoPlaySlide, time)
            };

            const stopSlide = () => {
                clearInterval(interval)
            };

            //реализовать логику переключения по нажатию по точкам и стрелкам

            slider.addEventListener('click', e => {
                // чтобы не переходить на верх страницы 
                e.preventDefault();

                let target = e.target;

                if(!target.matches('.portfolio-btn, .dot')){
                    return;
                }

                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');
                // метод matches вернет true или false в зависимости от того, соответствует
                // ли элемент указанному селектору
                if(target.matches('#arrow-right')){
                    currentSlide++;                  
                }else if(target.matches('#arrow-left')){
                    currentSlide--;
                }else if(target.matches('.dot')){
                    dot.forEach((elem, index) => {
                        //если элемент(точка)равен таргет, то индекс этой точки присвоить к текущему слайду 
                        if(elem === target){
                            currentSlide = index;
                        }
                    });
                }
                if(currentSlide >= slide.length){
                    currentSlide = 0;
                }

                if(currentSlide < 0){
                    currentSlide = slide.length - 1;
                }

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');           
                
            });

            slider.addEventListener('mouseover', (e) => {
                if(e.target.matches('.portfolio-btn') || 
                e.target.matches('.dot')){
                    stopSlide();
                }
            });

            slider.addEventListener('mouseout', (e) => {
                if(e.target.matches('.portfolio-btn') || 
                e.target.matches('.dot')){
                    startSlide();
                }
            });


            startSlide(2000);
           
    };

 slider();
 
 // менять изображения при наведении курсора
 const changeImages = () => {

    const commandImages = document.querySelectorAll('#command .row img');
    let variableToKeepFotoTemporarily;

    commandImages.forEach(elem => {
    
      elem.addEventListener('mouseover', e => {
        let target = e.target;
        variableToKeepFotoTemporarily = target.src;
        target.src = target.getAttribute('data-img');     
      });

      elem.addEventListener('mouseout', e => {      
        let target = e.target;
        target.src = variableToKeepFotoTemporarily;
      });
    });   
  };

  changeImages();

  //разрешить ввод только цифр в поля input type='number'
  
  const allowOnlyNumbers = () => {

    const inputTypeNumberElems = document.querySelectorAll('input[type="number"]');

    inputTypeNumberElems.forEach(elem => {
        elem.addEventListener('input', e => {
        
        let target = e.target;     
        
       // если не цифры - заменяем на ''
       target.value = target.value.replace(/[^\d]/g, '');   
        });
    });
  }; 

  allowOnlyNumbers();
  
  // калькулятор

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

  const countSum = () => {
  
       let total = 0,
       countValue = 1,
       dayValue = 1;
       // const, так как каждый раз создается новая переменная при срабатывании этого события
       const typeValue = calcType.options[calcType.selectedIndex].value,
            //строку преобразуем в число
             squareValue = calcSquare.value;

             if(calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10;
             }

             if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
              } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
              }

             if(typeValue && squareValue){
                 total = price * typeValue * squareValue * countValue * dayValue;
             } 

             totalValue.textContent = Math.round(total);

  };

        //если что-то меняется на инпутах, селектах
    calcBlock.addEventListener('change', e => {
        const target = e.target;
       
        if(target.matches('select') || target.matches('input')){
            countSum();    
        }        
    });
  };

  calc(100);

  //send ajax-form

  const sendForm = (formId) => {
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо, мы с вами скоро свяжемся.';
    
        const form = document.getElementById(formId);

        // создать прелоадер
        const preloader = document.createElement('div');
        preloader.classList.add('preloader');
        const preloaderRow = document.createElement('div');
        preloaderRow.classList.add('preloader__row');
        const preloaderItem= document.createElement('div');
        preloaderItem.classList.add('preloader__item');
        const preloaderItem2= document.createElement('div');
        preloaderItem2.classList.add('preloader__item');

        preloaderRow.append(preloaderItem);
        preloaderRow.append(preloaderItem2);

        preloader.append(preloaderRow);

        let allInputs = form.querySelectorAll('input');

        const validateInput = (input) => {
            input.addEventListener('input', event => {
                event.target.value = event.target.value.replace(/[^а-я ]/gi, '');
            });
        };

        allInputs.forEach(item => {
            
            if(item.name === 'user_phone'){
                let inputPhone = form.querySelector('input[name=user_phone]');
                inputPhone.addEventListener('input', event => {
                    event.target.value = event.target.value.replace(/[^\d+]/g, '');  
                });                            
            }
            if(item.name === 'user_name' ){
                let inputName = form.querySelector('input[name=user_name]');
                validateInput(inputName);
            }
            if(item.name === 'user_message'){
                let inputMessage = form.querySelector('input[name=user_message]');
                validateInput(inputMessage);    
            }
        });
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();
         
            preloader.classList.add('loaded');
            form.appendChild(preloader);
            const formData = new FormData(form);
                 
            let body = {};    
            
            formData.forEach((val, key) => {
                body[key] = val;
            });
        
            const outputData = () => {
                preloader.classList.remove('loaded');
                preloader.textContent = successMessage;
                document.getElementById(formId).reset();
            };

        const postData = (body) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
    
                    if(request.readyState !== 4) {
                        return;
                    }
    
                    if(request.status === 200) {
                        resolve();
                      
                    } else {
                        reject(request.statusText);
                       
                    }
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application-json');
        
                request.send(JSON.stringify(body));          
               
            });     
        }

        postData(body)
            .then(outputData)
            .catch(error => {
                preloader.classList.remove('loaded');
                preloader.textContent = errorMessage;
            });
        });   
  };


sendForm('form1');
sendForm('form2');
sendForm('form3');

});      
