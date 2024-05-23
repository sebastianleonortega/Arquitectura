import {Component, OnInit, WritableSignal} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {Product} from "../../interfaces/product";
import {AlertService} from "../../../../core/services/alert.service";
import {FormsModule} from "@angular/forms";
import {LoadingService} from "../../../../core/services/loading.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EditProductComponent,
    NgOptimizedImage,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  handlerMenu: WritableSignal<boolean> = this._home.cardSignal;
  products: Product[] = [];
  searchTerm : string = "";

  constructor(
    private _home: HomeService,
    private _loader: LoadingService
  ) {
  }

  ngOnInit() {
    this.handlerMenu.update((): boolean => false) //cambiar a false cuando acabe los estilos
    this.getProduct();
  }

  searchProducts(): void {
    const text = this.searchTerm.toLowerCase();
    if (text === ""){
      this.getProduct();
    }else {
      this.products = this.products.filter(product =>
        product.title.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text)
      );
    }
  }

  getProduct() {
    this._loader.show();
    this._home.getProduct().subscribe({
      next: (data) => {
        this.products = data;
        this._loader.hide();

        data.forEach(
          (item: any) => {
            if (item.images[0].startsWith('["')) {
              item.images = JSON.parse(item.images);
            }
          }
        )
      }
    })
  }

  viewCard() {
    this.handlerMenu.update((): boolean => !this.handlerMenu())
  }

  addedProduct(add: boolean) {
    if (add) {
      this.getProduct();
    }
  }

}
