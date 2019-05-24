import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'

import Colors from '../constants/Colors'

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
      underlineColorAndroid={Colors.primary}
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
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>{buttonLabel}</Text>
      </TouchableOpacity>
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

export default SingleInputForm
