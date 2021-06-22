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
        req.list = list;
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
  res.json(req.list);
};

const getListById = (req, res, next) => {
  const { id } = req.params;
  List.findById(id)
    .then((list) => {
      req.list = list;
      next();
    })
    .catch((error) => next(new HttpError("Could not find list.", 404)));
};

const updateList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const list = req.list;
    const json = req.body;

    List.findByIdAndUpdate(
      { _id: list._id },
      { title: json.title || list.title },
      { new: true }
    ).then((updatedList) => {
      req.list = updatedList;
      next();
    });
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const addCardToList = (req, res, next) => {
  List.findByIdAndUpdate(req.card.listId, {
    $addToSet: { cards: [req.card._id] },
  }).then(() => next());
};

exports.createList = createList;
exports.sendNewListRes = sendNewListRes;
exports.getListById = getListById;
exports.updateList = updateList;
exports.addCardToList = addCardToList;
