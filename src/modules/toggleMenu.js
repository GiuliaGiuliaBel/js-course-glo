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

export default toggleMenu;