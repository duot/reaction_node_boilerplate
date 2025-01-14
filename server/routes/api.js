const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const { validateBoard } = require("../validators/validators");

router.get("/boards", boardsController.getBoards);
router.get("/boards/:id", boardsController.getBoardById);

router.post("/boards", validateBoard, boardsController.createBoard);
router.post("/lists", listsController.createList, boardsController.addToLists, listsController.sendNewListRes);
router.put("/lists/:id", listsController.getListById, listsController.updateList, listsController.sendNewListRes);

module.exports = router;
