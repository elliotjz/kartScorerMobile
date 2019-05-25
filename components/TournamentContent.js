import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

import AddPlayer from './AddPlayer'
import AddRace from './AddRace'
import TournamentStats from './TournamentStats'
import TournamentHeader from './TournamentHeader'

export default class TournamentContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewNumber: 0,
    }
  }

  render() {
    const { viewNumber } = this.state
    const {
      playerScores,
      tournament,
      updatedTournamentCallback,
      updatedRacesCallback,
      addPlayerCallback,
      navigation,
    } = this.props

    return (
      <>
        <TournamentHeader name={tournament.name} code={tournament.code} />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('AddRace', {
                tournament,
                updatedRacesCallback,
                updatedTournamentCallback,
                playerScores,
              })
            }
          >
            <Text style={styles.btnText}>Add Race</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('AddPlayer', {
                playerScores,
                tournament,
                addPlayerCallback,
              })
            }
          >
            <Text style={styles.btnText}>Add Player</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('Stats', {
                code: tournament.code,
              })
            }
          >
            <Text style={styles.btnText}>Stats</Text>
          </TouchableOpacity>
        </View>
      </>
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
    backgroundColor: Colors.white,
    padding: 10,
    margin: 5,
    width: 250,
    borderBottomColor: Colors.lightGrey,
    borderRadius: 2,
  },
  btnText: {
    color: Colors.primary,
    fontSize: 22,
    textAlign: 'center',
  },
})
