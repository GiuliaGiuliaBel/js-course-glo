const allowOnlyNumbers = () => {

    const inputTypeNumberElems = document.querySelectorAll('input[type="number"]');

    inputTypeNumberElems.forEach(elem => {
        elem.addEventListener('input', e => {
        
        let target = e.target;     
        
       target.value = target.value.replace(/[^\d]/g, '');   
        });
    });
  }; 

  export default allowOnlyNumbers;