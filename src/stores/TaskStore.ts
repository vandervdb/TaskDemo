import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import log from '@/logs/logger.ts';

export interface Task {
  id: string;
  title: string;
}

export class TaskStore {
  readonly tasksStorageKey = 'TASKS';
  tasks: Task[] = [];
  newTask = '';

  constructor() {
    makeAutoObservable(this, {
      tasks: observable,
      newTask: observable,
    });
    this.loadTasks().then(() => log.debug('Tasks chargées'));
  }

  setNewTask(title: string) {
    this.newTask = title;
  }

  async addTask() {
    if (this.newTask.trim()) {
      const newItem: Task = {
        id: Date.now().toString(),
        title: this.newTask.trim(),
      };

      runInAction(() => {
        this.tasks.push(newItem);
        this.newTask = '';
      });
      await this.saveTask();
    }
  }

  async deleteTask(id: string) {
    runInAction(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
    await this.saveTask();
  }

  private async saveTask() {
    try {
      await AsyncStorage.setItem(this.tasksStorageKey, JSON.stringify(this.tasks));
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des Tâches', e);
    }
  }

  private async loadTasks() {
    try {
      const stored = await AsyncStorage.getItem(this.tasksStorageKey);
      if (stored) {
        runInAction(() => {
          this.tasks = JSON.parse(stored);
        });
      }
    } catch (e) {
      console.error('Erreur lors du chargement des tâches', e);
    }
  }
}

const taskStore = new TaskStore();
export default taskStore;
