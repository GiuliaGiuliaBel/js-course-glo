'use strict';
 
const DomElement = function(selector, height, width, bg, fontSize) {
    // constructor(selector, height, width, bg, fontSize){
        this.selector = selector;
        this.height = height;
        this.width = width; 
        this.bg = bg;
        this.fontSize = fontSize; 
    }
    
    DomElement.prototype.createElem = function() {
            if(this.selector[0] === '.'){
                let divWithClass = document.createElement('div');
                divWithClass.style.backgroundColor = this.bg;
                divWithClass.style.height = this.height + 'px';
                divWithClass.style.width = this.width + 'px';
                divWithClass.style.fontSize = this.fontSize;
                divWithClass.classList.add('new-class');
                divWithClass.textContent = 'Привет, мир!';
                let newElem = document.getElementById('root');
                newElem.append(divWithClass)
                      
        } else if (this.selector[0] === '#'){
                let divWithId = document.createElement('div');
                divWithId.style.backgroundColor = this.bg;
                divWithId.style.height = this.height + 'px';
                divWithId.style.width = this.width + 'px';
                divWithId.style.fontSize = this.fontSize;
                divWithId.setAttribute('id', 'best');
                divWithId.textContent = 'Привет, мир!';      
      };
    }
    
const domElem = new DomElement('.sdf', '50', '50', 'lightblue', '18');
domElem.createElem();
