import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ProductsService} from "@app-services";
import {ProductModel} from "@app-models";
import {catchError, distinctUntilChanged, of} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  @Output() productInserted = new EventEmitter<ProductModel>();
  private readonly _name_pattern = /^\S+(\s\S{1,20}){0,20}$/;
  private readonly _default_error = "Something went wrong while trying save your product";
  nameControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this._name_pattern),
    Validators.maxLength(100)
  ]);
  descriptionControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this._name_pattern),
    Validators.maxLength(255)
  ]);
  priceControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(1000000)
  ])
  formGroup = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    price: this.priceControl
  });
  error = false;
  errorMsg = "";

  submitting = false;

  constructor(private dialogReference: MatDialogRef<any>, private productsService: ProductsService) { }
  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(
      untilDestroyed(this),
      distinctUntilChanged()
    ).subscribe(() => {
      this.error = false;
      this.errorMsg = '';
    })
  }

  submit() {
    if (this.formGroup.valid) {
      this.error = false;
      this.errorMsg = "";
      const product: ProductModel = {
        name: this.formGroup.get("name")?.value,
        description: this.formGroup.get("description")?.value,
        price: this.formGroup.get("price")?.value
      };
      this.submitting = true;
      this.productsService.saveProducts(product).pipe(
        catchError((err) => {
          console.error(err);
          this.error = true;
          this.errorMsg = err.error?.message;
          this.errorMsg = this.errorMsg ? this.errorMsg : this._default_error;
          return of(null);
        })
      ).subscribe(product => {
        this.submitting = false;
        if (product) {
          this.productInserted.emit(product);
          this.dialogReference.close();
        }
      })
    }
  }

  close() {
    this.dialogReference.close();
  }
}
