import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createNewListSuccess(data) {
  return { type: types.CREATE_LIST_SUCCESS, newList: data };
}

export function createNewList(title, boardId) {
  return function (dispatch) {
    apiClient.createNewList(title, boardId, (data) => {
      dispatch(createNewListSuccess(data));
    });
  }
}

export function updateListSuccess(data) {
  return { type: types.UPDATE_LIST_SUCCESS, updatedList: data };
}

export function updateList(id, title, position) {
  return function (dispatch) {
    apiClient.updateList(id, title, position, (data) => {
      dispatch(updateListSuccess(data));
    });
  }
}
