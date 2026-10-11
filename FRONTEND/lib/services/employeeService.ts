import { Employee, initialEmployees } from "@/types/employee";

class EmployeeService {
  private employees: Employee[] = [...initialEmployees];

  async getEmployees(): Promise<Employee[]> {
    return [...this.employees];
  }

  async getEmployeeById(id: string): Promise<Employee | undefined> {
    return this.employees.find((e) => e.id === id);
  }

  async createEmployee(data: Omit<Employee, "id" | "initials" | "color" | "status" | "attendance">): Promise<Employee> {
    const newEmployee: Employee = {
      id: `NX-${1050 + this.employees.length}`,
      name: data.name,
      role: data.role,
      dept: data.dept,
      branch: data.branch,
      manager: data.manager || "Maya Chen",
      status: "Active",
      attendance: "Present",
      initials: data.name
        .split(" ")
        .map((x) => x[0])
        .join("")
        .slice(0, 2),
      color: "indigo",
    };
    this.employees = [newEmployee, ...this.employees];
    return newEmployee;
  }

  async archiveEmployee(ids: string[]): Promise<void> {
    this.employees = this.employees.map((e) => (ids.includes(e.id) ? { ...e, status: "Archived" } : e));
  }
}

export const employeeService = new EmployeeService();
