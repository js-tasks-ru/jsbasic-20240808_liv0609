export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.createSlider();
    this.updateSlider();
    this.addClickHandler();
  }

  createSlider() {
    const slider = document.createElement('div');
    slider.classList.add('slider');

    const thumb = document.createElement('div');
    thumb.classList.add('slider__thumb');

    const valueDisplay = document.createElement('span');
    valueDisplay.classList.add('slider__value');
    thumb.append(valueDisplay);

    const progress = document.createElement('div');
    progress.classList.add('slider__progress');

    const stepsContainer = document.createElement('div');
    stepsContainer.classList.add('slider__steps');

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      stepsContainer.append(step);
    }

    slider.append(thumb);
    slider.append(progress);
    slider.append(stepsContainer);
    return slider;
  }

  updateSlider() {
    const valueDisplay = this.elem.querySelector('.slider__value');
    const progress = this.elem.querySelector('.slider__progress');
    const steps = this.elem.querySelectorAll('.slider__steps span');
    const thumb = this.elem.querySelector('.slider__thumb');

    // Обновляем текущее значение
    valueDisplay.textContent = this.value;

    // Рассчитываем ширину и позицию ползунка
    const percentage = (this.value / (this.steps - 1)) * 100;
    thumb.style.left = `${percentage}%`;
    progress.style.width = `${percentage}%`;

    // Обновляем активный шаг
    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });

    // Генерация события slider-change
    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }

  addClickHandler() {
    this.elem.addEventListener('click', (event) => {
      const rect = this.elem.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const totalWidth = rect.width;
      const stepWidth = totalWidth / (this.steps - 1);

      // Находим ближайший шаг
      const newValue = Math.round(offsetX / stepWidth);
      this.value = Math.max(0, Math.min(newValue, this.steps - 1));

      this.updateSlider();
    });
  }
}
