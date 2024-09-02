function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const rightArrow = document.querySelector('.carousel__arrow_right');
  const leftArrow = document.querySelector('.carousel__arrow_left');
  const slides = carousel.children;

  let currentSlide = 0;
  const totalSlides = slides.length;
  const slideWidth = slides[0].offsetWidth;

  rightArrow.addEventListener('click', () => {
    currentSlide++;
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    _updateArrows(currentSlide);
  });

  leftArrow.addEventListener('click', () => {
    currentSlide--;
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    _updateArrows(currentSlide);
  });

  function _updateArrows(currentSlide) {
    leftArrow.style.display = currentSlide === 0 ? 'none' : '';
    rightArrow.style.display = currentSlide === totalSlides - 1 ? 'none' : '';
  }

  _updateArrows(currentSlide);
}
