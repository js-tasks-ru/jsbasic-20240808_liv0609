import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render(); // Генерируем элемент меню
    this.activeCategory = null;
    this.initEventListeners();
    this.initScrollEvent();
  }

  render() {
    return createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">❮</button>
        <div class="ribbon__inner">
          ${this.categories.map(category => `
            <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
          `).join('')}
        </div>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">❯</button>
      </div>
    `);
  }

  initEventListeners() {
    this.elem.addEventListener('click', (event) => {
      const target = event.target.closest('.ribbon__item');
      if (target) {
        event.preventDefault();
        this.selectCategory(target);
      }

      const arrowLeft = event.target.closest('.ribbon__arrow_left');
      const arrowRight = event.target.closest('.ribbon__arrow_right');

      if (arrowLeft) {
        this.scroll(-350);
      }

      if (arrowRight) {
        this.scroll(350);
      }
    });
  }

  selectCategory(target) {
    // Удаляем активный класс с предыдущей категории
    if (this.activeCategory) {
      this.activeCategory.classList.remove('ribbon__item_active');
    }

    // Добавляем активный класс к выбранной категории
    target.classList.add('ribbon__item_active');
    this.activeCategory = target;


    // Генерируем пользовательское событие
    const categoryId = target.dataset.id;
    const customEvent = new CustomEvent('ribbon-select', {
      detail: categoryId,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }

  initScrollEvent() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.addEventListener('scroll', () => this.updateArrowVisibility());
  }

  scroll(offset) {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(offset, 0);
  }

  updateArrowVisibility() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const scrollLeft = ribbonInner.scrollLeft;
    const scrollWidth = ribbonInner.scrollWidth;
    const clientWidth = ribbonInner.clientWidth;

    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    // Убираем стрелку назад, если мы на самом начале
    if (scrollLeft === 0) {
      this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
    } else {
      this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
    }

    // Убираем стрелку вперед, если мы на самом конце
    if (scrollRight < 1) { // Учитываем дробные значения
      this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
    } else {
      this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    }
  }
}
