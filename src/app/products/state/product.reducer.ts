import { createAction, createReducer, on } from "@ngrx/store";
import { Product } from "../product";

export interface ProductState{
    showProductCode:boolean;
    currentProduct:Product;
    products:Product[]
}

export const productReducer=createReducer<ProductState>({showProductCode:true} as ProductState,
    on(createAction('Toggle Product code'),(state):ProductState=>{
        console.log('original state'+JSON.stringify(state))
        return{
            ...state,
            showProductCode:!state.showProductCode,
                }
    })
)