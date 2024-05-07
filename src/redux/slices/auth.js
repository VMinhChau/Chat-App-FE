import { createSlice } from "@reduxjs/toolkit";

import { axiosAuth } from "../../utils/axios"
import { showSnackbar, SelectConversation, ResetAppReducer } from "./app";
import { ResetConversationReducer } from "./conversation";

// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user_name: null,
  user_id: null,
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    },
    signOut(state, action) {
      Object.assign(state, initialState)
    },
    updateRegisterEmail(state, action) {
      console.log(action.payload.email);
      state.email = action.payload.email;
    },
  },
});

// Reducer
export default slice.reducer;

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axiosAuth
      .post(
        "/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axiosAuth
      .post(
        "/v1/api/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.code === 1) {
          dispatch(showSnackbar({ severity: "error", message: response.data.data }));
        }
        else {
          dispatch(
            showSnackbar({ severity: "success", message: response.data.data })
          );
        }
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    // Make API call here
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axiosAuth
      .post(
        "/v1/api/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.code === 1) {
          dispatch(showSnackbar({ severity: "error", message: response.data.data }));
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: true })
          );
        }
        else {
          dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              access_token: response.data.data.accessToken,
              user_id: response.data.data.userId,
            })
          );

          window.localStorage.setItem("user_id", response.data.data.userId);
          console.log(window.localStorage.getItem("user_id"))
          dispatch(
            showSnackbar({ severity: "success", message: "Đăng nhập thành công" })
          );
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: false })
          );
        }
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id");
    dispatch(slice.actions.signOut());
    dispatch(ResetAppReducer());
    dispatch(ResetConversationReducer());
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    console.log(formValues);
    const data = {
      email: formValues.email,
      fullName: formValues.firstName + " " + formValues.lastName,
      password: formValues.password,
    }
    await axiosAuth
      .post(
        "/v1/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.code === 1) {
          dispatch(showSnackbar({ severity: "error", message: response.data.data }));
        }
        else {
          dispatch(slice.actions.updateRegisterEmail({ email: formValues.email }));
          window.setTimeout(function () {
            window.location.href = "/auth/verification-notice"
          }, 4000);
        }
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ error: true, isLoading: false })
        );
      })
    // .finally(() => {
    //   if (!getState().auth.error) {
    //     window.location.href = "/auth/login";
    //   }
    // });
  };
}

export function FindUserByEmail(email) {
  return async (dispatch, getState) => {
    await axiosAuth
      .get("/v1/api/auth/find-user-by-email",
        {
          params: { email }
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        })
      .then(function (response) {
        console.log(response.data);
        dispatch(
          showSnackbar({ severity: "success", message: response.data })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}
