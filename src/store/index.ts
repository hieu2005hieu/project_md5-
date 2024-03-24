import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSliceder from "./redux-toolkit/cart";
const rootReducer = combineReducers({
    cartSliceder
    
});
const store = configureStore({
    reducer: rootReducer,
});
export default store;