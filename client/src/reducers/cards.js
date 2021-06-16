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

    default:
      return state;
  }
}
