import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoard: function (id, callback) {
    return axios
      .get(`${routes.BOARDS_INDEX_URL}/${id}`)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoards: function (callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function (board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, { board })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function (title, boardId, callback) {
    return axios
      .post(routes.CREATE_LIST_URL, { boardId: boardId, list: { title: title } })
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
  updateList: function (id, title, position, callback) {
    return axios
      .put(`${routes.LISTS_INDEX_URL}/${id}`, { title, position })
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
  getCard: function (cardId, callback) {
    return axios
      .get(`${routes.CARDS_INDEX_URL}/${cardId}`)
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
  addCard: function (listId, title, callback) {
    return axios
      .post(routes.CREATE_CARD_URL, { listId, card: { title } })
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
  updateCard: function (id, props, callback) {
    return axios
      .put(`${routes.CARDS_INDEX_URL}/${id}`, { card: props })
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
};

export default apiClient;
