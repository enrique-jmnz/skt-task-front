import { Component, OnInit } from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ProductsService} from "@app-services";
import {ProductModel} from "@app-models";
import {catchError, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {NewProductComponent} from "../new-product/new-product.component";

@UntilDestroy()
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  private readonly _default_error = "Something went wrong while trying fetch the list of products";
  products: ProductModel[] = [];
  displayedColumns: string[] = ['name', 'description', 'price'];
  error = false;
  errorMsg = '';
  loading = false;

  constructor(private productsService: ProductsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.productsService.listProducts().pipe(
      untilDestroyed(this),
      catchError((err) => {
        console.error(err);
        this.error = true;
        this.errorMsg = err.error?.message;
        this.errorMsg = this.errorMsg ? this.errorMsg : this._default_error;
        return of([]);
      }),
    ).subscribe(products => {
      this.loading = false;
      if (products) {
        this.products = products;
      }
    });
  }

  addData() {
    const opened = this.dialog.open(NewProductComponent, {
      height: '550px',
      width: '400px',
    });
    opened.componentInstance.productInserted
      .subscribe(product => this.products = this.products.concat(product));
  }
}
