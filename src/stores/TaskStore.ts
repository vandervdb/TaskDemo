import { makeAutoObservable } from 'mobx';

export interface Task {
  id: string;
  name: string;
}

class TaskStore {
  tasks: Task[] = [];
  newTask: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setNewTask(title: string) {
    this.newTask = title;
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        id: Date.now().toString(),
        name: this.newTask,
      });
      this.newTask = '';
    }
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

const taskStore = new TaskStore();
export default taskStore;
