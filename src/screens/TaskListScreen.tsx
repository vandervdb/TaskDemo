import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import taskStore from '../stores/TaskStore';
import { RootStackParamList } from '../types/navigation.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const TaskListScreen: React.FC<Props> = observer(({ navigation }) => {
  const { tasks, newTask, setNewTask, addTask, deleteTask } = taskStore;

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Ajouter une tâche..."
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
      />

      <Button title="Ajouter" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TaskDetail', {
                taskId: item.id,
                taskTitle: item.title,
              })
            }
          >
            <View style={styles.taskItem}>
              <Text>{item.title}</Text>
              <Button title="❌" onPress={() => deleteTask(item.id)} />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Aucune tâche pour l’instant</Text>}
        style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderRadius: 6, borderWidth: 1, marginBottom: 10, padding: 10 },
  taskItem: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
  },
});

export default TaskListScreen;
