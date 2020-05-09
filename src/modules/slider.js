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

export default slider;
