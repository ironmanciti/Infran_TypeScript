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
  getSalary(): number { return this.salary; }
}

const employee = new BaseEmployee(1, "Kim", 50000);
console.log(employee.getSalary());   // 50000
