import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;
  messageError: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get emailValidate() {
    return this.form.get("email").invalid && this.form.get("email").touched;
  }

  get passwordValidate() {
    return this.form.get("password").invalid && this.form.get("password").touched;
  }

  login() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.userService.login(this.form.value).subscribe(response => {
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token.token);

      this.router.navigate(['']);
    },
    response => {
      this.messageError = (response.error.error != null) ? response.error.error : 'El email o la contraseña que ingresaste no coinciden con nuestros registros.';
      this.error = true;

      setTimeout(() => this.error = false, 5000);
    });
  }

}
