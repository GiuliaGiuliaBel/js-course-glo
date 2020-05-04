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
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        //получить вложенные элементы в меню
        menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
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

// Второй вариант
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e){
//         e.preventDefault();

//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//             });
//         });
//     });
});        
    
