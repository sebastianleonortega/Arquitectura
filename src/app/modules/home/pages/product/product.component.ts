import {Component, OnInit, WritableSignal} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {Category, Product} from "../../interfaces/product";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgForOf,
    EditProductComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  handlerMenu: WritableSignal<boolean> =  this._home.cardSignal;

  product?: Product ;
  productId: string | any = '' ;
  parsedImages: string[] = [];

  constructor(
    private _home: HomeService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this.getIdRoute();
    this.handlerMenu.update( ():boolean => false)
  }

  getIdRoute(){
    this._route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      this.getProductById(this.productId);
    })
  }

  viewCard(){
    this.handlerMenu.update( ():boolean => !this.handlerMenu())
  }

  getProductById(id : any){
    this._home.getProductById(id).subscribe({
      next: (data) => {
        this.parsedImages =  data.images;

        if (data.images[0].startsWith('["')) {
         this.parsedImages = JSON.parse(data.images);
        }

        this.product = data;
        this.parsedImages =  JSON.parse(data.images);
      }
    })
  }

  deleteProduct(){
    this._home.deleteProduct(this.productId).subscribe({
      next: () => {
        this._router.navigateByUrl('/home').then();
      }
    })
  }

  getProduct(add: boolean){
    if (add ){
      this.getProductById(this.productId);
    }
  }

}
