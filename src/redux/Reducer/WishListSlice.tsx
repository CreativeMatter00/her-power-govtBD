import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  variantId: string;
  quantity: number;
}

// Type for the cart state
interface WishListState {
  products: Product[];
}

// Function to get initial cart state from local storage
const getInitialWishListState = (): WishListState => {
  if (typeof window !== "undefined") {
    const savedWishList = localStorage.getItem("wishlist");

    if (savedWishList) {
      return JSON.parse(savedWishList);
    }
  }
  return { products: [] };
};

const initialState: WishListState = getInitialWishListState();


const updateWishListState = (wishListData: WishListState): WishListState => {
  localStorage.setItem("wishlist", JSON.stringify(wishListData));
  return wishListData;
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<Product>) => {
      const product = action.payload;      
      const existingProduct = state.products.find(
        (p) => p.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.products.push(product);
        
      }

      state = updateWishListState(state);
    },

    removeFromWishList: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      // console.log("state remove cart from slice 1: ", state.products);
      // console.log("product id from cart slice: ", productId);
      const index = state.products.findIndex(
        (product) => product.id === productId
      );
      if (index !== -1) {
        state.products.splice(index, 1);
        updateWishListState(state);
      }
    },

    deleteAll: (state) => {
      state.products = [];
      updateWishListState(state);
    },
  },
});

export const getWishListProductsFromLocalStorage = (): Product[] => {
  if (typeof window !== "undefined") {
    const savedWishList = localStorage.getItem("wishList");
    if (savedWishList) {
      const cart = JSON.parse(savedWishList);
      return cart.products || [];
    }
  }
  return [];
};

export const {
  addToWishList,
  removeFromWishList,
  deleteAll,
} = wishListSlice.actions;

export default wishListSlice.reducer;
