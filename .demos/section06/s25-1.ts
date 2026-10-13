type Item = { id: number; name: string; price: number };

type Cart = {
  items: Item[];
  addToCart(item: Item): void;
  removeFromCart(itemId: number): void;
};

const cart: Cart = {
  items: [],
  addToCart(item: Item): void {
    this.items.push(item);
  },
  removeFromCart(itemId: number): void {
    const temporaryArray: Item[] = [];
    for (const item of this.items) {
      if (item.id !== itemId) temporaryArray.push(item);
    }
    this.items = temporaryArray;
  },
};

cart.addToCart({ id: 1, name: "tofu", price: 30 });
cart.addToCart({ id: 2, name: "milk", price: 50 });
cart.removeFromCart(1);
console.log(cart.items);
// [ { id: 2, name: 'milk', price: 50 } ]
