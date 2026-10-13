class DataStorage {
  private data: string[];
  constructor(data: string[]) { this.data = data; }
  add(item: string): void {
    if (!this.exists(item)) this.data.push(item);
  }
  private exists(item: string): boolean {
    return this.data.indexOf(item) !== -1;
  }
  getItems(): string[] {
    return [...this.data];   // 복사본을 반환
  }
}
const storage = new DataStorage(["John"]);
storage.add("Jack");
storage.add("Jack");                // 이미 있으면 추가하지 않음
console.log(storage.getItems());    // [ 'John', 'Jack' ]

storage.getItems().push("Mary");    // 원본은 바뀌지 않음
console.log(storage.getItems());    // [ 'John', 'Jack' ]

storage.data = [];                  // 오류 TS2341: private
console.log(storage.getItems());    // [] (실행 시점에는 막지 못함)
