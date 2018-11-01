import { Dimensions,StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        width:width,
        height: height-70
    },

    getstart: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: 20,
        backgroundColor: '#00000000',
        textAlign: 'center',
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height:70,
        backgroundColor:'#0784DC'
    }
})

