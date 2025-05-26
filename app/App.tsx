import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MeusPacientesScreen from './pacientes';
import DetalhesPacienteScreen from './detalhes_paciente';
import EditarPacienteScreen from './editar_paciente';
import EditarConsulta from './editar_consulta';
import TelaPaciente from './tela_paciente'; 




type RootStackParamList = {
  meus_pacientes: undefined;
  detalhes_paciente: { paciente: any };
  editar_paciente: undefined;
  tela_paciente: undefined;
  editar_consulta: { consulta: { id: string; paciente: string; data: string; hora: string } };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="meus_pacientes">
        <Stack.Screen name="meus_pacientes" component={MeusPacientesScreen} />
        <Stack.Screen name="detalhes_paciente" component={DetalhesPacienteScreen} />
        <Stack.Screen name="editar_paciente" component={EditarPacienteScreen} />
        <Stack.Screen name="editar_consulta" component={EditarConsulta} />
        <Stack.Screen name="tela_paciente" component={TelaPaciente} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}