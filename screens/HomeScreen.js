import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#dbeafe', '#f0f9ff']} style={styles.background}>
      <Animated.View entering={FadeInDown.duration(800)} style={styles.container}>
        <Image
          source={require('../assets/img/toolbox.jpg')}
          style={styles.image}
        />

        <Text style={styles.title}>🧰 Caja de Herramientas 🧰</Text>

        <Text style={styles.description}>
          Esta aplicación fue creada con React Native y Expo. Con ella puedes:
          {'\n\n'}🔹 Predecir el género y edad de una persona
          {'\n'}🔹 Consultar universidades por país
          {'\n'}🔹 Ver el clima en República Dominicana
          {'\n'}🔹 Obtener datos de Pokémon
          {'\n'}🔹 Leer noticias de Digital DJ Tips
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e3a8a',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#1e40af',
    textAlign: 'center',
    lineHeight: 24,
  },
});