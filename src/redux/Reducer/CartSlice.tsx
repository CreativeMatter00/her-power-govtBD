import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type for the cart product
interface Product {
  // id: string;
  id: string;
  variantId: string;
  quantity: number;
}

// Type for the cart state
interface CartState {
  products: Product[];
}

// Function to get initial cart state from local storage
const getInitialCartState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return { products: [] };
};

const initialState: CartState = getInitialCartState();

// Function to save cart to local storage
// const saveCartToLocalStorage = (cartData: CartState) => {
//   localStorage.setItem("cart", JSON.stringify(cartData));
// };

const updateCartState = (cartData: CartState): CartState => {
  localStorage.setItem("cart", JSON.stringify(cartData));
  return cartData;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;      
      const existingProduct = state.products.find(
        (p) => p.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.products.push(product);
        
      }

      state = updateCartState(state);
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      // console.log("product id from increment (slice) : ", productId);
      const existingProduct = state.products.find(
        (p) => p.id === productId
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
      updateCartState(state);
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      const existingProduct = state.products.find(
        (p) => p.id === productId
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }

      updateCartState(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      // console.log("state remove cart from slice 1: ", state.products);
      // console.log("product id from cart slice: ", productId);
      const index = state.products.findIndex(
        (product) => product.id === productId
      );
      if (index !== -1) {
        state.products.splice(index, 1);
        updateCartState(state);
      }
    },

    deleteAll: (state) => {
      state.products = [];
      updateCartState(state);
    },
  },
});

// Selector to get total quantity of items in the cart
export const getProductsFromLocalStorage = (): Product[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      return cart.products || [];
    }
  }
  return [];
};

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  deleteAll,
} = cartSlice.actions;

export default cartSlice.reducer;
