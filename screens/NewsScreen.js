import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function NewsScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.digitaldjtips.com/wp-json/wp/v2/posts?_embed&per_page=3')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts.map((post, index) => {
        const imageUrl =
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

        return (
          <View key={index} style={styles.card}>
            {index === 0 && (
              <Image
                source={require('../assets/img/digitaldj_logo.png')}
                style={styles.logo}
              />
            )}

            {imageUrl && (
              <Image source={{ uri: imageUrl }} style={styles.featuredImage} />
            )}

            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {post.title.rendered}
            </Text>

            <Text style={styles.excerpt} numberOfLines={4} ellipsizeMode="tail">
              {post.excerpt.rendered.replace(/<[^>]+>/g, '').trim()}
            </Text>

            <TouchableOpacity onPress={() => Linking.openURL(post.link)}>
              <Text style={styles.link}>🔗 Visitar noticia</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    height: 60,
    resizeMode: 'contain',
    marginBottom: 16,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
    width: screenWidth * 0.9,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
  },
  link: {
    color: '#2563eb',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});