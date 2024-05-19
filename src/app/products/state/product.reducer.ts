import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";import { state } from "@angular/animations";

export interface ProductState{
    showProductCode:boolean;
    currentProduct:Product;
    products:Product[]
}
const initialState:ProductState={
    showProductCode:true,
    currentProduct: null as any , // Change type to Product | null
    products:[]
}
const getProductFeatureState=createFeatureSelector<ProductState>('products')
export const getShowProductCode=createSelector(
    getProductFeatureState,
    state=>state.showProductCode
)
export const productReducer=createReducer<ProductState>(initialState,
    on(createAction('Toggle Product code'),(state):ProductState=>{
        console.log('original state'+JSON.stringify(state))
        return{
            ...state,
            showProductCode:!state.showProductCode,
                }
    })
)