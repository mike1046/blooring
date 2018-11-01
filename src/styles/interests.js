import { Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    topHeader: {
        width: width,
        height: 70,
        backgroundColor:'rgb(0, 137, 215)',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    backButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: 10
    },
    doneButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: 20
    },
    titleText: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: 25,
        backgroundColor: '#00000000',
        textAlign: 'center',
    },
    doneText: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontWeight: '300',
        fontSize: 15,
        backgroundColor: '#00000000',
        textAlign: 'center',
    },
    searchInput: {
        width: width-20,
        height: 30,
        borderRadius: 5,
        margin: 10,
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        textAlign: 'center'
    },

    gridView: {
        height: width/2-23,
        width: width/2,
        alignItems:'center',
        backgroundColor: 'white',
    },
    gridContain: {
        width: width
    },
    required: {
        fontSize: 12,
        color: 'grey'
    },

    textinput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        width: width - 20,
        padding: 10,
        marginTop:3,
    },

    loginButton: {
        marginLeft: 10,
        alignItems:'center',
        justifyContent: 'center',
        width: width-20,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#80808090'
    },

    authButtonText: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white'
    },

    bottomSignUP:{
        fontSize: 20,
        color: 'grey',
    },
    line: {
        marginBottom: 5,
        marginLeft: 10,
        width: width-20,
        height: 1,
        backgroundColor: 'grey'
    },
})

