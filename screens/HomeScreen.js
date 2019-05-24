import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native'
import Colors from '../constants/Colors'

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
            <View>
              <Text style={styles.title}>Tournaments</Text>
              {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <View>
                  {tournaments && tournaments.length > 0 ? (
                    <View>
                      <View style={styles.hr} />
                      {tournaments.map((tournament, index) => (
                        <TouchableOpacity
                          onPress={() =>
                            navigate('Tournament', {
                              code: tournament.code,
                              name: tournament.name,
                            })
                          }
                          key={index}
                          style={styles.listLink}
                        >
                          <Text style={styles.tournamentName}>
                            {tournament.name}
                          </Text>
                          <View style={styles.hr} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <View>
                      <Text>You don't have any tournaments yet.</Text>
                    </View>
                  )}
                </View>
              )}
              <View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => console.log('click')}
                >
                  <Text style={styles.btnText}>New Tournament</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => console.log('click')}
                >
                  <Text style={styles.btnText}>Join Tournament</Text>
                </TouchableOpacity>
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
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  tournamentName: {
    textAlign: 'center',
    margin: 8,
    color: Colors.primary,
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
  listLink: {
    margin: 5,
  },
  hr: {
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
})
