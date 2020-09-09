
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.reviews__pagination',
    },
  });

  DG.then(function() {
    DG.map('map', {
        center: [54.98, 82.89],
        zoom: 13
    });
  });

  const burgerButton = document.querySelector('.header__burger');
  const mobileMenu = document.querySelector('.mobile');
  const mobileClose = document.querySelector('.mobile__close');

  burgerButton.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.add('mobile--active');
    document.body.style.overflowY = 'hidden';
  });


  mobileClose.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.remove('mobile--active');
    document.body.style.overflowY = '';
  });
});