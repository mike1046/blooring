import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, FlatList, Modal, TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import QRCode from 'react-native-qrcode';
import { handler } from '@redux';
import { routeNames } from '@routes';
import styles from '../../styles/booking'
import gstate from '../../common/states'
import { consts } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../common/api';
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;
var bookingData
class Booking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bookinglist: [],
            search: '',
            modalVisible: false
        }
    }
    componentWillMount(){
        hudHandler.show()
        fetch(api.urls.booked_deals, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"user_id":gstate.user_id}),
        })
        .then((response) => response.json())
        .then((data) => {
            hudHandler.hide()
            if (data.status_code == 1) {
                bookingData = data.data                
                this.setState({bookinglist:bookingData})
            } else {
                dropHandler.showError(consts.appName, json.message);
            }
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isModal){            
            this.setState({modalVisible: nextProps.isModal})
        }
    }
    onBookSearch = (search) => {
        this.setState({search: search})
        var arrary = []
        for(var i=0; i < bookingData.length; ++i) {
            var person_i = bookingData[i];
            if(person_i["deal_name"].toUpperCase().indexOf(search.toUpperCase()) > -1) {
                arrary.push(person_i)
            }
        }
        this.setState({bookinglist: arrary})
    }
    onScanned = (booking_id) => {        
        mainHandler.getBookingID(booking_id)
        navHandler.navigate({ routeName: routeNames.app.qrcodescanner })
    }
    scanCloseModal = () => {
        this.setState({ modalVisible: false })
    }
    bookingListView(data) {
        var booking_id = data.booking_id
        var dealImage = data.deal_image.split("//")[1]
        var discountpercent = parseInt((parseInt(data.original_price)-parseInt(data.discount_price))/parseInt(data.original_price) * 100)
        return (
            <View style={styles.bookingView}>
                <View style={styles.bookingDetailView}>
                    <Text style={[styles.dealName, {marginBottom: 2}]} numberOfLines={1}>{data.deal_name}</Text>
                    <Text style={[styles.shopName, {marginBottom: 2}]}>{data.shop_name}</Text>
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.bookDiscount}>{data.discount_price}$</Text>
                                <Text style={styles.bookOrigin}> instead of </Text>
                                <Text style={styles.bookOriginPrice}>{data.original_price}$   </Text>
                            </View>
                            <View style={{width: 94, height: 24, borderRadius: 12, backgroundColor: '#E6BB46', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.bookGold}>{data.discount_price}$ for Gold</Text>
                            </View>
                                {/* <Text style={styles.itemOrigin}>{item.original_price}$</Text> */}
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => this.onScanned(booking_id)}>
                    <View style={styles.qrcodeView}>
                        <View style={{width: '30%'}} />
                        <Text style={styles.scanQrCode}>Scan QR Code</Text>
                        <View style={{width: '30%'}}>
                            <QRCode
                                value = {data.code}
                                size = {30}
                                bgColor = '#0784DC'
                                fgColor = 'white'/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{width: '100%',borderWidth:1, borderColor: '#D5D5D5', marginTop: 20}} />
            </View>
        )
    }
    _renderModal = () => (
        <Modal
            visible={this.state.modalVisible}
            animationType={'fade'}
            onRequestClose={this.scanCloseModal}
            transparent
        >
            <View style={styles.scanModalContainer}>
                <View style={styles.scanModalinnerContainer}>
                    <Text style={styles.scanModalTitle}>Scanned Complete</Text>
                    <Image style={styles.scanIcon} source={require('../../../assets/shared/icons/scanned.png')}/>
                    <Text style={styles.scanThanks}>Thank you {'\n'} for using Shufi app</Text>
                    <View style={styles.scanline}/>
                    <Text style={styles.scancontentText}>You've earned <Text style={{color: '#0784DC'}}>{gstate.userInfo.points} Points</Text></Text>
                    <Text style={styles.scancontentText}>Collect more points to get <Text
                        style={{color: '#0784DC', textDecorationLine: 'underline'}}
                        onPress={()=>{this.scanCloseModal();navHandler.navigate({ routeName: routeNames.app.myreword })}}>REWARDS</Text></Text>
                    <View style={styles.scanline}/>
                    <Text style={styles.scancontentTextSmall}>
                        If you enjoy using Shufi, would you mind talking a{'\n'}
                        moment to rate it? it won't take more than a minute.{'\n'}
                    </Text>
                    <Text style={[styles.scancontentTextSmall, {marginVertical: 10}]}>
                        Thanks for your support!
                    </Text>
                    <TouchableOpacity style={styles.scanInnerbutton} onPress={this.scanCloseModal}>
                        <Text style={styles.scanInnerContent}>Rate us</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#E4E4E4'}}>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={this.onBookSearch}
                        value={this.state.search}
                        placeholder={'Search for booked deals'}
                    />
                </View>
                <FlatList
                    data={this.state.bookinglist}
                    renderItem={({item}) => this.bookingListView(item)}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={() => ( <View style={{ height: 135 }} /> )}
                />
                {this._renderModal()}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isModal: state.main.isModal
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
