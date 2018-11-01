import { Dimensions,StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    topHeader: {
        width: width,
        height: 70,
        backgroundColor:'#0784DC',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    backButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: 10
    },

    titleText: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: 22,
        backgroundColor: '#00000000',
        textAlign: 'center',
    },

    signupView: {
        marginHorizontal: 15,
        marginVertical: 5
    },

    passwordChangeView: {
        marginHorizontal: 15,
        marginVertical: 5,
    },

    name: {
        flex: 1,
        fontSize: 12,
        fontFamily: 'Montserrat',
        fontWeight: '400',
        marginVertical: 3
    },

    required: {
        fontSize: 12,
        color: 'grey'
    },

    textinput: {
        height: 49,
        borderColor: '#CECECE',
        borderWidth: 1,
        paddingLeft: 10,
    },

    textPasswordChange: {
        height: 49,
        borderColor: '#CECECE',
        borderWidth: 1,
        padding: 15,
        marginVertical:5,        
        width: '100%',
    },

    loginButton: {
        marginHorizontal: 15,
        marginVertical:10,
        alignItems:'center',
        justifyContent: 'center',
        height: 54,
        backgroundColor: '#4285F4',
        borderRadius: 6
    },

    authButtonText: {
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: 19,
        color: 'white'
    },

    bottomSignUP:{
        fontFamily: 'Montserrat',
        fontWeight: '400',
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

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

