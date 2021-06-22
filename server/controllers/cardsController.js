const Card = require("../models/card");
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

exports.getCard = getCard;
exports.sendCard = sendCard;
