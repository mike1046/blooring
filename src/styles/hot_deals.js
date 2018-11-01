import { Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
container: {
        width: width,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        flex: 1,
    },

    category: {
        paddingLeft: 10,
        width: width,
        height: 48,
        flexDirection: 'row',
        backgroundColor: 'white',
    },

    categoryItem: {
        paddingLeft: 5,
        paddingRight: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    categoryText: {
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#414042',
    },

    NearByDailsView: {
        flexDirection: 'row',
        margin: 10,
        height: 55,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#DEE0E1'
    },

    NearByDeailsText: {
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight:'300',
        backgroundColor: 'white'
    },

    categoryListView: {
        marginHorizontal: 10,
        marginBottom: 30,
        borderRadius: 14,
        shadowOffset: {width: 0, height: 6},
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.05,
        elevation: 9,
    },

    categoryListViewImage: {
        height: 270,
        resizeMode: 'stretch',
    },

    categoryItemView: {
        marginTop: 20,
        flexDirection: 'column',
        height: 90,
        alignItems: 'center',
    },

    itemName: {
        fontSize: 19,
        fontFamily: 'Montserrat',
        fontWeight: '400'
    },

    itemHouse: {
        fontSize: 14,
        color: 'grey',
        fontFamily: 'Montserrat',
        fontWeight: '400',
        marginVertical: 4,
    },

    itemDiscountPersent: {
        fontSize: 12,
        color: 'grey',
        fontFamily: 'Montserrat',
        fontWeight: '400'
    },

    itemOrigin: {
        fontSize: 14,
        fontFamily: 'Montserrat',
        color:'grey',
        fontWeight: '400',
        marginTop: 10
    },

    itemInstead: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        color:'grey',
        fontWeight: '400',
        marginTop: 5,
    },    

    itemGold: {
        fontSize: 13,
        fontFamily: 'Montserrat',
        color:'white',
        fontWeight: '400',
        justifyContent: 'center',
        textAlign: 'center',
    },    

    itemDiscount: {
        fontSize: 24,
        fontFamily: 'Montserrat',
        color:'rgb(0, 137, 215)',
        fontWeight: '500'
    },

    gallery: {
        width: width,
        height: 245,
        resizeMode: 'stretch'
    },

    bookmarkView: {
        position:'absolute',
        left:10,
        bottom:40,
        alignItems:'center',
        justifyContent: 'center',
        width: 100,
        height: 35,
        borderRadius: 5,
        backgroundColor: 'rgb(245, 246, 248)',
        flexDirection: 'row'
    },

    dealsName: {
        fontSize:18,
        fontFamily: 'Montserrat',
        fontWeight: '500',
        marginBottom:15,
        marginHorizontal: 20,
        color: '#414042',
    },

    discountView: {
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginHorizontal: 15,
        marginBottom: 5,
        paddingVertical: 5,
        shadowOffset: {width: 0, height: 6},
        shadowColor: 'black',
        shadowOpacity: 0.05,
    },

    purchase: {
        flex:1,
        borderBottomColor: 'grey',
        borderBottomWidth:0.5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
    },

    quantity: {
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 59
    },

    countLeftButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D1D1D1',
        borderRadius: 15,
    },

    countRightButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D1D1D1',
        borderRadius: 15
    },

    bookbutton: {
        width: width,
        height: 59,
        backgroundColor: '#0784DC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bookbuttonText: {
        fontSize: 22,
        fontWeight: '400',
        color: 'white',
        backgroundColor: '#00000000',
    },

    tapView: {
        width: width,
        height: 55,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: 10,
        shadowOffset: {width: 0, height: 6},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        elevation: 9,
    },

    tapViewItemView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomColor: 'rgb(0, 137, 215)'
    },

    tabButtonText: {
        fontSize: 14,
        marginLeft: 5
    },

    infoTitle: {
        marginLeft: 10,
        marginTop: 20,
        color: 'grey',
        backgroundColor: '#00000000',
        fontFamily: 'Montserrat',
        marginBottom: 5
    },

    infoView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#DCDDDE',
        flexDirection: 'column'
    },

    phoneNumber: {
        fontSize: 18,
        fontFamily: 'Montserrat'
    },

    map: {
        height: '50%',
        borderRadius: 5,
    },

    modalContainer: {
        backgroundColor: '#00000060',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25,
        width: width-40,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    innerTitle: {
        fontSize: 24,
        fontFamily: 'Montserrat',
        color: '#0784DC',
        textAlign: 'center'
    },
    innerIcon: {
        width: 170,
        height: 170,
        margin: 30
    },

    innerContent: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontWeight: '300',
        color: '#414042',
    },

    line: {
        width: width-150,
        height: 1.5,
        backgroundColor: '#DCDDDE',
        margin: 15
    },
    innerbutton: {
        height: 59,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        width: width-70
    },
    getDirectionButton: {
        height: 47,
        borderRadius: 10,
        backgroundColor: '#0784DC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    getDirectionbuttonText: {
        fontSize: 17,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontWeight: '400',
        color: 'white',
    }
})