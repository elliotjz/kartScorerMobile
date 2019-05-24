import React, { Component } from 'react'
import { View, StyleSheet, Text, AsyncStorage } from 'react-native'

import SingleInputForm from './SingleInputForm'
import { getQueryVariable, nameVerification } from '../helpers'

const styles = StyleSheet.create({
  addPlayerContainer: {
    maxWidth: 200,
    marginVertical: 30,
    padding: 20,
  },
})

class AddPlayerForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      errorMessage: '',
      successMessage: '',
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
    console.log(`Submitting: ${name}`)
    const verification = nameVerification(name, this.props.playerScores)
    if (!verification.success) {
      this.setState({ errorMessage: verification.errorMessage })
      return
    }

    this.setState({ loading: true, errorMessage: '', successMessage: '' })
    try {
      const { code } = this.props.tournament
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
          successMessage: 'Done!',
          name: '',
        })
        this.props.addPlayerCallback(tournament)
        setTimeout(() => this.setState({ successMessage: '' }), 5000)
      }
    } catch (err) {
      this.setState({
        errorMessage: 'Error adding player',
        loading: false,
        successMessage: '',
      })
    }
  }

  render() {
    const { errorMessage, successMessage, loading, name } = this.state

    return (
      <View elevation={0} style={styles.addPlayerContainer}>
        <Text>Add New Player</Text>
        <SingleInputForm
          handleSubmit={this.addNewPlayer}
          inputLabel="Name"
          buttonLabel="Add"
          errorMessage={errorMessage}
          successMessage={successMessage}
          loading={loading}
          handleChange={this.handleChange}
          value={name}
        />
      </View>
    )
  }
}

export default AddPlayerForm

/*
Put under text Element


*/
