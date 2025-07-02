import React from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function AboutScreen() {
  const handleGitHub = () => {
    Linking.openURL('https://github.com/gabnunezm');
  };

  return (
    <LinearGradient
      colors={['#93c5fd', '#e0f2fe']}
      style={styles.background}
    >
      <Animated.View entering={FadeInUp.duration(800)} style={styles.container}>
        <Image
          source={require('../assets/img/foto2.jpeg')}
          style={styles.image}
        />

        <Text style={styles.name}>Gabriel Nuñez Medina</Text>
        <Text style={styles.text}>📧 20231871@itla.edu.do</Text>

        <TouchableOpacity onPress={handleGitHub}>
          <Text style={styles.link}>💻 Perfil de Github</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#2563eb',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#1e40af',
    marginBottom: 6,
  },
  link: {
    fontSize: 16,
    color: '#1d4ed8',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});