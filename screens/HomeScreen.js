import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#93c5fd', '#e0f2fe']} style={styles.background}>
      <View style={styles.container}>

        {/* Imagen con animación */}
        <Animated.Image
          entering={FadeInDown.duration(700)}
          source={require('../assets/img/toolbox.jpg')}
          style={styles.image}
        />

        {/* Título */}
        <Animated.Text
          entering={FadeInUp.delay(300).duration(700)}
          style={styles.title}
        >
          🧰 Caja de Herramientas 🧰
        </Animated.Text>

        {/* Descripción en card */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(700)}
          style={styles.card}
        >
          <Text style={styles.description}>
            Esta app fue creada con React Native y Expo. Con ella puedes:
            {'\n\n'}🔹 Predecir el género y edad de una persona
            {'\n'}🔹 Consultar universidades por país
            {'\n'}🔹 Ver el clima en República Dominicana
            {'\n'}🔹 Obtener datos de Pokémon
            {'\n'}🔹 Leer noticias de Digital DJ Tips
          </Text>
        </Animated.View>

      </View>
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
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#1e3a8a',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e3a8a',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 420,
  },
  description: {
    fontSize: 16,
    color: '#1e40af',
    lineHeight: 24,
    textAlign: 'center',
  },
});