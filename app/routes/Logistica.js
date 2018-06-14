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
import DatePicker from 'react-native-datepicker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/Ionicons';

import styles from './styles';

class Logistica extends Component {

    constructor(){
        super();

        this.state = {
            pedidos: [],
            ViewArray: [],
            Disable_Button: false
        }

        this.animatedValue = new Animated.Value(0);
        this.Array_Value_Index = 0;

        //get logistica
        this.getLogisticaRest();

    }

    getLogisticaRest() {
        fetch("http://213.144.154.94/rest/jsonLogistica.php", {
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

            if (pedido.estado == 1) {
                background = '#F1C038';
            } else if (pedido.estado == 2) {
                background = '#14CC30';
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
                            disabled = { this.state.Disable_Button }
                            onPress = { this.Add_New_View_Function }>

                            <Image
                                source={{uri : 'http://www.bajrangreadymade.com/img/user.png'}}
                                style = { styles.FloatingButtonStyle }
                            />

                        </TouchableOpacity>

                        {/*<Text style = { styles.View_Inside_Text } > This Is Row { item.Array_Value_Index } </Text>*/}
                        <TouchableOpacity>

                            <Text style={styles.View_Inside_Text} >
                                Cliente: {pedido.nombreCliente}
                            </Text>
                            <Text style={styles.View_Inside_Text} >
                                Numero Factura: {pedido.numFactura}
                            </Text>
                            <Text style={styles.View_Inside_Text} >
                                Encargado: {pedido.id_encargado_fk}
                            </Text>

                        </TouchableOpacity>


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
                            disabled = { this.state.Disable_Button }
                            onPress = { this.Add_New_View_Function }>

                            <Image
                                source={{uri : 'http://www.bajrangreadymade.com/img/user.png'}}
                                style = { styles.FloatingButtonStyle }
                            />

                        </TouchableOpacity>

                        {/*<Text style = { styles.View_Inside_Text } > This Is Row { item.Array_Value_Index } </Text>*/}
                        <TouchableOpacity>

                            <Text style={styles.View_Inside_Text} >
                                Cliente: {pedido.nombreCliente}
                            </Text>
                            <Text style={styles.View_Inside_Text} >
                                Numero Factura: {pedido.numFactura}
                            </Text>
                            <Text style={styles.View_Inside_Text} >
                                Encargado: {pedido.id_encargado_fk}
                            </Text>

                        </TouchableOpacity>

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

export default Logistica;