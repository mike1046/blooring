import { Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
    },
    bookingImage:{
        width: 100,
        height: 100
    },
    searchInput: {
        width: width-20,
        height: 30,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        textAlign: 'center',
    },
    searchView: {
        alignItems: 'center',
        justifyContent:'center',
        width:width,
    },
    bookingView: {
        width: width,
        paddingTop:23,
        paddingHorizontal: 20,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 1,
    },

    bookingDetailView: {
        flex:1,
        backgroundColor:'white',
        borderRadius: 14,
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: 'column',
        marginBottom: 20
    },

    dealName: {
        fontSize: 19,
        fontFamily: 'Montserrat',
        fontWeight: '400',
        color: '#414042',
    },

    shopName: {
        fontSize: 14,
        color: '#7F7F7F',
        fontFamily: 'Montserrat',
        fontWeight: '400'
    },

    bookDiscountPersent: {
        marginTop: 20,
        fontSize: 13,
        color: 'grey',
        fontFamily: 'Montserrat',
        fontWeight: '500'
    },

    bookGold: {
        color: 'white',
        fontSize: 13
    },

    bookOrigin: {
        fontSize: 16,
        fontFamily: 'Montserrat',
        color:'grey',
        fontWeight: '400',
    },

    bookDiscount: {
        fontSize: 23,
        fontFamily: 'Montserrat',
        color:'rgb(0, 137, 215)',
        fontWeight: '400'
    },

    bookOriginPrice: {
        fontSize: 18,
        color: '#616161',
        fontFamily: 'Montserrat',
        fontWeight: '400'
    },

    qrcodeView: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#0784DC',
        borderRadius: 10,
        height: 47,
        width: '100%',
        
    },

    qrcodeImage: {
        width: 80,
        height: 80,
    },

    scanQrCode: {
        fontSize: 17,
        fontFamily: 'Montserrat',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width: '40%'
    },

    scanModalContainer: {
        width: width,
        height: height,
        backgroundColor: '#00000090',
        alignItems:'center',
        justifyContent: 'center'
    },

    scanModalinnerContainer: {
        width: width-30,
        alignItems:'center',
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 5
    },

    scanModalTitle: {
        fontSize: 24,
        color: '#0784DC',
        fontFamily: 'Montserrat',
        marginVertical: 30,
    },

    scanIcon: {
        width: 150,
        height: 150,
        marginBottom:15
    },

    scanThanks: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Montserrat',
    },

    scanline: {
        margin:13,
        width: width-80,
        height: 1,
        backgroundColor: 'grey'
    },

    scancontentText: {
        color: '#949494',
        fontFamily: 'Montserrat',
        fontSize: 16,
        margin:12,
        textAlign: 'center'
    },

    scancontentTextSmall: {
        color: '#949494',
        fontFamily: 'Montserrat',
        fontSize: 16,
        margin:2,
        textAlign: 'center'
    },

    scanInnerbutton: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        width: width-70,
        backgroundColor: '#0784DC',
        margin: 12
    },

    scanInnerContent: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        color: 'white',
        fontWeight: '400'
    },
})

