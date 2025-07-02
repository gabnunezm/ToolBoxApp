import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const weatherCodeMap = {
  0: 'Soleado',
  1: 'Mayormente despejado',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Neblina',
  48: 'Neblina congelante',
  51: 'Llovizna ligera',
  53: 'Llovizna moderada',
  55: 'Llovizna densa',
  61: 'Lluvia ligera',
  63: 'Lluvia moderada',
  65: 'Lluvia fuerte',
  71: 'Nieve ligera',
  73: 'Nieve moderada',
  75: 'Nieve fuerte',
  80: 'Chubascos ligeros',
  81: 'Chubascos moderados',
  82: 'Chubascos fuertes',
  95: 'Tormenta eléctrica',
  96: 'Tormenta con granizo leve',
  99: 'Tormenta con granizo fuerte',
};

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=18.5&longitude=-69.9&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        setWeather(data.current_weather);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener clima:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00f" />
        <Text>Cargando clima actual...</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text>No se pudo cargar el clima.</Text>
      </View>
    );
  }

  const { temperature, windspeed, time, weathercode } = weather;
  const weatherLabel = weatherCodeMap[weathercode] || 'Desconocido';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima en República Dominicana</Text>
      <Text style={styles.label}>🌤️ Estado: {weatherLabel}</Text>
      <Text style={styles.text}>🌡️ Temperatura: {temperature}°C</Text>
      <Text style={styles.text}>💨 Viento: {windspeed} km/h</Text>
      <Text style={styles.text}>🕒 Hora: {new Date(time).toLocaleTimeString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  label: { fontSize: 18, marginBottom: 5 },
  text: { fontSize: 16 },
});