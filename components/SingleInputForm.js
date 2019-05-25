import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native'

import Colors from '../constants/Colors'
import Button from './Button'

const SingleInputForm = ({
  inputLabel,
  buttonLabel,
  errorMessage,
  successMessage,
  loading,
  handleChange,
  handleSubmit,
  value,
}) => (
  <View style={styles.root}>
    <TextInput
      id="name"
      placeholder={inputLabel}
      style={styles.textField}
      value={value}
      onChangeText={handleChange}
    />
    {loading ? (
      <View style={styles.progressContainer}>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    ) : (
      <View>
        {errorMessage !== '' && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        {successMessage !== '' && (
          <Text style={styles.successMessage}>{successMessage}</Text>
        )}
      </View>
    )}

    <View style={styles.buttonContainer}>
      <Button onPress={handleSubmit} text={buttonLabel} />
    </View>
  </View>
)

const styles = StyleSheet.create({
  root: {
    // display: 'block',
  },
  buttonContainer: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    color: Colors.darkGrey,
  },
  errorMessage: {
    color: Colors.red,
  },
  successMessage: {
    color: Colors.green,
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
    width: 200,
    marginTop: 19,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
})

export default SingleInputForm
