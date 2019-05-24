import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

import AddPlayer from './AddPlayer'
import AddRace from './AddRace'
import TournamentStats from './TournamentStats'

export default class TournamentContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewNumber: 0,
    }
  }

  changeComponent = i => {
    this.setState({
      viewNumber: i,
    })
  }

  render() {
    const { viewNumber } = this.state
    const {
      playerScores,
      tournament,
      races,
      updatedTournamentCallback,
      updatedRacesCallback,
      addPlayerCallback,
      navigation,
    } = this.props

    return (
      <View style={styles.container}>
        {viewNumber === 0 && (
          <>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.changeComponent(1)}
            >
              <Text style={styles.btnText}>Add Race</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.changeComponent(2)}
            >
              <Text style={styles.btnText}>Add Player</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.changeComponent(3)}
            >
              <Text style={styles.btnText}>Stats</Text>
            </TouchableOpacity>
          </>
        )}
        {viewNumber === 1 && (
          <AddRace
            playerScores={playerScores}
            tournament={tournament}
            races={races}
            updatedTournamentCallback={updatedTournamentCallback}
            updatedRacesCallback={updatedRacesCallback}
            addPlayerCallback={addPlayerCallback}
            navigation={navigation}
            changeComponent={this.changeComponent}
          />
        )}
        {viewNumber === 2 && (
          <AddPlayer
            playerScores={playerScores}
            tournament={tournament}
            races={races}
            updatedTournamentCallback={updatedTournamentCallback}
            updatedRacesCallback={updatedRacesCallback}
            addPlayerCallback={addPlayerCallback}
            navigation={navigation}
          />
        )}
        {viewNumber === 3 && (
          <TournamentStats
            playerScores={playerScores}
            tournament={tournament}
            races={races}
            updatedTournamentCallback={updatedTournamentCallback}
            updatedRacesCallback={updatedRacesCallback}
            addPlayerCallback={addPlayerCallback}
            navigation={navigation}
          />
        )}
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
