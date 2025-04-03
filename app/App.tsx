import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MeusPacientesScreen from './pacientes';
import DetalhesPacienteScreen from './detalhes_paciente';
import EditarPacienteScreen from './editar_paciente';

const Stack = createStackNavigator();
<Stack.Screen 
  name="detalhes_paciente" 
  component={DetalhesPacienteScreen} 
  initialParams={{ paciente: null }} // Valor padrão opcional
/>
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="meus_pacientes">
        <Stack.Screen name="meus_pacientes" component={MeusPacientesScreen} />
        <Stack.Screen name="detalhes_paciente" component={DetalhesPacienteScreen} />
        <Stack.Screen name="editar_paciente" component={EditarPacienteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
