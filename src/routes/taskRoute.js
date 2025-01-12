const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');

router.post("/", authMiddleware, taskController.createTask);

router.put("/:id", authMiddleware, taskController.updateTask);

router.delete("/:id", authMiddleware, taskController.deleteTask);

router.get('/', authMiddleware, taskController.getAllTasks);

router.get('/:id', authMiddleware, taskController.getTaskById);

module.exports = router;
