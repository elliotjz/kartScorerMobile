import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native'

import Colors from '../constants/Colors'
import Button from '../components/Button'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      tournaments: [],
      error: '',
      loading: true,
    }
  }

  componentWillMount() {
    this.getTournaments()
  }

  async getTournaments() {
    this.setState({ loading: true })
    try {
      const email = await AsyncStorage.getItem('@emailAddress')
      const res = await fetch(
        `http://10.0.0.87:5000/api/get-tournaments?email=${email}`
      )
      const resData = await res.json()
      this.setState({
        tournaments: resData.tournaments,
        error: '',
        loading: false,
      })
    } catch (err) {
      this.setState({
        error:
          "We're having trouble connecting to our server. Try again later.",
        loading: false,
      })
    }
  }

  render() {
    const { tournaments, error, loading } = this.state
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        {error === '' ? (
          <View>
            <View style={styles.btnContainer}>
              <Text style={styles.title}>Tournaments</Text>
              {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <>
                  {tournaments && tournaments.length > 0 ? (
                    <>
                      {tournaments.map((tournament, index) => (
                        <Button
                          onPress={() =>
                            navigate('Tournament', {
                              code: tournament.code,
                              name: tournament.name,
                            })
                          }
                          key={index}
                          text={tournament.name}
                          listBtn
                        />
                      ))}
                    </>
                  ) : (
                    <View>
                      <Text>You don't have any tournaments yet.</Text>
                    </View>
                  )}
                </>
              )}
              <View style={styles.mainButtons}>
                <Button
                  onPress={() => console.log('click')}
                  text="New Tournament"
                />
                <Button
                  onPress={() => console.log('click')}
                  text="Join Tournament"
                />
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text>{error}</Text>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 10,
    fontSize: 26,
    textAlign: 'center',
  },
  btnContainer: {
    justifyContent: 'center',
  },
  mainButtons: {
    marginTop: 20,
  },
})
