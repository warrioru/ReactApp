import React, {Component} from 'react';
import {
    AsyncStorage,
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    StyleSheet
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

class HomePage extends Component {

    getProtectedQuote() {
        AsyncStorage.getItem('id_token').then((token) => {

            fetch("http://213.144.154.94:3001/api/protected/random-quote", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.text())
                .then((quote) => {
                    Alert.alert(
                        "Chuck Norris Quote:", quote)
                })
                .done();
            //"react-native": "0.55.4",
        })
    }

    async userLogout() {
        try {
            await AsyncStorage.removeItem('id_token');
            Alert.alert("Logout Success!");
            Actions.Authentication();
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    pedidos() {
        Actions.Pedidos();
    }

    logistica() {
        Actions.Logistica();
    }


    render() {
        const data = [1, 2, 3, 4, 5];
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../images/homePage/image1.png')}
                    style={styles.image}
                >
                    <Text style={styles.imageText} >
                        My Tasks
                    </Text>
                </ImageBackground>

                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.box, styles.boxL]}
                            onPress={this.logistica}
                        >
                            <Text style={styles.groupText} >
                                Logistica
                            </Text>
                            <View
                                style={[styles.littleBar,styles.cyan]}
                            />

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.box, styles.boxL]}
                        >
                            <Text style={styles.groupText} >
                                Reportes
                            </Text>
                            <View
                                style={[styles.littleBar,styles.red]}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.box, styles.boxL]}
                            onPress={this.pedidos}
                        >
                            <Text style={styles.groupText} >
                                Pedidos
                            </Text>
                            <View
                                style={[styles.littleBar,styles.yellow]}
                            />
                            <View
                                style={styles.topBar}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.box, styles.boxL]}
                            onPress={this.userLogout}
                        >
                            <Text style={styles.groupText} >
                                Cuentas
                            </Text>
                            <View
                                style={[styles.littleBar,styles.purple]}
                            />
                            <View
                                style={styles.topBar}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                {/*<TouchableOpacity
                    style={styles.button}
                    onPress={this.userLogout}
                >
                    <Text style={styles.buttonText} >
                        Log out
                    </Text>
                </TouchableOpacity>*/}
            </View>
        );
    }
}

export default HomePage;