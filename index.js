window.addEventListener('DOMContentLoaded', () => {

        'use strict';

            class DomElement {
                constructor(selector, height, width, bg, fontSize) {
                    this.selector = selector;
                    this.height = height;
                    this.width = width; 
                    this.bg = bg;
                    this.fontSize = fontSize; 
                }      
                
createElem(){
        let newElem = document.createElement('div');
                (this.selector[0] === '.') ? newElem.classList.add('new-class') :
                    (this.selector[0] === '#') ? newElem.setAttribute('id', 'best') :
                        newElem;
       
                newElem.style.backgroundColor = this.bg;
                newElem.style.height = this.height + 'px';
                newElem.style.width = this.width + 'px';
                newElem.style.fontSize = this.fontSize;    
                newElem.textContent = 'Привет, мир!';
                document.body.append(newElem);                                  
} 
pos(){
               // создать метод, который позиционирует элемент абсолютно
        let elem = document.querySelector('div')
        elem.style.position = 'absolute';
        }    
}   

let domElem = new DomElement('#lele', '100', '100', 'lightblue', '18');

domElem.createElem();
//позиционировать элемент относительно
document.querySelector('div').style.position = 'relative'; 
        let top = 0,
            left = 0,
            elem = document.querySelector('div');

    window.addEventListener('keydown', (e) => {
       
        if(e.keyCode === 37){ 
                left-=10;
                elem.style.left = left +'px';                                                
        }else if(e.keyCode === 38){
                top-=10;
                elem.style.top = top +'px';                   
        }else if(e.keyCode === 39){
                left+=10;
                elem.style.left = left +'px';   
        }else if(e.keyCode === 40){            
                top+=10;
                elem.style.top = top +'px';                     
        }
    });
});
      
    
            