import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import { axiosRoom, axiosPrivateChat, axiosMember, axiosAuth } from "../../utils/axios";
import { showSnackbar } from "./app";
import { Chat_History, MembersList } from "../../data";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  direct_chat: {
    private_conversations: [],
    current_conversation: {},
    current_messages: [],
  },
  group_chat: {
    group_conversations: [],
    members: [],
    admin: null,
  },
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {

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
      const messages = action.payload;
      state.direct_chat.current_messages = messages;
    },
    addDirectMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload.msg);
    },
    fetchPrivateConversations(state, action) {
      console.log(action.payload.private_conversations);
      const list = action.payload.private_conversations;
      state.direct_chat.private_conversations = list;
    },
    fetchCurrentPrivateConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
    },

    fetchGroupConversations(state, action) {
      console.log(action.payload.group_conversations);
      const list = action.payload.group_conversations;
      state.group_chat.group_conversations = list;
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

export const FetchPrivateConversations = ({ user_id }) => {
  return async (dispatch, getState) => {
    let private_conversations_ids;
    let private_conversations;
    await axiosPrivateChat
      .get(
        `/api/v1/chat/privatechat/all-recipients/${user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        private_conversations_ids = response.data.map(e => e.recipient_id);
        private_conversations = response.data;
        console.log(private_conversations_ids);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });

    console.log(private_conversations_ids);
    await axiosAuth
      .post(
        `/v1/api/auth/user-infor`,
        {
          ids: private_conversations_ids
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const users = response.data.data;
        const result = private_conversations.map((obj, i) => ({ ...obj, ...users[i] }));
        console.log(result);
        dispatch(
          slice.actions.fetchPrivateConversations({ private_conversations: result })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
};

export const AddPrivateConversation = (user_id, recipient_id) => {
  return async (dispatch, getState) => {
    await axiosPrivateChat
      .get(
        `/api/v1/chat/privatechat/create/${user_id}/${recipient_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(FetchPrivateConversations({ user_id }))
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
};

export const FetchCurrentPrivateConversation = (data) => {
  console.log(data);
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentPrivateConversation(data));
  }
};

export const FetchCurrentMessages = ({ chat_id }) => {
  return async (dispatch, getState) => {
    await axiosPrivateChat
      .get(
        `/api/v1/chat/privatechat/get-messages/${chat_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(slice.actions.fetchCurrentMessages(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
};

export const UpdateDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversation({ conversation }));
  };
};

export const FetchGroupConversations = (data) => {
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
          slice.actions.fetchGroupConversations({ group_conversations: response.data.data })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  }
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
        dispatch(FetchGroupConversations({ user_id: user_id }))
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
        dispatch(FetchGroupConversations({ user_id: user_id }))
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
        dispatch(FetchGroupConversations({ user_id: user_id }))
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
