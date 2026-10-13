class BaseEmployee {
  id: number;
  name: string;
  salary: number;
  constructor(id: number, name: string, salary: number) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }
  getSalary(): number { return this.salary; }
}

class Manager extends BaseEmployee {
  directReports: BaseEmployee[];
  constructor(id: number, name: string, salary: number, directReports: BaseEmployee[]) {
    super(id, name, salary);
    this.directReports = directReports;
  }
  override getSalary(): number {
    return super.getSalary() + this.directReports.length * 1000;
  }
}

const charlie = new BaseEmployee(2, "Charlie", 90000);
const alice = new Manager(1, "Alice", 120000, [charlie]);

const employees: BaseEmployee[] = [charlie, alice];
employees.forEach((e) => console.log(e.name, e.getSalary()));
// Charlie 90000
// Alice 121000
