import React from 'react'

import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../constants/Colors'
import Button from '../components/Button'

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
        <Text style={styles.text}>Signed in as:</Text>
        <Text style={styles.text}>{email}</Text>
        <Button onPress={() => navigate('Tutorial')} text="Show Tutorial" />
        <Button onPress={this.logout} text="Logout" />
        <View style={styles.homeIconContainer}>
          <TouchableOpacity
            style={styles.homeTouchable}
            onPress={() => this.props.navigation.navigate('App')}
          >
            <Icon name="md-home" size={50} color={Colors.lightGrey} />
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color={Colors.primary} />}
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
  text: {
    textAlign: 'center',
    fontSize: 22,
  },
  homeIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  homeTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
