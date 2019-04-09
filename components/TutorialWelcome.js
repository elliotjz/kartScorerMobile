import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class TutorialWelcome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome to <Text style={styles.primary}>KartScorer</Text>
        </Text>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>
          Get stats on your Mario Kart races, and compete with friends.
        </Text>
        <Text style={styles.text}>
          Take a moment to learn how to use the app.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 32, color: '#444' },
  primary: {color: '#4193A4' },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 20
  },
  text: {
    fontSize: 18, color: '#444', textAlign: 'center'
  }
});
