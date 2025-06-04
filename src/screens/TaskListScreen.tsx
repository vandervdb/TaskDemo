import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Button,
    TouchableOpacity, SafeAreaView
} from "react-native";
import { NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types/navigation.ts";

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = () => {
        if (task.trim()) {
            setTasks(prev => [...prev, {id: Date.now(), title: task}]);
            setTask('');
        }
    };

    const deleteTask = (id: string) => {
        setTasks( prev => prev.filter(item => item.id !== id));
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Ajouter une tâche..."
                value={task}
                onChangeText={setTask}
                style={styles.input}
            />

            <Button title="Ajouter" onPress={addTask} />

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TaskDetail', { taskId: item.id, taskTitle: item.title })}
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
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default TaskListScreen;
