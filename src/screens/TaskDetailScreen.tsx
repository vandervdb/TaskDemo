import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

const TaskDetailScreen: React.FC<Props> = ({ route }) => {
  const { taskId, taskTitle } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détail de la tâche</Text>
      <Text>ID: {taskId}</Text>
      <Text>Nom: {taskTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});

export default TaskDetailScreen;
