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

};

countTimer('1 May 2020');

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

});        
    