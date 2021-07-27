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
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);

});

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};


modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e)=> {
    if (e.target === modal) {
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

const modalTimerId = setTimeout (openModal, 1500);

function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}




window.addEventListener('scroll', showModalByScroll);


});