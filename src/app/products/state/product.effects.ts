import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as ProductsActions from "../state/product.action"
import { map, mergeMap } from "rxjs";
@Injectable()
export class ProductEffects{
    constructor( private actions$:Actions, private productService:ProductService){}

        loadProducts$=createEffect(()=>{ //takes callback function and return new action
            //listen to action to filter on and pass operator using of method
            return this.actions$.pipe(
                ofType(ProductsActions.loadProducts),
                mergeMap(()=>this.productService.getProducts().pipe(
                    map(products=>ProductsActions.loadProductsSuccess({products}))
                ))
            )
        })
    
}