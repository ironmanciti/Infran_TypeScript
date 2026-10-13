type Product = { name: string; price: number; quantity: number };

function validateProduct(p: Product): boolean {
  return p.name !== "" && p.price > 0 && Number.isInteger(p.quantity) && p.quantity >= 0;
}

console.log(validateProduct({ name: "", price: -100, quantity: 3.4 }));     // false
console.log(validateProduct({ name: "Pen", price: -100, quantity: 3.4 }));  // false
console.log(validateProduct({ name: "Pen", price: 100, quantity: 3.4 }));   // false
console.log(validateProduct({ name: "Pen", price: 100, quantity: -1 }));    // false
console.log(validateProduct({ name: "Pen", price: 100, quantity: 0 }));     // true
console.log(validateProduct({ name: "Pen", price: 100, quantity: 3 }));     // true
