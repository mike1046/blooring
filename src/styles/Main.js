import { Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        alignItems: 'center',
        shadowOpacity: 0.8, shadowRadius: 30, shadowOffset:{  width: 10,  height: 10,  },
    },

    mainBottom: {
        width: width,
        height: 57,
        backgroundColor:'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#CDD097'
    },

})

