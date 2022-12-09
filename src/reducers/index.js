import { combineReducers } from "redux";
import { productReducer } from "./ProductReducer";
import { listNameReducer } from "./Listname";
import cartReducer from "./CartReducer";
import { userReducer } from "./UserReducer";

const rootReducer = combineReducers({
  categrories: listNameReducer,
  carts: cartReducer,
  products: productReducer,
  users: userReducer
})

export default rootReducer;
