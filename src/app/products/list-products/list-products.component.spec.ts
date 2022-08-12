import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ListProductsComponent, ProductsModule} from '@app-products';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductsModule, HttpClientTestingModule, MatDialogModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
