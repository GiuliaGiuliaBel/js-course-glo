'use strict';
 
const DomElement = function(selector, height, width, bg, fontSize) {
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
                    document.body.append(divWithClass);                        
            } else if (this.selector[0] === '#'){
                    let divWithId = document.createElement('div');
                    divWithId.style.backgroundColor = this.bg;
                    divWithId.style.height = this.height + 'px';
                    divWithId.style.width = this.width + 'px';
                    divWithId.style.fontSize = this.fontSize;                  
                    divWithId.setAttribute('id', 'best');
                    divWithId.textContent = 'Привет, мир!';
                    document.body.append(divWithId);          
          };
        }      
    
const domElem = new DomElement('.sdf', '50', '50', 'lightblue', '18');
domElem.createElem();

//Это дополнительное задание(еще не сделано). Здесь я не понимаю, как мне передать position(37-ая строка) в созданный див 
// 'use strict';
// document.addEventListener('DOMContentLoaded', () => {
//     const DomElement = function(selector, height, width, bg, fontSize) {
//             this.selector = selector;
//             this.height = height;
//             this.width = width; 
//             this.bg = bg;
//             this.fontSize = fontSize; 
//         }
        
//         DomElement.prototype.createElem = function() {
//             if(this.selector[0] === '.'){
//                 let divWithClass = document.createElement('div');
//                 divWithClass.style.backgroundColor = this.bg;
//                 divWithClass.style.height = this.height + 'px';
//                 divWithClass.style.width = this.width + 'px';
//                 divWithClass.style.fontSize = this.fontSize;    
//                 divWithClass.classList.add('new-class');
//                 divWithClass.textContent = 'Привет, мир!';
//                 document.body.append(divWithClass);                        
//         } else if (this.selector[0] === '#'){
//                 let divWithId = document.createElement('div');
//                 divWithId.style.backgroundColor = this.bg;
//                 divWithId.style.height = this.height + 'px';
//                 divWithId.style.width = this.width + 'px';
//                 divWithId.style.fontSize = this.fontSize;                  
//                 divWithId.setAttribute('id', 'best');
//                 divWithId.textContent = 'Привет, мир!';
//                 document.body.append(divWithId);          
//       };
//     }      
//         const domElem = new DomElement('#sdf', '100', '100', 'lightblue', '18');
//         domElem.position = 'absolute';
        
//         domElem.createElem();

//         document.body.addEventListener('keydown', (e) => {
//         if(e.keyCode == '37'){           
//             domElem.position = 'relative; left: 25px';
//             console.log(domElem);            
//         }else if(e.keyCode == '38'){
//             domElem.position = 'relative; top: 25px'; 
//         }else if(e.keyCode == '39'){
//             domElem.position = 'relative; right: 25px'; 
//         }else if(e.keyCode == '40'){
//             domElem.position = 'relative; bottom: 25px';  
//         }
//     });      
// });
