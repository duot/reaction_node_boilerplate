import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListSuccess(data) {
  return { type: types.CREATE_LIST_SUCCESS, newList: data };
}

export function createList(title, boardId) {
  return function (dispatch) {
    apiClient.createList(title, boardId, (data) => {
      dispatch(createListSuccess(data));
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
