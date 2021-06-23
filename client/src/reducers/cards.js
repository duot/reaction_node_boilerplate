export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      const filteredState = state.filter((card) => {
        return card.boardId !== action.board._id;
      });

      const cards = action.board.lists.reduce((cards, list) => {
        return cards.concat(list.cards);
      }, []);

      return filteredState.concat(cards);
    }
    case "FETCH_CARD_SUCCESS": {
      const filteredState = state.filter((card) => {
        card._id !== action.card._id;
      });

      return filteredState.concat(action.card);
    }
    case "ADD_CARD_SUCCESS": {
      return state.concat(action.card)
    }

    default:
      return state;
  }
}
