import React from 'react'
import { WebView, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <WebView
        source={{ uri: 'https://gomkart.herokuapp.com/' }}
        style={{ marginTop: 20 }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
})
