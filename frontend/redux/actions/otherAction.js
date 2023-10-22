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

      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFail",
        payload: error.response.data.message,
      });
    }
  };
