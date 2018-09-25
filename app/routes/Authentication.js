import React, {Component} from 'react';
import store from 'react-native-simple-store'
import {
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
    AppRegistry,
    StyleSheet,
    Image,
    Dimensions,
    Button,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';

const { width, height } = Dimensions.get("window");

const background = require("../images/login/login1_bg.png");
const mark = require("../images/login/logo.jpg");
const lockIcon = require("../images/login/login1_lock.png");
const personIcon = require("../images/login/login1_person.png");

import {Actions} from 'react-native-router-flux';
import styles from './styles';




class Authentication extends Component {

    constructor(){
        super();
        this.state = {
            username: null,
            password: null
        }

    }

    async onValueChange(item, selectedValue) {
        try {
            await store.update(item, selectedValue)
            await store.update('username', this.state.username)
            //await AsyncStorage.setItem(item, selectedValue);
            //await AsyncStorage.setItem('username', this.state.username);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    userSignup() {
        Alert.alert('Hello!');

        if (this.state.username && this.state.password) {

            fetch("http://213.144.154.94:3001/users", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    this.onValueChange('id_token', responseData.id_token),
                        Alert.alert(
                            "Signup Success!",
                            "Click the button to get a Chuck Norris quote!"
                        ),
                        Actions.HomePage();
                })
                .done();
        }
    }

    userLogin() {
        if (this.state.username && this.state.password) {

            fetch("http://213.144.154.201/rest/jsonlogin2.php", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.username,
                    password: this.state.password,
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    if (responseData.success == 1) {
                        Keyboard.dismiss();
                        this.onValueChange('id_token', responseData.id_token.toString()),
                            
                            Actions.HomePage();
                    } else {
                        Alert.alert("Incorrect credentials");
                    }

                })
                .done();
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps='always' keyboardShouldPersistTaps='always'>
                <ImageBackground source={background}  style={styles.background} resizeMode="cover" >
                    <View style={styles.markWrap}>
                        <Image source={mark} style={styles.mark} resizeMode="contain" />
                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholderTextColor="#FFF"
                                style={styles.input}
                                editable={true}
                                onChangeText={(username) => this.setState({username})}
                                autoCapitalize = 'none'
                                placeholder='Username'
                                ref='username'
                                returnKeyType='next'
                                value={this.state.username}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholderTextColor="#FFF"
                                placeholder="Password"
                                style={styles.input}
                                editable={true}
                                onChangeText={(password) => this.setState({password})}
                                ref='password'
                                returnKeyType='next'
                                secureTextEntry={true}
                                value={this.state.password}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5}>
                            <View>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5}
                            onPress={this.userLogin.bind(this)}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}

export default Authentication;