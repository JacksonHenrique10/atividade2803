import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home/index';
import Cadastro from './src/pages/Cadastro/Index';
import Lista from './src/pages/Lista/index';

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

        <Stack.Screen
          name='Cadastro'
          component={Cadastro}
          options={{
            title: 'Cadastro',
            headerStyle: {
              backgroundColor: '#ff1493'
            }
          }}
        />

        <Stack.Screen
          name='Lista'
          component={Lista}
          options={{
            title: 'Lista',
            headerStyle: {
              backgroundColor: '#ff1493'
            }
          }}
        />

        {/* <Stack.Screen
          name='editarFilme'
          component={editarFilme}
          options={{
            title: 'Editar Filme',
            headerStyle: {
              backgroundColor: '#ff1493'
            }
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
