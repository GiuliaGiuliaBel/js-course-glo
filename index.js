'use strict';
 
const DomElement = function(selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width; 
        this.bg = bg;
        this.fontSize = fontSize; 
    }
    
    DomElement.prototype.createElem = function() {
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
    
const domElem = new DomElement('#lele', '50', '50', 'lightblue', '18');
domElem.createElem();

