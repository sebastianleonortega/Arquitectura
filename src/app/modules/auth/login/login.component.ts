import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});

  constructor(
    private _auth: AuthService,
    private _route: Router
  ) {
  }

  ngOnInit() {
    this.initFormLogin();
  }

  initFormLogin(){
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.min(4)]),
      password: new FormControl('', [Validators.required, Validators.min(4)])
    })
  }

  sendFormLogin(){
    const data = {
      // email: this.formLogin.get("email")?.value,
      // password: this.formLogin.get("password")?.value,
      email: "john@mail.com",
      password: "changeme",
    }
    this._auth.login(data).subscribe({
      next: (r) => {
        this._route.navigateByUrl('home').then();
        localStorage.setItem("access_token", r.access_token)
        localStorage.setItem("refresh_token", r.refresh_token)
      }
    })
  }

}
