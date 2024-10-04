import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    this.initialTopCoord = 0;
    this.isFixed = false;

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();
      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.initialTopCoord === 0) {
      this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    const isMobile = document.documentElement.clientWidth <= 767;
    if (isMobile) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
      this.isFixed = false;
      return;
    }

    // Проверяем, есть ли товары в корзине
    if (!this.elem.classList.contains('cart-icon_visible')) {
      Object.assign(this.elem.style, {
        position: 'absolute',
      });
      this.isFixed = false;
      return;
    }

    if (window.pageYOffset > this.initialTopCoord) {
      // Плавая корзина (fixed)
      if (!this.isFixed) {
        this.isFixed = true;

        const leftIndent = Math.min(
          document.querySelector('.container').getBoundingClientRect().right + 20,
          document.documentElement.clientWidth - this.elem.offsetWidth - 10
        ) + 'px';


        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '50px',
          left: leftIndent,
          zIndex: 1e3
        });
      }
    } else {

      if (this.isFixed) {
        this.isFixed = false;

        Object.assign(this.elem.style, {
          position: '',
          top: '',
          left: '',
          zIndex: ''
        });
      }
    }
  }
}
