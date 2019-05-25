import React from 'react'
import { View, StyleSheet } from 'react-native'

import TournamentHeader from './TournamentHeader'
import Button from './Button'

export default class TournamentContent extends React.Component {
  render() {
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
          <Button
            onPress={() =>
              navigation.navigate('AddRace', {
                tournament,
                updatedRacesCallback,
                updatedTournamentCallback,
                playerScores,
              })
            }
            text="Add Race"
          />
          <Button
            onPress={() =>
              navigation.navigate('AddPlayer', {
                playerScores,
                tournament,
                addPlayerCallback,
              })
            }
            text="Add Player"
          />
          <Button
            onPress={() =>
              navigation.navigate('Chart', {
                code: tournament.code,
              })
            }
            text="Tournament Chart"
          />
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
})
