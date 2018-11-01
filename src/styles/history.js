import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        marginTop: 20,
    },
    textContent: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
    },
    text: {
        color: '#6D6E71',
        fontWeight: '400',
        fontFamily: 'Montserrat'
        },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 50,
        backgroundColor: '#0784DC',
        borderRadius: 6
    },
    buttontext: {
        color: 'white',
        fontWeight: '400',
        fontFamily: 'Montserrat',
        fontSize: 17
    }
})

