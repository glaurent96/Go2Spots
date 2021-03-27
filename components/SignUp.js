// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import firebase from '../helpers/firebase';


class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '',
          password: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} >
      <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../assets/tinyLogo.png')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          placeholderTextColor='white'
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
          color='white'

        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          placeholderTextColor='white'
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
          color='white'
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          placeholderTextColor='white'
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
          color='white'
        />
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.registerUser()}
        />

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

SignUp.navigationOptions = () => ({
    title: 'Track Your Favorite Spots',
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: '#E91363'
  }
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: 'black'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
},
logo: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: -160,
}
});

export default SignUp;
