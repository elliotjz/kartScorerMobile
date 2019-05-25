import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Swiper from 'react-native-swiper'

import TutorialWelcome from '../components/TutorialWelcome'
import Colors from '../constants/Colors'
import Button from '../components/Button'

export default class TutorialScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  getStarted = () => {
    this.props.navigation.navigate('App')
  }

  render() {
    return (
      <Swiper
        loop={false}
        index={0}
        activeDotColor={Colors.primary}
        showsButtons
        nextButton={<Text style={styles.buttonText}>›</Text>}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
      >
        <View style={styles.container}>
          <TutorialWelcome />
        </View>
        <View style={styles.container}>
          <Text style={styles.number}>1</Text>
          <Image
            source={require('../assets/images/tutorial1.gif')}
            style={[styles.img, styles.gif1]}
          />
          <Text style={styles.text}>
            Start a new tournament or join a friend's tournament with their
            share code
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.number}>2</Text>
          <Image
            source={require('../assets/images/tutorial2.gif')}
            style={[styles.img, styles.gif2]}
          />
          <Text style={styles.text}>Add players to your tournament</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.number}>3</Text>
          <Image
            source={require('../assets/images/tutorial3.gif')}
            style={[styles.img, styles.gif3]}
          />
          <Text style={styles.text}>Add the results of your races</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.number}>4</Text>
          <Image
            source={require('../assets/images/tutorial4.gif')}
            style={[styles.img, styles.gif4]}
          />
          <Text style={styles.text}>Look at your statistics and progress</Text>
        </View>
        <View style={styles.container}>
          <Button onPress={this.getStarted} text="Get Started" />
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  buttonText: {
    fontSize: 72,
    color: Colors.primary,
  },
  number: {
    fontSize: 72,
    color: Colors.primary,
  },
  img: {
    marginTop: 10,
    marginBottom: 15,
  },
  gif1: {
    height: 250,
    width: 250,
  },
  gif2: {
    height: 170,
    width: 250,
  },
  gif3: {
    width: 250,
    height: 250,
  },
  gif4: {
    width: 250,
    height: 450,
  },
  text: {
    fontSize: 18,
    color: Colors.darkGrey,
    textAlign: 'center',
  },
})
