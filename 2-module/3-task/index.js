let calculator = {
  read(value1, value2) {
    this.value1 = Number(value1);
    this.value2 = Number(value2);
  },

  sum() {
    return this.value1 + this.value2;
  },

  mul() {
    return this.value1 * this.value2;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
