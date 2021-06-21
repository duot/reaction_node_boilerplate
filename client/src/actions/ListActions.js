import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createNewListSuccess(data) {
  return { type: types.CREATE_NEW_LIST_SUCCESS, newList: data };
}

export function createNewList(title, boardId) {
  return function (dispatch) {
    apiClient.createNewList(title, boardId, (data) => {
      dispatch(createNewListSuccess(data))
    })
  }
}
