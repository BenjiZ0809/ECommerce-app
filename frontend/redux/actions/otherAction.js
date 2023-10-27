import axios from "axios";
import { server } from "../store";

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        `${server}/user/changepassword`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFail",
        payload: error.response.data.message,
      });
    }
  };

// export const updateProfile =
//     (name, email, address, city, country, zicCode) => async (dispatch) => {
//         try {
//             dispatch({
//                 type: "updateProfileRequest",
//             });

//             const { data } = await axios.put(
//                 `${server}/user/updateprofile`,
//                 {
//                     name,
//                     email,
//                     address,
//                     city,
//                     country,
//                     zicCode,
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     withCredentials: true,
//                 }
//             );
//             dispatch({
//                 type: "updateProfileSuccess",
//                 payload: data.message,
//             });
//         } catch (error) {
//             dispatch({
//                 type: "updateProfileFail",
//                 payload: error.response.data.message,
//             });
//         }
//     };

export const updateProfile =
  (name, email, address, city, country, zipCode) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });

      const { data } = await axios.put(
        `${server}/user/updateprofile`,
        {
          name,
          email,
          address,
          city,
          country,
          zipCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(data);
      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFail",
        payload: error.response.data.message,
      });
    }
  };

export const placeOrder =
  (
    orderItems,
    shippingInfo,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    paymentInfo
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "placeOrderRequest",
      });

      const { data } = await axios.post(
        `${server}/order/new`,
        {
          shippingInfo,
          orderItems,
          paymentMethod,
          paymentInfo,
          itemsPrice,
          taxPrice,
          shippingCharges,
          totalAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: "placeOrderSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "placeOrderFail",
        payload: error.response.data.message,
      });
    }
  };

export const processOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "processOrderRequest",
    });

    const { data } = await axios.put(
      `${server}/order/single/${id}`,

      {},
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "processOrderSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "processOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const addCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: "addCategoryRequest",
    });

    const { data } = await axios.post(
      `${server}/product/category`,

      {
        category,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: "addCategorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCategoryFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCategoryRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/category/${id}`,

      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteCategorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCategoryFail",
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "addProductRequest",
    });

    const { data } = await axios.post(`${server}/product/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({
      type: "addProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addProductFail",
      payload: error.response.data.message,
    });
  }
};
