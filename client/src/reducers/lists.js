export default function lists(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      const filteredState = state.filter((list) => {
        return list.boardId !== action.board._id;
      });

      const lists = action.board.lists;
      const listsWithoutCards = lists.map((list) => {
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      }, []);

      return filteredState.concat(listsWithoutCards);
    }

    default:
      return state;
  }
}
