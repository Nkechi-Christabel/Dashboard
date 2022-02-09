import {
  FETCH_USERS,
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  CATCH_ERROR,
} from "../constants/actionTypes";

const initialState = {
  loading: true,
  error: null,
  users: [],
};

export const allUsersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case CREATE_USER:
      return {
        ...state,
        loading: false,
        users: [...state.users, payload],
      };
    case DELETE_USER:
      return {
        ...state,
        loading: false,
        users: [...state.users.filter((user) => user.id !== payload)],
      };
    case EDIT_USER:
      return {
        ...state,
        loading: false,
        users: [
          ...state.users.map((user) =>
            user.id === payload.id ? payload : user
          ),
        ],
      };
    case CATCH_ERROR:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
