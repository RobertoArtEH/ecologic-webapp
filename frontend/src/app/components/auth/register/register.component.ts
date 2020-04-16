import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      last_name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["",[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      password2: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  get nameValidate() {
    return this.form.get("name").invalid && this.form.get("name").touched;
  }

  get lastnameValidate() {
    return this.form.get("last_name").invalid && this.form.get("last_name").touched;
  }

  get emailValidate() {
    return this.form.get("email").invalid && this.form.get("email").touched;
  }

  get passwordValidate() {
    return (this.form.get("password").invalid && this.form.get("password").touched);
  }

  get passwordSecond() {
    const password = this.form.get("password").value;
    const password2 = this.form.get("password2").value;

    return password === password2 ? false : true;
  }

  register() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.userService.register(this.form.value).subscribe(response => {
      Swal.fire({
        icon: 'success',
        title: 'Registrado correctamente',
        text: '¡Bienvenido a Eco-logic!',
        showConfirmButton: false,
        timer: 1300
      }).then(() => {
        this.router.navigate(["/login"]);
      });
    },
    () => {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error.',
        text: 'Intentalo más tarde...',
        showConfirmButton: false,
        timer: 1300
      });
    });
  }
  
}
