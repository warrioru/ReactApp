import renderIf from '../renderif';
import React, {Component} from 'react';
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    StyleSheet,
    TextInput,
    ScrollView,
    Picker,
    Animated,
    Modal
} from 'react-native';


import {Actions} from 'react-native-router-flux';
import ModalSelector from 'react-native-modal-selector';

import styles from './styles';
import EntregasCard from "../components/EntregasCard";
import ModalInfo from "../components/ModalInfo";

class Bitacora extends Component {

    constructor(props){
        super(props);

        this.state = {
            entregas: [],
            entregaSelected: 0,
            ViewArray: [],
            Disable_Button: false,
            modalVisible: false,
            loadedToday: false,
            loadedNormal: false,
            loadedCompletos: false
        }

        this.animatedValue = new Animated.Value(0);
        this.Array_Value_Index = 0;

        //get logistica
        this.getLogisticaRest();

    }

    getLogisticaRest() {
        fetch("http://213.144.154.201/rest/jsonLogistica.php", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                responseData.map((entregaData) => {
                    this.state.entregas.push(entregaData);

                    //create the view with pedido
                    this.Add_New_View_Function(entregaData);
                });

            })
            .done();
    }

    Add_New_View_Function = (items) =>
    {
        this.animatedValue.setValue(0);

        let New_Added_View_Value = { Array_Value_Index: this.Array_Value_Index }

        const params = [this.Array_Value_Index, items]

        this.setState({ ViewArray: [ ...this.state.ViewArray, params ] }, () =>
        {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start(() =>
            {
                this.Array_Value_Index = this.Array_Value_Index + 1;

                this.setState({ Disable_Button: false });
            });
        });
    }

    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    }

    handlePickerChange = (formaPago, itemValue) => {
        this.setState({formaPago: itemValue});
        if (formaPago == "plazo") {
            this.setState({showTheThing: true})
        }
    }

    setModalVisible = (visible, index) => {
        this.setState({modalVisible: visible})
        this.setState({entregaSelected: this.state.entregas[index]})
    }


    render() {
        let index = 0;
        const data0 = [
            { key: index++, section: true, label: 'Estado Actual: En Espera' },
            { key: '1', label: 'En Ruta' },
            { key: '2', label: 'Entregado' }
        ];
        const data1 = [
            { key: index++, section: true, label: 'Estado Actual: En Ruta' },
            { key: '0', label: 'En Espera' },
            { key: '2', label: 'Entregado' }
        ];
        const data2 = [
            { key: index++, section: true, label: 'Estado Actual: Entregado' },
            { key: '0', label: 'En Espera' },
            { key: '1', label: 'En Ruta' }
        ];

        const AnimationValue = this.animatedValue.interpolate(
            {
                inputRange: [ 0, 1 ],

                outputRange: [ -59, 0 ]
            });

        let Render_Animated_View_Today = this.state.ViewArray.map(( array, index ) =>
        {
            var item = array[0]
            var entrega = array[1]
            var today = new Date()
            today.setHours(0,0,0,0)
            var fechaEntrega = new Date(entrega.fechaEntrega)
            fechaEntrega.setHours(0,0,0,0)

            if (entrega.estado != 2) {
                if (fechaEntrega.getTime() == today.getTime()) {
                    this.state.loadedToday = true
                    var background = '#FF0000';
                    var dataUsar = data0;
                    var estadoActual = 'En Espera';

                    if (entrega.estado == 1) {
                        background = '#F1C038';
                        dataUsar = data1;
                        estadoActual = 'En Ruta';
                    } else if (entrega.estado == 2) {
                        background = '#14CC30';
                        dataUsar = data2;
                        estadoActual = 'Entregado';
                    }

                    return(

                        <Animated.View
                            key = { item }
                            style = {[ styles.Animated_View_Style, {backgroundColor: background}, { opacity: this.animatedValue, transform: [{ translateY: AnimationValue }] }]}>


                            <TouchableOpacity
                                activeOpacity = { 0.7 }
                                style = { styles.TouchableOpacityStyle }
                                disabled = { this.state.Disable_Button } >

                                <Image
                                    source={{uri : entrega.urlFoto}}
                                    style = { styles.FloatingButtonStyle }
                                />

                            </TouchableOpacity>

                            <View style={styles.extraContainer}>
                                <EntregasCard
                                    entrega={ entrega }
                                    index={index}
                                    estado={estadoActual}
                                    callback={this.setModalVisible}
                                />
                            </View>


                        </Animated.View>

                    );
                }
            }

        });

        let Render_Animated_View = this.state.ViewArray.map(( array, index ) =>
        {
            var item = array[0]
            var entrega = array[1]
            var today = new Date()
            today.setHours(0,0,0,0)
            var fechaEntrega = new Date(entrega.fechaEntrega)
            fechaEntrega.setHours(0,0,0,0)

            if (entrega.estado != 2 && fechaEntrega.getTime() != today.getTime()) {
                this.state.loadedNormal = true
                var background = '#FF0000';
                var dataUsar = data0;
                var estadoActual = 'En Espera';

                if (entrega.estado == 1) {
                    background = '#F1C038';
                    dataUsar = data1;
                    estadoActual = 'En Ruta';
                } else if (entrega.estado == 2) {
                    background = '#14CC30';
                    dataUsar = data2;
                    estadoActual = 'Entregado';
                }

                return(

                    <Animated.View
                        key = { item }
                        style = {[ styles.Animated_View_Style, {backgroundColor: background}, { opacity: this.animatedValue, transform: [{ translateY: AnimationValue }] }]}>


                        <TouchableOpacity
                            activeOpacity = { 0.7 }
                            style = { styles.TouchableOpacityStyle }
                            disabled = { this.state.Disable_Button } >

                            <Image
                                source={{uri : entrega.urlFoto}}
                                style = { styles.FloatingButtonStyle }
                            />

                        </TouchableOpacity>

                        <View style={styles.extraContainer}>
                            <EntregasCard
                                entrega={ entrega }
                                index={index}
                                estado={estadoActual}
                                callback={this.setModalVisible}
                            />
                        </View>


                    </Animated.View>

                );
            }

        });

        let Render_Animated_View_Completed = this.state.ViewArray.map(( array, index ) =>
        {
            var item = array[0]
            var entrega = array[1]
            if (entrega.estado == 2) {
                this.state.loadedCompletos = true
                var background = '#14CC30';
                var dataUsar = data2;
                var estadoActual = 'Entregado';

                return(

                    <Animated.View
                        key = { item }
                        style = {[ styles.Animated_View_Style, {backgroundColor: background}, { opacity: this.animatedValue, transform: [{ translateY: AnimationValue }] }]}>


                        <TouchableOpacity
                            activeOpacity = { 0.7 }
                            style = { styles.TouchableOpacityStyle }
                            disabled = { this.state.Disable_Button } >

                            <Image
                                source={{uri : entrega.urlFoto}}
                                style = { styles.FloatingButtonStyle }
                            />

                        </TouchableOpacity>

                        <View style={styles.extraContainer}>
                            <EntregasCard
                                entrega={ entrega }
                                index={index}
                                estado={estadoActual}
                                callback={this.setModalVisible}
                            />
                        </View>


                    </Animated.View>

                );
            }

        });

        return (
            <View style = { styles.MainContainer }>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <ModalInfo
                        entrega={this.state.entregaSelected}
                        callback={this.setModalVisible}
                    />
                </Modal>

                <ScrollView>
                    <View style = {{ flex: 1, padding: 2 }}>
                        { renderIf(this.state.loadedToday)(
                            <Text style={styles.textoCompleto}>Entregas para hoy: </Text>
                        )}
                        {
                            Render_Animated_View_Today
                        }
                    </View>

                    <View style = {{ flex: 1, padding: 2 }}>
                        { renderIf(this.state.loadedNormal)(
                            <Text style={styles.textoCompleto}>Entregas siguientes dias: </Text>
                        )}
                        {
                            Render_Animated_View
                        }
                    </View>

                    <View style = {{ flex: 1, padding: 2 }}>
                        { renderIf(this.state.loadedCompletos)(
                            <Text style={styles.textoCompleto}>Entregas ya completas: </Text>
                        )}
                        {
                            Render_Animated_View_Completed
                        }
                    </View>

                </ScrollView>
            </View>
        );
    }
}

export default Bitacora;