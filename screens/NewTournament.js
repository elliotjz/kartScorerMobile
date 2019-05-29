import React, { Component } from 'react'
import { StyleSheet, View, Text, AsyncStorage } from 'react-native'

import SingleInputForm from '../components/SingleInputForm'
import { nameVerification } from '../helpers'

export default class NewTournament extends Component {
  static navigationOptions = {
    title: 'New Tournament',
  }

  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      successMessage: '',
      loading: false,
      name: '',
    }
  }

  handleChange = text => {
    this.setState({
      name: text,
    })
  }

  addNewTournament = async () => {
    const { name } = this.state
    const email = await AsyncStorage.getItem('@emailAddress')
    const verification = nameVerification(name, [])
    if (!verification.success) {
      this.setState({ errorMessage: verification.errorMessage })
      return
    }

    this.setState({
      errorMessage: '',
      successMessage: '',
      loading: true,
    })

    try {
      const res = await fetch('http://10.0.0.87:5000/api/new-tournament', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      const resData = await res.json()
      console.log(resData)
      if (resData.success) {
        this.props.navigation.state.params.updateList()
        this.props.navigation.goBack()
      } else {
        this.setState({
          loading: false,
          errorMessage: resData.error,
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
    const { errorMessage, successMessage, loading, name } = this.state

    return (
      <View style={styles.formContainer}>
        <Text style={styles.text}>New Tournament</Text>
        <SingleInputForm
          handleSubmit={this.addNewTournament}
          inputLabel="Name"
          buttonLabel="Create"
          successMessage={successMessage}
          errorMessage={errorMessage}
          loading={loading}
          handleChange={this.handleChange}
          value={name}
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
