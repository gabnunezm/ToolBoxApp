import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=18.5&longitude=-69.9&current_weather=true`)
      .then(res => res.json())
      .then(data => setWeather(data.current_weather));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima en República Dominicana</Text>
      {weather ? (
        <>
          <Text>Temperatura: {weather.temperature}°C</Text>
          <Text>Viento: {weather.windspeed} km/h</Text>
          <Text>Hora: {weather.time}</Text>
        </>
      ) : (
        <Text>Cargando clima...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
});