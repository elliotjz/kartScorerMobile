import React from 'react'
import { WebView, StyleSheet } from 'react-native'

export default class TournamentStats extends React.Component {
  static navigationOptions = {
    title: 'Tournament Chart',
  }

  render() {
    const code = this.props.navigation.getParam('code')
    const uri = `https://gomkart.herokuapp.com/chart?code=${code}`
    return <WebView source={{ uri }} style={styles.webView} />
  }
}

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
})
