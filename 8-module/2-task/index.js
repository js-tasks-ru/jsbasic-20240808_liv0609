import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.createGrid();
    this.renderProducts(products);
  }

  createGrid() {
    const container = document.createElement('div');
    container.className = 'products-grid';

    const innerContainer = document.createElement('div');
    innerContainer.className = 'products-grid__inner';

    container.appendChild(innerContainer);
    this.innerContainer = innerContainer;

    return container;
  }

  renderProducts(products) {
    // Очищаем текущие карточки
    this.innerContainer.innerHTML = '';

    products.forEach(product => {
      const productCard = new ProductCard(product);
      this.innerContainer.appendChild(productCard.elem);
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const filteredProducts = this.products.filter(product => {
      const noNuts = this.filters.noNuts === true ? !product.nuts : true;
      const vegeterianOnly = this.filters.vegeterianOnly === true ? product.vegeterian : true;
      const maxSpiciness = this.filters.maxSpiciness !== undefined ? product.spiciness <= this.filters.maxSpiciness : true;
      const category = this.filters.category ? product.category === this.filters.category : true;

      return noNuts && vegeterianOnly && maxSpiciness && category;
    });

    this.renderProducts(filteredProducts);
  }
}
