import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.render();
    this.isOpen = false;
    this.handleEsc = this.handleEsc.bind(this);
  }

  render() {
    const modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__content">
          <button class="modal__close">&times;</button>
          <div class="modal__title"></div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    modal.querySelector('.modal__close').addEventListener('click', () => this.close());
    modal.querySelector('.modal__overlay').addEventListener('click', () => this.close());

    return modal;
  }

  open() {
    document.body.appendChild(this.modal);
    document.body.classList.add('is-modal-open');
    this.isOpen = true;
    document.addEventListener('keydown', (event) => this.handleEsc(event));
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').innerText = title;
  }

  setBody(node) {
    const modalBody = this.modal.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.appendChild(node);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    this.isOpen = false;
  }

  handleEsc(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
