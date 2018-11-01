import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Dimensions, ScrollView, TouchableWithoutFeedback, Switch} from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';
import moment from 'moment';
import geolib from 'geolib'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import MapView from 'react-native-maps';
import styles from '../../styles/setting'
import gstate from '../../common/states'
import Header from '../../components/Header'
import PageControl from '../../components/PageControl'
import { consts } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            changeEmail: true,
            notificaiton: true
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title={'Settings & Notifications'} leftIcon="ios-arrow-back" onLeftClick={()=>navHandler.navback()} onRightClick={()=>{}}/>
                <View style={styles.preferenceView}>
                    <Text style={styles.preferenceText}>NOTIFICATIONS</Text>
                </View>
                <View style={styles.publicView}>
                    <Text style={styles.publicText}>Annooucement & Promotion Email</Text>
                    <Switch
                        onValueChange={ (changeEmail) =>this.setState({ changeEmail})}
                        value={ this.state.changeEmail }
                    />
                </View>
                <View style={styles.publicView}>
                    <Text style={styles.publicText}>Mobile Push Notifications</Text>
                    <Switch
                        onValueChange={ (notificaiton) =>this.setState({ notificaiton })}
                        value={ this.state.notificaiton }
                    />
                </View>
                <View style={styles.preferenceView}>
                    <Text style={styles.preferenceText}>LEGAL</Text>
                </View>
                <TouchableOpacity>
                    <View style={styles.commonView}>
                        <Text style={styles.sliderText}>Privacy Policy</Text>
                        <Icon name="ios-arrow-forward-outline" size={30} color="#C9C9CE" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.commonView}>
                        <Text style={styles.sliderText}>Terms of Service</Text>
                        <Icon name="ios-arrow-forward-outline" size={30} color="#C9C9CE" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.commonView}>
                        <Text style={styles.sliderText}>Licenses</Text>
                        <Icon name="ios-arrow-forward-outline" size={30} color="#C9C9CE" />
                    </View>
                </TouchableOpacity>
                <View style={styles.preferenceView}>
                    <Text style={styles.preferenceText}>CONTACT US</Text>
                </View>
                <TouchableOpacity>
                    <View style={styles.commonView}>
                        <Text style={styles.sliderText}>Help & Support</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
