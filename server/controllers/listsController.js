const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const json = req.body;

    List.create({
      boardId: json.boardId,
      title: json.list.title,
      cards: [],
    })
      .then((list) => {
        req.list = list
        next();
      })
      .catch((error) => {
        next(new HttpError("Creating list failed, please try again", 500));
      });
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const sendNewListRes = (req, res, next) => {
  res.json(req.list)
}

exports.createList = createList;
exports.sendNewListRes = sendNewListRes;
