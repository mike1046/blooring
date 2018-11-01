import { Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F6F8',
    },
    bookmarsTitle: {
        marginTop: 10,
        color: 'grey',
        fontSize: 20,
        textAlign: 'center'
    },
    bookmarsContents: {
        color: 'grey',
        fontSize: 15,
        textAlign: 'center',
        width: width-30,
        marginTop: 5
    },
    bookmarksSearchInput: {
        height: 30,
        borderRadius: 5,
        margin: 10,
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        textAlign: 'center'
    },

    bookmarksView: {
        flexDirection: 'column',
        alignItems: 'center',
    },

    bookmarksDetailView: {
        flex:1,
        marginHorizontal: 20,
        backgroundColor:'white',
        borderRadius: 14,
        paddingHorizontal: 20,
        flexDirection: 'column',
        marginBottom: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.2,
        paddingVertical: 20,
    },

    bookOrigin: {
        fontSize: 16,
        fontFamily: 'Montserrat',
        color:'grey',
        fontWeight: '400',
    },

    bookGold: {
        color: 'white',
        fontSize: 13
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

    bookmarksViewDeals: {
        flex:1,
        backgroundColor:'white',
        borderRadius: 14,
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: 'column',
        marginBottom: 20
    },
    bookmarksdealName: {
        fontSize: 19,
        fontWeight: '400',
        fontFamily: 'Montserrat',
    },

    bookmarksshopName: {
        marginTop:5,
        fontSize: 15,
        color: 'grey',
        fontFamily: 'Montserrat',
        fontWeight: '500'
    },
    viewdealText: {
        fontSize: 13,
        color: 'rgb(0, 137, 215)',
        fontFamily: 'Montserrat',
    },
    button: {
        backgroundColor: '#0784DC',
        paddingTop: 10,
        width: 337,
        height: 47,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'Montserrat',        
        color: 'white',
    },
})

