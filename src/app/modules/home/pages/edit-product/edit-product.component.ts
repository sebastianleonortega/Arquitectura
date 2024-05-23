import {Component, EventEmitter, OnInit, Output, WritableSignal} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {InputMaskDirective} from "../../../../core/directives/input-mask.directive";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {AlertService} from "../../../../core/services/alert.service";
import {Category} from "../../interfaces/product";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgSelectModule,
    InputMaskDirective,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
    NgIf,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {

  handlerMenu: WritableSignal<boolean> = this._home.cardSignal;

  showTitle: boolean = false;

  formProduct: FormGroup = new FormGroup({});
  productId: string | any = '';

  images: string[] = []
  categories: Category[] = [];

  @Output() addedProduct: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editProduct: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _home: HomeService,
    private _route: ActivatedRoute,
    private _alert: AlertService
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
        console.log(this.productId)
        this.getProductById(this.productId);
      }
    })
  }

  getProductById(id: any) {
    this._home.getProductById(id).subscribe({
      next: (data) => {
        this.setDataProduct(data);

        if (data.images[0].startsWith('["')) {
          this.images = JSON.parse(data.images);
        }
        this.showTitle = true;
      }
    })
  }

  getCategories() {
    this._home.getCategories().subscribe({
      next: (data: Category[] ) => {
        this.categories = data;
      }
    })
  }

  setDataProduct(data: any) {
    this.formProduct.get('title')?.setValue(data['title']);
    this.formProduct.get('price')?.setValue(data['price']);
    this.formProduct.get('description')?.setValue(data['description']);
    this.formProduct.get('categoryId')?.setValue(data['category']['id']);
  }

  initFormProduct() {
    this.formProduct = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      images: new FormControl('', ),
    })
  }
  imageURLValidator(control: FormControl): { [key: string]: boolean } | null {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?.(jpg|jpeg|png|gif|bmp)$/i;
    if (!control.value || !urlPattern.test(control.value)) {
      return { 'invalidImageUrl': true };
    }
    return null;
  }

  sendFormProduct() {
    if (this.formProduct.valid) {
      const data = {
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
            this.editProduct.emit(true)
            this._alert.success("producto editado")
          }
        })
      } else {
        this._home.saveProduct(data).subscribe({
          next: (r) => {
            this.addedProduct.emit(true)
            this._alert.success("producto agregado")
            this.viewCard();
          }
        })
      }
    }else {
      this._alert.warning("Faltan datos en el formulario")
    }
  }

  pushImages(){
    const img = this.formProduct.get('images')?.value;
    if (this.imageURLValidator({ value: img } as FormControl) === null) {
      this.formProduct.get('images')?.setValue("");
      this.images.push(img);
    } else {
      this.formProduct.get('images')?.setValue("");
      this._alert.error("url no valida")
    }
  }

  deleteImage(position: number){
    this.images.splice(position, 1)
  }

}

