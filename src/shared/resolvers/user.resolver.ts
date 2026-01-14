import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { EmployeeService } from "@shared/services/employee/employee.service";

export const employeeResolver: ResolveFn<any> = () => {
  const employeeService = inject(EmployeeService)
  employeeService.all()
  return employeeService.list()
}