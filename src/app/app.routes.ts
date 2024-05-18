import { Routes } from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {HomeComponent} from "./modules/home/pages/home/home.component";
import {authGuard} from "./core/guards/auth.guard";
import {ProductComponent} from "./modules/home/pages/product/product.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    // canActivate: [authGuard]
  }
];
