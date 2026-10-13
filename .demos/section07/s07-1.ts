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

class Book extends Product {
  title: string;
  pages: number;
  constructor(title: string, pages: number, price: number) {
    super(price);   // 부모 생성자 호출
    this.title = title;
    this.pages = pages;
  }
  override getProductInfo(): string {
    return `${super.getProductInfo()}, Pages: ${this.pages}`;
  }
}

const book = new Book("The Hobbit", 310, 20);
book.id = 123;   // 실행 결과를 고정하려고 무작위 ID를 바꿈
console.log(book.calculateShipping());   // 0  (부모에서 물려받음)
console.log(book.getProductInfo());
// Product ID: 123, Price: 20, Pages: 310
