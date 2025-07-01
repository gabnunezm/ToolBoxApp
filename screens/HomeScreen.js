import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/toolbox.jpg')} style={styles.image} />
      <Text style={styles.description}>
        Esta es una caja de herramientas digital hecha en React Native con Expo. 
        Puedes predecir el género y edad de una persona, consultar universidades por país,
        ver el clima en RD, obtener info de Pokémon y las últimas noticias de Digital DJ Tips.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 200, height: 200, marginBottom: 20 },
  description: { textAlign: 'center', fontSize: 16 },
});
