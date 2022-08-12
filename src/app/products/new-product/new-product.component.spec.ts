import { ComponentFixture, TestBed } from '@angular/core/testing';

import {NewProductComponent, ProductsModule} from '@app-products';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductsModule, HttpClientTestingModule, NoopAnimationsModule ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
