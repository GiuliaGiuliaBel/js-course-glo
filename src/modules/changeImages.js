const changeImages = () => {

    const commandImages = document.querySelectorAll('#command .row img');
    let variableToKeepFotoTemporarily;

    commandImages.forEach(elem => {
    
      elem.addEventListener('mouseover', e => {
        let target = e.target;
        variableToKeepFotoTemporarily = target.src;
        target.src = target.getAttribute('data-img');     
      });

      elem.addEventListener('mouseout', e => {      
        let target = e.target;
        target.src = variableToKeepFotoTemporarily;
      });
    });   
  };

  export default changeImages;