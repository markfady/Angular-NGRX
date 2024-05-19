import { createAction, createReducer, on } from "@ngrx/store";
import { Product } from "../product";

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
export const productReducer=createReducer<ProductState>(initialState,
    on(createAction('Toggle Product code'),(state):ProductState=>{
        console.log('original state'+JSON.stringify(state))
        return{
            ...state,
            showProductCode:!state.showProductCode,
                }
    })
)