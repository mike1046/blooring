import { Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
    },
    profileImageView: {
        width: width,
        alignItems: 'center',
    },
    userProfieImage: {
        borderRadius: 90,
        width: 180,
        height: 180,
        margin: 20
    },
    settingContent: {
        width: width,
        alignItems: 'center',
        backgroundColor: 'white',
        padding:10
    },
    settingContentText: {
        fontSize: 14,
        color: '#414042',
        fontFamily: 'Montserrat',
        marginBottom: 5,
        fontWeight: '400'
    },
    settingName: {
        fontSize: 22,
        fontFamily: 'Montserrat',
        marginBottom:10,
        color: '#414042',
        fontWeight: '400'
    },
    settingButton: {
        width: width,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop:10,
        padding: 10,
    },
    settingButtonText: {
        color: '#0784DC',
        fontSize: 14,
        fontFamily: 'Montserrat',
        fontWeight: '400'
    },
    getPint: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        color: '#414042',
        fontWeight: '400',
        marginVertical: 5,
    },
    present: {
        width: 68,
        height: 67
    },
    byShare: {
        fontSize: 14,
        fontFamily: 'Montserrat',
        color: '#757575',
        marginVertical: 5,
    },
    shareButton: {
        backgroundColor: '#0784DC',
        width: width-30,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        height: 50
    },
    shareButtonText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Montserrat',
        fontWeight: '400'
    },
    shareImage: {
        width: 31,
        height: 28,
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
        margin:25,
        fontSize: 23,
        color: 'grey',
        fontFamily: 'Montserrat',
        width: width-40,
        textAlign: 'center'
    }
})

