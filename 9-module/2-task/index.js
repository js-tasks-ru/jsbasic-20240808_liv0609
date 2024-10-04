import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // 1. Создание и размещение компонента "Карусель"
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);

    // 2. Создание и размещение компонента "Ленточное меню"
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);

    // 3. Создание и размещение компонента "Слайдер-шаг"
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);

    // 4. Создание и размещение компонента "Иконка корзины"
    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    // 5. Создание экземпляра корзины
    this.cart = new Cart(this.cartIcon);

    // 6. Загрузка товаров
    let response = await fetch('products.json');
    this.products = await response.json();

    // 7. Создание и размещение компонента "Сетка товаров"
    this.productsGrid = new ProductsGrid(this.products);
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);

    // 8. Инициализация фильтрации товаров
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    // 9. Установка обработчиков событий

    // Обработчик события 'product-add'
    document.body.addEventListener('product-add', (event) => {
      let productId = event.detail; // ID продукта из события
      let product = this.products.find(item => item.id === productId);

      if (product) {
        this.cart.addProduct(product);
      }
    });

    // Обработчик события 'slider-change' для компонента StepSlider
    document.body.addEventListener('slider-change', (event) => {
      let value = event.detail; // новое значение остроты

      this.productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    // Обработчик события 'ribbon-select' для компонента RibbonMenu
    document.body.addEventListener('ribbon-select', (event) => {
      let categoryId = event.detail; // выбранная категория

      this.productsGrid.updateFilter({
        category: categoryId
      });
    });

    // Обработчик события 'change' на чекбоксе 'Без орехов'
    let nutsCheckbox = document.getElementById('nuts-checkbox');
    nutsCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked
      });
    });

    // Обработчик события 'change' на чекбоксе 'Только вегетарианские'
    let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
    vegeterianCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked
      });
    });
  }
}
