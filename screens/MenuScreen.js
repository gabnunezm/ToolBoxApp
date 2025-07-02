import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const menuItems = [
  { title: '🏠 Info App', screen: 'Info App' },
  { title: '👤 Predecir Género', screen: 'Género' },
  { title: '🎂 Estimar Edad', screen: 'Edad' },
  { title: '🎓 Universidades por País', screen: 'Universidades' },
  { title: '🌦️ Clima en RD', screen: 'Clima RD' },
  { title: '🧬 Info Pokémon', screen: 'Pokémon' },
  { title: '📰 Noticias DJ Tips', screen: 'Noticias DJ' },
  { title: '🙋 Sobre mí', screen: 'Sobre Mí' },
];

export default function MenuScreen({ navigation }) {
  return (
    <LinearGradient colors={['#dbeafe', '#f0f9ff']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {menuItems.map((item, index) => (
          <Animated.View
            key={item.screen}
            entering={FadeInDown.delay(index * 100).duration(400)}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.buttonText}>{item.title}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexGrow: 1,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});