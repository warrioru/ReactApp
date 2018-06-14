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
    Picker
} from 'react-native';

const mark = require("../images/login/logo.jpg");
const lockIcon = require("../images/login/login1_lock.png");
const personIcon = require("../images/login/login1_person.png");


import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/Ionicons';

import styles from './styles';

class Pedidos extends Component {

    constructor(){
        super();
        this.state = {
            nombreCliente: null,
            dirCliente: null,
            referencia: null,
            selectedItems: [],
            fechaEntrega: null,
            fechaFacturacion: null,
            formaPago: 'contado',
            plazoDias: null,
            showTheThing: false,
            nombreVendedor: null,
        }
    }

    componentWillMount() {
        Actions.refresh({ right: this._renderRightButton });

        AsyncStorage.getItem('username').then((token) => {
            this.setState({nombreVendedor: token});
        });
    }

    _renderRightButton = () => {
        return(
            <TouchableOpacity style={{padding: 5}} onPress={() => this.handleIconTouch() } >
                <Icon name="check" size={30} color='black' />
            </TouchableOpacity>
        );
    };

    handleIconTouch = () => {
        console.log('Touched!');

        if (this.state.nombreCliente != null && this.state.dirCliente != null &&
            this.state.referencia != null && this.state.fechaEntrega != null &&
            this.state.fechaFacturacion != null && this.state.formaPago != null &&
            this.state.nombreVendedor != null && this.state.selectedItems.length != 0
        ) {

            fetch("http://213.144.154.94/rest/jsonPedidos.php", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreCliente: this.state.nombreCliente,
                    dirCliente: this.state.dirCliente,
                    referencia: this.state.referencia,
                    selectedItems: this.state.selectedItems,
                    fechaEntrega: this.state.fechaEntrega,
                    fechaFacturacion: this.state.fechaFacturacion,
                    formaPago: this.state.formaPago,
                    plazoDias: this.state.plazoDias,
                    nombreVendedor: this.state.nombreVendedor
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    Alert.alert(
                        "Email enviado!"
                        ),
                        Actions.HomePage();
                })
                .done();

        } else {
            Alert.alert("Faltan campos por llenar.");
        }
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
        const { selectedItems } = this.state;

        const items = [
            {
                name: "Fruits",
                id: 0,
                children: [{
                    name: "Apple",
                    id: 10,
                },{
                    name: "Strawberry",
                    id: 17,
                },{
                    name: "Pineapple",
                    id: 13,
                },{
                    name: "Banana",
                    id: 14,
                },{
                    name: "Watermelon",
                    id: 15,
                },{
                    name: "Kiwi fruit",
                    id: 16,
                }]
            },
            {
                name: "Gems",
                id: 1,
                children: [{
                    name: "Quartz",
                    id: 20,
                },{
                    name: "Zircon",
                    id: 21,
                },{
                    name: "Sapphire",
                    id: 22,
                },{
                    name: "Topaz",
                    id: 23,
                }]
            },
            {
                name: "Plants",
                id: 2,
                children: [{
                    name: "Mother In Law\'s Tongue",
                    id: 30,
                },{
                    name: "Yucca",
                    id: 31,
                },{
                    name: "Monsteria",
                    id: 32,
                },{
                    name: "Palm",
                    id: 33,
                }]
            },
        ];

        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
            <View style={styles.container}>
                <View style={styles.backgroundColor}>

                <View style={styles.wrapper}>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Icon name="user" size={30} color="#900" />
                        </View>
                        <TextInput
                            placeholderTextColor="#989898"
                            style={styles.input}
                            editable={true}
                            onChangeText={(nombreCliente) => this.setState({nombreCliente})}
                            placeholder='Nombre Cliente'
                            ref='nombreCliente'
                            returnKeyType='next'
                            value={this.state.nombreCliente}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Icon name="address-card" size={20} color="#900" />
                        </View>
                        <TextInput
                            placeholderTextColor="#989898"
                            placeholder="Direccion Cliente"
                            style={styles.input}
                            editable={true}
                            onChangeText={(dirCliente) => this.setState({dirCliente})}
                            ref='dirCliente'
                            returnKeyType='next'
                            value={this.state.dirCliente}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Icon name="map-marker" size={30} color="#900" />
                        </View>
                        <TextInput
                            placeholderTextColor="#989898"
                            placeholder="Referencia"
                            style={styles.input}
                            editable={true}
                            onChangeText={(referencia) => this.setState({referencia})}
                            ref='referencia'
                            returnKeyType='next'
                            value={this.state.referencia}
                        />
                    </View>

                    <View style={styles.inputWrap3}>
                        <View style={styles.iconWrap}>
                            <Iconi name='ios-wine' size={35} color='#900' />
                        </View>
                        <View style={styles.container}>
                            <SectionedMultiSelect
                                styles={{width: '100%'}}
                                items={items}
                                uniqueKey='id'
                                subKey='children'
                                selectText='Items'
                                showDropDowns={true}
                                readOnlyHeadings={true}
                                onSelectedItemsChange={this.onSelectedItemsChange}
                                selectedItems={this.state.selectedItems}
                            />
                        </View>
                    </View>

                    <View style={styles.inputWrap2}>
                    <DatePicker
                        style={{width: "95%"}}
                        date={this.state.fechaEntrega}
                        mode="datetime"
                        placeholder="Fecha de Entrega"
                        format="DD-MM-YYYY HH:mm"
                        minDate={new Date()}
                        confirmBtnText="Ok"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(fechaEntrega) => {this.setState({fechaEntrega: fechaEntrega})}}
                    />
                    </View>

                    <View style={styles.inputWrap2}>
                    <DatePicker
                        style={{width: "95%"}}
                        date={this.state.fechaFacturacion}
                        mode="date"
                        placeholder="Fecha de Facturacion"
                        format="DD-MM-YYYY"
                        minDate={new Date()}
                        confirmBtnText="Ok"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(fechaFacturacion) => {this.setState({fechaFacturacion: fechaFacturacion})}}
                    />
                    </View>

                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Icon name="shopping-cart" size={25} color="#900" />
                        </View>
                        <Picker
                            selectedValue={this.state.formaPago}
                            style={{ width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({formaPago: itemValue});
                                if (itemValue == "plazo") {
                                    Alert.alert("Elegir los dias plazo abajo")
                                    this.setState({showTheThing: true})
                                } else {
                                    this.setState({showTheThing: false})
                                    this.setState({plazoDias: null})
                                }
                            }}>
                            <Picker.Item label="Contado" value="contado" />
                            <Picker.Item label="Dias Plazo" value="plazo" />
                        </Picker>
                    </View>

                    { renderIf(this.state.showTheThing)(
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Icon name="sun-o" size={25} color="#900" />
                            </View>
                            <Picker
                                selectedValue={this.state.plazoDias}
                                style={{ width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => this.setState({plazoDias: itemValue})}>
                                <Picker.Item label="15 dias" value="15" />
                                <Picker.Item label="30 dias" value="30" />
                                <Picker.Item label="45 dias" value="45" />
                                <Picker.Item label="60 dias" value="60" />
                            </Picker>
                        </View>
                    )}

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
            </ScrollView>
        );
    }
}

export default Pedidos;