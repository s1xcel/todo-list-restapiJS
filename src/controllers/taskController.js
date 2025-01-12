const taskService = require('../services/taskService');

class TaskController {
  async createTask(req, res) {
    try {
      const taskData = req.body;
      const userId = req.user.id;
      const newTask = await taskService.createTask(taskData, userId);
      res.status(201).send(newTask);
    } catch (err) {
      console.error('Error creating task:', err);
      res.status(500).json({ error: err.message });
    }
  }

  async getAllTasks(req, res) {
    try {
      const status = req.query.status;
      const userId = req.user.id;
      const tasks = await taskService.getAllTasks(status, userId);
      res.status(200).json(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: err.message });
    }
  }

  async getTaskById(req, res) {
    try {
      const id = req.params.id;
      const userId = req.user.id;
      const task = await taskService.getTaskById(id, userId);
      res.status(200).json(task);
    } catch (err) {
      console.error('Error fetching task by ID:', err);
      res.status(403).json({ error: err.message });
    }
  }

  async updateTask(req, res) {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const userId = req.user.id;
      const task = await taskService.updateTask(id, updateData, userId);
      res.status(200).json(task);
    } catch (err) {
      console.error('Error updating task:', err);
      res.status(403).json({ error: err.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const id = req.params.id;
      const userId = req.user.id;
      const task = await taskService.deleteTask(id, userId);
      res.status(200).json(task);
    } catch (err) {
      console.error('Error deleting task:', err);
      res.status(403).json({ error: err.message });
    }
  }
}

module.exports = new TaskController();
