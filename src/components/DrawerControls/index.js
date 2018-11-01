import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
const { width, height } = Dimensions.get('window');

const { navigation: navHandler, main: mainHandler } = handler;

const hotDeals = 0;
const bookedDeals = 2;
const myaccount = 1;
const bookMarks = 3;
const history = 4;
const nearbyDealys = 5;
const tutorial = 6;
const logout = 7;
const goldMember = 8;
class DrawerControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            logout: true,
        }
    }
    onLogout() {
        this.setState({ logout: false })
        this.props.closeControlPanel(logout)
    }

    render() {
        const { closeControlPanel } = this.props
        return (
            <View style={styles.container}>
                {this.state.logout && <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => closeControlPanel(myaccount)}>
                        <View style={styles.headerView}>
                            <Text style={styles.bashar}>Bashar Nassour</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainView} onPress={() => closeControlPanel(nearbyDealys)}>
                        <Image style={styles.iconSize} source={require('../../../assets/shared/icons/nearbydeals.png')} />
                        <View style={styles.mainTextView}>
                            <Text style={styles.mainText}>Nearby Deals</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainView} onPress={() => closeControlPanel(hotDeals)}>
                        <Image style={styles.iconSize} source={require('../../../assets/shared/icons/hotdeals.png')} />
                        <View style={styles.mainTextView}>
                            <Text style={styles.mainText}>Hot Deals</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainView} onPress={() => closeControlPanel(bookedDeals)}>
                        <Image style={styles.iconSize} source={require('../../../assets/shared/icons/bookdeals.png')} />
                        <View style={styles.mainTextView}>
                            <Text style={styles.mainText}>Booked Deals</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainView} onPress={() => closeControlPanel(myaccount)}>
                        <Image style={styles.iconSize} source={require('../../../assets/shared/icons/myaccount.png')} />
                        <View style={styles.mainTextView}>
                            <Text style={styles.mainText}>My Account</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainView} onPress={() => closeControlPanel(history)}>
                        <Image style={styles.iconSize} source={require('../../../assets/shared/icons/history.png')} />
                        <View style={styles.mainTextView}>
                            <Text style={styles.mainText}>History</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainView} onPress={() => this.onLogout()}>
                        <Image style={styles.iconSize} source={require('../../../assets/shared/icons/logout.png')} />
                        <View style={styles.mainTextView}>
                            <Text style={styles.mainText}>Log Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {closeControlPanel(myaccount); navHandler.navigate({ routeName: routeNames.app.membership })}}>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#ECB150', '#F2CD73', '#ECB150']}
                        style={{ width: 266, height: 58, borderRadius: 25, marginBottom: 40 }}
                    >
                        <View style={{ flexDirection: 'row', height: 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../../../assets/shared/icons/star.png')} />
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: '400' }}>Gold Member</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerControls);
