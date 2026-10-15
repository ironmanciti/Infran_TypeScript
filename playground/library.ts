// 부모 클래스: 도서관 자료
class Item {
  id: number;
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  getLoanDays(): number {
    return 10;
  }

  getInfo(): string {
    return `[${this.id}] ${this.title}`;
  }
}

// 자식 클래스: 종이책 (대출 14일)
class Book extends Item {
  author: string;

  constructor(id: number, title: string, author: string) {
    super(id, title);
    this.author = author;
  }

  override getLoanDays(): number {
    return 14;
  }

  override getInfo(): string {
    return `${super.getInfo()} - 저자: ${this.author}`;
  }
}

// 자식 클래스: 전자책 (대출 7일)
class EBook extends Item {
  fileSizeMB: number;

  constructor(id: number, title: string, fileSizeMB: number) {
    super(id, title);
    this.fileSizeMB = fileSizeMB;
  }

  override getLoanDays(): number {
    return 7;
  }

  override getInfo(): string {
    return `${super.getInfo()} - 파일 크기: ${this.fileSizeMB}MB`;
  }
}

class Library {
  private items: Map<number, Item>;          // 자료 id → 자료
  private loans: Map<string, Set<number>>;   // 회원 id → 빌린 자료 id 집합

  constructor() {
    this.items = new Map<number, Item>();
    this.loans = new Map<string, Set<number>>();
  }

  addItem(item: Item): void {
    this.items.set(item.id, item);
  }

  borrow(memberId: string, itemId: number): boolean {
    const item = this.items.get(itemId);
    if (!item) {
      return false;                          // 없는 자료
    }

    let borrowed = this.loans.get(memberId);
    if (!borrowed) {
      borrowed = new Set<number>();          // 첫 대출이면 기록을 새로 만든다
      this.loans.set(memberId, borrowed);
    }

    if (borrowed.has(itemId)) {
      return false;                          // 같은 자료를 두 번 빌릴 수 없음
    }

    borrowed.add(itemId);
    console.log(`  ${memberId} 대출: ${item.title} (반납 기한 ${item.getLoanDays()}일)`);
    return true;
  }

  returnItem(memberId: string, itemId: number): boolean {
    const borrowed = this.loans.get(memberId);
    if (!borrowed) {
      return false;                          // 대출 기록이 없는 회원
    }
    return borrowed.delete(itemId);          // 빌리지 않은 자료면 false
  }

  // 조회 메서드는 복사본을 반환해 내부 데이터를 보호한다
  getItems(): Item[] {
    return [...this.items.values()];
  }

  getLoans(memberId: string): Set<number> {
    return new Set<number>(this.loans.get(memberId));
  }
}

const library = new Library();
library.addItem(new Book(1, "타입스크립트 입문", "김코딩"));
library.addItem(new Book(2, "자바스크립트 완벽 가이드", "이개발"));
library.addItem(new EBook(3, "리액트 핵심 정리", 25));

console.log("--- 도서 목록 ---");
for (const item of library.getItems()) {
  console.log(`  ${item.getInfo()}`);
}

console.log("\n--- 대출 ---");
console.log(`책 대출: ${library.borrow("m1", 1)}`);
console.log(`전자책 대출: ${library.borrow("m1", 3)}`);
console.log(`재대출: ${library.borrow("m1", 1)}`);
console.log(`없는 자료 대출: ${library.borrow("m1", 999)}`);
console.log(`m1 대출 목록: ${[...library.getLoans("m1")].join(", ")}`);

console.log("\n--- 반납 ---");
console.log(`반납: ${library.returnItem("m1", 1)}`);
console.log(`재반납: ${library.returnItem("m1", 1)}`);
console.log(`m1 대출 목록: ${[...library.getLoans("m1")].join(", ")}`);

console.log("\n--- 대출 기록이 없는 회원 ---");
console.log(`m2 반납: ${library.returnItem("m2", 2)}`);
console.log(`m2 대출 수: ${library.getLoans("m2").size}`);
console.log(`m2 첫 대출: ${library.borrow("m2", 2)}`);
console.log(`m2 대출 수: ${library.getLoans("m2").size}`);

console.log("\n--- 복사본 확인 ---");
const copy = library.getLoans("m1");
copy.add(999);                               // 복사본만 바뀐다
console.log(`복사본 크기: ${copy.size}`);
console.log(`m1 실제 대출 수: ${library.getLoans("m1").size}`);

// library.items.clear();   // 오류 TS2341: 'items'는 private 속성
