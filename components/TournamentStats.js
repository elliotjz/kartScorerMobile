import React from 'react'
import { WebView, View, Text, StyleSheet, Dimensions } from 'react-native'

export default class TournamentStats extends React.Component {
  render() {
    const { code } = this.props
    const uri = `https://gomkart.herokuapp.com/chart?code=${code}`
    return (
      <WebView
        source={{ uri }}
        style={styles.webView}
        automaticallyAdjustContentInsets={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    paddingBottom: 40,
    height: Dimensions.get('window').height - 200,
  },
})
