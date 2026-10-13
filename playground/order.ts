// 타입 별칭: 상품, 고객, 주문
type Product = { name: string; price: number; quantity: number };

type Customer = {
  name: string;
  couponRate?: number;   // 쿠폰 할인율(0~1), 없을 수 있음
};

type Order = {
  readonly orderId: string;      // 주문 번호는 수정 불가
  products: readonly Product[];
  customer?: Customer;           // 비회원이면 없음
  memo?: string;                 // 배송 메모는 없을 수 있음
};

// 주문 요약 출력: 전달받은 주문 객체는 읽기만 한다
function printOrderSummary(order: Readonly<Order>): void {
  const { orderId, products, customer, memo } = order;   // 구조 분해 할당

  const rate = customer?.couponRate ?? 0;                // 쿠폰 없으면 0%
  const names = products.map(({ name, quantity }) => `${name} x${quantity}`);
  const total = products.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
  const payment = Math.round(total * (1 - rate));

  console.log(`[주문 ${orderId}] 고객: ${customer?.name ?? "비회원"}`);
  console.log(`  상품: ${names.join(", ")}`);
  console.log(`  결제 금액: ${payment}원 (할인 ${rate * 100}%)`);
  console.log(`  배송 메모: ${memo ?? "없음"}`);

  // order.orderId = "X";   // 오류: 읽기 전용 속성
}

const order1: Order = {
  orderId: "A-001",
  products: [
    { name: "키보드", price: 50000, quantity: 1 },
    { name: "마우스", price: 20000, quantity: 2 },
  ],
  customer: { name: "김철수", couponRate: 0.1 },
  memo: "문 앞에 놓아 주세요",
};

const order2: Order = {
  orderId: "A-002",
  products: [{ name: "모니터", price: 200000, quantity: 1 }],
  customer: { name: "이영희" },
};

const order3: Order = {
  orderId: "A-003",
  products: [{ name: "USB 케이블", price: 5000, quantity: 3 }],
};

printOrderSummary(order1);
printOrderSummary(order2);
printOrderSummary(order3);
