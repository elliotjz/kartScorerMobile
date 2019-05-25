import React, { Component } from 'react'
import { View, StyleSheet, Text, AsyncStorage } from 'react-native'

import SingleInputForm from './SingleInputForm'
import { nameVerification } from '../helpers'
import Colors from '../constants/Colors'

class AddPlayerForm extends Component {
  static navigationOptions = {
    title: 'Add Player',
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      errorMessage: '',
      name: '',
    }
  }

  handleChange = text => {
    this.setState({
      name: text,
    })
  }

  addNewPlayer = async () => {
    const { name } = this.state
    const playerScores = this.props.navigation.getParam('playerScores')
    const verification = nameVerification(name, playerScores)
    if (!verification.success) {
      this.setState({ errorMessage: verification.errorMessage })
      return
    }

    this.setState({ loading: true, errorMessage: '' })
    try {
      const { code } = this.props.navigation.getParam('tournament')
      const addPlayerCallback = this.props.navigation.getParam(
        'addPlayerCallback'
      )
      const email = await AsyncStorage.getItem('@emailAddress')
      const res = await fetch('http://10.0.0.87:5000/api/add-player', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code, email }),
      })
      const tournament = await res.json()
      console.log(tournament)
      if (tournament.error) {
        this.setState({
          errorMessage: tournament.error,
          loading: false,
        })
      } else {
        this.setState({
          loading: false,
          errorMessage: '',
          name: '',
        })
        addPlayerCallback(tournament)
        this.props.navigation.goBack()
      }
    } catch (err) {
      this.setState({
        errorMessage: 'Error adding player',
        loading: false,
      })
    }
  }

  render() {
    const { errorMessage, loading, name } = this.state

    return (
      <View elevation={0} style={styles.addPlayerContainer}>
        <Text style={styles.title}>Add New Player</Text>
        <SingleInputForm
          handleSubmit={this.addNewPlayer}
          inputLabel="Name"
          buttonLabel="Add"
          errorMessage={errorMessage}
          successMessage=""
          loading={loading}
          handleChange={this.handleChange}
          value={name}
        />
      </View>
    )
  }
}

export default AddPlayerForm

const styles = StyleSheet.create({
  addPlayerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 10,
    fontSize: 26,
    textAlign: 'center',
  },
})
