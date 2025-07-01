import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <Button title="Estimar Edad" onPress={checkAge} />
      {age && (
        <>
          <Text style={styles.result}>Edad: {age}</Text>
          <Text style={styles.result}>Categoría: {category}</Text>
          <Image source={getImage()} style={{ width: 100, height: 100 }} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, width: '80%', marginBottom: 10 },
  result: { fontSize: 20, marginTop: 10 },
});
