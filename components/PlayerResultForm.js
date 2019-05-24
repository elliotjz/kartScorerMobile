import React from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  namePicker: {
    minWidth: 150,
  },
  posPicker: {
    minWidth: 100,
  },
})

export default class PlayerResultForm extends React.Component {
  render() {
    const options = []
    options.push(<Picker.Item key={0} value="" label="Player" />)
    if (this.props.players) {
      this.props.players.forEach((player, index) => {
        options.push(
          <Picker.Item key={index + 1} value={player} label={player} />
        )
      })
    }

    const positions = []
    positions.push(<Picker.Item key={0} value="" label="Pos" />)
    for (let i = 1; i <= 12; i++) {
      positions.push(<Picker.Item key={i} value={`${i}`} label={`${i}`} />)
    }

    return (
      <View style={styles.root}>
        <Picker
          style={styles.namePicker}
          onValueChange={val => this.props.handleChange(val, this.props.name)}
          selectedValue={this.props.selectedPlayer}
        >
          {options}
        </Picker>
        <Picker
          style={styles.posPicker}
          onValueChange={val =>
            this.props.handleChange(val, `${this.props.name}Pos`)
          }
          selectedValue={this.props.position}
        >
          {positions}
        </Picker>
      </View>
    )
  }
}
