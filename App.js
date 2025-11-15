import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import CameraScreen from './camara';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn("Error preparando la app:", e);
      } finally {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
        }
        if (mounted) setIsReady(true);
      }
    }

    prepare();

    return () => {
      mounted = false;
    };
  }, []);

  if (!isReady) {
    return <View />;
  }

  return <CameraScreen />;
}