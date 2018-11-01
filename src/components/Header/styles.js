import { Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
import sizes from '../../theme/sizes';
export default StyleSheet.create({
    container: {
        width: width,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        height: sizes.statusBarHeight+50,
        backgroundColor:'#0784DC',
    },

    topHeader: {
        width: width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0784DC',
        flexDirection: 'row',
        paddingHorizontal: 20,
   },

   iconContent: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flex: 1,
   },

    backButton: {
        width: 60,
        height: 50,
    },

    rightButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 60,
        height: 50,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: 10
    },

    doneButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 60,
        height: 50,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: 15
    },
    titleText: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 18,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: '400',
        flex: 6,
    },
    doneText: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: 15,
        backgroundColor: '#00000000',
        textAlign: 'center',
    },
})