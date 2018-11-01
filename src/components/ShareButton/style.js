import { Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    sharebuttonView: {
        height: 55,
        width: width-60,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    sharebuttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat',
    },
    shareIconImage: {
        position: 'absolute',
        left:30,
        top: 13
    }
})
