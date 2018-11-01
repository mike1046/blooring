import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Dimensions, ScrollView, TouchableWithoutFeedback, TouchableHighlight, StyleSheet, Modal, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../styles/membership'
import gstate from '../../common/states'
import Header from '../../components/Header'
import { consts } from '../../theme';
import LinearGradient from 'react-native-linear-gradient'
const {width, height} = Dimensions.get('window');
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;
import PageControl from '../../components/PageControl'
import api from '../../common/api';

class MemberShip extends Component{
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
          currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1
        });
    }
    buttonPressed = () => {
        fetch(api.urls.upgrade_membership, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: '{"user_id":'+gstate.user_id+'}',
        })
            .then((response) => response.json())
            .then((json) => {
                hudHandler.hide()
                if (json.status_code == 1) {
                    dropHandler.showSuccess(consts.appName, json.message);
                }else{
                    dropHandler.showError(consts.appName, json.message);
                }
            })
            .catch(() => {
                hudHandler.hide()
                console.warn('ERROR GETTING DATA FROM FACEBOOK')
            })
    }
    onGoldMembershipClick = () => {
        this.setState({modalVisible: true});
    }
    onMembershipSubscribeCick = () => {
        alert('Membership Subscribe')
    }
    onClickCancel = () => {
        this.setState({modalVisible: false});
    }
    render() {
        return (
            <View  style={{flex:1, backgroundColor: 'white'}}>
                <Header title={'MEMBERSHIP'} leftIcon="ios-arrow-back" onLeftClick={()=>navHandler.navback()} onRightClick={()=>{}}/>
                <ImageBackground style={styles.background} source={require('../../../assets/shared/images/membership.jpg')}>
                    <View style={styles.container} >
                        <Image source={require('../../../assets/shared/images/star_logo.png')} style={styles.star_logo}/>
                        <Text style={styles.headingText}>Shufi</Text>
                        <Text style={styles.headingText}>Membership</Text>
                        <View style={styles.underlineView}/>
                        <Text style={[styles.toptext, {marginTop: 15}]}>We are on a mission to find you the best</Text>
                        <Text style={styles.toptext}>deals and put them on your hands</Text>
                        <Text style={[styles.toptext, {marginTop: 15}]}>Get points, rewards and unbelievable</Text>
                        <Text style={styles.toptext}>discount for all deal</Text>

                        <Text style={{fontSize: 20, color: '#414042', fontWeight:'400', marginTop:20, marginBottom:15}}>30$ / Year </Text>
                        <Text style={{fontSize: 18, color: '#0784DC', fontWeight: '400', marginBottom: 20}}>Upgrade your Membership</Text>

                        <TouchableOpacity onPress={this.onGoldMembershipClick}>
                            <LinearGradient
                                start={{x:0, y:1}}
                                end= {{x:1, y:1}}
                                colors={['#ECB150', '#F2CD73', '#ECB150']}
                                style={{width: 280, height: 50, borderRadius: 25, marginBottom: 20}}
                            >
                                <View style={{width: 280, height: 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize:20, color: 'white', fontWeight: '400'}}>Gold Member</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.onMembershipSubscribeCick()}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView
                            ref="ad"
                            pagingEnabled
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            onScroll={this.onScroll}
                            scrollEventThrottle={16}
                            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                        >
                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <View style={styles.innerContainer}>
                                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
                                        <Text style={styles.subscribeTitle}>What do</Text>
                                        <Text style={styles.subscribeTitle}>Gold Members get for</Text>
                                        <Text style={[styles.subscribeTitle, {color: '#0784DC', fontSize: 24}]}>30$ / Year</Text>
                                    </View>
                                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
                                        <Image style={styles.innerIcon} source={require('../../../assets/shared/images/membershipSubscribe_logo.png')}/>
                                    </View>
                                    <Text style={[styles.subscribeTitle, {fontSize: 20, marginBottom: 15}]}>50% Discount</Text>
                                    <Text style={[styles.subscribeTitle, {fontSize: 14, marginBottom: 30}]}>You will get 50% discount on all deals</Text>

                                    <PageControl
                                        style={{alignItems:'center', justifyContent: 'center', flexDirection: 'row' }}
                                        numberOfPages={4} currentPage={this.state.currentPage}
                                        hidesForSinglePage
                                        pageIndicatorTintColor='gray'
                                        indicatorSize={{ width:8, height:8 }}
                                        currentPageIndicatorTintColor='rgb(0, 137, 215)'
                                    />

                                    <TouchableOpacity style={styles.continueButton} onPress={this.onMembershipSubscribeCick}>
                                        <Text style={styles.continueText}>CONTINUE</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.cancelButton} onPress={this.onClickCancel}>
                                    <Text style={styles.cancelText}>CANCEL</Text>
                                </TouchableOpacity>                                
                            </View>
                        </ScrollView>

                    </View>
                </Modal>
            </View>
            
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberShip);
