import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function PokemonScreen() {
  const [pokemon, setPokemon] = useState('');
  const [data, setData] = useState(null);

  const fetchPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    const json = await res.json();
    setData(json);

    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: `https://pokemoncries.com/cries-old/${json.id}.mp3` });
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre del Pokémon" value={pokemon} onChangeText={setPokemon} style={styles.input} />
      <Button title="Buscar" onPress={fetchPokemon} />
      {data && (
        <>
          <Image source={{ uri: data.sprites.front_default }} style={{ width: 100, height: 100 }} />
          <Text>Experiencia Base: {data.base_experience}</Text>
          <Text>Habilidades: {data.abilities.map(a => a.ability.name).join(', ')}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, alignItems: 'center' },
  input: { borderWidth: 1, padding: 10, width: '80%', marginBottom: 10 },
});