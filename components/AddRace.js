import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TabBarIcon,
  AsyncStorage,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../constants/Colors'
import PlayerResultForm from './PlayerResultForm'
import { getQueryVariable } from '../helpers'

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

export default class AddData extends React.Component {
  static navigationOptions = {
    title: 'Add Data',
  }

  constructor(props) {
    super(props)
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
      console.log('Form Data')
      console.log(formData)
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
    console.log('Sending race')
    this.setState({ loading: true, errorMessage: '' })
    try {
      const { code } = this.props.tournament
      const email = await AsyncStorage.getItem('@emailAddress')
      const res = await fetch(`http://10.0.0.87:5000/api/add-race`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ places, code, email }),
      })
      const resData = await res.json()
      console.log(resData)

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
        this.props.updatedRacesCallback(resData.races)
        this.props.updatedTournamentCallback(resData.tournament)
        this.props.changeComponent(3)
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
      errorMessage = 'Please complete all inputs.'
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

  render() {
    const { playerScores } = this.props
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
      <View>
        {players.length > 0 && (
          <View style={styles.addRaceContainer}>
            <Text style={styles.title}>Add New Race</Text>
            <View>
              {playerResultList}
              {loading ? (
                <ActivityIndicator size="large" color={Colors.white} />
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
                  <TouchableOpacity onPress={this.removePlayer}>
                    <Icon
                      name="md-remove-circle-outline"
                      size={40}
                      color={Colors.black}
                      style={styles.plusMinus}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn} onPress={this.submitRace}>
                  <Text style={styles.btnText}>Add Race</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 26,
  },
  addRaceContainer: {
    padding: 20,
  },
  buttonContainer: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    color: Colors.black,
  },
  errorMessage: {
    color: Colors.red,
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
  btn: {
    margin: 20,
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 5,
    width: 200,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
  },
})
