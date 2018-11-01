import {StyleSheet} from 'react-native'
const React = require("react-native");
const { Dimensions, Platform } = React;
import { Constants} from "../theme"
const deviceHeight = Dimensions.get("window").height;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f2f2f2',
    },
    headerView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cad8e9',
        height:Constants.Marin12,
    },
    headerTitle:{
        color: '#0071bc',
        fontSize: Constants.Font30,
        fontFamily: 'Montserrat',
        fontWeight: '700',
        textAlign: 'center',
    },
    preferenceView:{
        backgroundColor:'#f2f2f2',
        height: Constants.Marin14,
        paddingHorizontal: 20,
        borderColor: '#bfbfbf',
        borderBottomWidth: 0.5,
    },
    preferenceText:{
        fontSize: Constants.Font17,
        fontFamily: 'Montserrat',
        marginTop: 20,
        color: 'grey'
    },
    publicView:{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderColor: '#bfbfbf',
        borderBottomWidth: 0.5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height: 74,
    },
    buttonView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:Constants.Marin20,
        backgroundColor:'#f2f2f2',
        paddingHorizontal: 10,
    },
    button:{
        width: (Constants.width-30)/2,
        height: Constants.Marin16,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#cccccc'
    },
    check:{
        width:20,
        height:20,
    },
    heart:{
        width: 207/2,
        height: 175/2,
    },
    imageView:{
        height: Constants.Marin50,
        alignItems:'center',
        backgroundColor:'#f2f2f2',
        justifyContent: 'center'
    },
    publicText:{
        fontSize: Constants.Font17,
        fontFamily: 'Montserrat',
    },
    sliderTitle:{
        paddingHorizontal: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height: Constants.Marin8,
    },
    sliderText:{
        fontSize: Constants.Font17,
        fontFamily: 'Montserrat',
    },
    greenText:{
        fontSize: Constants.Font17,
        fontFamily: 'Montserrat',
        color: '#1b75bb'
    },
    commonText:{
        fontSize: Constants.Font18,
        fontFamily: 'Montserrat',
    },
    sliderView:{
        borderColor: '#bfbfbf',
        borderBottomWidth: 1,
        height: Constants.Marin20
    },
    sliderWidth:{
        marginHorizontal: 20,
    },
    sliderWidth1:{
        marginHorizontal: 20,
        marginTop: 20,
    },
    sliderAbsolute:{
        position: 'absolute',
        top: 20,
        left: 20,
        width: Constants.width-40,
        height: 20,
    },
    commonView:{
        backgroundColor: 'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        height: Constants.Marin14,
        borderColor: '#bfbfbf',
        borderBottomWidth: 0.5
    },
    track: {
        height: 2,
        borderRadius: 0,
        backgroundColor: '#000000',
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#e03145',
    },
    modalView:{
        flex: 1,
        backgroundColor:'white',
        borderRadius: 10,
    },
    modalbuttonView:{
        marginTop: 10,
        height: Constants.Marin12,
        backgroundColor:'white',
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    modaleachView:{
        height: Constants.Marin16,
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#bfbfbf',
        borderBottomWidth: 0.5
    },
    modallastView:{
        height: Constants.Marin16,
        alignItems:'center',
        justifyContent:'center',
    }
})
