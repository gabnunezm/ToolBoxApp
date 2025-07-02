import React from 'react';
import { View, Text, Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';

export default function AboutScreen() {
  const handleGitHub = () => {
    Linking.openURL('https://github.com/gabnunezm');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/foto2.jpeg')} style={styles.image} />

      <Text style={styles.name}>Gabriel Nuñez Medina</Text>
      <Text style={styles.email}>📧 20231871@itla.edu.do</Text>

      <TouchableOpacity onPress={handleGitHub}>
        <Text style={styles.github}>💻 GITHUB </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#3b82f6',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1e293b',
  },
  email: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 10,
  },
  github: {
    fontSize: 16,
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
});