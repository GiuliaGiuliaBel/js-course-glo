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
 countTimer('1 May 2020');
    
 //меню
 
 const toggleMenu = () => {

    // const btnMenu = document.querySelector('.menu'),
    const menu = document.querySelector('.menu'),
        closeBtn = document.querySelector('.close-btn');
    //     //получить вложенные элементы в меню
    //     menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = e => {
        if(e.target.closest('.menu')){
            menu.classList.add('active-menu');
        }else{
            menu.classList.remove('active-menu');
        }
    };

    document.body.addEventListener('click', handlerMenu);

    // btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    // menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
};
 
 toggleMenu();

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

 let count = 0;
 let idInter;
 let animatePopup = function animate() {
   console.log(123);
   
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
            popupContent.removeAttribute('style')
        });
 };
 togglePopup();

 const slider = () => {
     
    const slide = document.querySelectorAll('.portfolio-item'),
        portfolioDots = document.querySelector('.portfolio-dots'),
        slider = document.querySelector('.portfolio-content');
      
        for(let i = 0; i < slide.length; i++){
            portfolioDots.insertAdjacentHTML('beforeend', `<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>`);                            
        };

        let currentSlide = 0,
            interval;

        const dot = document.querySelectorAll('.dot');
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
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (e) => {
            e.preventDefault();

            let target = e.target;

            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }
            
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            }else if(target.matches('#arrow-left')){
                currentSlide--;
            }else if(target.matches('.dot')){
                dot.forEach((elem, index) => {
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

        slider.addEventListener('mouseover', e => {    
            if(e.target.matches('.portfolio-btn') || 
            e.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', e => {       
            if(e.target.matches('.portfolio-btn') || 
            e.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(3000);
 };

 slider();

// менять изображения при наведении курсора
 const changeImages = () => {

    const commandImages = document.querySelectorAll('#command .row img');
    let variableToKeepFotoTemporarily;

    commandImages.forEach(elem => {
      elem.addEventListener('mouseenter', e => {
        variableToKeepFotoTemporarily = e.target.src;
        let target = e.target;
        target.src = target.getAttribute('data-img');     
      });

      elem.addEventListener('mouseout', e => {      
        let target = e.target;
        target.src = variableToKeepFotoTemporarily;
      });
    });   
  };

  changeImages();
});        