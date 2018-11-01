import { Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
import sizes from '../../theme/sizes';
export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },

    headerView: {
        marginTop: sizes.statusBarHeight,
        height: 70,
        borderBottomWidth:0.5,
        borderBottomColor:'grey',
        justifyContent:'center',
        width:width-35,
        paddingLeft: 30
    },

    bashar: {
        fontSize: 21,
        fontWeight: '400',
        backgroundColor: '#00000000',
        color: '#414042',
    },

    mainView: {
        height: 60,
        alignItems:'center',
        width:width-35,
        paddingLeft: 20,
        flexDirection:'row',
        marginTop:0
    },

    iconSize: {
        width:40,
        height:40
    },

    mainTextView: {
        height: 60,
        justifyContent:'center',
        width:width-100,
        marginLeft: 10
    },

    mainText:{
        fontSize: 17,
        fontWeight: '400',
        color:'#414042'
    },

    bottomView: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        margin: 0.5,
        backgroundColor:'rgb(235,235,235)'
    },
    bottomContain:{
        flexDirection: 'row',
        height:61,
        backgroundColor:'grey'
    }
})

