
import {Dimensions, StyleSheet, Platform} from 'react-native';

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
    /*buttonText: {
        fontSize: 20,
        padding: 10,
        textAlign: 'center'
    },
    buttonWrapper: {
        backgroundColor:'#D3D3D3',
        marginBottom: 10,
        width: 300
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    form: {
        width: 300
    },
    image: {
        margin: 10
    },
    inputText: {
        marginBottom: 10,
        padding: 10
    },
    title: {
        fontSize: 40,
        margin: 10,
        textAlign: 'center'
    },*/
    image: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
        margin: 0
    },
    imageText: {
        color: "#FFF",
        fontSize: 35,
        marginLeft: 20,
        position: "absolute",
        top: "50%",
    },
    container: {
        flex: 1,
    },
    markWrap: {
        flex: 1,
        paddingVertical: 30,
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    background: {
        width,
        height,
    },
    wrapper: {
        paddingVertical: 20,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    inputWrap2: {
        flexDirection: "row",
        marginVertical: 10,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    inputWrap3: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#FF3366",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    buttonLeft: {
        backgroundColor: "#FFF",
        borderRightWidth: 10,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonRight: {
        backgroundColor: "#FFF",
        borderLeftWidth: 10,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    box: {
        flex: 1,
        backgroundColor: '#333',
    },
    box2: {
        backgroundColor: 'green'
    },
    box3: {
        backgroundColor: 'orange'
    },
    boxL: {
        backgroundColor: 'white',
        borderRightColor: 'lightgrey',
        borderRightWidth: 1,
    },
    boxR: {
        backgroundColor: 'white',
        borderBottomWidth: 2,
    },
    two: {
        flex: 2
    },
    groupText: {
        color: "#000",
        fontSize: 25,
        position: "absolute",
        top: "20%",
        left: "25%",

    },
    littleBar: {
        borderBottomWidth: 5,
        width: "20%",
        position: "absolute",
        top: "50%",
        left: "40%",
    },
    cyan: {
        borderBottomColor: 'cyan',
    },
    red: {
        borderBottomColor: 'red',
    },
    yellow: {
        borderBottomColor: 'yellow',
    },
    purple: {
        borderBottomColor: 'purple',
    },
    bottomBar: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        width: "100%",
        position: "absolute",
        top: "93%",
    },
    topBar: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        width: "100%",
        position: "absolute",
        top: "0%",
    },
    backgroundColor: {
        backgroundColor: 'white'
    },
    padding: {
      padding: 10,
    },
    MainContainer:
        {
            flex: 1,
            backgroundColor: '#eee',
            justifyContent: 'center',
            paddingTop: (Platform.OS == 'ios') ? 20 : 0
        },

    Animated_View_Style:
        {
            height: 150,
            alignItems: 'flex-start',
            margin: 4
        },

    View_Inside_Text:
        {
            color: '#fff',
            fontSize: 18,
            margin: 5
        },
    View_Inside_Text_Left: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'left',

    },
    View_Inside_Text_Right: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'right',
        alignSelf: 'flex-end'

    },

    TouchableOpacityStyle:{

        position: 'absolute',
        width: 55,
        height: 55,
        right: 5,
        top: 5
    },

    FloatingButtonStyle: {

        resizeMode: 'contain',
        width: 55,
        height: 55,
    },
    TouchableContainer: {
        flexDirection: 'row',
    },
    extraContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-end'
    }
});