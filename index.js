'use strict';

let num = 266219;

const makeArrayFromNumber = (num) => {
    // объявляем переменную, куда будем записывать результат умножения всех чисел в массиве
    let finalResult = 1;
    // преобразуем число в строку, а затем в массив
    let arrayFromString = Array.from(num.toString());
    console.log(Array.from(num.toString()));
    
    // циклом проходим по всем элементам массива 
    for (let j = 0; j < arrayFromString.length; j ++) {   
    // результат записываем в переменую finalResult,используем оператор присваивания с умножением       
        finalResult *= arrayFromString[j];                
    };   
    num = num.toString().split('');
    console.log(typeof(num[0]));
    
     
    console.log('Результат произведения цифр числа 266219 1 способ for', arrayFromString.reduce((sum, numb) => sum*numb));

    console.log('Результат произведения цифр числа 266219 2 способ reduce', finalResult);

    let finalResultPow = finalResult ** 3;
    console.log(finalResultPow);
    // преобразуем результат в строку, затем при помощи метода slice изменяем содержание массива
    // Строку при помощи метода Number снова преобразуем в тип number.
    console.log(`Первые две цифры числа ${finalResultPow}`, Number(finalResultPow.toString().slice(0, 2)));
    return finalResult;
};

const finalResult = makeArrayFromNumber(num);