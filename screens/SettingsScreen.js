import React from 'react'

import { View, StyleSheet, Text, AsyncStorage } from 'react-native'

import Colors from '../constants/Colors'
import Button from '../components/Button'

let keys
let production
try {
  keys = require('../keys')
  production = false
} catch (e) {
  production = true
}

export default class Settings extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      email: 'nothing yet',
      loading: false,
      error: '',
    }
  }

  componentDidMount() {
    this.retrieveUser()
  }

  retrieveUser = async () => {
    this.setState({
      loading: true,
      error: '',
    })
    try {
      const email = await AsyncStorage.getItem('@emailAddress')
      if (email !== null) {
        this.setState({
          loading: false,
          email,
          error: '',
        })
      }
    } catch (e) {
      console.log('Error loading from async storage.')
      this.setState({
        error: 'Error loading from async storage.',
      })
    }
  }

  logout = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }

  render() {
    const { email, loading, error } = this.state
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Button onPress={() => navigate('Tutorial')} text="Show Tutorial" />
        <Button onPress={this.logout} text="Logout" />
        <Text>Signed in as {email}</Text>
        {loading && <Text>Loading...</Text>}
        {error !== '' && error}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
})
