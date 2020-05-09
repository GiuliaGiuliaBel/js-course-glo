'use strict';

import allowOnlyNumbers from './modules/allowOnlyNumbers';
import calc from './modules/calc';
import countTimer from './modules/countTimer';
import changeImages from './modules/changeImages';
import createStyle from './modules/createStyle';
import scrollNextSlide from './modules/scrollNextSlide';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
 

createStyle();
countTimer('20 May 2020');
toggleMenu();
tabs();
scrollNextSlide('a[href="#service-block"]');
togglePopup();
slider();
changeImages();
allowOnlyNumbers();
calc(100);

sendForm('form1');
sendForm('form2');
sendForm('form3');
