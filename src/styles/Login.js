import { Dimensions,StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor: 'white',
        padding: 10
    },

    topHeader: {
        marginTop: 5,
        alignItems: 'center',
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },

    topTitle: {
        width: 132,
        height: 36,
        marginTop: 15,
    },

    backButton: {
        height: 30,
    },

    backbuttonView: {
        position: 'absolute',
        top: 0,
        left:0,
        height: 70,
        width: 80,
        justifyContent: 'center'
    },

    facebookImageicon: {
        height: 50,
    },

    socialLogin: {
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10
    },

    facebookView: {
        flexDirection: 'row',
        height: 55,
        width: width-20,
        borderWidth: 1,
        borderColor: 'rgb(36, 73, 200)',
        marginTop:10,
        borderRadius: 6
    },

    facebookIcon: {
        width: 55,
        height: 53,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(36, 73, 136)',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
    },

    facebookContent:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(51, 92, 149)'
    },

    socialText: {
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: 17,
        color: 'white'
    },

    googleView: {
        flexDirection: 'row',
        height: 55,
        width: width-20,
        borderWidth: 1,
        marginTop: 15,
        borderColor: 'rgb(11, 108, 200)',
        marginBottom: 10,
    },

    googleIcon: {
        width: 55,
        height: 53,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(11, 108, 198)'
    },

    googleContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(42, 139, 239)',
    },

    lineView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#C2C2C2'
    },
    lineBottom: {
        height: 1,
        backgroundColor: '#C2C2C2',
    },

    or: {
        color: '#959595',
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        paddingHorizontal: 10,
    },

    textinput: {
        height: 62,
        borderColor: '#CACACA',
        borderWidth: 1,
        width: width - 20,
        marginHorizontal:10,
        marginVertical: 5,
        textAlign: 'left',
        paddingHorizontal: 15,
    },

    loginButton: {
        alignItems:'center',
        justifyContent: 'center',
        width: width-20,
        height: 54,
        margin: 10,
        backgroundColor: '#4285F4',
        borderRadius: 6
    },

    authButtonText: {
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: 19,
        color: 'white'
    },

    forgot: {
        marginTop: 10,
        textAlign: 'center',
        color: 'rgb(42, 139, 239)'
    },

    bottomSignUP:{
        fontSize: 17,
        color: '#6C6C6C',
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

