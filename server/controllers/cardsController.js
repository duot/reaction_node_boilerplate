const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      req.card = card;
      next();
    })
    .catch((error) => next(new HttpError("Could not find card.", 405)));
};

const sendCard = (req, res, next) => {
  res.send(req.card);
};

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const json = req.body;
    List.findById(json.listId)
      .then((list) => {
        Card.create({
          title: json.card.title,
          listId: json.listId,
          description: "",
          labels: [],
          position: 655535.0,
          archived: false,
          dueDate: null,
          completed: false,
          boardId: list.boardId,
          comments: [],
          actions: [],
          commentsCount: 0,
        })
          .then((newCard) => {
            req.card = newCard;
            next();
          })
          .catch((error) => next(new HttpError("Could not create card.", 422)));
      })
      .catch((error) => next(new HttpError("Could not find list", 404)));
  } else {
    next(new HttpError("Card title is required", 422));
  }
};

const updateCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const card = req.card;
    const json = req.body;
    Card.findByIdAndUpdate(
      { _id: card._id },
      { ...json.card },
      { new: true }
    ).then((updatedCard) => {
      req.card = updatedCard;
      next();
    });
  } else {
    next(new HttpError("Card title is required.", 422));
  }
};

exports.getCard = getCard;
exports.sendCard = sendCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
