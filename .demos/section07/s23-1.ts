class DataStorage<T> {
  private _data: T[];
  constructor(data: T[] = []) {   // 기본값으로 선택적 매개변수
    this._data = data;
  }
  add(item: T): void {
    this._data.push(item);
  }
  get data(): T[] { return [...this._data]; }   // getter
  set data(items: T[]) { this._data = items; }  // setter
}

const storage = new DataStorage<string>();
storage.add("hello");
storage.add(5);        // 오류 TS2345: number → string
storage.data = ["a", "b"];   // setter 호출
console.log(storage.data);   // getter 호출, ['a', 'b']
