const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(
          (board) => res.json({ board })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getBoardById = (req, res, next) => {
  const { id } = req.params;
  Board.findById(id)
    .populate({ path: "lists", populate: { path: "cards" } })
    .then((board) => {
      if (!board) {
        throw new Error("Board does not exist");
      }
      res.json(board);
    })
    .catch(err => console.log(err));
};

const addToLists = (req, res, next) => {
  Board.findByIdAndUpdate(req.list.boardId, {
    $addToSet: { lists: [req.list._id] }
  }).then(() => next())
}

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoardById = getBoardById;
exports.addToLists = addToLists;
