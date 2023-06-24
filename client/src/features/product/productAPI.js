import axios from "axios";
import {
  categoriesFailure,
  categoriesRequest,
  categoriesSuccess,
  featuredProductsFailure,
  featuredProductsRequest,
  featuredProductsSuccess,
  productsFailure,
  productsRequest,
  productsSuccess,
  selectedProductFailure,
  selectedProductRequest,
  selectedProductSuccess,
} from "./productSlice";

export const getProuctsByFilters =
  (page, sort, filter) => async (dispatch, getState) => {
    try {
      dispatch(productsRequest());
      let query = ``;
      if (page) {
        query += `_page=${page}`;
      }
      if (sort) {
        query += `&_sort=${sort._sort}&_order=${sort._order}&`;
      }
      if (filter) {
        query += `&_category=${filter.category}`;
      }

      console.log(query);
      const { data } = await axios.get(`/api/v1/product/all?${query}`);
      dispatch(productsSuccess(data));
    } catch (error) {
      dispatch(productsFailure(error.response.data.message));
    }
  };
export const fetchCategories = () => async (dispatch, getState) => {
  try {
    dispatch(categoriesRequest());
    const { data } = await axios.get(`/api/v1/category/all`);
    dispatch(categoriesSuccess(data.categories));
  } catch (error) {
    console.log(error);
    dispatch(categoriesFailure(error.response.data.message));
  }
};

export const fetchFeaturedProducts = (type) => async (dispatch, getState) => {
  try {
    dispatch(featuredProductsRequest());
    const { data } = await axios.get(`/api/v1/product/${type}`);
    dispatch(featuredProductsSuccess(data.products));
  } catch (error) {
    console.log(error);

    dispatch(featuredProductsFailure(error.response.data.message));
  }
};
export const getSingleProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(selectedProductRequest());
    const { data } = await axios.get(`/api/v1/product/any/${id}`);
    dispatch(selectedProductSuccess(data.product));
  } catch (error) {
    dispatch(selectedProductFailure(error.response.data.message));
  }
};
