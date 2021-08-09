/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

const result = document.querySelector('.calculating__result span');

let sex, 
    height, 
    weight, 
    age, 
    ratio;

if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
} else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
};

if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
};

function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });

};

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
    }

    if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.2 * age)) * ratio);
        console.log('должно было вывести женщину!')
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        console.log('должно было вывести мужчину!')
    }
};

calcTotal();

function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);
            calcTotal();
        });
    });
};

getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
        } else {
            input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
            case 'height': 
                height = +input.value;
                break;
            case 'weight':
                weight = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
        }
        calcTotal();
    });
};

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _servises_servises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../servises/servises */ "./js/servises/servises.js");


function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
    
        changeToUAH() {
            this.price = this.price * this.transfer; 
        }
    
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.class = 'menu__item';
                element.classList.add(this.class);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
    
    
            element.innerHTML = `
            
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
            `;
    
            this.parent.append(element);
            }
    
        }
    
       
    
        // getResours('http://localhost:3000/menu')
        //     .then(data => {
        //         data.forEach(({img, altimg, title, descr, price}) => {
        //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        //         });
        //     });
    
        axios.get('http://localhost:3000/menu')
            .then(data => {
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
            });
    
    
        // getResours('http://localhost:3000/menu')
        // .then(data => createCard(data));
        // function createCard(data) {
        //     data.forEach(({img, altimg, title, descr, price}) => {
        //         const element = document.createElement('div');
    
        //         element.classList.add('menu__item');
        //         element.innerHTML = `
        //         <img src=${img} alt=${altimg}>
        //                 <h3 class="menu__item-subtitle">${title}</h3>
        //                 <div class="menu__item-descr">${descr}</div>
        //                 <div class="menu__item-divider"></div>
        //                 <div class="menu__item-price">
        //                     <div class="menu__item-cost">Цена:</div>
        //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
        //                 </div>
        //         `;
    
        //         document.querySelector('.menu .container').append(element);
        //     });
        // }
    
    
    
            
    // Разбираюсь с работой конструкторов и классов
    
    // class NewCars {
    //     constructor(model, year, transm) {
    //         this.model = model;
    //         this.year = year;
    //         this.transm = transm;
    //     } 
    //     render() {
    //         const element = document.createElement('div');
    //         this.el = 'test__class';
    //         console.log(this.el);
            
    
    //         element.innerHTML = `
    //                     <h3 class="menu__item-subtitle">${this.model}</h3>
    //                     <div class="menu__item-descr">${this.year}</div>
    //                     <div class="menu__item-divider"></div>
    //                     <div class="menu__item-price">
    //                         <div class="menu__item-cost">Цена:</div>
    //                         <div class="menu__item-total"><span>${this.transm}</span> грн/день</div>
    //                     </div>
    //         `;
    
    //         console.log(element);
    //         }
    //     }
    
    // new NewCars('Audi 100', 2020, 'manual').render();
    
    // конец эксперимента, работаем дальше
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _servises_servises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../servises/servises */ "./js/servises/servises.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms(formSelector, modalTimerId) {
    // Отправляем данные на сервер FormData

const forms = document.querySelectorAll(formSelector),
message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    falure: 'Что-то пошло не так...'
};

forms.forEach(item => {
bindPostData(item);
});

function bindPostData(form) {
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const statusMessage = document.createElement('img');
  statusMessage.src = message.loading;
  statusMessage.style.cssText = `
  display: block;
  margin: 0 auto;
  `;

  form.insertAdjacentElement('afterend', statusMessage)



  
  const formData = new FormData(form);

  const json = JSON.stringify(Object.fromEntries(formData.entries()));


  (0,_servises_servises__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
  .then(data => {
      console.log(data);
      showThanksModal(message.success);
      form.reset();
      statusMessage.remove();
  }).catch(() => {
      showThanksModal(message.falure);
  }).finally(() => {
      form.reset();
  })
  
  // request.addEventListener('load', () => {
  //     if (request.status === 200) {
  //         console.log(request.response);
  //         showThanksModal(message.success);
  //         form.reset();
  //         statusMessage.remove();
  //         }
  //     else {
  //         showThanksModal(message.falure);
  //     }
  // });
});
}

function showThanksModal(message) {
const prevModalDialog = document.querySelector('.modal__dialog');
prevModalDialog.classList.add('hide');
(0,_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId);

const thanksModal = document.createElement('div');
thanksModal.classList.add('modal__dialog');
thanksModal.innerHTML = `
<div class="modal__content">
  <div class="modal__close" data-close>×</div>
  <div class="modal__title">${message}</div>
</div>
`;

document.querySelector('.modal').append(thanksModal);
setTimeout(() => {
  thanksModal.remove();
  prevModalDialog.classList.add('show');
  prevModalDialog.classList.remove('hide');
  (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)('.modal');
}, 4000)
}

// Fetch API

// fetch('http://localhost:3000/menu')
//     .then(data => data.json())
//     .then(res => console.log(res));
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId, scrollId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
      clearInterval(modalTimerId);
      window.removeEventListener('scroll', scrollId);
    }

    
 // убираем обработчик со скрола (доделать функционал)
  }
  
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };
  

function modal(triggerSelector, modalSelector, modalTimerId) {


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


const modalTrigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);

      modalTrigger.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimerId, showModalByScroll));
});

modal.addEventListener('click', (e)=> {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    } 
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
}
});

// конец урока

// дорабатываем модельное окно


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


function showModalByScroll () {
 
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal(modalSelector, modalTimerId, showModalByScroll);
    }
  }
window.addEventListener('scroll', showModalByScroll);
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);





/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider. Моя работа

// const slider = document.querySelectorAll('.offer__slide'),
//       btnNext = document.querySelector('.offer__slider-next'),
//       btnPrev = document.querySelector('.offer__slider-prev'),
//       current = document.querySelector('#current'),
//       total = document.querySelector('#total');

//       let totalSliders = slider.length,
//           currentSlider = 1;

//           if (totalSliders < 10) {
//             totalSliders = `0${totalSliders}`
//         } 

// function hideSliders(slide) {
//     slide.classList.add('hide');
//     slide.classList.remove('show');
// }

// function showSlider(num = 0) {

//     slider[num].classList.add('show');
//     slider[num].classList.remove('hide');

//     currentSlider = num + 1;
    
//     if (currentSlider < 10) {
//         currentSlider = `0${currentSlider}`
//     }
//     total.innerHTML = totalSliders;
//     current.innerHTML = currentSlider;

// }

// slider.forEach(item => hideSliders(item));

// let defaultSlider = 0;
// showSlider(defaultSlider);


// btnNext.addEventListener('click', () => {
//     defaultSlider += 1;
//     if (defaultSlider + 1 > totalSliders) {
//         defaultSlider = 0;
//     }
//     slider.forEach(item => hideSliders(item));
//     showSlider(defaultSlider);
// });

// btnPrev.addEventListener('click', () => {
//     defaultSlider -= 1;
//     if (defaultSlider < 0) {
//         defaultSlider = totalSliders - 1;
//     }
//     console.log(defaultSlider);
//     slider.forEach(item => hideSliders(item));
//     showSlider(defaultSlider);
//     console.log(defaultSlider)
// });

// конец моего решения. Делаем урок

const slides = document.querySelectorAll('.offer__slide'),
slider = document.querySelector(container),
prev = document.querySelector(prevArrow),
next = document.querySelector(nextArrow),
total = document.querySelector(totalCounter),
current = document.querySelector(currentCounter),
slidesWrapper = document.querySelector(wrapper),
slidesField = document.querySelector(field),
width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
total.textContent = `0${slides.length}`;
current.textContent = `0${slideIndex}`;
} else {
total.textContent = slides.length;
current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
slide.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
dots = [];

indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;

slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
const dot = document.createElement('li');
dot.setAttribute('data-slide-to', i + 1);
dot.style.cssText = `
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 6px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: .5;
  transition: opacity .6s ease;
`;
if (i === 0) {
  dot.style.opacity = 1;
}
indicators.append(dot);
dots.push(dot);
};

next.addEventListener('click', () => {
if (offset == replacePx(width) * (slides.length - 1)) {
  offset = 0;
  console.log(offset);
} else {
  offset += replacePx(width);
  console.log(offset);
}
slidesField.style.transform = `translateX(-${offset}px)`;

if (slideIndex == slides.length) {
  slideIndex = 1;
} else {
  slideIndex++;
}

if (slides.length < 10) {
  current.textContent = `0${slideIndex}`
} else {
  current.textContent = slideIndex;
}

dots.forEach(dot => {
  dot.style.opacity = '.5';
});
dots[slideIndex - 1].style.opacity = 1;

});

prev.addEventListener('click', () => {
if (offset == 0) {
  offset = replacePx(width) * (slides.length - 1);
  console.log(offset);
} else {
  offset -= replacePx(width);
  console.log(offset);
}
slidesField.style.transform = `translateX(-${offset}px)`;


if (slideIndex == 1) {
  slideIndex = slides.length;
} else {
  slideIndex--;
}

if (slides.length < 10) {
  current.textContent = `0${slideIndex}`
} else {
  current.textContent = slideIndex;
}
dots.forEach(dot => {
  dot.style.opacity = '.5';
});
dots[slideIndex - 1].style.opacity = 1;
});


dots.forEach(dot => {
dot.addEventListener('click', (e) => {
  const slideTo = e.target.getAttribute('data-slide-to');
  slideIndex = slideTo;
  offset = replacePx(width) * (slideTo - 1);
  slidesField.style.transform = `translateX(-${offset}px)`;
  
  if (slides.length < 10) {
      current.textContent = `0${slideIndex}`
  } else {
      current.textContent = slideIndex;
  };

  dots.forEach(dot => {
      dot.style.opacity = '.5';
  });
  dots[slideIndex - 1].style.opacity = 1;
});
}); 

function replacePx(item) {
return +item.replace(/\D/g, '');
}

// showSlides(slideIndex);

// if (slides.length < 10) {
//     total.textContent = `0${slides.length}`;
// } else {
//     total.textContent = slides.length;
// }

// function showSlides(n) {
//     if (n > slides.length) {
//         slideIndex = 1;
//     }

//     if (n < 1) {
//         slideIndex = slides.length;
//     }

//     slides.forEach(item => item.style.display = 'none');

//     slides[slideIndex - 1].style.display = 'block';
//     if (slideIndex < 10) {
//         current.textContent = `0${slideIndex}`;
//     } else {
//         current.textContent = slideIndex;
//     }
// }

// function plusSlides(n) {
//     showSlides(slideIndex += n)
// }

// prev.addEventListener('click', () => {
//     plusSlides(-1);
// });

// next.addEventListener('click', () => {
//     plusSlides(1);
// });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        // Делаем табы
        const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
      tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
        item.classList.remove(activeClass);
      });
  }

  function showTabContent(i=0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', event => {
      const target = event.target;

      if (target && target.classList.contains(tabsSelector.slice(1)))
      {
          tabs.forEach((item, i) => {
              if (target == item) {
                  hideTabContent();
                  showTabContent(i);
              }
          });
      }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // Делаем таймер мое решение:


// const timerBlock = document.querySelectorAll('.timer__block'),
//       hours = document.querySelector('#hours'),
//       days = document.querySelector('#days'),
//       minutes = document.querySelector('#minutes'),
//       seconds = document.querySelector('#seconds');

// function changeTimer() {
//     let now = (new Date()).getTime(),
//         endAction = (new Date(2021, 6, 8).getTime()),
//         restDays = (Math.floor((endAction - now) / 1000 / 60 / 60 / 24)),
//         restHours = (Math.floor((endAction - now) / 1000 / 60 / 60)) % 24,
//         restMinutes = (Math.floor((endAction - now) / 1000 / 60)) % 60,
//         restSeconds = (Math.floor((endAction - now) / 1000)) % 60;

//     days.innerHTML = `${restDays}`;
//     hours.innerHTML = `${restHours}`;
//     minutes.innerHTML = `${restMinutes}`;
//     seconds.innerHTML = `${restSeconds}`;
    

//     if (endAction - now < 0) 
//     {
//     clearInterval(timer);
//     days.innerHTML = `00`;
//     hours.innerHTML = `00`;
//     minutes.innerHTML = `00`;
//     seconds.innerHTML = `00`;

//         }
//     }
// const timer = setInterval(changeTimer, 1000);


// конец моего решения


// Решение таймера по уроку:

const deadLine = '2021-10-08'; 

function getTimeRemaning (endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)), 
          hours = Math.floor((t / (1000 * 60 * 60)) % 24),
          minutes = Math.floor((t / (1000 * 60)) % 60),
          seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t, 
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    
    updateClock();

    function updateClock() {
        const t = getTimeRemaning(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
            days.innerHTML = `00`;
            hours.innerHTML = `00`;
            minutes.innerHTML = `00`;
            seconds.innerHTML = `00`;
        }
    }
}

setClock(id, deadLine);

// конец урока по таймеру
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/servises/servises.js":
/*!*********************************!*\
  !*** ./js/servises/servises.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResours": () => (/* binding */ getResours)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
          'Content-type': 'application/json'
      }, 
      body: data
    });
    
    return await res.json();
    };

    const getResours = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

     
     

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");










window.addEventListener('DOMContentLoaded', () => {     
    


const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 150000);



    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2022-06-11');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
        container: '.offer__slider', 
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total', 
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });


});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map