import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";import { state } from "@angular/animations";
import * as ProductsActions from './product.action'
export interface ProductState{
    showProductCode:boolean;
    currentProductId:number | null; //keep track of the ID of the currently selected product
    products:Product[]
}
const initialState:ProductState={
    showProductCode:true,
    currentProductId: null  , // Change type to Product | null
    products:[]
}
/*Selectors */
const getProductFeatureState=createFeatureSelector<ProductState>('products')

export const getShowProductCode=createSelector(
    getProductFeatureState,
    state=>state.showProductCode
)
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);
  
  export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
      if (currentProductId === 0) {
        return {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        };
      } else {
        console.log(currentProductId)
        return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
      }
    }
  );
  
  
  export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
  );
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
            currentProductId:action.currentProductId
        }
    }),
    on(ProductsActions.clearCurrentProduct,(state):ProductState=>{
        return{
            ...state,
            currentProductId:null 
        }
    }),
    on(ProductsActions.initializeCurrentProduct,(state):ProductState=>{
        return{
            ...state,
            currentProductId:null
        }
    }),
    on(ProductsActions.loadProductsSuccess,(state,action):ProductState=>{ //Listen to effect action and set the retrieved data from action(effect) to the array of products
        return{
            ...state,
            products:action.products
        }
    }),
    on(ProductsActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item
        );
        console.log(updatedProducts)
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id
        };
    })
)