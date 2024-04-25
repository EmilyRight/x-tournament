import { WOW } from './vendor/wow.min';
import detectDevice from './components/detectDevice';
import Swiper from './vendor/swiper.min';
import { setCurrentYear } from './components/utils';
import videoTeaser from './components/videoTeaser';
import { openModal } from './components/modal';

/// /////// DocReady //////////
window.addEventListener('load', () => {
  detectDevice(); // videoTeaser();
  new WOW().init();
  handleSlider();
  setCurrentYear();
  openPopup();
  goNextSection();
  scrollTeaser(document.querySelector('.section-about'));
  videoTeaser();
});

function openPopup() {
  const popupLinksList = document.querySelectorAll('.popup-link');
  popupLinksList.forEach((popupLink) => {
    const { id } = popupLink;
    popupLink.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(id);
    });
  });
}

function goNextSection() {
  const goNextBtns = document.querySelectorAll('.js-go-next');
  const sectionsList = document.querySelectorAll('section');

  goNextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const btnParentNode = btn.closest('section');
      let sectionToScrollTo;
      sectionsList.forEach((el, index) => {
        if (el === btnParentNode) {
          sectionToScrollTo = sectionsList[index + 1];
          scrollToElement(sectionToScrollTo);
        }
      });
    });
  });
}

function handleSlider() {
  const options = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 'auto',
    spaceBetween: 24,
    // loop: true,
    // slidesOffsetBefore: 60,
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
    },
  };

  const swiper = new Swiper('.swiper-container', options);
  swiper.on('slideChange', () => {
    options.containerModifierClass = 'swiper-container-no-margins ';
    swiper.update();
  });
  return swiper;
}

function scrollToElement(el) {
  const offs = 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

// scroll to next if URL contains #about

function scrollTeaser(el) {
  if (window.location.hash === '#about') {
    scrollToElement(el);
  }
}
