import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function GenderScreen() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(null);

  const handleCheck = async () => {
    const res = await fetch(`https://api.genderize.io/?name=${name}`);
    const data = await res.json();
    setGender(data.gender);
  };

  const getColor = () => {
    if (gender === 'male') return '#dbeafe';
    if (gender === 'female') return '#fbcfe8';
    return '#e5e7eb';
  };

  const getEmoji = () => {
    if (gender === 'male') return '👦';
    if (gender === 'female') return '👧';
    return '❓';
  };

  return (
    <LinearGradient colors={['#181616']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          placeholder="Ingresa un nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Button title="🔍 Predecir Género" onPress={handleCheck} />

        {gender && (
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={[styles.resultCard, { backgroundColor: getColor() }]}
          >
            <Text style={styles.emoji}>{getEmoji()}</Text>
            <Text style={styles.resultText}>
              El género de "{name}" es probablemente:
            </Text>
            <Text style={[styles.genderText, gender === 'male' ? styles.male : styles.female]}>
              {gender === 'male' ? 'Masculino' : gender === 'female' ? 'Femenino' : 'Desconocido'}
            </Text>
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  );
}

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
    padding: 24,
    marginTop: 20,
    borderRadius: 16,
    width: width * 0.9,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },
  genderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  male: {
    color: '#1d4ed8',
  },
  female: {
    color: '#db2777',
  },
});