import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  totalProducts: null,
  categories: [],
  featuredProducts: [],
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.loading = true;
    },
    productsSuccess: (state, action) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalCount;
      state.loading = false;
    },
    productsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    categoriesRequest: (state) => {
      state.loading = true;
    },
    categoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    categoriesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    featuredProductsRequest: (state) => {
      state.loading = true;
    },
    featuredProductsSuccess: (state, action) => {
      state.featuredProducts = action.payload;
      state.loading = false;
    },
    featuredProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    selectedProductRequest: (state) => {
      state.loading = true;
    },
    selectedProductSuccess: (state, action) => {
      state.selectedProduct = action.payload;
      state.loading = false;
    },
    selectedProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearErrorProduct: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  productsRequest,
  productsSuccess,
  productsFailure,
  categoriesRequest,
  categoriesSuccess,
  categoriesFailure,
  featuredProductsRequest,
  featuredProductsSuccess,
  featuredProductsFailure,
  selectedProductRequest,
  selectedProductSuccess,
  selectedProductFailure,
  clearErrorProduct,
} = productSlice.actions;

export default productSlice.reducer;
