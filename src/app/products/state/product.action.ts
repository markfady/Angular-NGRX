import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode=createAction('Toggle product code');

export const setCurrentProduct=createAction('setCurrentProduct', //passing data to currentProduct
    props<{product:Product}>()
)

export const clearCurrentProduct=createAction('Clear Current Product');

export const initializeCurrentProduct=createAction('Initialize Current Product');