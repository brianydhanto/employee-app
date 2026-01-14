import { Component, OnInit } from "@angular/core";
import { CardComponent } from "@shared/components/card/card.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { EmployeeService } from "@shared/services/employee/employee.service";
import { Subscription } from "rxjs";
import { LoginService } from "@shared/services/auth/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, ReactiveFormsModule, CardComponent]
})
export class LoginComponent implements OnInit {
  subscription$!: Subscription
  loginForm!: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly employeeService: EmployeeService,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
    this.initLoginForm()
  }

  ngOnInit(): void {
    this.getEmployees()
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['james.wilson', Validators.required],
      password: ['User123', Validators.required]
    })
  }

  getEmployees(): void {
    this.subscription$ = this.employeeService
    .all()
    .subscribe()
  }

  login(): void {
    const isSuccess = this.loginService.login(this.loginForm.value)
    if (isSuccess) {
      this.router.navigate(['/employee'])
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}