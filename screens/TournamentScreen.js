import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native'

import { comparePos, compareRaces, comparePlayerScores } from '../helpers'
import Colors from '../constants/Colors'
import TournamentHeader from '../components/TournamentHeader'
import TournamentContent from '../components/TournamentContent'

const styles = StyleSheet.create({
  text: {
    margin: 20,
  },
  error: {
    color: Colors.red,
  },
})

export default class TournamentScreen extends React.Component {
  static navigationOptions = {
    title: 'Tournament',
  }

  constructor(props) {
    super(props)
    this.state = {
      error: '',
      tournament: {},
      races: [],
      playerScores: [],
      loading: true,
    }
  }

  componentWillMount() {
    this.getTournamentData()
  }

  getCurrentScores(tournament) {
    if (tournament !== null) {
      const { scoreHistory } = tournament
      const currentScores = []
      for (let i = 0; i < scoreHistory.length; i++) {
        if (scoreHistory[i].active) {
          // Player has not been deleted from the tournament
          const player = scoreHistory[i].name
          if (player.charAt(0) !== '_') {
            // Player is not a computer
            let j = tournament.raceCounter
            let score
            let scoreChange

            // Find the current score
            while (score === undefined && j >= 0) {
              if (scoreHistory[i].scores[j]) {
                // Found the most recent score
                score = scoreHistory[i].scores[j]
                if (j === tournament.raceCounter) {
                  // Player played in most recent race
                  // So look for previous score
                  while (scoreChange === undefined && j >= 0) {
                    j -= 1
                    if (scoreHistory[i].scores[j]) {
                      // Found the previous score
                      scoreChange = score - scoreHistory[i].scores[j]
                    }
                  }
                }
              }
              j -= 1
            }

            currentScores.push([
              player,
              score.toFixed(),
              scoreChange ? scoreChange.toFixed(1) : null,
            ])
          }
        }
      }
      currentScores.sort(comparePlayerScores)
      return currentScores
    }
    return 0
  }

  async getTournamentData() {
    this.setState({ loading: true })
    try {
      const code = this.props.navigation.getParam('code')
      const res = await fetch(
        `http://10.0.0.87:5000/api/get-tournament-data?code=${code}`
      )
      const resData = await res.json()
      const { tournament } = resData

      // get players and current scores
      const playerScores = this.getCurrentScores(tournament)

      this.setState({
        tournament,
        playerScores,
        loading: false,
        error: '',
      })
    } catch (err) {
      this.setState({
        error: 'Error loading data',
        loading: false,
      })
    }
  }

  updatedTournamentCallback = tournament => {
    const playerScores = this.getCurrentScores(tournament)
    this.setState({
      tournament,
      playerScores,
    })
  }

  updatedRacesCallback = (newRaces, page) => {
    const parsedRaces = this.parseRaces(newRaces)
    if (page && page > 1) {
      this.setState(prevState => {
        const { races } = prevState
        races.push(...parsedRaces)
        return { races }
      })
    } else {
      this.setState({
        races: parsedRaces,
      })
    }
  }

  addPlayerCallback = tournament => {
    const players = tournament.scoreHistory.map(player => player.name)
    // remove computer player
    const indexOfCompPlayer = players.indexOf('_comp')
    players.splice(indexOfCompPlayer, 1)

    // get players and current scores
    const playerScores = this.getCurrentScores(tournament)

    this.setState({
      tournament,
      playerScores,
    })
  }

  parseRaces(races) {
    for (let i = 0; i < races.length; i++) {
      const places = races[i].places[0]
      const parsedPlaces = []
      Object.keys(places).forEach(name => {
        parsedPlaces.push({
          name,
          position: places[name],
        })
      })
      parsedPlaces.sort(comparePos)
      races[i].places = parsedPlaces
    }
    return races.sort(compareRaces)
  }

  render() {
    const { navigation } = this.props
    const { tournament, races, playerScores, loading, error } = this.state
    const tournamentExists =
      tournament !== undefined && Object.keys(tournament).length > 0

    return (
      <View>
        {loading ? (
          <View>
            <ActivityIndicator color={Colors.primary} size="large" />
          </View>
        ) : (
          <View>
            {error !== '' && (
              <Text style={[styles.text, styles.error]}>{error}</Text>
            )}
            {!tournamentExists ? (
              <View>
                <Text variant="h5" style={styles.text}>
                  Tournament Not Found
                </Text>
              </View>
            ) : (
              <ScrollView style={styles.container}>
                <TournamentHeader
                  name={tournament.name}
                  code={tournament.code}
                />
                <TournamentContent
                  playerScores={playerScores}
                  tournament={tournament}
                  races={races}
                  updatedTournamentCallback={this.updatedTournamentCallback}
                  updatedRacesCallback={this.updatedRacesCallback}
                  addPlayerCallback={this.addPlayerCallback}
                  navigation={navigation}
                />
              </ScrollView>
            )}
          </View>
        )}
      </View>
    )
  }
}
