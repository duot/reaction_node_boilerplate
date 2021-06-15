const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: String,
    dueDate: Date,
    labels: [String],
    description: String,
    position: Number,
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board"
    },
    commentsCount: Number
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
