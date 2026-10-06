class Product {
    id: number;
    price: number;

    constructor(price: number) {
        this.id = Math.floor(Math.random() * 1000); // random number between 0 and 1000
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
        super(price); // random number between 0 and 1000
        this.title = title;
        this.price = price;
    }

    calculateShipping(): number {
        return this.price < 30 ? 0 : this.price * 0.05;
    }

    getBookInfo(): string {
        return `Book: ${this.title}, Pages: ${this.pages}, Price: ${this.price}`;
    }
}

const book1 = new Book("The Great Gatsby", 180, 15);
console.log(book1.getBookInfo());
console.log(`Shipping Cost: ${book1.calculateShipping()}`);