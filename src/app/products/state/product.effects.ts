import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as ProductsActions from "../state/product.action"
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { of } from 'rxjs';
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
        updateProduct$=createEffect(()=>{ //takes callback function and return new action
            //listen to action to filter on and pass operator using of method
            return this.actions$.pipe( //respond to any dispatched action
                ofType(ProductsActions.updateProduct), //if the dispatched action is updateProduct we call productService
                concatMap(action=>this.productService.updateProduct(action.product).pipe( //this make http put request to update product to back end server
                    map(product=>ProductsActions.updateProductSuccess({product})), //after the success we pass the returned data to the updateProductSuccess
                    catchError(error=>of(ProductsActions.updateProductFailure({error}))) // we use of cause catchError donesn't return observable so return dispateched action as observable using of 
                )) 
            )
        })
}