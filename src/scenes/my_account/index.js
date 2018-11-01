import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ImageBackground, ScrollView, Modal, Linking} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    shareOnFacebook,
    shareOnTwitter,
} from 'react-native-social-share';
import { handler } from '@redux';
import { routeNames } from '@routes';
import styles from '../../styles/MyAccount'
import ShareButton from '../../components/ShareButton'
import gstate from '../../common/states'
import api from '../../common/api';
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;
class Account extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bookinglist: [],
            modalVisible: false
        }
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
    tweet = () => {
        shareOnTwitter({
           'text':'Global democratized marketplace for art',
           'link':'https://artboost.com/',
           'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
           //or use image
           'image': 'artboost-icon',},
        (results) => {
            this.setState({modalVisible: false})
            console.warn(results);
            this.getPoint()
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
            console.warn(results);
            this.getPoint()
        });
    }
    instagram = () => {
        this.getPoint()
        let encodedURL = encodeURIComponent('https://pixabay.com/en/image-editing-ebv-unleashed-101040/');
        let instagramURL = `instagram://library?AssetPath=${encodedURL}`;
        Linking.openURL(instagramURL);
        this.setState({modalVisible: false})

    }
    pinterest = () => {
        this.getPoint()
        this.setState({modalVisible: false})
        Linking.openURL('https://www.pinterest.com/')
    }
    googleplus = () => {
        this.getPoint()
        this.setState({modalVisible: false})
        Linking.openURL('https://plus.google.com')
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
                    <Text style={styles.shareModalContainerText}>Share it with your Friend and get <Text style={{color : 'rgb(0, 137, 215)'}}>50 Point</Text></Text>
                    <ShareButton onPress={this.facebook} ShareText="Share on Facebook" background="#3B5998" iconname="logo-facebook" iconcolor="white"/>
                    <ShareButton onPress={this.tweet} ShareText="Share on Twitter" background="#1DA1F2" iconname="logo-twitter" iconcolor="white"/>
                    <ShareButton onPress={this.instagram} ShareText="Share on Instagram" background="rgb(241, 168, 86)" iconname="logo-instagram" iconcolor="white"/>
                    <ShareButton onPress={this.pinterest} ShareText="Share on Pinterest" background="#BD081C" iconname="logo-pinterest" iconcolor="white"/>
                    <ShareButton onPress={this.googleplus} ShareText="Share on Google Plus" background="#DB4437" iconname="logo-googleplus" iconcolor="white"/>
                </View>
            </View>
        </Modal>
    )
    render() {
        var userInfo = gstate.userInfo
        return (
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground style={styles.profileImageView} source={require('../../../assets/shared/images/setting_background.png')}>
                        <Image style={styles.userProfieImage} source={{uri: "https:"+ userInfo.profile_image.split("//")[1]}}/>
                    </ImageBackground>
                    <TouchableOpacity style={styles.settingButton} onPress={()=>navHandler.navigate({ routeName: routeNames.app.changeaccount })}>
                        <Text style={styles.settingName}>{userInfo.fname} {userInfo.lname}</Text>
                        <Text style={styles.settingContentText}>{userInfo.email}</Text>
                        <Text style={styles.settingContentText}>Points score: <Text style={{color: '#0784DC'}}>{userInfo.points}</Text></Text>
                        <View style={{height: 15}} />
                        <Text style={styles.settingButtonText}>Change Account Info</Text>
                        <View style={{height: 5}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingButton}  onPress={()=>navHandler.navigate({ routeName: routeNames.app.membership })}>
                        <Text style={styles.settingButtonText}>Membership</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingButton}  onPress={()=>navHandler.navigate({ routeName: routeNames.app.changepassword })}>
                        <Text style={styles.settingButtonText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingButton} onPress={()=>navHandler.navigate({ routeName: routeNames.app.settings })}>
                        <Text style={styles.settingButtonText}>Settings & Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingButton} onPress={()=>navHandler.navigate({ routeName: routeNames.app.myreword })}>
                        <Text style={styles.settingButtonText}>My Reward</Text>
                    </TouchableOpacity>
                    <View style={styles.settingButton}>
                        <Text style={styles.getPint}>Get 50 Points</Text>
                        <Image style={styles.present} source={require('../../../assets/shared/icons/present.png')}/>
                        <Text style={styles.byShare}>By Sharing the app with your friend</Text>
                        <View style={{height:5}} />
                        <TouchableOpacity style={styles.shareButton} onPress={()=>this.setState({modalVisible: true})}>
                            <Text style={styles.shareButtonText}>Share</Text>
                            <Image style={styles.shareImage} source={require('../../../assets/shared/icons/other.png')}/>
                        </TouchableOpacity>
                    </View>
                    {this._renderModal()}
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);

