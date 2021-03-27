// components/login.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from '../helpers/firebase';


class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      errorMessage: ''
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '',
          password: ''
        })
        this.props.navigation.navigate('CommunityMap')
      })
      .catch(error => this.setState({
          errorMessage: error.message,
          isLoading: false
      }))
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
        <Text style={styles.errorTextStyle}>
            {this.state.errorMessage}
        </Text>
        <Button
          color="#3740FE"
          title="Signin"
          onPress={() => this.userLogin()}
        />

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          Don't have account? Click here to signup
        </Text>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

Login.navigationOptions = () => ({
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
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
},
logo: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: -200
}
});

export default Login;
