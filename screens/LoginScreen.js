import React from 'react'
import { Google } from 'expo'

import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
  ActivityIndicator,
} from 'react-native'

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

export default class Login extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: '',
    }
  }

  login = async () => {
    this.setState({
      loading: true,
      error: '',
    })
    const clientId = keys.googleID
    const { type, accessToken, user } = await Google.logInAsync({ clientId })
    try {
      await AsyncStorage.setItem('@emailAddress', user.email)
      await AsyncStorage.setItem('@accessToken', accessToken)

      if (type === 'success') {
        this.setState({
          loading: false,
          error: '',
        })
        this.props.navigation.navigate('App')
      }
    } catch (e) {
      console.log('Error saving to async storage')
      this.setState({
        loading: false,
        error: 'Errors saving to async storage.',
      })
    }
  }

  render() {
    const { email, loading, error } = this.state
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Button onPress={this.login} text="LOGIN WITH GOOGLE" />
        <Text>{email}</Text>
        {loading && <ActivityIndicator size="large" color={Colors.white} />}
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
    backgroundColor: Colors.primary,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 20,
  },
})
