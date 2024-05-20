import { Component, OnInit } from '@angular/core';



import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getCurrentProduct, getProducts, getShowProductCode } from '../state/product.reducer';
import * as ProductActions from "../state/product.action"
import { Observable } from 'rxjs';
@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];
  products$:Observable<Product[]>;
  getShowProductCode$:Observable<boolean>
  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product>

  constructor(private productService: ProductService, private store:Store<State>) { }

  ngOnInit(): void { //subscribe to the store
  
     //Listen to the store (returns observable)
     this.products$=this.store.select(getProducts)
     //dispatch action
    this.store.dispatch(ProductActions.loadProducts())
    this.selectedProduct$=this.store.select(getCurrentProduct)
    this.getShowProductCode$= this.store.select(getShowProductCode)
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode())
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct())
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({product}))
  }

}
