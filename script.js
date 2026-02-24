// script.js
import setScrollSpy from "./js/scroll-spy.js";
import { caculateAge } from "./js/utils.js";



document.addEventListener('DOMContentLoaded', () => {

    setScrollSpy();

    const ageText = document.querySelector('#age');
    ageText.textContent = caculateAge(ageText.dataset['birth']);

});




