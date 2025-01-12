const Task = require('../models/Task');

class TaskRepository {
  async createTask(taskData) {
    const task = new Task(taskData);
    await task.save();
    return task;
  };

  async getTaskById(taskId) {
    return Task.findById(taskId);
  };

  async updateTask(taskId, updateData) {
    return Task.findByIdAndUpdate(taskId, updateData, { new: true });
  };

  async deleteTask(taskId) {
    return Task.findByIdAndDelete(taskId);
  };

  async getTasksByUserIdAndStatus(filters) {
    return Task.find(filters);
  }
}

module.exports = new TaskRepository();
