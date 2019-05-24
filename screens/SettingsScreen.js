import React from 'react'
import { Google } from 'expo'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
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

  showTutorial = () => {
    this.props.navigation.navigate('Tutorial')
  }

  render() {
    const { email, loading, error } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={this.showTutorial}>
          <Text style={styles.btnText}>Show Tutorial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.logout}>
          <Text style={styles.btnText}>LOGOUT</Text>
        </TouchableOpacity>
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
