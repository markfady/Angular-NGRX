import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode=createAction('Toggle product code');

export const setCurrentProduct=createAction('setCurrentProduct', //passing data to currentProduct
    props<{currentProductId:number}>()
)

export const clearCurrentProduct=createAction('Clear Current Product');

export const initializeCurrentProduct=createAction('Initialize Current Product');
 /* Complex operations*/
export const loadProducts = createAction(
    '[Product] Load'
  );
  
  export const loadProductsSuccess = createAction(
    '[Product] Load Success',
    props<{ products: Product[] }>()
  );
  
  export const loadProductsFailure = createAction(
    '[Product] Load Fail',
    props<{ error: string }>()
  );