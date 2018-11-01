import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, FlatList, Modal, ActionSheetIOS, TouchableWithoutFeedback} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { handler } from '@redux';
import styles from '../../styles/bookMarks'
import gstate from '../../common/states'
import Icon from 'react-native-vector-icons/Ionicons';
import { consts } from '../../theme';
import api from '../../common/api';
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;

var BUTTONS = [
    'By Recently Bookmarked',
    'By Price',
    'Cancel',
];
let RESENTLYBOOKMARK = 0;
let PRICEBOOKMARK = 1;
var CANCEL_INDEX = 2;
let bookingData
class BookMarks extends Component{
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            search: '',
            clicked: 'none',
        }
    }
    componentWillMount() {
        this.onLoadBookMarks(0)
        this.showActionSheet()
    }

    onLoadBookMarks = (filterOption) => {
        hudHandler.show('Loading')
        let filter = '';
        if (filterOption == RESENTLYBOOKMARK) {
            filter = JSON.stringify({"user_id": '13', "date":"2018-01-29","sort":""})
        }else if (filterOption == PRICEBOOKMARK) {
            filter = JSON.stringify({"user_id": '13', "date":"","sort":"price"})
        }
        fetch(api.urls.bookmarks_list, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // "user_id": gstate.user_id
            body: filter,
        })
            .then((response) => response.json())
            .then((json) => {
                hudHandler.hide()
                if (json.status_code == 1) {
                    bookingData = json.data
                    this.setState({data: json.data})
                    dropHandler.showSuccess(consts.appName, json.message);
                } else {
                    dropHandler.showError(consts.appName, json.message);
                }
            })
    }
    onSearch = (search) => {
        this.setState({search})
        var arrary = []
        for(var i=0; i < bookingData.length; ++i) {
            var person_i = bookingData[i];
            if(person_i["deal_name"].toUpperCase().indexOf(search.toUpperCase()) > -1) {
                arrary.push(person_i)
            }
        }
        this.setState({data: arrary})
    }
    emputyView = () => (
        <View style={styles.container}>
            <Image style={styles.bookmarsEmputyImage}
                   source={require('../../../assets/shared/images/bookmarks_emputy.png')}/>
            <Text style={styles.bookmarsTitle}>No Bookmarks Yet!</Text>
            <Text style={styles.bookmarsContents}>Add deals you want to use in future to your list. They will appear here.</Text>
        </View>
    )
    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                // destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            (buttonIndex) => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
            });
    }
    bookmarksListView = (data) => {
        var markImage = data.deal_image.split("//")[1]
        return(
            <View style={styles.bookmarksView}>
                <View style={styles.bookmarksDetailView}>
                    <Text style={[styles.dealName, {marginBottom: 2}]} numberOfLines={1}>{data.deal_name}</Text>
                    <Text style={[styles.shopName, {marginBottom: 2}]}>{data.shop_name}</Text>
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
                            <Text style={styles.bookDiscount}>{data.discount_price}$</Text>
                            <Text style={styles.bookOrigin}>   instead of   </Text>
                            <Text style={styles.bookOriginPrice}>{data.original_price}$   </Text>
                            <View style={{width: 94, height: 24, borderRadius: 12, backgroundColor: '#E6BB46', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.bookGold}>15$ for Gold</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.onClick}>
                    <View style={styles.button} >
                        <Text style={styles.buttonText}>Remove Bookmark</Text>
                        <Icon />
                    </View>
                </TouchableWithoutFeedback>
                <View style={{width: '100%',borderWidth:1, borderColor: '#D5D5D5', marginVertical: 30}} />
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#E4E4E4', width: '100%', marginHorizontal: 10, marginBottom: 20,}}>
                    <TextInput
                        style={styles.bookmarksSearchInput}
                        onChangeText={this.onSearch}
                        value={this.state.search}
                        placeholder={'Search within your Bookmarks'}
                    />
                </View>
                <View style={{}}>
                    <FlatList
                        ref={(ref) => { this.flatListRef = ref; }}
                        data={this.state.data}
                        renderItem={({item}) => this.bookmarksListView(item)}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={() => ( <View style={{ height: 136 }} /> )}
                    />
                </View>
            </View>
        );
    }
}

export default BookMarks;

