import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;

    // Создаем DOM-элемент, используя шаблон
    this._container = createElement(`
            <div class="card">
                <div class="card__top">
                    <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
                    <span class="card__price">€${product.price.toFixed(2)}</span>
                </div>
                <div class="card__body">
                    <div class="card__title">${product.name}</div>
                    <button type="button" class="card__button">
                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                    </button>
                </div>
            </div>
        `);

    // Назначаем событие клика на кнопку
    const button = this._container.querySelector('.card__button');
    button.addEventListener('click', () => {
      this._onButtonClick();
    });
  }

  // Метод для обработки клика по кнопке
  _onButtonClick() {
    const event = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true
    });
    this._container.dispatchEvent(event);
  }

  // Геттер для элемента
  get elem() {
    return this._container;
  }
}
