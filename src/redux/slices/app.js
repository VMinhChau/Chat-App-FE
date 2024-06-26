import { createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../utils/axios";
import { UsersList } from "../../data";

// ----------------------------------------------------------------------

const initialState = {
  user: {},
  sideBar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  isLoggedIn: true,
  tab: 0, // [0, 1, 2, 3]
  snackbar: {
    open: null,
    severity: null,
    message: null,
  },
  all_users: [], // all users of app
  chat_type: null,
  room_id: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    // Toggle Sidebar
    toggleSideBar(state) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    updateTab(state, action) {
      state.tab = action.payload.tab;
    },

    openSnackBar(state, action) {
      console.log(action.payload);
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state) {
      console.log("This is getting executed");
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    fetchAllUsers(state, action) {
      state.all_users = action.payload.all_users;
    },
    selectConversation(state, action) {
      state.chat_type = action.payload.chat_type;
      state.room_id = action.payload.room_id;
    },

    resetReducer(state, action) {
      // state = initialState;
      Object.assign(state, initialState)
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const closeSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};

export const showSnackbar =
  ({ severity, message }) =>
    async (dispatch, getState) => {
      dispatch(
        slice.actions.openSnackBar({
          message,
          severity,
        })
      );

      setTimeout(() => {
        dispatch(slice.actions.closeSnackBar());
      }, 6000);
    };

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSideBar());
  };
}
export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateSideBarType({ type }));
  };
}
export function UpdateTab(tab) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateTab(tab));
  };
}

export function FetchAllUsers() {
  return async (dispatch, getState) => {
    // await axiosRoom
    //   .get(
    //     "/user/get-all-verified-users",

    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${getState().auth.token}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     dispatch(slice.actions.updateAllUsers({ users: response.data.data }));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    dispatch(slice.actions.fetchAllUsers({ all_users: UsersList }))
  };
}

export const SelectConversation = ({ room_id, chat_type }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ room_id, chat_type }));
  };
};

export const FetchUserProfile = (user_id) => {
  return async (dispatch, getState) => {
    axiosAuth
      .post("/v1/api/auth/user-infor", {
        ids: [user_id]
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        })
      .then((response) => {
        dispatch(slice.actions.fetchUser({ user: response.data.data[0] }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const ResetAppReducer = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.resetReducer());
  };
};