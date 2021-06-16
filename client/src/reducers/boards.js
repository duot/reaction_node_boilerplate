export default function boards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      const filteredState = state.filter((board) => {
        board._id != action.board._id;
      });
      const { lists, ...boardWithoutLists } = action.board;
      return filteredState.concat(boardWithoutLists);
    }

    case "FETCH_BOARDS_SUCCESS": {
      const boardsWithoutLists = action.boards.map((board) => {
        const { lists, ...boardWithoutLists } = board;
        return boardWithoutLists;
      }, []);
      return boardsWithoutLists;
    }

    case "CREATE_BOARD_SUCCESS": {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    default:
      return state;
  }
}
