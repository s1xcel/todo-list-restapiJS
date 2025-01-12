const taskRepository = require('../repositories/taskRepository');


class TaskService {
  async createTask(taskData, userId){
    if(!taskData.title) {
      throw new Error('title is required');
    }
    taskData.userId = userId;
    return await taskRepository.createTask(taskData);
  };

  async getAllTasks(status, userId) {
    const filters = { userId };
    if (status) {
      filters.status = status;
    }
    return await taskRepository.getTasksByUserIdAndStatus(filters);
  }

  async getTaskById(taskId, userId){
    const task = await taskRepository.getTaskById(taskId);
    if(!task) {
      throw new Error('task not found');
    }
    if(task.userId.toString() !== userId){
      throw new Error('Forbidden');
    }

    return task;
  }

  async updateTask(taskId, updateData, userId){
    const task = await taskRepository.getTaskById(taskId);
    if(!task) {
      throw new Error('task not found');
    }
    if(task.userId.toString() !== userId) {
      throw new Error('Acces denied');
    }
    if (updateData.status && !['pending', 'completed'].includes(updateData.status)) {
      throw new Error('Invalid task status');
    }
    return await taskRepository.updateTask(taskId, updateData);
  }

  async deleteTask(taskId, userId){
    const task = await taskRepository.getTaskById(taskId);
    if(!task) {
      throw new Error('task not found');
    }
    if(task.userId.toString() !== userId) {
      throw new Error('Access denied');
    }
    return await taskRepository.deleteTask(taskId);
  }
}


module.exports = new TaskService();
