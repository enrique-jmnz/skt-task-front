import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProductsComponent} from "@app-products";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "products",
  },
  {
    path: "products",
    component: ListProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
