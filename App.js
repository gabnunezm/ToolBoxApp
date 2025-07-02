import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import GenderScreen from './screens/GenderScreen';
import AgeScreen from './screens/AgeScreen';
import UniversitiesScreen from './screens/UniversitiesScreen';
import WeatherScreen from './screens/WeatherScreen';
import PokemonScreen from './screens/PokemonScreen';
import NewsScreen from './screens/NewsScreen';
import MenuScreen from './screens/MenuScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menú">
        <Stack.Screen name="Menú" component={MenuScreen} />
        <Stack.Screen name="Info App" component={HomeScreen} />
        <Stack.Screen name="Género" component={GenderScreen} />
        <Stack.Screen name="Edad" component={AgeScreen} />
        <Stack.Screen name="Universidades" component={UniversitiesScreen} />
        <Stack.Screen name="Clima RD" component={WeatherScreen} />
        <Stack.Screen name="Pokémon" component={PokemonScreen} />
        <Stack.Screen name="Noticias DJ" component={NewsScreen} />
        <Stack.Screen name="Sobre Mí" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}