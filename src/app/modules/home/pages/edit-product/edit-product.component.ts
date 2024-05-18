import {Component, EventEmitter, OnInit, Output, WritableSignal} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgSelectModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {

  handlerMenu: WritableSignal<boolean> = this._home.cardSignal;

  formProduct: FormGroup = new FormGroup({});
  productId: string | any = '';

  images: string[] = []
  categories : any[] = [];

  @Output() addedProduct: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _home: HomeService,
    private _route: ActivatedRoute,
  ) {
  }


  ngOnInit() {
    this.initFormProduct();
    this.getIdRoute();
    this.getCategories();
  }

  viewCard() {
    this.handlerMenu.update((): boolean => false)
  }

  getIdRoute() {
    this._route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId != null) {
        this.getProductById(this.productId);
      }
    })
  }

  getProductById(id: any) {
    this._home.getProductById(id).subscribe({
      next: (data) => {
        this.setDataProduct(data);
      }
    })
  }

  getCategories() {
    this._home.getCategories().subscribe({
      next: (data) => {
        this.categories = data
        console.log(data)
      }
    })
  }

  setDataProduct(data: any) {
    this.formProduct.get('title')?.setValue(data['title']);
    this.formProduct.get('price')?.setValue(data['price']);
    this.formProduct.get('description')?.setValue(data['description']);
    this.formProduct.get('categoryId')?.setValue(data['categoryId']);
    this.formProduct.get('images')?.setValue(data['images']);
  }

  initFormProduct() {
    this.formProduct = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      images: new FormControl('', [Validators.required]),
    })
  }

  sendFormProduct() {
    const data: sendData = {
      title: this.formProduct.get("title")?.value,
      price: this.formProduct.get("price")?.value,
      description: this.formProduct.get("description")?.value,
      categoryId: this.formProduct.get("categoryId")?.value,
      images: this.images
    }
    if (this.productId != null) {
      this._home.updateProduct(this.productId, data).subscribe({
        next: (r) => {
          this.viewCard();
        }
      })
    } else {
      this._home.saveProduct(data).subscribe({
        next: (r) => {
          this.addedProduct.emit(true)
          this.viewCard();
        }
      })
    }

  }

  pushImages(){
    const img = this.formProduct.get("images")?.value;
    this.formProduct.get("images")?.setValue("");
    this.images.push(img)
  }

  deleteImage(position: number){
    console.log(position)
    this.images.splice(position, 1)
    console.log(this.images)

  }

}

interface sendData {
  title: string,
  price: number,
  description: string,
  categoryId: number,
  images: string[]
}
