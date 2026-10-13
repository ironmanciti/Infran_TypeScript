// 할인 정책: 가격을 받아 할인된 가격을 돌려주는 함수 타입
type DiscountPolicy = (price: number) => number;

const noDiscount: DiscountPolicy = (price) => price;
const tenPercent: DiscountPolicy = (price) => price * 0.9;
const minus3000: DiscountPolicy = (price) => price - 3000;

// 할인 정책을 콜백으로 받아 최종 결제 금액을 계산
function finalPrice(price: number, policy: DiscountPolicy): number | undefined {
  if (price <= 0) return undefined;   // 가드 절

  const discounted = policy(price);
  if (discounted < 0) return 0;       // 0원 아래로는 내려가지 않음

  return discounted;
}

console.log(finalPrice(20000, noDiscount));  // 20000
console.log(finalPrice(20000, tenPercent));  // 18000
console.log(finalPrice(20000, minus3000));   // 17000
console.log(finalPrice(2000, minus3000));    // 0
console.log(finalPrice(0, tenPercent));      // undefined
console.log(finalPrice(-500, noDiscount));   // undefined
