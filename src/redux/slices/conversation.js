import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import { axiosRoom, axiosPrivateChat, axiosMember, axiosAuth } from "../../utils/axios";
import { showSnackbar } from "./app";
import { Chat_History, MembersList } from "../../data";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: {},
    current_messages: [],
  },
  group_chat: {
    members: [],
    admin: null,
  },
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      console.log(action.payload.conversations);
      const list = action.payload.conversations;
      state.direct_chat.conversations = list;
    },
    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      // state.direct_chat.conversations = state.direct_chat.conversations.map(
      //   (el) => {
      //     if (el?.id !== this_conversation._id) {
      //       return el;
      //     } else {
      //       const user = this_conversation.participants.find(
      //         (elm) => elm._id.toString() !== user_id
      //       );
      //       return {
      //         id: this_conversation._id._id,
      //         user_id: user?._id,
      //         name: `${user?.firstName} ${user?.lastName}`,
      //         online: user?.status === "Online",
      //         img: faker.image.avatar(),
      //         msg: faker.music.songName(),
      //         time: "9:36",
      //         unread: 0,
      //         pinned: false,
      //       };
      //     }
      //   }
      // );
    },
    addDirectConversation(state, action) {
      // const this_conversation = action.payload;
      // const user = this_conversation.participants.find(
      //   (elm) => elm._id.toString() !== user_id
      // );
      // state.direct_chat.conversations = state.direct_chat.conversations.filter(
      //   (el) => el?.id !== this_conversation.id
      // );
      // state.direct_chat.conversations.push({
      //   id: this_conversation._id._id,
      //   user_id: user?._id,
      //   name: `${user?.firstName} ${user?.lastName}`,
      //   online: user?.status === "Online",
      //   img: faker.image.avatar(),
      //   msg: faker.music.songName(),
      //   time: "9:36",
      //   unread: 0,
      //   pinned: false,
      // });
      state.direct_chat.conversations.push(action.payload);
      state.direct_chat.current_conversation = action.payload;
    },

    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      state.direct_chat.current_messages = messages;
    },
    addDirectMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload.msg);
    },

    fetchCurrentGroupConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
    },
    fetchMembersGroup(state, action) {
      state.group_chat.members = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const FetchDirectConversations = (data) => {
  return async (dispatch, getState) => {
    const userId = data.user_id;
    console.log(userId);
    await axiosRoom
      .get(
        "/v1/api/room/get",
        {
          params: { userId }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        dispatch(
          slice.actions.fetchDirectConversations({ conversations: response.data.data })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
    // await axiosPrivateChat
    //   .get(
    //     `/api/v1/chat/privatechat/all-recipients/1`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     dispatch(
    //       slice.actions.fetchDirectConversations({ conversations: response.data })
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     dispatch(showSnackbar({ severity: "error", message: error.message }));
    //   });
  };
};
export const AddDirectConversation = (conversation) => {
  return async (dispatch, getState) => {
    console.log(conversation);
    await axiosRoom
      .post(
        "/v1/api/room/create",
        conversation,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(slice.actions.addDirectConversation(conversation));
        dispatch(
          showSnackbar({ severity: "success", message: response.data.data })
        );
        // dispatch(
        //   slice.actions.updateIsLoading({ isLoading: false, error: false })
        // );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        // dispatch(
        //   slice.actions.updateIsLoading({ isLoading: false, error: true })
        // );
      });
  };
};
export const UpdateDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversation({ conversation }));
  };
};


export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentMessages({ messages }));
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    const msg = {
      "type": "msg",
      "subtype": "msg",
      "message": message,
      "incoming": false,
      "outgoing": true,
    };
    dispatch(slice.actions.addDirectMessage({ msg }));
  };
};

export const FetchCurrentGroupConversation = (room_id) => {
  return async (dispatch, getState) => {
    await axiosRoom
      .get(
        `/v1/api/room/get/${room_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data);
        dispatch(slice.actions.fetchCurrentGroupConversation(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
};

export const AddGroupConversation = (formValues) => {
  console.log(user_id)
  const group_data = {
    title: formValues.title,
    description: formValues.description,
    userId: user_id,
  }
  return async (dispatch, getState) => {
    await axiosRoom
      .post(
        "/v1/api/room/create",
        group_data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.data })
        );
        dispatch(FetchDirectConversations({ user_id: user_id }))
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export const DeleteGroupConversation = (delete_id) => {
  return async (dispatch, getState) => {
    await axiosRoom
      .delete(
        `/v1/api/room/delete/${delete_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.data })
        );
        dispatch(FetchDirectConversations({ user_id: user_id }))
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
    // dispatch(slice.actions.deleteGroupConversation(delete_id));
  }
};

export const LeaveGroup = (group_id) => {
  return async (dispatch, getState) => {
    await axiosMember
      .post(
        `/v1/api/member/out-room`,
        {
          roomId: group_id,
          userId: user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.data })
        );
        dispatch(FetchDirectConversations({ user_id: user_id }))
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
    // dispatch(slice.actions.deleteGroupConversation(delete_id));
  }
};

export const AddMembersGroup = (room_id, members) => {
  return async (dispatch, getState) => {
    await axiosMember
      .post(
        "/v1/api/member/add-members",
        {
          roomId: room_id,
          members: members
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(FetchMembersGroup(room_id));
        dispatch(
          showSnackbar({ severity: "success", message: response.data.data })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export const FetchMembersGroup = (room_id) => {
  return async (dispatch, getState) => {
    console.log(room_id);
    await axiosMember
      .post(
        "/v1/api/member/get-members",
        JSON.stringify({ roomId: room_id }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        dispatch(slice.actions.fetchMembersGroup(response.data.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
};
