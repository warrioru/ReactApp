import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

export default class EntregasCard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    onClickEntrega = () => {
        this.props.callback(true, this.props.index)
    }

    render(){
        return (
            <TouchableOpacity activeOpacity={.5}
                              onPress={this.onClickEntrega}
                              style={styles.TouchContainer}
            >
                <View style={styles.EntregasCard}>
                    <Text style={styles.ViewText}>{this.props.entrega.nombreCliente}</Text>
                    <Text style={styles.ViewText}>{'Factura: ' + this.props.entrega.numFactura}</Text>
                    <Text style={styles.ViewText}>{this.props.entrega.nombreVendedor}</Text>
                    <View style={styles.flexRow}>
                        <Text style={[styles.ViewText, styles.flex2 ]}>{this.props.entrega.fechaEntrega}</Text>
                        <Text style={[styles.ViewText, styles.alignCenter, styles.border]}>{this.props.estado}</Text>
                    </View>

                </View>
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
        width: '100%'
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