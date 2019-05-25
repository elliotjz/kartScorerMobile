import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'

import Colors from '../constants/Colors'
import PlayerResultForm from './PlayerResultForm'
import Button from './Button'

const formDataReset = {
  player0: '',
  player0Pos: '',
  player1: '',
  player1Pos: '',
  player2: '',
  player2Pos: '',
  player3: '',
  player3Pos: '',
  player4: '',
  player4Pos: '',
  player5: '',
  player5Pos: '',
  player6: '',
  player6Pos: '',
  player7: '',
  player7Pos: '',
  player8: '',
  player8Pos: '',
  player9: '',
  player9Pos: '',
  player10: '',
  player10Pos: '',
  player11: '',
  player11Pos: '',
}

export default class AddRace extends React.Component {
  static navigationOptions = {
    title: 'Add Race',
  }

  constructor(props) {
    super(props)
    this.handleViewRef = ref => (this.view = ref)
    this.state = {
      numPlayers: 4,
      errorMessage: '',
      successMessage: '',
      formData: formDataReset,
      loading: false,
    }
  }

  handleChange = (value, name) => {
    this.setState(prevState => {
      const formData = {
        ...prevState.formData,
        [name]: value,
      }
      return { formData, successMessage: '' }
    })
  }

  addPlayer = () => {
    let { numPlayers } = this.state
    numPlayers = numPlayers > 11 ? numPlayers : numPlayers + 1
    this.setState({ numPlayers })
  }

  removePlayer = () => {
    let { numPlayers } = this.state
    numPlayers = numPlayers < 2 ? numPlayers : numPlayers - 1
    this.setState({ numPlayers })
  }

  submitRace = event => {
    event.preventDefault()
    const raceResults = {}
    for (let i = 0; i < this.state.numPlayers; i++) {
      const name = this.state.formData[`player${i}`]
      const position = this.state.formData[`player${i}Pos`]

      // Check that the name is valid
      const valid = this.validatePosition(name, position, raceResults)
      if (!valid) return
      raceResults[name] = position
    }
    this.sendRace(raceResults)
  }

  async sendRace(places) {
    this.setState({ loading: true, errorMessage: '' })
    try {
      const { code } = this.props.navigation.getParam('tournament')
      const updatedRacesCallback = this.props.navigation.getParam(
        'updatedRacesCallback'
      )
      const updatedTournamentCallback = this.props.navigation.getParam(
        'updatedTournamentCallback'
      )
      // const { code } = this.props.tournament
      const email = await AsyncStorage.getItem('@emailAddress')
      const res = await fetch(`http://10.0.0.87:5000/api/add-race`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ places, code, email }),
      })
      const resData = await res.json()

      if (resData.error) {
        this.setState({
          errorMessage: resData.error,
          successMessage: '',
          loading: false,
        })
      } else {
        this.setState({
          errorMessage: '',
          loading: false,
          formData: formDataReset,
        })
        updatedRacesCallback(resData.races)
        updatedTournamentCallback(resData.tournament)
        this.props.navigation.goBack()
      }
    } catch (err) {
      console.log(err)
      this.setState({
        errorMessage: 'Error sending race.',
        successMessage: '',
        loading: false,
      })
    }
  }

  validatePosition(name, position, raceResults) {
    let errorMessage = ''
    if (name === '') {
      // Race position wasn't filled in
      errorMessage =
        'Please complete all inputs.\nOr press minus to remove a row.'
      this.pulsePlusMinus()
    } else if (position === '') {
      // Player doesn't have a position
      errorMessage = 'Every player must have a position'
    } else if (raceResults.hasOwnProperty(name)) {
      // Player appears twice
      errorMessage = "Can't have a duplicate player."
    }

    if (errorMessage !== '') {
      this.setState({ errorMessage })
      return false
    }

    this.setState({
      errorMessage: '',
    })
    return true
  }

  pulsePlusMinus() {
    this.view.rubberBand(1000)
  }

  render() {
    const playerScores = this.props.navigation.getParam('playerScores')
    const { errorMessage, successMessage, loading } = this.state
    const players = playerScores.map(player => player[0])
    const playerResultList = []

    for (let i = 0; i < this.state.numPlayers; i++) {
      playerResultList.push(
        <PlayerResultForm
          players={players}
          player={this}
          handleChange={this.handleChange}
          name={`player${i}`}
          key={i}
          selectedPlayer={this.state.formData[`player${i}`]}
          position={this.state.formData[`player${i}Pos`]}
        />
      )
    }
    return (
      <>
        {players.length > 0 && (
          <View style={styles.container}>
            <Text style={styles.title}>Add New Race</Text>
            {playerResultList}

            {loading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <View>
                {errorMessage !== '' && (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                )}
                {successMessage !== '' && (
                  <Text style={styles.successMessage}>{successMessage}</Text>
                )}
              </View>
            )}
            <View style={styles.buttonContainer}>
              <View style={styles.plusMinusContainer}>
                <TouchableOpacity onPress={this.addPlayer}>
                  <Icon
                    name="md-add-circle-outline"
                    size={40}
                    color={Colors.black}
                    style={styles.plusMinus}
                  />
                </TouchableOpacity>
                <Animatable.View ref={this.handleViewRef}>
                  <TouchableOpacity onPress={this.removePlayer}>
                    <Icon
                      name="md-remove-circle-outline"
                      size={40}
                      color={Colors.black}
                      style={styles.plusMinus}
                    />
                  </TouchableOpacity>
                </Animatable.View>
              </View>
              <Button onPress={this.submitRace} text="Add Race" />
            </View>
          </View>
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 10,
    fontSize: 26,
    textAlign: 'center',
  },
  playerResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    color: Colors.black,
  },
  errorMessage: {
    color: Colors.red,
    textAlign: 'center',
  },
  successMessage: {
    color: Colors.green,
  },
  plusMinusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  plusMinus: {
    marginHorizontal: 20,
  },
})
