type CartItem = { item: string; price: number; quantity: number };

type User = {
  firstName: string;
  lastName: string;
  age: number;
  cartItem: CartItem;
};

const user: User = {
  firstName: "John", lastName: "Doe", age: 30,
  cartItem: { item: "Something", price: 100, quantity: 2 },
};

const { cartItem: { item, price } } = user;
console.log(item, price);  // Something 100
