import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function PokemonScreen() {
  const [pokemon, setPokemon] = useState('');
  const [data, setData] = useState(null);
  const [sound, setSound] = useState(null);

  const fetchPokemon = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
      );
      const json = await res.json();
      setData(json);

      // El sonido del pokemon carga aquí al reproductor
      const newSound = new Audio.Sound();
      await newSound.loadAsync({
        uri: `https://pokemoncries.com/cries-old/${json.id}.mp3`,
      });
      setSound(newSound);
    } catch (error) {
      console.log('Error al buscar Pokémon:', error);
      setData(null);
    }
  };

  const playCry = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  return (
    <LinearGradient colors={['#A34A12', '#C79557', '#FFE605']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="Nombre del Pokémon"
          value={pokemon}
          onChangeText={setPokemon}
          style={styles.input}
        />
        <Button title="Buscar Pokémon" onPress={fetchPokemon} />

        {data && (
          <Animated.View entering={FadeInDown.duration(600)} style={styles.card}>
            <Image
              source={{ uri: data.sprites.front_default }}
              style={styles.image}
            />
            <Text style={styles.name}>{data.name.toUpperCase()}</Text>
            <Text style={styles.info}>⚔️ Experiencia Base: {data.base_experience}</Text>
            <Text style={styles.info}>🧠 Habilidades: {data.abilities.map(a => a.ability.name).join(', ')}</Text>
            <Text style={styles.info}>🌡️ Altura: {data.height / 10} m</Text>
            <Text style={styles.info}>⚖️ Peso: {data.weight / 10} kg</Text>
            <Text style={styles.info}>🌀 Tipos: {data.types.map(t => t.type.name).join(', ')}</Text>
            <Text style={styles.info}>🎯 Movimientos: {data.moves.slice(0, 5).map(m => m.move.name).join(', ')}</Text>

            <TouchableOpacity style={styles.soundButton} onPress={playCry}>
              <Text style={styles.soundButtonText}>🔊 Escuchar sonido</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  card: {
    backgroundColor: '#ffffffee',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 6,
    textAlign: 'center',
  },
  soundButton: {
    marginTop: 16,
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  soundButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});