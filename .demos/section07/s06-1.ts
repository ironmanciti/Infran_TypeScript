class Product {
  id: number;
  price: number;
  constructor(price: number) {
    this.id = Math.floor(Math.random() * 1000);
    this.price = price;
  }
  calculateShipping(): number {
    return this.price < 30 ? 0 : this.price * 0.05;
  }
  getProductInfo(): string {
    return `Product ID: ${this.id}, Price: ${this.price}`;
  }
}

const product = new Product(50);
console.log(product.calculateShipping());   // 2.5  (50의 5%)
