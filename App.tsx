// App.tsx
import React, {useState} from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    Button,
    FlatList,
    View,
    StyleSheet,
} from 'react-native';

interface Task {
    id: string;
    title: String;
}

const App = () => {
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = () => {
        if (task.trim()) {
            setTasks(prev => [...prev, {id: Date.now().toString(), title: task}]);
            setTask('');
        }
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(item => item.id !== id));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                📋 Mes tâches
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Ajoutez une note"
                value={task}
                onChangeText={setTask}
            />
            <Button
                title="Ajouter"
                onPress={addTask}
            />
            <FlatList style={{ marginTop: 10}}
                      data={tasks}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                          <View style={styles.taskItem}>
                              <Text>item.title</Text>
                              <Button title="❌" onPress={() => deleteTask(item.id)}/>
                          </View>
                      )}
                      ListEmptyComponent={<Text>Aucun élément pour l'instant</Text>}
            />
        </SafeAreaView>
    );


};

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
    input: {borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6},
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default App;
