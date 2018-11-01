import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, FlatList, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { handler } from '@redux';
import { routeNames } from '@routes';
import styles from '../../styles/hot_deals'
import gstate from '../../common/states'
import { consts } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../common/api';
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;
var selectID
var selectName
class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectCategoryItems: [],
            category_items: []
        }
    }

    componentWillMount(){
        var _this = this
        if(!gstate.category_item) {
            fetch(api.urls.categories, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"country_code":"lb"}),
            })
                .then((response) => response.json())
                .then((json) => {
                    var data = json.data
                    for (var i = 0; i < data.length; i++) {
                        if (i == 0) {
                            data[i].selected = true
                        } else {
                            data[i].selected = false
                        }
                    }
                    _this.setState({category_items: data})
                    gstate.setCategoryId(data)
                    this.onSelectCategory(0)
                })
        }else{
            this.setState({category_items: gstate.category_item})
            this.onSelectCategory(0)
        }
    }
    onNearbyDeals() {
        var _this = this
        hudHandler.show()
        fetch(api.urls.nearby_deals, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id":gstate.user_id,
                "latitude":gstate.latlong.latitude,
                "longitude":gstate.latlong.longitude,
                "date":moment(new Date(), 'DD/MM/YYYY', true).format('DD-MM-YYYY'),
                "category_id":selectID.toString()}),
        })
            .then((response) => response.json())
            .then((json) => {
                hudHandler.hide()
                if (json.status_code == 1) {
                    _this.setState({selectCategoryItems: json.data});
                } else {
                    dropHandler.showError(consts.appName, json.message);
                }
            })
    }
    onSelectCategory(id) {
        var data = gstate.category_item
        selectID = id
        for (var i = 0; i < data.length; i++) {
            if (i == id) {
                data[i].selected = true
                selectID = data[i].category_id
                selectName = data[i].name
            } else {
                data[i].selected = false
            }
        }
        this.setState({category_items: data})
        var _this = this
        hudHandler.show()
        fetch(api.urls.hot_deals, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id":gstate.user_id,
                "date":moment(new Date(), 'DD/MM/YYYY', true).format('DD-MM-YYYY'),
                "country_code":"lb",
                "category_id":selectID.toString()}),
        })
        .then((response) => response.json())
        .then((json) => {
            hudHandler.hide()
            if (json.status_code == 1) {
                _this.flatListRef.scrollToOffset({animated: false, y: 0.25, x:0})
                _this.setState({selectCategoryItems: json.data});
            } else {
                dropHandler.showError(consts.appName, "Sorry, We are not available this options");
            }
        })
    }

    onDetail(id){

        hudHandler.show()
        fetch(api.urls.deal_details, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"deal_id": id, "user_id": gstate.user_id}),
        })
        .then((response) => response.json())
        .then((json) => {
            hudHandler.hide()
            if (json.status_code == 1) {
                gstate.deails_detail = json.data[0],
                gstate.category_name = selectName
                navHandler.navigate({ routeName: routeNames.app.dealsdetail })
            } else {
                dropHandler.showError(consts.appName, json.message);
            }
        })
    }

    categoryListView(item) {
        var discountpercent = parseInt((parseInt(item.original_price)-parseInt(item.discount_price))/parseInt(item.original_price) * 100)
        var feature = item.featured.split("//")[1]
        return(  
            <TouchableWithoutFeedback onPress={()=>this.onDetail(item.deal_id)}>
                <View style={styles.categoryListView} >
                    <View overflow='hidden' style={{ borderRadius: 14,}}>
                        <Image style={styles.categoryListViewImage} source={{uri: "https:"+ feature}}/>
                        <View style={styles.categoryItemView}>
                            <View style={{flex:1, paddingHorizontal: 15}}>
                                <Text style={styles.itemName} numberOfLines={1}>{item.deal_name}</Text>
                                <Text style={styles.itemHouse}>{item.shop_name}</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.itemDiscount}>{item.discount_price}$</Text>
                                        <Text style={styles.itemOrigin}>  instead of  </Text>
                                        <Text style={styles.itemInstead}>{item.discount_price}$</Text>
                                    </View>
                                    <View style={{width: 94, height: 24, borderRadius: 10, backgroundColor: '#E6BB46', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={styles.itemGold}>{item.discount_price}$ for Gold</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.category}>
                    <ScrollView horizontal={true}>
                        {this.state.category_items.map((category_itme, i)=>(
                            <TouchableOpacity key={i} style={[styles.categoryItem, {borderBottomWidth: category_itme.selected ? 2 : 0, borderBottomColor: 'rgb(0, 137, 215)'}]}
                                            onPress={() => this.onSelectCategory(i)}>
                                <Text style={styles.categoryText}>{category_itme.name}</Text>
                            </TouchableOpacity>)
                        )}
                    </ScrollView>
                </View>
                <View style={{flex: 1, marginHorizontal: 10}}>
                    <ScrollView>
                        <TouchableOpacity style={styles.NearByDailsView} onPress={()=>this.onNearbyDeals()}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../../assets/shared/images/location.png')}  color="white" />
                                <Text style={styles.NearByDeailsText}>Browse Nearby Deals</Text>
                            </View>
                            <Ionicons name="ios-arrow-forward" size={30} color="#B0AFAF" />
                        </TouchableOpacity>
                        <FlatList
                            ref={(ref) => { this.flatListRef = ref; }}
                            data={this.state.selectCategoryItems}
                            renderItem={({item}) => this.categoryListView(item)}
                            keyExtractor={(item, index) => index}
                            ListFooterComponent={() => ( <View style={{ height: 130 }} /> )}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
