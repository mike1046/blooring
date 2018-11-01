import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, FlatList, Modal, TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { handler } from '@redux';
import { routeNames } from '@routes';
import styles from '../../styles/history'
import gstate from '../../common/states'
import { consts } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;
var historyData
class History extends Component{
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }
    componentWillMount(){

    }
    onBookSearch = (search) => {
    }
    onClickedNearbyDeals = () => {
    }
    scanCloseModal = () => {
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.image} >
                    <Image resizeMode='stretch' source={require('../../../assets/shared/images/history_logo.png')} style={{width:248, height:258}} />
                </View>
                <View style={styles.textContent}>
                    <Text style={[styles.text, {fontSize: 20}]} >No History Yet</Text>
                    <View style={{height: 10}} />
                    <Text style={[styles.text, {fontSize: 14}]} >After booked and used deals, they will</Text>
                    <Text style={[styles.text, {fontSize: 14}]} >move on to history</Text>
                </View>
                <View style={{}}>
                    <TouchableWithoutFeedback onPress={this.onClickedNearbyDeals}>
                        <View style={styles.button}>
                            <Text style={styles.buttontext}>Browse Nearby Deals</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
