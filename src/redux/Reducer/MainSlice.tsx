import { createSlice } from "@reduxjs/toolkit";

interface MainState {
  search: boolean;
  add: boolean;
  val: any;
  cartUpdate: boolean;
  wishlistUpdate:boolean;
}

const initialState: MainState = {
  search: false,
  add: false,
  val: {},
  cartUpdate:false,
  wishlistUpdate:false,
};

export const MainSlice = createSlice({
  name: "Initial",
  initialState,
  reducers: {
    handleInitialSearch: (state) => {
      state.search = true;
    },
    handleInitialSearchStop: (state) => {
      state.search = false;
    },
    handleAddModalOpen: (state) => {
      state.add = true;
    },
    handleAddModalClose: (state) => {
      state.add = false;
    },
    rowValue: (state, action) => {
      state.val = action.payload;
    },
    handleCartUpdate: (state) => {
      state.cartUpdate = !state.cartUpdate;
    },
    handleWishlistUpdate: (state) => {
      state.wishlistUpdate = !state.wishlistUpdate; 
    }
  },
});

export const {
  handleInitialSearch,
  handleInitialSearchStop,
  handleAddModalOpen,
  handleAddModalClose,
  rowValue,
  handleCartUpdate,
  handleWishlistUpdate
} = MainSlice.actions;

export default MainSlice.reducer;

export type RootState = {
  Initial: MainState;
};
