import axios from "axios";
import {
  CATCH_ERROR,
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  FETCH_USERS,
} from "../constants/actionTypes";

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
    );
    dispatch({
      type: FETCH_USERS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: CATCH_ERROR,
      payload: e.message,
    });
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      user
    );
    dispatch({
      type: CREATE_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: CATCH_ERROR,
      payload: e.message,
    });
  }
};

export const deletedUser = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  } catch (e) {
    dispatch({
      type: CATCH_ERROR,
      payload: e.message,
    });
  }
};

export const editUser = (id, user) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      user
    );
    dispatch({
      type: EDIT_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: CATCH_ERROR,
      payload: e.message,
    });
  }
};
