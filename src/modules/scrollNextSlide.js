const scrollNextSlide = (selectorName) => {

    const showNextSlideScroll = (elem) => {
        document.querySelector('#' + elem.href.split('#')[1]).scrollIntoView({
            behavior: 'smooth'
        });
    }
    const elemToScroll = document.querySelector(selectorName);
    elemToScroll.addEventListener('click', (e) => {
        e.preventDefault();
        showNextSlideScroll(elemToScroll);
    })
};

export default scrollNextSlide;