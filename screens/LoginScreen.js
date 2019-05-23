import React from 'react'
import { Google } from 'expo'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native'

import Colors from '../constants/Colors'

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
      email: 'nothing yet',
      loading: false,
      error: '',
    }
  }

  componentDidMount() {
    this.retrieveUser()
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
          email: user.email,
          error: '',
        })
      }
    } catch (e) {
      console.log('Error saving to async storage')
      this.setState({
        loading: false,
        error: 'Errors saving to async storage.',
      })
    }
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

  render() {
    const { email, loading, error } = this.state
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.btn} onPress={this.login}>
          <Text style={styles.btnText}>LOGIN WITH GOOGLE</Text>
        </TouchableOpacity>
        <Text>{email}</Text>
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
    backgroundColor: Colors.primary,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 20,
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
