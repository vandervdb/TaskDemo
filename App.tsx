import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import TaskDetailScreen from '@/screens/TaskDetailScreen';
import TaskListScreen from '@/screens/TaskListScreen';
import { RootStackParamList } from '@/types/navigation';
import '@/stores';

const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: '📋 Mes tâches' }}
        />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{ title: 'Détail de la tâche' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
