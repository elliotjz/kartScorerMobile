import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class Tutorial4 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.number}>
          1
        </Text>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>
          Start a new tournament or join a friend's tournament with a share code.
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
  number: {
    fontSize: 72,
    color: '#4193A4',
    marginBottom: 50,
  },
  text: {
    fontSize: 18, color: '#444', textAlign: 'center'
  }
});
