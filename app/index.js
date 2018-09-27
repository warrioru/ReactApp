import React, {Component} from 'react';
import store from 'react-native-simple-store'
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

import Authentication from './routes/Authentication';
import HomePage from './routes/HomePage';
import Pedidos from './routes/Pedidos';
import Entregas from './routes/Entregas';
import Bitacora from './routes/Bitacora'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillUpdate is deprecated'
]);

class App extends Component {

    constructor(){
        super();
        this.state = {
            hasToken: false,
            isLoaded: false
        }
        console.ignoredYellowBox = ['Remote debugger'];

    }

    componentDidMount() {
        store.get('id_token').then((token) => {
            if (token !== null){
                this.setState({
                    hasToken: true,
                    isLoaded: true
                });
            } else{
                this.setState({
                    hasToken: false,
                    isLoaded: true
                });
            }
        })
    }

    render() {
        if (!this.state.isLoaded){
            return (
                <ActivityIndicator />
            )
        } else {
            return(
                <Router titleStyle={ styles.title }>
                    <Scene key="root">
                        <Scene
                            component={Authentication}
                            hideNavBar={true}
                            initial={!this.state.hasToken}
                            key="Authentication"
                            title="Authentication"
                        />
                        <Scene
                            component={HomePage}
                            hideNavBar={true}

                            key="HomePage"
                            title="Home Page"
                        />
                        <Scene
                            component={Pedidos}
                            hideNavBar={false}
                            initial={this.state.hasToken}
                            key="Pedidos"
                            title="Pedidos"
                        />
                        <Scene
                            component={Entregas}
                            hideNavBar={false}
                            key="Entregas"
                            title="Entregas"
                            titleStyle={styles.title}
                        />
                        <Scene
                            component={Bitacora}
                            hideNavBar={false}
                            key="Bitacora"
                            title="Bitacora"
                            titleStyle={styles.title}
                        />
                    </Scene>
                </Router>
            )
        }
    }
}

const styles = StyleSheet.create({
    ViewText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'DINMed',
        flex: 1
    },
    alignRight: {
        textAlign: 'right',
        paddingRight: 4
    },
    title: {
        fontSize: 22,
        fontFamily: 'cinnamonCake'
    }

})

export default App;

AppRegistry.registerComponent('main', () => App);