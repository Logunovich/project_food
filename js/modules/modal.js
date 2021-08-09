function modal() {
    // Модальное окно - мое решение 

// const modalBtn = document.querySelectorAll('[data-modal]'),
//       modalContent = document.querySelector('.modal'),
//       closeBtn = document.querySelector('.modal__close');

// modalBtn.forEach(btn => {
//         btn.addEventListener('click', openModal);
// });

// closeBtn.addEventListener('click', closeModal);

// function openModal() {
//     modalContent.classList.add('show');
//     modalContent.classList.remove('hide');
//     document.body.style.cssText = 'overflow: hidden';
// };

// function closeModal() {
//     modalContent.classList.add('hide');
//     modalContent.classList.remove('show');
//     document.body.style.cssText = 'overflow: scroll';
// };

// конец моего решения

// решение по уроку (модельное окно)


const modalTrigger = document.querySelectorAll('[data-modal]'),
modal = document.querySelector('.modal');

modalTrigger.forEach(btn => {
btn.addEventListener('click', openModal);

});

function openModal() {
modal.classList.add('show');
modal.classList.remove('hide');
document.body.style.overflow = 'hidden';
clearInterval(modalTimerId);
window.removeEventListener('scroll', showModalByScroll); // убираем обработчик со скрола
}

function closeModal() {
modal.classList.add('hide');
modal.classList.remove('show');
document.body.style.overflow = '';
};



modal.addEventListener('click', (e)=> {
if (e.target === modal || e.target.getAttribute('data-close') == '') {
  closeModal();
} 
});

document.addEventListener('keydown', (e) => {
if (e.code === 'Escape' && modal.classList.contains('show')) {
  closeModal();
}
});

// конец урока

// дорабатываем модельное окно

const modalTimerId = setTimeout (openModal, 150000);

function showModalByScroll () {
if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
  openModal();
  window.removeEventListener('scroll', showModalByScroll);
}
}

window.addEventListener('scroll', showModalByScroll);

// конец доработки модульного окна

// Выводим динамически элементы на страницу при помощи классов и конструкторов. Мой вариант (31 строка): 


// const item = document.querySelectorAll('.menu__item');
// console.log(item);

// class DayMenu {
//     constructor(img, alt, title, descr, price) {
//         this.img = img;
//         this.alt = alt;
//         this.title = title;
//         this.descr = descr;
//         this.price = price * 13;
//     }
//     embedContentMenu() {
//         return `<img src="${this.img}" alt="${this.alt}">
//         <h3 class="menu__item-subtitle">${this.title}</h3>
//         <div class="menu__item-descr">${this.descr}</div>
//         <div class="menu__item-divider"></div>
//         <div class="menu__item-price">
//             <div class="menu__item-cost">Цена:</div>
//             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
//         </div>`
//     }
// }

// const menu1 = new DayMenu('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 29).embedContentMenu();
// const menu2 = new DayMenu('img/tabs/elite.jpg', 'elite', 'Меню "Премиум"', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 55).embedContentMenu();
// const menu3 = new DayMenu('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 40).embedContentMenu();

// item[0].innerHTML = menu1;
// item[1].innerHTML = menu2;
// item[2].innerHTML = menu3;

// конец моего решения. Посмотрим что будет дальше! 

// Решение по курсу

}

module.exports = modal;