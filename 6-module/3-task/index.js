import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0; // Индекс текущего слайда
    this._container = this.render();
    this._carouselInner = this._container.querySelector('.carousel__inner');
    this._arrowLeft = this._container.querySelector('.carousel__arrow_left');
    this._arrowRight = this._container.querySelector('.carousel__arrow_right');

    // Изначально скрываем стрелку налево
    this.updateArrowVisibility();

    // Добавляем обработчики событий
    this.addEventListeners();
  }

  // Геттер для elem
  get elem() {
    return this._container;
  }

  // Метод для отрисовки карусели
  render() {
    return createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map((slide) => this.renderSlide(slide)).join('')}
        </div>
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
      </div>
    `);
  }

  // Метод для построения одного слайда
  renderSlide(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}"
             class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  // Метод для обновления видимости стрелок
  updateArrowVisibility() {
    this._arrowLeft.style.display = this.currentSlideIndex === 0 ? 'none' : '';
    this._arrowRight.style.display = this.currentSlideIndex === this.slides.length - 1 ? 'none' : '';
  }

  // Метод для добавления обработки событий
  addEventListeners() {
    this._arrowLeft.addEventListener('click', () => {
      this.currentSlideIndex -= 1;
      this.updateSlidePosition();
    });

    this._arrowRight.addEventListener('click', () => {
      this.currentSlideIndex += 1;
      this.updateSlidePosition();
    });

    const buttons = this._container.querySelectorAll('.carousel__button');
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        const slide = event.target.closest('.carousel__slide'); // Находим слайд
        const productId = slide.dataset.id; // Получаем ID товара

        // Генерируем пользовательское событие
        const productAddEvent = new CustomEvent("product-add", {
          detail: productId,
          bubbles: true // Событие должно всплывать
        });

        // Отправляем событие
        this._container.dispatchEvent(productAddEvent);
      });
    });
  }

  // Метод для обновления позиции слайдов
  updateSlidePosition() {
    const translateXValue = -this.currentSlideIndex * 500; // Предполагая, что ширина слайда 500px
    this._carouselInner.style.transform = `translateX(${translateXValue}px)`;

    // Обновляем видимость стрелок
    this.updateArrowVisibility();
  }
}
