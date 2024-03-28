import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home'; // Importe o componente Home

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Galeria de filmes',
            headerStyle: {
              backgroundColor: '#ff1493'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
