import React, { Component } from 'react'
import { StyleSheet, View, Text, AsyncStorage } from 'react-native'

import SingleInputForm from '../components/SingleInputForm'

export default class JoinTournament extends Component {
  static navigationOptions = {
    title: 'Join Tournament',
  }

  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      loading: false,
      code: '',
    }
  }

  handleChange = code => {
    this.setState({
      code,
    })
  }

  submitJoinTournament = async () => {
    const { code } = this.state
    const email = await AsyncStorage.getItem('@emailAddress')
    this.setState({
      errorMessage: '',
      loading: true,
    })
    try {
      const res = await fetch('http://10.0.0.87:5000/api/join-tournament', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, email }),
      })
      const data = await res.json()
      if (data.success) {
        this.props.navigation.state.params.updateList()
        this.props.navigation.goBack()
      } else {
        this.setState({
          errorMessage: 'There is not tournament with that code.',
          loading: false,
        })
      }
    } catch (err) {
      this.setState({
        errorMessage:
          "We're having trouble connecting to our server. Try again later.",
        loading: false,
      })
    }
  }

  render() {
    const { errorMessage, loading, code } = this.state

    return (
      <View style={styles.formContainer}>
        <Text style={styles.text}>Join Tournament</Text>
        <SingleInputForm
          handleSubmit={this.submitJoinTournament}
          inputLabel="Tournament Code"
          buttonLabel="Join"
          errorMessage={errorMessage}
          loading={loading}
          handleChange={this.handleChange}
          value={code}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 20,
    fontSize: 22,
  },
})
