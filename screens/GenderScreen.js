import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function GenderScreen() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(null);

  const handleCheck = async () => {
    const res = await fetch(`https://api.genderize.io/?name=${name}`);
    const data = await res.json();
    setGender(data.gender);
  };

  return (
    <View style={[styles.container, { backgroundColor: gender === 'male' ? '#ADD8E6' : gender === 'female' ? '#FFC0CB' : '#fff' }]}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <Button title="Predecir Género" onPress={handleCheck} />
      {gender && <Text style={styles.result}>Género: {gender}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, width: '80%', marginBottom: 10 },
  result: { fontSize: 20, marginTop: 10 },
});