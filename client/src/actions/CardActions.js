import apiClient from "../lib/ApiClient"
import * as types from "../constants/ActionTypes";

function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card };
}

function addCardSuccess(card) {
  return { type: types.ADD_CARD_SUCCESS, card }
}

export function fetchCard(cardId) {
  return function (dispatch) {
    apiClient.getCard(cardId, (data) => {
      dispatch(fetchCardSuccess(data))
    })
  }
}

export function addCard(listId, title) {
  return function (dispatch) {
    apiClient.addCard(listId, title, (data) => {
      dispatch(addCardSuccess(data))
    })
  }
}