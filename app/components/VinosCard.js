import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import Prompt from 'react-native-input-prompt';

export default class VinosCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            promptVisible: false,

        }
    }

    onClickVino = () => {
        this.setState({promptVisible: true})
    }

    handlePromptInput = (cantidad) => {
        this.props.callback(this.props.index, cantidad)
        this.setState({promptVisible: false})
    }

    render(){
        return (
            <TouchableOpacity activeOpacity={.5}
                              onPress={this.onClickVino}
                              style={styles.TouchContainer}
            >
                <View style={styles.EntregasCard}>
                    <Text style={styles.ViewText}>{this.props.vino.nombre}</Text>
                    <Text style={styles.ViewText}>{'Precio: ' + this.props.vino.precio}</Text>
                    <Text style={styles.ViewText}>{this.props.vino.bodega}</Text>

                </View>

                <Prompt
                    title={this.props.vino.nombre}
                    placeholder="Cantidad"
                    visible={this.state.promptVisible}
                    onCancel={() => this.setState({ promptVisible: false })}
                    onSubmit={this.handlePromptInput}/>

            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    TouchContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: 8,
        paddingTop: 10,
        paddingBottom: 8
    },
    EntregasCard: {
        flex: 1,
        width: '100%',
        flexDirection: 'row'
    },
    ViewText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Arial',
        flex: 1
    },
    alignRight: {
        textAlign: 'right',
        paddingRight: 4
    },
    flexRow: {
        width: '100%',
        flexDirection: 'row'
    },
    flex2: {
        flex: 2
    },
    border: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 1,
        borderLeftColor: 'black',
        backgroundColor: 'white',
        color: 'black',
        marginRight: 4,
        marginLeft: 8,
        marginBottom: 4,
        fontSize: 16
    },
    alignCenter: {
        textAlign: 'center'
    }

})