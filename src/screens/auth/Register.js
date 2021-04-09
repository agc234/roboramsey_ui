import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { ButtonGroup } from 'react-native-elements';
import firebase from 'firebase'

const onSignUp = (state) => {
  const { email, password, firstname, lastname, role } = state;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                email: email,
                firstname: firstname,
                lastname: lastname,
                role: role
            })
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    });
}

// Container
export default function RegisterContainer() {
  const [ email, setEmail ] = useState('')
  const [ firstname, setFirstname ] = useState('')
  const [ lastname, setLastname ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ role, setRole ] = useState('manager')

  const state = {
    role,
    firstname,
    lastname,
    password,
    email,
    setEmail,
    setFirstname,
    setLastname,
    setPassword,
    setRole
  }

  return(
    <Register state={state}/>
  )
}

// Presentation
const Register = ({ state }) => {
  const buttons = ['Manager', 'Waiter', 'Chef']
  const [ pressed, setPressed ] = useState(0)

  const updateRole = (selectedIndex) => {
    state.setRole(buttons[selectedIndex].toLowerCase())
    setPressed(selectedIndex)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TextInput
            style={styles.inputFields}
            onChangeText={(text) => state.setEmail(text)}
            placeholder={"email"}/>
        <TextInput
            style={styles.inputFields}
            onChangeText={(text) => state.setFirstname(text)}
            placeholder={"firstname"}/>
        <TextInput
            style={styles.inputFields}
            onChangeText={(text) => state.setLastname(text)}
            placeholder={"lastname"}/>
        <TextInput
            style={styles.inputFields}
            onChangeText={(text) => state.setPassword(text)}
            placeholder={"password"}
            secureTextEntry={true}/>
        <View style={styles.roleSelection}>
          <Text style={styles.textDes}>Select a Role</Text>
          <ButtonGroup onPress={(selectedIndex) => updateRole(selectedIndex)} selectedIndex={pressed} style={styles.buttonGroup} buttons={buttons}/>
        </View>
        <Button
          title={"Sign Up"}
          onPress={() => onSignUp(state)}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white'
  },
  inputFields: {
    padding:3
  },
  topView: {
    width: '100%',
    justifyContent: "space-evenly",
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    paddingTop: Constants.statusBarHeight,
    padding: 10
  },
  buttonGroup: {
    flex: 1,
    width: '100%',
    padding: 10,
    justifyContent:'space-evenly',
    flexDirection: 'row'
  },
  roleSelection: {
    width: '100%',
    alignSelf: "center",

  },
  textDes: {
    fontSize: 16,
    fontWeight: "bold"
  }
});