import renderIf from '../renderif';
import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView, Animated,
    Image
} from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Actions} from "react-native-router-flux";
import VinosCard from '../components/VinosCard'

export default class ModalVinos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ViewArray: [],
            Disable_Button: false,
            vinos: [],
            isMounted: false
        }

        this.animatedValue = new Animated.Value(0);
        this.Array_Value_Index = 0;

        if(this.props.vinos.length == 0) {
            this.getVinosRest()
        } else {
            //t/his.getVinosNotRest()
        }

    }

    async componentDidMount() {
        this.setState({ isMounted: true}, () => {
            if (this.state.isMounted) {
                this.setState({ isMounted: false })
                if (this.props.vinos.length > 0) {
                    this.getVinosNotRest()
                }
            }
        })

    }

    getVinosRest() {
        fetch("http://localhost:8888/rest/jsonVinos.php", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                responseData.map((entregaData) => {
                    this.state.vinos.push(entregaData);

                    //create the view with pedido
                    this.Add_New_View_Function(entregaData);
                });

            })
            .done();
    }

    async getVinosNotRest() {
        this.props.vinos.map((vino) => {
            this.state.vinos.push(vino)

            this.Add_New_View_Function(vino)
        })
    }

    onClickHide = () => {
        this.props.callback(false)
        this.props.callback2(this.state.vinos)
    }

    Add_New_View_Function = (items) => {
        this.animatedValue.setValue(0);

        let New_Added_View_Value = {Array_Value_Index: this.Array_Value_Index}

        let params = [this.Array_Value_Index, items]

        this.setState({ViewArray: [...this.state.ViewArray, params]}, () => {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start(() => {


                this.setState({Disable_Button: false});
            });
        });
        this.Array_Value_Index = this.Array_Value_Index + 1;
        if (this.props.vinos.length > 0) {
            this.state.ViewArray.push(params)
        }

    }

    updateQuantity = (index, cantidad) => {
        this.state.vinos[index].cantidad = cantidad
        this.forceUpdate()
        //this.getVinosNotRest()
    }

    render() {

        const AnimationValue = this.animatedValue.interpolate(
            {
                inputRange: [ 0, 1 ],

                outputRange: [ -59, 0 ]
            });

        let Render_Animated_View = this.state.ViewArray.map(( array, index ) =>
        {
            var item = array[0]
            var vino = array[1]


            if (vino != null) {
                var background = '#FF0000';
                if (vino.cantidad != undefined) {
                    background = '#14CC30'
                }
                var estadoActual = 'En Espera';

                return(

                    <Animated.View
                        key = { item }
                        style = {[ styles.Animated_View_Style, {backgroundColor: background}, { opacity: this.animatedValue, transform: [{ translateY: AnimationValue }] }]}>

                        <View style={styles.extraContainer}>
                            <VinosCard
                                vino={ vino }
                                index={index}
                                callback={this.updateQuantity}
                            />
                        </View>


                    </Animated.View>


                );
            }

        });


        return (
            <View style={styles.ModalInfo}>
                <View style={styles.ModalHeader}>
                    <TouchableOpacity
                        onPress={this.onClickHide}
                    >
                        <FontAwesome name="close" size={38} color="#808080"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.ModalBody}>

                    <Text style={styles.TextTitle}>Lista de Vinos </Text>
                    <ScrollView>
                        <View style = {{ flex: 1, padding: 2 }}>
                            { renderIf(this.state.loadedToday)(
                                <Text style={styles.textoCompleto}>Entregas para hoy: </Text>
                            )}
                            {
                                Render_Animated_View
                            }
                        </View>
                    </ScrollView>

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
        paddingTop: 8,
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
        fontFamily: 'Arial',
        lineHeight: 30,
        paddingBottom: 10,
        flex: 1
    },
    Animated_View_Style:
        {
            height: 50,
            alignItems: 'flex-start',
            margin: 4,
            borderRadius: 10
        }

})