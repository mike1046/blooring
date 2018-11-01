import {StyleSheet} from 'react-native'
const React = require("react-native");
const { Dimensions, Platform } = React;
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width:width-40,
        height:height-170,
        alignItems:'center',
        margin:20
    },
    contentContainer: {
        height: height * 2.3
    },
    background: {
        width:width,
        height:height-70,
        alignItems:'center',
        justifyContent: 'center'
    },
    star_logo:{
        width:129,
        height:129,
        marginTop: 20,
    },
    headingText:{
        fontSize:24,
        fontFamily: 'Montserrat',
        color:'#414042',
        fontWeight: '400'
    },
    underlineView:{
        backgroundColor:'#414042',
        width:width/6,
        height:3,
        marginTop:15
    },
    wrapper:{
        width:'80%',
        height:220,
        marginTop:30
    },
    slide1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f6f6f6'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Montserrat',
        color: '#444444',
        fontWeight: 'bold'
    },
    toptext: {
        fontSize:14,
        fontFamily: 'Montserrat',
        color: '#414042'
    },
    subscribeTitle: {
        fontSize: 22,
        color: '#414042',
        fontFamily: 'Montserrat',
        textAlign: 'center',
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F6F8',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        marginHorizontal: 20,
        borderRadius: 14,
        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 14},
        shadowColor: 'black',
        shadowOpacity: 0.1,
    },
    continueButton: {
        height: 65,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        marginTop: 10,
        backgroundColor: '#0784DC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    continueText: {
        fontSize: 20,
        fontFamily: 'Montserrat',
        color: 'white',
    },
    cancelButton:{
        marginTop: 30,
    },
    cancelText: {
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#515151',
    }
});
