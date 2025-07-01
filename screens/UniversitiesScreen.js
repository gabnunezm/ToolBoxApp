import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Linking, StyleSheet } from 'react-native';

export default function UniversitiesScreen() {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
    const data = await res.json();
    setUniversities(data);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Country (e.g. Dominican Republic)" value={country} onChangeText={setCountry} style={styles.input} />
      <Button title="Buscar Universidades" onPress={fetchData} />
      <FlatList
        data={universities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>Dominio: {item.domains[0]}</Text>
            <Text style={styles.link} onPress={() => Linking.openURL(item.web_pages[0])}>Visitar</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  card: { marginBottom: 15, borderBottomWidth: 1, paddingBottom: 10 },
  title: { fontWeight: 'bold' },
  link: { color: 'blue' },
});
