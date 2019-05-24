import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

export default class TournamentContent extends React.Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={() => navigate('Add')}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigate('Stats')}>
          <Text style={styles.btnText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigate('Recent')}>
          <Text style={styles.btnText}>Recent Races</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigate('Settings')}
        >
          <Text style={styles.btnText}>Settings</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  btn: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    width: 250,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center',
  },
})
