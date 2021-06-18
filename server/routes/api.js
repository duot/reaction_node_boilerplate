const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const { validateBoard } = require("../validators/validators");

router.get("/boards", boardsController.getBoards);
router.get("/boards/:id", boardsController.getBoardById);

router.post("/boards", validateBoard, boardsController.createBoard);
router.post("/lists", listsController.createList, boardsController.addToLists, listsController.sendNewListRes);
//call a board controller that updates `lists` property of board with
//json.boardId. adds response list to `lists`

module.exports = router;
