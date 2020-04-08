'use strict';

// удалить рекламу со страницы
document.querySelector('.adv').remove();

// изменить фоновую картинку
document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

const books = document.querySelectorAll('.book');
// восстанавливаем порядок книг
books[1].after(books[0]);
books[0].after(books[4]);
books[4].after(books[3]);
books[2].before(books[5]);

// Исправить заголовок в книге 3
books[4].getElementsByTagName('h2')[0].innerHTML = `
<a href="https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes"
   target="_blank">Книга 3. this и Прототипы Объектов</a>`;

// восстановить порядок глав во второй книге
books[0].getElementsByTagName('li')[3].after(books[0].getElementsByTagName('li')[6]);
books[0].getElementsByTagName('li')[4].after(books[0].getElementsByTagName('li')[8]);
books[0].getElementsByTagName('li')[10].before(books[0].getElementsByTagName('li')[2]);

// восстановить порядок глав в пятой книге
books[5].getElementsByTagName('li')[1].after(books[5].getElementsByTagName('li')[9]);
books[5].getElementsByTagName('li')[3].before(books[5].getElementsByTagName('li')[4]);
books[5].getElementsByTagName('li')[4].before(books[5].getElementsByTagName('li')[5]);
books[5].getElementsByTagName('li')[9].before(books[5].getElementsByTagName('li')[6]);

// добавить главу 8 к шестой книге
const elem = document.createElement('li');
elem.innerHTML = 'Глава 8';
books[2].getElementsByTagName('li')[8].after(elem);
