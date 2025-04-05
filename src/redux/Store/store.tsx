// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Reducer/CartSlice";
import MainSlice from "../Reducer/MainSlice";
import wishListReducer from "../Reducer/WishListSlice"
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishListReducer,
    Initial: MainSlice,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
