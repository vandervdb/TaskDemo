import { TaskStore, Task } from './TaskStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('TaskStore', () => {
  let store: TaskStore;

  beforeEach(() => {
    jest.clearAllMocks();
    store = new TaskStore();
    store.tasks = [];
    store.setNewTask('');
  });

  it('ajoute une tâche', async () => {
    store.setNewTask('Nouvelle tâche');
    await store.addTask();

    expect(store.tasks).toHaveLength(1);
    expect(store.tasks[0].title).toBe('Nouvelle tâche');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'TASKS',
      JSON.stringify(store.tasks),
    );
  });

  it('ne fait rien si la tâche est vide', async () => {
    store.setNewTask('   ');
    await store.addTask();

    expect(store.tasks).toHaveLength(0);
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('supprime une tâche existante', async () => {
    store.tasks = [
      { id: '1', title: 'Tâche 1' },
      { id: '2', title: 'Tâche 2' },
    ];

    await store.deleteTask('1');

    expect(store.tasks).toHaveLength(1);
    expect(store.tasks[0].id).toBe('2');
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('charge des tâches depuis le stockage', async () => {
    const storedTasks: Task[] = [{ id: '10', title: 'Tâche persistée' }];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(storedTasks),
    );

    const newStore = new TaskStore();
    await new Promise((r) => setTimeout(r, 10));

    expect(newStore.tasks).toEqual(storedTasks);
  });

  it('gère les erreurs de lecture AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
      new Error('Erreur de lecture'),
    );

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      return undefined;
    });

    new TaskStore();
    await new Promise((r) => setTimeout(r, 10));

    expect(errorSpy).toHaveBeenCalledWith(
      'Erreur lors du chargement des tâches',
      expect.any(Error),
    );
    errorSpy.mockRestore();
  });

  it('gère les erreurs de sauvegarde AsyncStorage', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
      new Error('Erreur de sauvegarde'),
    );

    store.setNewTask('Test');
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      return undefined;
    });

    await store.addTask();

    expect(errorSpy).toHaveBeenCalledWith(
      'Erreur lors de la sauvegarde des Tâches',
      expect.any(Error),
    );
    errorSpy.mockRestore();
  });
});
