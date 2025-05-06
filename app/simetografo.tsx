import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { Camera } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Simetografo() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Permissão para acessar a câmera foi negada.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simetógrafo</Text>

      {!photo ? (
        <Camera
          style={styles.camera}
          
        >
          <View style={styles.gridOverlay} />
        </Camera>
      ) : (
        <Image source={{ uri: photo }} style={styles.camera} />
      )}

      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.buttonText}>Capturar Foto</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Selecionar Paciente:</Text>
      <Picker
        selectedValue={selectedPatient}
        onValueChange={(itemValue) => setSelectedPatient(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um paciente" value="" />
        <Picker.Item label="João Silva" value="joao" />
        <Picker.Item label="Maria Souza" value="maria" />
      </Picker>

      <Text style={styles.label}>Observações:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Digite sua análise..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  camera: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#fff',
  },
  captureButton: {
    backgroundColor: '#1A335C',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    minHeight: 60,
  },
  backButton: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
