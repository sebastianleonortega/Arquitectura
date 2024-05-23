import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../core/services/alert.service";
import {LoadingService} from "../../../core/services/loading.service";

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
    private _route: Router,
    private _alert: AlertService,
    private _loader: LoadingService
  ) {
  }

  ngOnInit() {
    this.initFormLogin();
  }

  initFormLogin(){
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  sendFormLogin(){
    if (this.formLogin.valid){
      this._loader.show();
      const data = {
        email: this.formLogin.get("email")?.value,
        password: this.formLogin.get("password")?.value,
      }
      this._auth.login(data).subscribe({
        next: (r) => {
          this._loader.hide();
          this._route.navigateByUrl('home').then();
          localStorage.setItem("access_token", r.access_token)
          // localStorage.setItem("refresh_token", r.refresh_token)
        }, error : () => {
          this._alert.error("Credenciales incorrectas")
          this._loader.hide();
        }
      })
    }else{
      this._alert.warning("formulario no valido")
    }

  }

}
