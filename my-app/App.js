import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import TaskFormScreen from './screens/TaskFormScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={({navigation}) => ({ 
            title: 'Task App',
            headerStyle: { backgroundColor: '#222f3e' }, 
            headerTitleStyle: { color: '#ffffff' },
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('TaskFormScreen')}
              >
                <Text style={{color: '#ffffff', marginRight: 20, fontSize: 15, padding: 10}}>New</Text>
              </TouchableOpacity>
            )
          })} />
        <Stack.Screen 
        name="TaskFormScreen"
        component={TaskFormScreen}
        options={({navigation}) => ({
          title: 'Create a Task',
          headerStyle: {backgroundColor:'#222f3e'},
          headerTitleStyle: { color: '#ffffff' },
          headerTintColor: '#ffffff'
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;