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

function printCartItem({ cartItem }: User): void {
  console.log(cartItem);
}
printCartItem(user);
// { item: 'Something', price: 100, quantity: 2 }

const { cartItem, ...generalInfo } = user;
console.log(generalInfo);
// { firstName: 'John', lastName: 'Doe', age: 30 }
