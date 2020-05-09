const sendForm = (formId) => {
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо, мы с вами скоро свяжемся.';
    
        const form = document.getElementById(formId);

        // создать прелоадер
        const preloader = document.createElement('div');
        preloader.classList.add('preloader');
        preloader.style.color = 'white';
        const preloaderRow = document.createElement('div');
        preloaderRow.classList.add('preloader__row');
        const preloaderItem= document.createElement('div');
        preloaderItem.classList.add('preloader__item');
        const preloaderItem2= document.createElement('div');
        preloaderItem2.classList.add('preloader__item');

        preloaderRow.append(preloaderItem);
        preloaderRow.append(preloaderItem2);

        preloader.append(preloaderRow);

        let allInputs = form.querySelectorAll('input');

        const validateInput = (input) => {
            input.addEventListener('input', event => {
                event.target.value = event.target.value.replace(/[^а-я ]/gi, '');
            });
        };

        allInputs.forEach(item => {
            
            if(item.name === 'user_phone'){
                let inputPhone = form.querySelector('input[name=user_phone]');
                inputPhone.addEventListener('input', event => {
                    event.target.value = event.target.value.replace(/[^\d+]/g, '');  
                });                            
            }
            if(item.name === 'user_name' ){
                let inputName = form.querySelector('input[name=user_name]');
                validateInput(inputName);
            }
            if(item.name === 'user_message'){
                let inputMessage = form.querySelector('input[name=user_message]');
                validateInput(inputMessage);    
            }
        });
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();
         
            preloader.classList.add('loaded');
            form.appendChild(preloader);
            const formData = new FormData(form);
                 
            let body = {};    
            
            formData.forEach((val, key) => {
                body[key] = val;
            });
        
            const outputData = () => {
                preloader.classList.remove('loaded');
                preloader.textContent = successMessage;
                document.getElementById(formId).reset();
            };

            const errorCase = () => {
                preloader.classList.remove('loaded');
                preloader.textContent = errorMessage;
            };

            const postData = (body) => {
                fetch('./server.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                  },
                    body: JSON.stringify(body)
                })
                .then(response => {
                    if(response.status !== 200){
                        throw new Error('error')
                    }
                    outputData();
                })
                .catch(() => errorCase()); 
              };

              postData(body);

        });   
  };

  export default sendForm;
