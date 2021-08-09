function slider() {
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
slider = document.querySelector('.offer__slider'),
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

module.exports = slider;