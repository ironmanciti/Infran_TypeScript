interface EmployeeType {
  id: number;
  name: string;
  salary: number;
  getSalary(): number;
}

class BaseEmployee implements EmployeeType {
  id: number;
  name: string;
  salary: number;
  constructor(id: number, name: string, salary: number) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }
  // getSalary 메서드가 빠지면 오류 TS2420:
  // Class 'BaseEmployee' incorrectly implements
  // interface 'EmployeeType'.
}
