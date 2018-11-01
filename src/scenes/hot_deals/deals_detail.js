import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Dimensions, ScrollView, TouchableWithoutFeedback, Modal} from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';
import geolib from 'geolib'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import MapView from 'react-native-maps';
import styles from '../../styles/hot_deals'
import gstate from '../../common/states'
import Header from '../../components/Header'
import PageControl from '../../components/PageControl'
import { consts } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../common/api';
const {width, height} = Dimensions.get('window');
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            quantiy: 1,
            deailsDetail: 0,
            modalVisible: false
        }
    }

    onScroll = (event) => {
        var offsetX = event.nativeEvent.contentOffset.x,
            pageWidth = width;
        this.setState({
            currentPage: (Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1)%4
        });
    }
    onQuantityPluse = () => {
        this.setState({quantiy:this.state.quantiy+1})
    }
    onQuantityminuse = () => {
        if(this.state.quantiy > 1) {
            this.setState({quantiy: this.state.quantiy - 1})
        }
    }
    closeModal(){
        this.setState({modalVisible: false})
    }
    _renderInfomation = (data) => {
        if (this.state.deailsDetail == 0){
            return (
                <View>
                    <Text style={styles.infoTitle}>HIGHLIGHTS</Text>
                    <View style={styles.infoView}>
                        <Text>{data.highlights}</Text>
                    </View>
                    <Text style={styles.infoTitle}>TERMS</Text>
                    <View style={styles.infoView}>
                        <Text>{data.terms}</Text>
                    </View>
                    <Text style={styles.infoTitle}>THE DEAL</Text>
                    <View style={styles.infoView}>
                        <Text>{data.description}</Text>
                    </View>
                </View>
            )
        }
    }
    _renderContact = (data) => {
        if (this.state.deailsDetail == 1) {
            return (
                <View>
                    <Text style={styles.infoTitle}>HEADQUARTER</Text>
                    <TouchableOpacity onPress={()=>RNImmediatePhoneCall.immediatePhoneCall(gstate.phoneCode + data.branch_mobile_number)}>
                        <View style={styles.infoView}>
                            <Text style={[styles.phoneNumber,{flex:1}]}>+{gstate.phoneCode} {data.branch_mobile_number.replace(/\D*(\d{2})\D*(\d{3})\D*(\d{3})\D*/, '$1 $2 $3')}</Text>
                            <Ionicons name={"ios-call"} size={25} color={'rgb(0, 137, 215)'} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.infoTitle}>BRANCH NUMBER</Text>
                    <TouchableWithoutFeedback onPress={()=>RNImmediatePhoneCall.immediatePhoneCall(gstate.phoneCode + data.headquarter_phone_number)}>
                        <View style={styles.infoView}>
                            <Text style={[styles.phoneNumber,{flex:1}]}>+{gstate.phoneCode} {data.headquarter_phone_number.replace(/\D*(\d{2})\D*(\d{3})\D*(\d{3})\D*/, '$1 $2 $3')}</Text>
                            <Ionicons name={"ios-call"} size={25} color={'rgb(0, 137, 215)'} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }
    _renderLocation = (data) => {
        var LatLng =  {
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
        }
        var kmAway = geolib.getDistance(
            gstate.latlong,
            {latitude: data.latitude, longitude: data.longitude}
        );
        var away = (kmAway/100).toFixed(1)
        if (this.state.deailsDetail == 2) {
            return (
                <View>
                    <Text style={styles.infoTitle}>FIND US</Text>
                    <View style={[styles.infoView,{height: 276, justifyContent: 'space-between'}]}>
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: parseFloat(data.latitude),
                                longitude: parseFloat(data.longitude),
                                latitudeDelta: 0.1922,
                                longitudeDelta: 0.1421,
                            }}
                        >
                            <MapView.Marker
                                coordinate={LatLng}
                            />
                        </MapView>

                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 13}}>{data.branch_location}</Text>
                            <Text style={{fontSize: 13, color: 'grey', marginTop:5}}>{away} km away</Text>
                        </View>
                        <TouchableOpacity style={styles.getDirectionButton} onPress={() => this.onBookNow(data)}>
                            <Text style={styles.getDirectionbuttonText}>Get Direction</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
    onBookNow(data) {
        hudHandler.show()
        fetch(api.urls.book_deal, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"user_id":gstate.user_id, "deal_id":data.id, "quantity":this.state.quantiy.toString(), "datetime":moment(new Date(), 'DD/MM/YYYY', true).format('DD-MM-YYYY HH:mm')}),
        })
        .then((response) => response.json())
        .then((json) => {
            hudHandler.hide()
            this.setState({modalVisible: true})
        })
    }
    dealsDetail (id) {
        this.setState({deailsDetail: id})
    }
    render() {
        var data = gstate.deails_detail
        var discountpercent = parseInt((parseInt(data.original_price)-parseInt(data.discount_price))/parseInt(data.original_price) * 100)

        var startDate = new Date(data.start_date);
        var endDate = new Date(data.end_date);
        var one_day=1000*60*60*24
        var diff_days = Math.ceil((endDate.getTime()-startDate.getTime())/(one_day))

        return (
            <View style={styles.container}>
                <Header title={gstate.category_name.toUpperCase()} leftIcon="ios-arrow-back" rightIcon="ios-bookmark" onLeftClick={()=>navHandler.navback()} onRightClick={()=>{}}/>
                <ScrollView>
                    <View>
                        <ScrollView
                            ref="ad"
                            pagingEnabled
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            onScroll={this.onScroll}
                            scrollEventThrottle={16}
                        >
                            {data.gallery.map((image, i)=>(
                                <Image key={i} style={styles.gallery} source={{uri: "https:"+ image.split("//")[1]}} />
                            ))}
                        </ScrollView>
                        <PageControl
                            style={{ alignItems:'center', justifyContent: 'center', flexDirection: 'row', width: width, height: 30}}
                            numberOfPages={data.gallery.length>4?4:data.gallery.length} currentPage={this.state.currentPage}
                            hidesForSinglePage
                            pageIndicatorTintColor='gray'
                            indicatorSize={{ width:8, height:8 }}
                            currentPageIndicatorTintColor='rgb(0, 137, 215)'
                        />
                    </View>
                    <View>
                        <Text style={styles.dealsName}>
                            {data.name}
                        </Text>
                    </View>
                    <View style={styles.discountView}>
                        <View style={{flex: 1, padding:10, alignItems: 'center'}}>
                            <Text style={[styles.itemDiscountPersent, {fontSize: 17}]}>{discountpercent}% Discount</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[styles.itemOrigin, {fontSize: 22, marginTop: 3, textDecorationLine: 'line-through'}]}>{data.original_price}$</Text>
                                <Text style={[styles.itemDiscount, {fontSize: 30, marginLeft: 15}]}>{data.discount_price}$</Text>
                            </View>
                        </View>
                        <View style={{flex:1.2, marginRight: 20}}>
                            <View style={styles.purchase}>
                                <Text style={{fontSize: 20, fontWeight: '300', color:'black'}}>{data.purchased}</Text>
                                <Text style={{marginLeft: 5,fontFamily: 'Montserrat',color:'grey', fontSize: 13,fontWeight: '400'}}>Purchased</Text>
                            </View>
                            <View style={{borderWidth: 0,height:1, backgroundColor:'#E2E2E2', borderColor: '#E2E2E2'}} />
                            <View style={[styles.purchase, {borderBottomWidth:0}]}>
                                <Text style={{fontSize: 20, fontWeight: '300', color:'black'}}>{diff_days}</Text>
                                <Text style={{marginLeft: 5,fontFamily: 'Montserrat',color:'grey', fontSize: 13,fontWeight: '400'}}>Days Remaining</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.tapView}>
                        <TouchableWithoutFeedback onPress={()=>this.dealsDetail(0)}>
                            <View style={[styles.tapViewItemView, {borderBottomWidth: this.state.deailsDetail == 0 ? 2 : 0 }]}>
                                <Ionicons name={"ios-information-circle-outline"} size={25} color={'rgb(0, 137, 215)'} />
                                <Text style={styles.tabButtonText}>Deal info</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>this.dealsDetail(1)}>
                            <View style={[styles.tapViewItemView, {borderBottomWidth: this.state.deailsDetail == 1 ? 2 : 0 }]}>
                                <Ionicons name={"ios-call-outline"} size={25} color={'rgb(0, 137, 215)'} />
                                <Text style={styles.tabButtonText}>Contact</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>this.dealsDetail(2)}>
                            <View style={[styles.tapViewItemView, {borderBottomWidth: this.state.deailsDetail == 2 ? 2 : 0 }]}>
                                <Ionicons name={"ios-pin-outline"} size={25} color={'rgb(0, 137, 215)'} />
                                <Text style={styles.tabButtonText}>Location</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {this._renderInfomation(data)}
                    {this._renderContact(data)}
                    {this._renderLocation(data)}
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'fade'}
                        onRequestClose={() => this.closeModal()}
                        transparent
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.innerTitle}>You've booked this deal SUCCESSFULLY</Text>
                                <Image style={styles.innerIcon} source={require('../../../assets/shared/icons/first_finger.png')}/>
                                <Text style={styles.innerContent}>{data.name}</Text>
                                <View style={styles.line}/>
                                <View style={{marginBottom: 15}} onPress={()=> this.closeModal()}>
                                    <Text style={styles.innerContent}>Quantity {this.state.quantiy}</Text>
                                </View>
                                <TouchableOpacity style={[styles.innerbutton, {backgroundColor: '#0784DC'}]} onPress={()=> this.closeModal()}>
                                    <Text style={{color: 'white', fontSize: 18}}>Booked Deals</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
                <View style={styles.quantity}>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{fontSize: 15, fontFamily: 'Montserrat', color: 'grey'}}>Quantity of Deals</Text>
                    </View>
                    <View style={{marginLeft:10, flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.countLeftButton} onPress={this.onQuantityminuse}>
                            <Text style={{fontSize: 25, color: 'white', backgroundColor: '#00000000', paddingBottom: 3}}> - </Text>
                        </TouchableOpacity>
                        <View style={{width: 60, height:30, alignItems: 'center', justifyContent: 'center',}}>
                            <Text style={{fontSize: 20, backgroundColor: '#00000000'}}>{this.state.quantiy}</Text>
                        </View>
                        <TouchableOpacity style={styles.countRightButton} onPress={this.onQuantityPluse}>
                            <Text style={{fontSize: 25, color: 'white', backgroundColor: '#00000000', paddingBottom: 3}}> + </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.bookbutton} onPress={() => this.onBookNow(data)}>
                    <Text style={styles.bookbuttonText}>BOOK NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
