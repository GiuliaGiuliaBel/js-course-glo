window.addEventListener('DOMContentLoaded', () => {
    'use strict';

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

}  
 countTimer('1 May 2000');

 // меню
const toggleMenu = () => {
    
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = document.querySelectorAll('ul>li');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);  

    menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

};

toggleMenu();

//popup

//написать анимацию появления модального окна
const animateModal = () => {
  
        const popupContent = document.querySelectorAll('.popup-content');

    popupContent.forEach(elem => {
        let start = Date.now();
        let timer = setInterval(() => {
        let timePassed = Date.now() - start;

        if(timePassed >= 2000){
            clearInterval(timer);
            return;
        }

        draw(timePassed);
    }, 5);

    function draw(timePassed) {
        elem.style.left = timePassed / 4 + 'px';
        }
    }); 
};

window.addEventListener('resize', () => {
    const popup = document.querySelector('.popup'),
    popupContent = document.querySelector('.popup-content'),
      
            if(document.documentElement.clientWidth > 768){
             
                popup.style.display = 'block';
                    animateModal();                                            
                }else {
                    popupContent.removeAttribute('style')
                    popup.style.display = 'block';
                }  
});
  
const togglePopup = () => {
     const popup = document.querySelector('.popup'),
     popupContent = document.querySelectorAll('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close');
        
        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                if(document.documentElement.clientWidth > 768){
                    popup.style.display = 'block';
                    animateModal();
                    }
                    popup.style.display = 'block';                           
                    popupContent.style = 0;
            });
       }); 

        popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });  
};

togglePopup();
});        
    
    
