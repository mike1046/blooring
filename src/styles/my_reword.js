import {StyleSheet} from 'react-native'
const React = require("react-native");
const { Dimensions, Platform } = React;
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor: '#f2f2f2',
    },
    no_rewards: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 70,
        backgroundColor:'white',
        borderBottomWidth: 0.5,
        borderColor: '#DDDDDD'
    },
    rewardsImage: {
        width: 44,
        height: 48,
        marginRight: 20,
    },
    no_rewardsText: {
        flex:1,
        marginLeft: 20,
        fontSize: 14,
        fontFamily: 'Montserrat',
        color: '#6D6E71'
    },
    chart_view: {
        height: 211,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 14,
        flexDirection: 'column',
        shadowColor: '#A6A6A6',
        shadowOpacity: 0.6,
        shadowOffset: {width: 2, height: 3}
    },
    chartImageView: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
    },
    chartBackImage: {
        width: 69,
        height:73
    },
    content_reward: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 1,
    },
    total_point_view: {
        flex:1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    totalpoint: {
        color: '#0784DC',
        fontSize: 26,
        fontFamily: 'Montserrat',
        fontWeight: '500'
    },
    totalpointText: {
        color:  'black',
        fontSize: 14,
        fontFamily: 'Montserrat',
        marginLeft: 20,
        paddingTop: 7,
    },
    needpointView: {
        flex: 2,
        padding: 5,
    },
    needpoint: {
        color:  '#181818',
        fontSize: 14,
        fontFamily: 'Montserrat',
    },
    needpointText: {
        marginTop:5,
        color: '#EEB64B',
        fontSize: 15,
        fontFamily: 'Montserrat',
    },
    backIcon: {
        position: 'absolute',
        right:5,
        top:20
    },
    nearbydealsButton: {
        margin:5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0784DC',
        width:width-40,
        borderRadius: 6,
    },
    nearbydealsButtonText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Montserrat',
    },
    shareImage: {
        width: 35,
        height: 35,
        tintColor: 'white',
        position: 'absolute',
        right:10,
        top: 5
    },
    shareModal: {
        width: width,
        height: height,
        backgroundColor: '#00000090',
        alignItems: 'center',
        justifyContent: 'center'
    },
    shareModalContainer: {
        width: width-20,
        backgroundColor: 'white',
        margin:10,
        alignItems: 'center',
        paddingBottom: 20,
        borderRadius: 5
    },
    shareModalContainerText: {
        marginVertical: 30,
        paddingHorizontal: 40,
        fontSize: 20,
        color: '#7F7F7F',
        fontFamily: 'Montserrat',
        width: width-40,
        textAlign: 'center',
        fontWeight: '400'
    },
    processbarContainer: {
        height: 8,
        width: '100%',
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        flexDirection: 'row',
    },
    processbarContent: {
        height: 8,
        flex: 2500,
        backgroundColor: '#0784DC',
        borderRadius: 4,
        flexDirection: 'row',
    },
    processbarContainerText: {
        height: 20,
        width: '100%',
        borderRadius: 4,
        flexDirection: 'row',
    },
    processbarContentText: {
        justifyContent: 'space-between',
        flex: 2500,
        borderRadius: 4,
        flexDirection: 'row',
    },
    textProcess: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'Montserrat',
    },    
})