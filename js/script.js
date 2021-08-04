'use strict'; 
window.addEventListener('DOMContentLoaded', () => {

    // Делаем табы
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
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

        if (target && target.classList.contains('tabheader__item'))
        {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

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

setClock('.timer', deadLine);

// конец урока по таймеру

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

    const getResours = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

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

// Отправляем данные на сервер FormData

const forms = document.querySelectorAll('form'),
      message = {
          loading: 'img/form/spinner.svg',
          success: 'Спасибо! Скоро мы с вами свяжемся',
          falure: 'Что-то пошло не так...'
      };

forms.forEach(item => {
    bindPostData(item);
});

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

      
        postData('http://localhost:3000/requests', json)
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
    openModal();

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
        closeModal();
    }, 4000)
}

// Fetch API

// fetch('http://localhost:3000/menu')
//     .then(data => data.json())
//     .then(res => console.log(res));
        


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
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width;


let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;

} else {
    total.textContent = slides.length;
}
if (slideIndex < 10) {
current.textContent = `0${slideIndex}`;
} else {
current.textContent = slideIndex;
};

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
        offset = 0;
        console.log(offset);
    } else {
        offset += +width.slice(0, width.length - 2);
        console.log(offset);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`
    } else {
        current.textContent = slideIndex;
    }
    showDots();
    
});


prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        console.log(offset);
    } else {
        offset -= +width.slice(0, width.length - 2);
        console.log(offset);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;


    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`
    } else {
        current.textContent = slideIndex;
    }
    showDots();
});



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


// Dots. My code




const slider = document.querySelector('.offer__slider'), 
      carousel = document.createElement('div');


      carousel.style.cssText = `
      position: relative;
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
      

slides.forEach((item, i) => {
    const dot = document.createElement('div');
          dot.classList.add(`slide${i + 1}`);
          dot.classList.add('dot__slider');

    carousel.append(dot);
    slider.append(carousel);
});

const dots = document.querySelectorAll('.dot__slider');

function showDots() {
    dots.forEach(item => {
    if(item.classList.contains(`slide${slideIndex}`)) {
        console.log('showDots');
        item.style.cssText = `    
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: red;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
    } else {

        item.style.cssText = `    
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #000;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        }
    });
};

showDots();

function dotsSlide(num) {
    offset = +width.slice(0, width.length - 2) * (num);
    slidesField.style.transform = `translateX(-${offset}px)`;
    slideIndex = num + 1;
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    
    } else {
        total.textContent = slides.length;
    }
    if (slideIndex < 10) {
    current.textContent = `0${slideIndex}`;
    } else {
    current.textContent = slideIndex;
    };
    showDots();
}

function activeDots() {
    dots.forEach((d, n) => {
        d.addEventListener('click', () => {
            const dotNum = n;
            dotsSlide(dotNum); 
        });
    });
}
activeDots();


});