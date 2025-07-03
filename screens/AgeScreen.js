import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function AgeScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [category, setCategory] = useState('');

  const checkAge = async () => {
    const res = await fetch(`https://api.agify.io/?name=${name}`);
    const data = await res.json();
    setAge(data.age);
    if (data.age < 18) setCategory('Joven');
    else if (data.age < 60) setCategory('Adulto');
    else setCategory('Anciano');
  };

  const getImage = () => {
    if (category === 'Joven') return require('../assets/img/joven.jpg');
    if (category === 'Adulto') return require('../assets/img/adulto.png');
    return require('../assets/img/elder.png');
  };

  return (
    <LinearGradient colors={['#e0f2fe', '#f0f9ff']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          placeholder="Ingresa un nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Button title="🔍 Estimar Edad" onPress={checkAge} />

        {age && (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.resultCard}>
            <Text style={styles.ageText}>Edad estimada: {age}</Text>
            <Text style={[styles.categoryText, getCategoryStyle(category)]}>
              Categoría: {category}
            </Text>
            <Image source={getImage()} style={styles.image} />
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  );
}

const getCategoryStyle = (category) => {
  switch (category) {
    case 'Joven':
      return { color: '#3b82f6' };
    case 'Adulto':
      return { color: '#10b981' };
    case 'Anciano':
      return { color: '#f59e0b' };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    width: '80%',
    padding: 12,
    borderColor: '#3b82f6',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  resultCard: {
    backgroundColor: '#ffffffee',
    padding: 20,
    marginTop: 20,
    borderRadius: 16,
    width: width * 0.9,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  ageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 18,
    marginBottom: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});