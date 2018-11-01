import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { FBLoginManager } from 'react-native-facebook-login';
import { routeNames } from '@routes';
import styles from '../styles/Main'
import Header from '../components/Header'
import Drawer from 'react-native-drawer'
import DrawerControls from '../components/DrawerControls/index';
import gstate from '../common/states'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HotDeals from './hot_deals'
import Booking from './booking'
import MyAccount from './my_account'
import BookMarks from './bookmarks'
import History from './history'
import GoldMember from './my_account/membership'
import HideView from '../components/hideView'

const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;


const hotDeals = 0;
const bookedDeals = 2;
const myaccount = 1;
const bookMarks = 3;
const history = 4;
const nearbyDealys = 5;
const tutorial = 6;
const logout = 7;
const goldMember = 8;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideBottomMenu: false
        }
    }
    componentWillMount() {
        StatusBar.setBarStyle('light-content', true);
    }
    onChangeTabBar(id) {
        mainHandler.changeTabBar(id)
    }
    closeControlPanel = (id) => {
        switch (id) {
            case nearbyDealys:
                mainHandler.changeTabBar(0)
                this._drawer.close()
                break;
            case tutorial:
                this._drawer.close()
                break;
            case logout:
                this.logout()             
                break;
            default:
                mainHandler.changeTabBar(id)
                this._drawer.close()
        }        
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    logout = () => {
        FBLoginManager.logout((error, data) => {
            if(!error){                                              
                console.log('logout success') 
            } else {
                console.log('facebook logout failed') 
            }
            AsyncStorage.clear(); 
            navHandler.popTo(0)
        })  
    }
    render() {
        const { tabbar, tabbarSate, tabbarName } = this.props
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                tapToClose={true}
                openDrawerOffset={0.1} // 20% gap on the right side of drawer
                panCloseMask={0.1}

                content={<DrawerControls closeControlPanel={this.closeControlPanel} />}
            >
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <Header title={tabbarName.toUpperCase()} leftIcon="ios-menu" tabbarSate={tabbarSate} onLeftClick={this.openControlPanel} onRightClick={() => { }} />
                        {tabbarSate == 0 && <HotDeals />}
                        {tabbarSate == 1 && <MyAccount />}
                        {tabbarSate == 2 && <Booking />}
                        {tabbarSate == 3 && <BookMarks />}
                        {tabbarSate == 4 && <History />}
                    </View>
                    <HideView hide={tabbarSate==1?true:false}>
                        <View style={styles.mainBottom}>
                            {tabbar.map((tapbar, i) => (
                                <TouchableOpacity key={i} style={{ flex: 1, alignItems: 'center' }} onPress={() => this.onChangeTabBar(i)}>
                                    {i == 4 ? <FontAwesome name={tapbar.icon} size={35} color={tapbar.selected ? 'rgb(0, 137, 215)' : 'rgb(188, 193, 201)'} /> :
                                        <Ionicons name={tapbar.icon} size={35} color={tapbar.selected ? 'rgb(0, 137, 215)' : 'rgb(188, 193, 201)'} />}
                                    <Text style={{ fontSize: 12, color: tapbar.selected ? '#000000' : 'rgb(188, 193, 201)' }}>{tapbar.text}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </HideView>
                </View>
            </Drawer>
        );
    }
}

const mapStateToProps = state => ({
    tabbar: state.main.tabbar,
    tabbarSate: state.main.tabbarSate,
    tabbarName: state.main.tabbarName,
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
