import { CART } from '../constants'

// export const AddCart = (product) => {
//   return {
//     type: CART.ADD_PRODUCT_TO_CART,
//     product
//   };
// }

export const AddCart = (product) => async dispatch => {
  dispatch({
    type: CART.ADD_PRODUCT_TO_CART,
    product
  })
}

export const removeProductFromCart = index =>{
  return {
    type: CART.REMOVE_PRODUCT_FROM_CART,
    index
  }
}

export const updateQtyCart = (qty) =>{
  return{
    type:CART.UPDATE_QTY_CART,
    qty
  }
}