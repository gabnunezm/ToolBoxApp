import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const weatherCodeMap = {
  0: '☀️ Soleado',
  1: '🌤️ Mayormente despejado',
  2: '⛅ Parcialmente nublado',
  3: '☁️ Nublado',
  45: '🌫️ Neblina',
  48: '🌫️ Neblina congelante',
  51: '🌦️ Llovizna ligera',
  53: '🌧️ Llovizna moderada',
  55: '🌧️ Llovizna densa',
  61: '🌦️ Lluvia ligera',
  63: '🌧️ Lluvia moderada',
  65: '🌧️ Lluvia fuerte',
  71: '🌨️ Nieve ligera',
  73: '🌨️ Nieve moderada',
  75: '❄️ Nieve fuerte',
  80: '🌦️ Chubascos ligeros',
  81: '🌧️ Chubascos moderados',
  82: '🌧️ Chubascos fuertes',
  95: '⛈️ Tormenta eléctrica',
  96: '⛈️ Granizo leve',
  99: '🌩️ Granizo fuerte',
};

const getBackgroundColors = (code) => {
  if ([0, 1].includes(code)) return ['#fceabb', '#f8b500']; // Soleado
  if ([2, 3].includes(code)) return ['#dbeafe', '#93c5fd']; // Nublado
  if ([45, 48].includes(code)) return ['#cbd5e1', '#94a3b8']; // Neblina
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return ['#a5b4fc', '#6366f1']; // Lluvia
  if ([71, 73, 75].includes(code)) return ['#e0f2fe', '#bae6fd']; // Nieve
  if ([95, 96, 99].includes(code)) return ['#475569', '#1e293b']; // Tormenta
  return ['#f1f5f9', '#e2e8f0']; // Neutro
};

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=18.5&longitude=-69.9&current_weather=true&timezone=America/Santo_Domingo`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current_weather);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener clima:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10 }}>Cargando clima actual...</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No se pudo cargar el clima.</Text>
      </View>
    );
  }

  const { temperature, windspeed, time, weathercode } = weather;
  const weatherLabel = weatherCodeMap[weathercode] || '🌈 Desconocido';
  const hora = new Date(time).toLocaleTimeString('es-DO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const backgroundColors = getBackgroundColors(weathercode);

  return (
    <LinearGradient colors={backgroundColors} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.View entering={FadeInUp} style={styles.card}>
          <Text style={styles.title}>Clima en República Dominicana</Text>
          <Text style={styles.weatherIcon}>{weatherLabel}</Text>
          <Text style={styles.text}>🌡️ Temperatura: {temperature}°C</Text>
          <Text style={styles.text}>💨 Viento: {windspeed} km/h</Text>
          <Text style={styles.text}>🕒 Hora: {hora}</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffffdd',
    borderRadius: 16,
    padding: 24,
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  weatherIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
    color: '#334155',
  },
});