import { WOW } from './vendor/wow.min';
import detectDevice from './components/detectDevice';
import Swiper from './vendor/swiper.min';
import { setCurrentYear } from './components/utils';
import GTMEvents from './components/gtmEvents';
import videoTeaser from './components/videoTeaser';
import { openModal } from './components/modal';

const GTM = new GTMEvents();

/// /////// DocReady //////////
window.addEventListener('load', () => {
  detectDevice(); // videoTeaser();
  new WOW().init();
  handleSlider();
  GTM.addEventListeners();
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
  const swiper = new Swiper('.swiper-container', {
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

    breakpoints: {
      768: {
        spaceBetween: 16,
      },
    },
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
