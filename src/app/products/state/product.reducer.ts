import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";import { state } from "@angular/animations";
import * as ProductsActions from './product.action'
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
    on(ProductsActions.toggleProductCode,(state):ProductState=>{
        console.log('original state'+JSON.stringify(state))
        return{
            ...state,
            showProductCode:!state.showProductCode,
                }
    }),
    on(ProductsActions.setCurrentProduct,(state,action):ProductState=>{ //setCurrentProduct needs data to pass so we strongly typed it too here with using action
        return{
            ...state,
            currentProduct:action.product
        }
    }),
    on(ProductsActions.clearCurrentProduct,(state):ProductState=>{
        return{
            ...state,
            currentProduct:null as any
        }
    }),
    on(ProductsActions.initializeCurrentProduct,(state):ProductState=>{
        return{
            ...state,
            currentProduct:{
                id:0,
                productName:'',
                productCode:'New',
                description:'',
                starRating:0
            }
        }
    })
)