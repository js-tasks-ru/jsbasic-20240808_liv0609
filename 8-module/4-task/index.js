import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();
    this.cartItems = []; // [ { product: {...}, count: N }, ... ]
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    const index = this.searchProduct(product.id);

    if (index === -1) {
      // Product not in cart, add new cart item
      const cartItem = {
        product: product,
        count: 1,
      };
      this.cartItems.push(cartItem);
      this.onProductUpdate(cartItem);
    } else {
      // Product exists in cart, increment count
      const cartItem = this.cartItems[index];
      cartItem.count++;
      this.onProductUpdate(cartItem);
    }
  }

  searchProduct(id) {
    const trimmedId = String(id).trim();
    return this.cartItems.findIndex(
      (item) => item.product.id === trimmedId
    );
  }

  updateProductCount(productId, amount) {
    const index = this.searchProduct(productId);
    if (index === -1) {
      return;
    }

    const cartItem = this.cartItems[index];
    cartItem.count += amount;

    if (cartItem.count <= 0) {
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce(
      (sum, cartItem) => sum + cartItem.count,
      0
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, cartItem) =>
        total + cartItem.count * cartItem.product.price,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="cart-product" data-product-id="${product.id}">
        <div class="cart-product__img">
          <img src="/assets/images/products/${product.image}" alt="product">
        </div>
        <div class="cart-product__info">
          <div class="cart-product__title">${escapeHtml(product.name)}</div>
          <div class="cart-product__price-wrap">
            <div class="cart-counter">
              <button type="button" class="cart-counter__button cart-counter__button_minus">
                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
              </button>
              <span class="cart-counter__count">${count}</span>
              <button type="button" class="cart-counter__button cart-counter__button_plus">
                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
              </button>
            </div>
            <div class="cart-product__price">€${product.price.toFixed(2)}</div>
          </div>
        </div>
      </div>`);
  }

  renderOrderForm() {
    return createElement(`
      <form class="cart-form">
        <h5 class="cart-form__title">Delivery</h5>
        <div class="cart-form__group cart-form__group_row">
          <input name="name" type="text" class="cart-form__input" placeholder="Name" required>
          <input name="email" type="email" class="cart-form__input" placeholder="Email" required>
          <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required>
        </div>
        <div class="cart-form__group">
          <input name="address" type="text" class="cart-form__input" placeholder="Address" required>
        </div>
        <div class="cart-buttons">
          <div class="cart-buttons__buttons btn-group">
            <div class="cart-buttons__info">
              <span class="cart-buttons__info-text">total</span>
              <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
            </div>
            <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
          </div>
        </div>
      </form>
    `);
  }


  templateModel = () => {
    return createElement(`
    <div>
      ${this.cartItems.map(({product, count}) => this.renderProduct(product, count).outerHTML).join('')}
      ${this.renderOrderForm().outerHTML}
    </div>
  `);
  }

  plusProduct = (event) => {
    const cartProduct = event.target.closest('.cart-product');
    if (cartProduct) {
      this.updateProductCount(cartProduct.dataset.productId, 1);
    }
  }

  minusProduct = (event) => {
    const cartProduct = event.target.closest('.cart-product');
    if (cartProduct) {
      this.updateProductCount(cartProduct.dataset.productId, -1);
    }
  }

  renderModal() {
    this.modal.setTitle('Your order');
    this.modal.setBody(this.templateModel());
    this.modal.open();

    document.querySelectorAll('.cart-counter').forEach(item => {
      const buttonMinus = item.querySelector('.cart-counter__button_minus');
      const buttonPlus = item.querySelector('.cart-counter__button_plus');

      buttonMinus.onclick = this.minusProduct;
      buttonPlus.onclick = this.plusProduct;
    });

    const form = document.querySelector('.cart-form');
    form.onsubmit = this.onSubmit;
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      if (this.isEmpty()) {
        this.modal.close();
        return;
      }

      const productCount = document.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      const productPrice = document.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      const infoPrice = document.querySelector('.cart-buttons__info-price');

      if (cartItem.count === 0) {
        document.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
      } else {
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      }

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const submitButton = event.target.querySelector('button');
    submitButton.classList.add('is-loading');

    const form = document.querySelector('.cart-form');
    const formData = new FormData(form);
    const url = 'https://httpbin.org/post';

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        this.modal.setTitle('Success!');
        this.modal.setBody(createElement(`
        <div class="modal__inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `));

        this.cartItems = [];
      }
    } catch (error) {
      console.error('Error submitting the order:', error);
    } finally {
      submitButton.classList.remove('is-loading');
    }
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
