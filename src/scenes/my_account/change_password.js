import React, { Component } from 'react';
import _ from 'lodash'
import { View, TextInput, Text, TouchableOpacity, Image, Dimensions, ScrollView, TouchableWithoutFeedback, Modal} from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';
import styles from '../../styles/SiginUp'
import gstates from '../../common/states'
import Header from '../../components/Header'
import { consts } from '../../theme';
import api from '../../common/api';
const {width, height} = Dimensions.get('window');
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;

class ChagePassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current_pass: '',
            new_pass: '',
            verify_pass: ''
        }
    }
    save = () => {
        const {current_pass, new_pass, verify_pass} = this.state

        if (_.isEmpty(current_pass)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter Current Password');
        }

        if (_.isEmpty(new_pass)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter New Password');
        }

        if (_.isEmpty(verify_pass)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter Verify New Password');
        }

        if (new_pass != verify_pass) {
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'New Password and Verify New Password have to same');
        }

        if (!_.isEmpty(current_pass) && !_.isEmpty(new_pass) && !_.isEmpty(verify_pass) && (new_pass == verify_pass)){
            const sign_parm = JSON.stringify({
                "user_id": gstates.user_id,
                "password":new_pass,
                "old_password": current_pass,
            })
            hudHandler.show('Loading')
            fetch(api.urls.change_password, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: sign_parm,
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
    }
    render() {
        return (
            <View style={styles.container}>
                <Header title={'CHANGE PASSWORD'} leftIcon="ios-arrow-back" onLeftClick={()=>navHandler.navback()} onRightClick={()=>{}}/>
                <View style={styles.passwordChangeView}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.name}>CURRENT PASSWORD</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.textPasswordChange}
                            secureTextEntry={true}
                            onChangeText={(current_pass) => this.setState({current_pass})}
                            value={this.state.current_pass}
                        />
                    </View>
                </View>
                <View style={styles.signupView}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.name}>NEW PASSWORD</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.textPasswordChange}
                            secureTextEntry={true}
                            onChangeText={(new_pass) => this.setState({new_pass})}
                            value={this.state.new_pass}
                        />
                    </View>
                </View>
                <View style={styles.signupView}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.name}>VERIFY NEW PASSWORD</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.textPasswordChange}
                            secureTextEntry={true}
                            onChangeText={(verify_pass) => this.setState({verify_pass})}
                            value={this.state.verify_pass}
                        />
                    </View>
                </View>

                <TouchableOpacity style={{width: width, height: 55, position: 'absolute', left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center',  backgroundColor:'rgb(0, 137, 215)',}}
                                  onPress={this.save}
                >
                    <Text style={{color: 'white', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '400'}}>Update</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(ChagePassword);