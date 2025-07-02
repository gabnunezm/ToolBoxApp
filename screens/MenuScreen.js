import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="🏠 Inicio" onPress={() => navigation.navigate('Inicio')} />
      <Button title="👤 Predecir Género" onPress={() => navigation.navigate('Género')} />
      <Button title="🎂 Estimar Edad" onPress={() => navigation.navigate('Edad')} />
      <Button title="🎓 Universidades por País" onPress={() => navigation.navigate('Universidades')} />
      <Button title="🌦️ Clima en RD" onPress={() => navigation.navigate('Clima RD')} />
      <Button title="🧬 Info Pokémon" onPress={() => navigation.navigate('Pokémon')} />
      <Button title="📰 Noticias DJ Tips" onPress={() => navigation.navigate('Noticias DJ')} />
      <Button title="🙋 Sobre mí" onPress={() => navigation.navigate('Sobre Mí')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexGrow: 1,
  },
});