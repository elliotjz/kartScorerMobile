import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 20,
  },
  text: {
    margin: 20,
    textAlign: 'center',
    fontSize: 26,
    color: Colors.white,
  },
  shareCode: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
})

const TournamentHeader = ({ name, code }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{name}</Text>
    <Text variant="h6" style={styles.shareCode}>
      Share Code: {code}
    </Text>
  </View>
)

export default TournamentHeader
