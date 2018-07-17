import renderIf from '../renderif';
import React, {Component} from 'react';
import {
    AsyncStorage,
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
    Animated
} from 'react-native';


import {Actions} from 'react-native-router-flux';
import ModalSelector from 'react-native-modal-selector';

import styles from './styles';

class Entregas extends Component {

    constructor(props){
        super(props);

        this.state = {
            pedidos: [],
            ViewArray: [],
            Disable_Button: false,
        }

        this.animatedValue = new Animated.Value(0);
        this.Array_Value_Index = 0;

        //get logistica
        this.getLogisticaRest();

    }

    componentWillUnmount() {

    }

    getLogisticaRest() {
        fetch("http://213.144.154.249/rest/jsonLogistica.php", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                responseData.map((pedidoData) => {
                    this.state.pedidos.push(pedidoData);

                    //create the view with pedido
                    this.Add_New_View_Function(pedidoData);
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

    updateEstado(id, key) {

        fetch("http://213.144.154.249/rest/updateEstado.php", {
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
                    Actions.refresh({ key: Math.random()});
                } else {
                    Alert.alert("", "Problema Interno. Intentar mas tarde")
                }
            })
            .done();
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

        let Render_Animated_View = this.state.ViewArray.map(( array ) =>
        {
            var item = array[0]
            var pedido = array[1]
            var background = '#FF0000';
            var dataUsar = data0;
            var estadoActual = 'En Espera';

            if (pedido.estado == 1) {
                background = '#F1C038';
                dataUsar = data1;
                estadoActual = 'En Ruta';
            } else if (pedido.estado == 2) {
                background = '#14CC30';
                dataUsar = data2;
                estadoActual = 'Entregado';
            }

            if(( item ) == this.Array_Value_Index)
            {
                return(

                    <Animated.View
                        key = { item }
                        style = {[ styles.Animated_View_Style, {backgroundColor: background}, { opacity: this.animatedValue, transform: [{ translateY: AnimationValue }] }]}>

                        {/*<Text style = { styles.View_Inside_Text } > This Is Row { item.Array_Value_Index } </Text>*/}
                        <TouchableOpacity
                            activeOpacity = { 0.7 }
                            style = { styles.TouchableOpacityStyle }
                            disabled = { this.state.Disable_Button } >

                            <Image
                                source={{uri : 'http://www.bajrangreadymade.com/img/user.png'}}
                                style = { styles.FloatingButtonStyle }
                            />

                        </TouchableOpacity>

                        {/*<Text style = { styles.View_Inside_Text } > This Is Row { item.Array_Value_Index } </Text>*/}
                        <View style={styles.extraContainer}>
                        <ModalSelector
                            data={dataUsar}
                            touchableStyle={styles.TouchableContainer}
                            initValue="Select something yummy!"
                            cancelText='Cancelar'
                            >

                            <Text style={styles.View_Inside_Text} >
                                {pedido.nombreCliente}
                            </Text>
                            <Text style={styles.View_Inside_Text} >
                                Factura: {pedido.numFactura}
                            </Text>
                            <Text style={styles.View_Inside_Text} >
                                Vendedor: {pedido.nombreVendedor}
                            </Text>
                            <Text style={styles.View_Inside_Text_Left} >
                                {pedido.fechaEntrega}
                            </Text>
                            <Text style={styles.View_Inside_Text_Right} >
                                {estadoActual}
                            </Text>

                        </ModalSelector>
                        </View>

                        {/*<TouchableOpacity onPress = { this.updateEstado(pedido.id) }>*/}

                            {/*<Text style={styles.View_Inside_Text} >*/}
                                {/*Cliente: {pedido.nombreCliente}*/}
                            {/*</Text>*/}
                            {/*<Text style={styles.View_Inside_Text} >*/}
                                {/*Numero Factura: {pedido.numFactura}*/}
                            {/*</Text>*/}
                            {/*<Text style={styles.View_Inside_Text} >*/}
                                {/*Encargado: {pedido.id_encargado_fk}*/}
                            {/*</Text>*/}

                        {/*</TouchableOpacity>*/}


                    </Animated.View>

                );
            }
            else
            {
                return(

                    <View
                        key = { item }
                        style = {[ styles.Animated_View_Style, {backgroundColor: background} ]}>

                        <TouchableOpacity
                            activeOpacity = { 0.7 }
                            style = { styles.TouchableOpacityStyle }
                            disabled = { this.state.Disable_Button } >

                            <Image
                                source={{uri : 'http://www.bajrangreadymade.com/img/user.png'}}
                                style = { styles.FloatingButtonStyle }
                            />

                        </TouchableOpacity>

                        {/*<Text style = { styles.View_Inside_Text } > This Is Row { item.Array_Value_Index } </Text>*/}
                        <View style={styles.extraContainer}>
                        <ModalSelector
                            data={dataUsar}
                            touchableStyle={styles.TouchableContainer}
                            initValue="Select something yummy!"
                            cancelText='Cancelar'
                            onChange={(option)=>{ this.updateEstado(pedido.id, option.key) }}
                        >

                            <Text style={styles.View_Inside_Text} >
                                {pedido.nombreCliente}
                            </Text>
                            <Text style={styles.View_Inside_Text} >
                                Factura: {pedido.numFactura}
                            </Text>
                            <Text style={styles.View_Inside_Text} >
                                Vendedor: {pedido.nombreVendedor}
                            </Text>
                            <Text style={styles.View_Inside_Text_Left} >
                                {pedido.fechaEntrega}
                            </Text>
                            <Text style={styles.View_Inside_Text_Right} >
                                {estadoActual}
                            </Text>

                        </ModalSelector>
                        </View>

                        {/*<TouchableOpacity onPress = { this.updateEstado(pedido.id) }>*/}

                            {/*<Text style={styles.View_Inside_Text} >*/}
                                {/*Cliente: {pedido.nombreCliente}*/}
                            {/*</Text>*/}
                            {/*<Text style={styles.View_Inside_Text} >*/}
                                {/*Numero Factura: {pedido.numFactura}*/}
                            {/*</Text>*/}
                            {/*<Text style={styles.View_Inside_Text} >*/}
                                {/*Encargado: {pedido.id_encargado_fk}*/}
                            {/*</Text>*/}

                        {/*</TouchableOpacity>*/}

                    </View>

                );
            }
        });

        return (
            <View style = { styles.MainContainer }>

                <ScrollView>

                    <View style = {{ flex: 1, padding: 2 }}>
                        {
                            Render_Animated_View
                        }
                    </View>

                </ScrollView>

                {/*<TouchableOpacity*/}
                    {/*activeOpacity = { 0.7 }*/}
                    {/*style = { styles.TouchableOpacityStyle }*/}
                    {/*disabled = { this.state.Disable_Button }*/}
                    {/*onPress = { this.Add_New_View_Function }>*/}

                {/*</TouchableOpacity>*/}

            </View>
        );
    }
}

export default Entregas;