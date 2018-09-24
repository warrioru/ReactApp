import renderIf from '../renderif';
import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Actions} from "react-native-router-flux";

export default class ModalInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    onClickHide = () => {
        this.props.callback(false)
    }

    updateEstado = (id, key) => {

        fetch("http://213.144.154.201/rest/updateEstado.php", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                key: key
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.success == 1) {
                    //this.dismissModal();
                    //this.props.callback(false)
                    Actions.refresh({ key: Math.random()});
                } else {
                    Alert.alert("", "Problema Interno. Intentar mas tarde")
                }
            })
            .done();


    }

    render(){
        return (
            <View style={styles.ModalInfo}>
                <View style={styles.ModalHeader}>
                    <TouchableOpacity
                        onPress={this.onClickHide}
                    >
                        <FontAwesome name="close" size={38} color="#808080" />
                    </TouchableOpacity>
                </View>
                <View style={styles.ModalBody}>

                    <Text style={styles.TextTitle}>Entrega - {this.props.entrega.nombreCliente}</Text>
                    <ScrollView>
                        <Text style={styles.TextItem}><Text style={styles.BoldText}>Numero de Factura: </Text>{this.props.entrega.numFactura}</Text>
                        <Text style={styles.TextItem}><Text style={styles.BoldText}>Fecha de entrega: </Text>{this.props.entrega.fechaEntrega}</Text>
                        <Text style={styles.TextItem}><Text style={styles.BoldText}>Direccion: </Text>{this.props.entrega.direccion}</Text>
                        <Text style={styles.TextItem}><Text style={styles.BoldText}>Estado Actual: </Text>{this.props.entrega.estado}</Text>
                        <Text style={styles.TextItem}><Text style={styles.BoldText}>Nombre Vendedor: </Text>{this.props.entrega.nombreVendedor}</Text>
                        <Text style={styles.TextItem}><Text style={styles.BoldText}>Observaciones: </Text>{this.props.entrega.observaciones}</Text>
                    </ScrollView>

                </View>

                <View style={{flex: 1, width: '100%', position: 'absolute', bottom: 15, right: 0}}>
                    <View style={styles.ModalFooter}
                    >
                        { renderIf(this.props.entrega.estado == 1 || this.props.entrega.estado == 2)(
                            <TouchableOpacity
                                onPress={() => {this.updateEstado(this.props.entrega.id, 0)}}
                                style={[styles.FooterButton, styles.FooterButton1]}
                            >
                                <FontAwesome name="pause" size={22} color="#fff" />
                                <Text style={styles.FooterButtonText}>En espera</Text>
                            </TouchableOpacity>
                        )}
                        { renderIf(this.props.entrega.estado == 0 || this.props.entrega.estado == 2)(
                            <TouchableOpacity
                                onPress={() => {this.updateEstado(this.props.entrega.id, 1)}}
                                style={[styles.FooterButton, styles.FooterButton2]}
                            >
                                <FontAwesome name="arrow-right" size={22} color="#fff" />
                                <Text style={styles.FooterButtonText}>En ruta</Text>
                            </TouchableOpacity>
                        )}
                        { renderIf(this.props.entrega.estado == 0 || this.props.entrega.estado == 1)(
                            <TouchableOpacity
                                onPress={() => {this.updateEstado(this.props.entrega.id, 2)}}
                                style={[styles.FooterButton, styles.FooterButton3]}
                            >
                                <FontAwesome name="handshake-o" size={22} color="#fff" />
                                <Text style={styles.FooterButtonText}>Entregado</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

            </View>



        )
    }
}

const styles = StyleSheet.create({
    ModalInfo: {
        flex: 1,
        width: '100%',
        height: 300
    },
    ModalHeader: {
        alignItems: 'flex-end',
        paddingTop: 6,
        paddingRight: 11
    },
    ModalFooter: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    FooterButton: {
        flex: 1,
        height: 65,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15
    },
    FooterButton1: {
        backgroundColor: '#FF0000'
    },
    FooterButton2: {
        backgroundColor: '#F1C038'
    },
    FooterButton3: {
        backgroundColor: '#14CC30'
    },
    FooterButtonText: {
        textAlign: 'right',
        fontSize: 18,
        color: 'black'
    },
    ModalBody: {
        paddingLeft: 11,
        justifyContent: 'space-between',
        marginBottom: 180,
        flexGrow: 1
    },
    BoldText: {
        fontWeight: 'bold'
    },
    TextTitle: {
        textAlign: 'center',
        fontSize: 28,
        fontFamily: 'cinnamonCake',
        paddingBottom: 15
    },
    TextItem: {
        fontSize: 18,
        fontFamily: 'DINReg',
        lineHeight: 30,
        paddingBottom: 10,
        flex: 1
    }

})