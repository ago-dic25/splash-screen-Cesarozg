import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { estiloTextos, styles } from './misEstilos';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';

export default function App() {
  const [permisoCamara, setPermisoCamara] = useState(null);
  const [permisoGaleria, setPermisoGaleria] = useState(null);
  const [fotoTomada, setFotoTomada] = useState(null);
  const [camaraTrasera, setCamaraTrasera] = useState(true); 
  const [camara, setCamara] = useState(null);

  useEffect(() => {
    async function pedirPermisos() {
      const resultadoCamara = await Camera.requestCameraPermissionsAsync();
      setPermisoCamara(resultadoCamara);
      const resultadoGaleria = await MediaLibrary.requestPermissionsAsync();
      setPermisoGaleria(resultadoGaleria);
    }
    pedirPermisos();
  }, []); 

  async function tomarFoto() {
    if (camara) {
      try {
        const foto = await camara.takePictureAsync();
        setFotoTomada(foto.uri);
        await MediaLibrary.saveToLibraryAsync(foto.uri);
        Alert.alert("¡Foto tomada!", "La foto se guardó en tu galeria");
      } catch (error) {
        console.error("Hubo un error al tomar la foto: ", error); 
        Alert.alert("Error", "No se pudo tomar la foto");
      }
    }
  }

  function cambiarCamara() {
    if (camaraTrasera === true) {
      setCamaraTrasera(false);
    } 
    else {
      setCamaraTrasera(true);
    }
  }

  if (!permisoCamara || !permisoGaleria) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={estiloTextos.texto}>Esperando permisos...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!permisoCamara.granted || !permisoGaleria.granted) {
    return (
      <View style={styles.permissionDeniedContainer}>
        <Text style={[estiloTextos.texto, { textAlign: 'center', marginBottom: 20 }]}>
          Necesitamos tu permiso! {'\n\n'}
          Esta app necesita usar tu camara y galeria para funcionar.
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            Camera.requestCameraPermissionsAsync();
            MediaLibrary.requestPermissionsAsync();
          }}>
          <Text style={styles.buttonText}>Dar Permisos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (fotoTomada) {
    return (
      <View style={styles.previewContainer}>
        <Image 
          source={{ uri: fotoTomada }} 
          style={styles.preview} 
          resizeMode="contain" 
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFotoTomada(null);
            }}>
            <Text style={styles.buttonText}>Tomar Otra Foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={camaraTrasera ? 'back' : 'front'}
        ref={(referenciaCamara) => {
          setCamara(referenciaCamara);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={cambiarCamara}>
            <Text style={styles.buttonText}>
              {camaraTrasera ? "Cambiar a Frontal" : "Cambiar a Trasera"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={tomarFoto}>
            <Text style={styles.buttonText}>Tomar Foto!</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <StatusBar style="auto" />
    </View>
  );
};