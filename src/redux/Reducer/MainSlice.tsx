import { createSlice } from "@reduxjs/toolkit";

interface MainState {
  search: boolean;
  add: boolean;
  val: any;
  cartUpdate: boolean; // Added for cart update functionality. This flag is used to indicate if cart data needs to be updated.
}

const initialState: MainState = {
  search: false,
  add: false,
  val: {},
  cartUpdate:false
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
      state.val = action.payload; // Updating Redux state with the rowData
    },
    handleCartUpdate: (state) => {
      // console.log("slice called")
      state.cartUpdate = !state.cartUpdate; // Flag to indicate cart data needs to be updated.
    }
  },
});

export const {
  handleInitialSearch,
  handleInitialSearchStop,
  handleAddModalOpen,
  handleAddModalClose,
  rowValue,
  handleCartUpdate
} = MainSlice.actions;

export default MainSlice.reducer;

export type RootState = {
  Initial: MainState;
};
