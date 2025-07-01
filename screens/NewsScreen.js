import React, { useEffect, useState } from 'react';
import { View, Text, Image, Linking, StyleSheet, ScrollView } from 'react-native';

export default function NewsScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.digitaldjtips.com/wp-json/wp/v2/posts?_embed&per_page=3')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://www.digitaldjtips.com/wp-content/uploads/2022/04/logo.svg' }} style={{ height: 100, resizeMode: 'contain' }} />
      {posts.map((post, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{post.title.rendered}</Text>
          <Text>{post.excerpt.rendered.replace(/<[^>]+>/g, '')}</Text>
          <Text style={styles.link} onPress={() => Linking.openURL(post.link)}>Visitar noticia</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { marginBottom: 20 },
  title: { fontWeight: 'bold', fontSize: 16 },
  link: { color: 'blue' },
});