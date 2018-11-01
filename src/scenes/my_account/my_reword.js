import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Dimensions, ScrollView, TouchableWithoutFeedback, Modal, Linking} from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';
import Pie from 'react-native-pie'
import ShareButton from '../../components/ShareButton'
import moment from 'moment';
import {
    shareOnFacebook,
    shareOnTwitter,
} from 'react-native-social-share';
import styles from '../../styles/my_reword'
import gstate from '../../common/states'
import Header from '../../components/Header'
import { consts } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../common/api';

const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;

class MyReword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            quantiy: 1,
            deailsDetail: 0,
            modalVisible: false,
            points:0
        }
    }
    componentWillMount(){
        fetch(api.urls.get_reward_points, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"user_id": gstate.user_id}),
        })
            .then((response) => response.json())
            .then((json) => {
                hudHandler.hide()

                if (json.status_code == 1) {
                    this.setState({points:json.data.points})
                    dropHandler.showSuccess(consts.appName, json.message);
                } else {
                    dropHandler.showError(consts.appName, json.message);
                }
            })
    }
    getPoint = () => {
        fetch(api.urls.share_app, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"user_id": gstate.user_id}),
        })
            .then((response) => response.json())
            .then((json) => {
                hudHandler.hide()
                if (json.status_code == 1) {
                    dropHandler.showSuccess(consts.appName, json.message);
                } else {
                    dropHandler.showError(consts.appName, json.message);
                }
            })
    }
    onNearbyDeals = () => {
        navHandler.navback()
        mainHandler.changeTabBar(0)
    }
    tweet = () => {
        shareOnTwitter({
                'text':'Global democratized marketplace for art',
                'link':'https://artboost.com/',
                'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
                //or use image
                'image': 'artboost-icon',},
            (results) => {
                this.setState({modalVisible: false})
                this.getPoint()
                console.warn(results);
            });
    }
    facebook = () => {
        shareOnFacebook({
                'text':'Global democratized marketplace for art',
                'link':'https://artboost.com/',
                'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
                //or use image
                'image': 'artboost-icon',
            },
            (results) => {
                this.setState({modalVisible: false})
                this.getPoint()
                console.warn(results);
            });
    }
    instagram = () => {
        let encodedURL = encodeURIComponent('https://pixabay.com/en/image-editing-ebv-unleashed-101040/');
        let instagramURL = `instagram://library?AssetPath=${encodedURL}`;
        Linking.openURL(instagramURL);
        this.setState({modalVisible: false})
        this.getPoint()
    }
    pinterest = () => {
        this.setState({modalVisible: false})
        Linking.openURL('https://www.pinterest.com/')
        this.getPoint()
    }
    googleplus = () => {
        this.setState({modalVisible: false})
        Linking.openURL('https://plus.google.com')
        this.getPoint()
    }
    _renderModal = () => (
        <Modal
            visible={this.state.modalVisible}
            animationType={'fade'}
            onRequestClose={this.scanCloseModal}
            transparent
        >
            <View style={styles.shareModal}>
                <View style={styles.shareModalContainer}>
                    <Text style={styles.shareModalContainerText}>Share it with your Friend and get <Text style={{color : '#0784DC'}}>50 Point</Text></Text>
                    <ShareButton onPress={this.facebook} ShareText="Share on Facebook" background="#3B5998" iconname="logo-facebook" iconcolor="white"/>
                    <ShareButton onPress={this.tweet} ShareText="Share on Twitter" background="#1DA1F2" iconname="logo-twitter" iconcolor="white"/>
                    <ShareButton onPress={this.instagram} ShareText="Share on Instagram" background="rgb(241, 168, 86)" iconname="logo-instagram" iconcolor="white"/>
                    <ShareButton onPress={this.googleplus} ShareText="Share on Google Plus" background="#DB4437" iconname="logo-googleplus" iconcolor="white"/>
                </View>
            </View>
        </Modal>
    )
    render() {
        return (
            <View style={styles.container}>
                <Header title={'REWORDS'} leftIcon="ios-arrow-back" onLeftClick={()=>navHandler.navback()} onRightClick={()=>{}}/>
                <View style={styles.no_rewards}>
                    <Text style={styles.no_rewardsText}>NO REWARDS YET!</Text>
                    <Image style={styles.rewardsImage} source={require('../../../assets/shared/icons/rewards.png')}/>
                </View>
                <View style={{marginTop: 20, marginBottom: 10, flexDirection: 'row'}}>
                    <Text style={styles.no_rewardsText}>BUT YOU ARE DOING WELL</Text>
                </View>
                <View style={styles.chart_view}>
                    <View style={{flexDirection: 'row', borderColor: '#E2E2E2', borderBottomWidth: 1, flex: 5}}>
                        <View style={{width: 100, alignItems: 'center', justifyContent:'center'}}>
                            <Image  resizeMode='stretch' style={styles.chartBackImage} source={require('../../../assets/shared/images/rewards_well.png')}/>
                        </View>
                        <View style={{flexDirection: 'column', flex:1}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.totalpoint}>{this.state.points}</Text>
                                <Text style={styles.totalpointText}>Total Point</Text>
                            </View>
                            <View style={{borderWidth: 1, borderColor: '#E2E2E2', height:1, marginVertical:10}} full></View>
                            <View style={styles.content_reward}>
                                <View style={styles.needpointView}>
                                    <Text style={styles.needpoint}>You need 500 points top get</Text>
                                    <Text style={styles.needpointText}>GOLEN MEMBERSHIP</Text>
                                </View>
                                <View style={styles.backIcon}>
                                    <Ionicons name="ios-arrow-forward-outline" size={30} color="grey" style={{backgroundColor: '#00000000'}}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{borderWidth: 1, borderColor: '#E2E2E2', height:1, marginVertical:10}} full></View>
                        <View style={{flex: 2, flexDirection: 'column'}}>
                            <View style={styles.processbarContainerText}>
                                <View style={styles.processbarContentText}>
                                    <Text style={styles.textProcess}>0</Text>
                                    <Text style={styles.textProcess}>2500</Text>
                                </View>
                                <View style={{flex:500, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                    <Ionicons name="ios-arrow-forward-outline" size={10} color="grey" style={{backgroundColor: 'transparent'}}/>
                                    <Text style={[styles.textProcess, {color: '#EAEAEA'}]}>3000</Text>
                                </View>
                            </View>
                            <View style={styles.processbarContainer}>
                                <View style={styles.processbarContent}>
                                </View>
                                <View style={{flex:500}}>
                                </View>
                            </View>
                    </View>
                </View>
                <Text style={{margin:20, textAlign: 'center', color: '#181818'}}>Collect point by booking deals and sharing your friends to get rewards</Text>
                <TouchableOpacity style={styles.nearbydealsButton} onPress={this.onNearbyDeals}>
                    <Text style={styles.nearbydealsButtonText}>Browse Nearby Deals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nearbydealsButton} onPress={()=>this.setState({modalVisible: true})}>
                    <Text style={styles.nearbydealsButtonText}>Share</Text>
                    <Image style={styles.shareImage} source={require('../../../assets/shared/icons/other.png')}/>
                </TouchableOpacity>
                {this._renderModal()}
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReword);/**
 * Created by smartdev on 2/6/18.
 */
