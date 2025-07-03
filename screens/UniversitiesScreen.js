import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Linking,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function UniversitiesScreen() {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);

  const fetchData = async () => {
    const res = await fetch(
      `http://universities.hipolabs.com/search?country=${country}`
    );
    const data = await res.json();
    setUniversities(data);
  };

  return (
    <LinearGradient colors={['#e0f2fe', '#f0f9ff']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          placeholder="País (e.g. Dominican Republic)"
          value={country}
          onChangeText={setCountry}
          style={styles.input}
        />
        <Button title="🔍 Buscar Universidades" onPress={fetchData} />

        <FlatList
          data={universities}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <Animated.View entering={FadeInUp} style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.domain}>🌐 Dominio: {item.domains[0]}</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(item.web_pages[0])}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Visitar Sitio Web</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    flex: 1,
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#3b82f6',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: width * 0.92,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  domain: {
    fontSize: 14,
    marginBottom: 12,
    color: '#334155',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});