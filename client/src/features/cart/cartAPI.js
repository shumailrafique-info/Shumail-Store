import axios from "axios";
import { addToCarFailure, addToCarRequest, addToCarSuccess } from "./cartSlice";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    dispatch(addToCarRequest());
    const { data } = await axios.get(`/api/v1/product/any/${id}`);
    const product = {
      _id: data.product._id,
      title: data.product.title,
      price: Math.round(
        data.product.price * (1 - data.product.discountPercentage / 100)
      ),
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    };
    dispatch(addToCarSuccess(product));
    console.log(getState().cart.cartItems);
    localStorage.setItem("STitems", JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    dispatch(addToCarFailure(error.response.data.message));
  }
};
