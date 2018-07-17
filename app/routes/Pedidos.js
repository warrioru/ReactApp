import renderIf from '../renderif';
import React, {Component} from 'react';
import {
    AsyncStorage,
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
    Keyboard,
    ImageBackground,
    StyleSheet,
    TextInput,
    ScrollView,
    Picker,
    Switch
} from 'react-native';

const mark = require("../images/login/logo.jpg");
const lockIcon = require("../images/login/login1_lock.png");
const personIcon = require("../images/login/login1_person.png");


import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Prompt from 'react-native-prompt';


//import FontAwesome from '@expo/vector-icons/FontAwesome';
//import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './styles';

class Pedidos extends Component {

    constructor(){
        super();
        this.state = {
            nombreCliente: null,
            rucCliente: null,
            emailCliente: null,
            tipoCliente: null,
            consignacion: false,
            dirCliente: null,
            referencia: null,
            selectedItems: [],
            readyItems: [],
            fechaEntrega: null,
            fechaFacturacion: null,
            formaPago: 'contado',
            plazoDias: null,
            showTheThing: false,
            nombreVendedor: null,
            isReady: false,
            promptVisible: false,
            idVino: null,
            cantidadTemp: null,
            duplicateIds: []
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
                <FontAwesome name="check" size={30} color='black' />
            </TouchableOpacity>
        );
    };

    handleIconTouch = () => {
        console.log('Touched!');

        /*if (this.state.nombreCliente != null && this.state.rucCliente != null &&
            this.state.emailCliente != null && this.state.dirCliente != null &&
            this.state.fechaEntrega != null && this.state.formaPago != null &&
            this.state.nombreVendedor != null && this.state.selectedItems.length != 0
        ) {*/

            fetch("http://213.144.154.249/rest/jsonPedido.php", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreCliente: this.state.nombreCliente,
                    rucCliente: this.state.rucCliente,
                    emailCliente: this.state.emailCliente,
                    dirCliente: this.state.dirCliente,
                    referencia: this.state.referencia,
                    tipoCliente: this.state.tipoCliente,
                    consignacion: this.state.consignacion,
                    selectedItems: this.state.readyItems,
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
                        "Email enviado!" + JSON.stringify(responseData)
                        ),
                        Keyboard.dismiss()
                        //Actions.HomePage();
                })
                .done();

        /*} else {
            Alert.alert("Faltan campos por llenar.");
        }*/
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

    //to get the diff between two arrays
    arr_diff (a1, a2) {

        var a = [], diff = [];

        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    }

    //to delete a value with a property inside an array
    findAndRemove(array, property, value) {
        array.forEach(function(result, index) {
            if(result[property] === value) {
                //Remove from array
                array.splice(index, 1);
            }
        });
    }



    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems })
        this.setState({ idVino: selectedItems[selectedItems.length - 1] })

        if (selectedItems.length < this.state.readyItems.length) {
            var idBorrada = this.arr_diff(selectedItems, this.state.duplicateIds)

            this.state.readyItems.map((item, index) => {
                if(item.id.toString() === idBorrada.toString()) {
                    this.state.readyItems.splice(index, 1)
                }
            })
            this.state.duplicateIds = selectedItems
            alert(JSON.stringify(this.state.readyItems))
        } else {
            this.setState({ promptVisible: true })
        }
    }

    handlePromptInput = (value) => {
        this.state.readyItems.push({id: this.state.idVino, amount: value})
        this.state.duplicateIds.push(this.state.idVino)

        this.setState({ promptVisible: false })
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
                id: "0",
                children: [{
                    name: "Apple - $19.99",
                    id: "10",
                },{
                    name: "Strawberry  - $19.99",
                    id: "17",
                },{
                    name: "Pineapple  - $19.99",
                    id: "13",
                },{
                    name: "Banana  - $19.99",
                    id: "14",
                },{
                    name: "Watermelon  - $19.99",
                    id: "15",
                },{
                    name: "Kiwi fruit  - $19.99",
                    id: "16",
                }]
            },
            {
                name: "Gems",
                id: "1",
                children: [{
                    name: "Quartz  - $19.99",
                    id: "20",
                },{
                    name: "Zircon  - $19.99",
                    id: "21",
                },{
                    name: "Sapphire  - $19.99",
                    id: "22",
                },{
                    name: "Topaz  - $19.99",
                    id: "23",
                }]
            },
            {
                name: "Plants",
                id: "2",
                children: [{
                    name: "Mother In Law\'s Tongue",
                    id: "30",
                },{
                    name: "Yucca  - $19.99",
                    id: "31",
                },{
                    name: "Monsteria  - $19.99",
                    id: "32",
                },{
                    name: "Palm  - $19.99",
                    id: "33",
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
                            <FontAwesome name="user" size={30} color="#900" />
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
                            <FontAwesome name="user" size={30} color="#900" />
                        </View>
                        <TextInput
                            placeholderTextColor="#989898"
                            style={styles.input}
                            editable={true}
                            onChangeText={(rucCliente) => this.setState({rucCliente})}
                            placeholder='CI / RUC Cliente'
                            ref='rucCliente'
                            returnKeyType='next'
                            keyboardType = 'numeric'
                            value={this.state.rucCliente}
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <FontAwesome name="user" size={30} color="#900" />
                        </View>
                        <TextInput
                            placeholderTextColor="#989898"
                            style={styles.input}
                            editable={true}
                            onChangeText={(emailCliente) => this.setState({emailCliente})}
                            placeholder='Email Cliente'
                            ref='emailCliente'
                            returnKeyType='next'
                            value={this.state.emailCliente}
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <FontAwesome name="address-card" size={20} color="#900" />
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
                            <FontAwesome name="map-marker" size={30} color="#900" />
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

                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <FontAwesome name="shopping-cart" size={25} color="#900" />
                        </View>
                        <Picker
                            selectedValue={this.state.tipoCliente}
                            style={{ width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({tipoCliente: itemValue});
                            }}>
                            <Picker.Item label="HORECA" value="horeca" />
                            <Picker.Item label="Relacionadas" value="relacionadas" />
                            <Picker.Item label="Institucionales" value="institucionales" />
                        </Picker>
                    </View>

                    <View style = {styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <FontAwesome name="shopping-cart" size={25} color="#900"
                                         style={{marginBottom:15}}
                            />
                        </View>
                        <Text style={{fontSize: 18}}> En consignacion? </Text>
                        <Switch
                            onValueChange = {(itemValue) => {
                                this.setState({consignacion: itemValue});
                            }}
                            value = {this.state.consignacion}
                            style={{marginBottom:15}}
                        />
                    </View>


                    <View style={styles.inputWrap3}>
                        <View style={styles.iconWrap}>
                            <Ionicons name='ios-wine' size={35} color='#900' />
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

                    { renderIf(!this.state.consignacion)(
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
                    )}

                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <FontAwesome name="shopping-cart" size={25} color="#900" />
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
                                <FontAwesome name="sun-o" size={25} color="#900" />
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
                <Prompt
                    title="Cantidad"
                    placeholder="Cantidad"
                    visible={this.state.promptVisible}
                    onCancel={() => this.setState({ promptVisible: false })}
                    onSubmit={this.handlePromptInput}/>
            </View>
            </ScrollView>


        );
    }
}

export default Pedidos;