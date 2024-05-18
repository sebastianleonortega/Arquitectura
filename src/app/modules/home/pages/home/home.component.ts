import {Component, OnInit, WritableSignal} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EditProductComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  handlerMenu: WritableSignal<boolean> =  this._home.cardSignal;
  products: Product[] = [];
  parsedImages: any= []

  constructor(
    private _home: HomeService
  ) {
  }

  ngOnInit() {
    this.handlerMenu.update( ():boolean => true) //cambiar a false cuando acabe los estilos
    this.getProduct();
  }

  getProduct(){
    this._home.getProduct().subscribe({
      next: (data) => {
        this.products = data;

        data.forEach(
          (item: any)=>{
            if (item.images[0].startsWith('["')) {
              item.images = JSON.parse(item.images);
            }
          }
        )



    }
    })
  }

  viewCard(){
    this.handlerMenu.update( ():boolean => !this.handlerMenu())
  }

  addedProduct(add: boolean){
    if (add ){
      this.getProduct();
    }
  }

}
