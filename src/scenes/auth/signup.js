import React, { Component } from 'react';
import _ from 'lodash'
import { View, Image, Text, TouchableOpacity, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { handler } from '@redux';
import { routeNames } from '@routes';
import Icon from 'react-native-vector-icons/Ionicons';
import {gstates} from '../../common'
import { consts } from '../../theme';
import styles from '../../styles/SiginUp'
import api from '../../common/api';
const {width, height} = Dimensions.get('window');

const { navigation: navHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;
class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = { email: '', pass: '', name: '', phonenumber:'', phoneCode: '961', phoneCodeArray:[], showcode: false, px:10, py:360};
    }
    componentWillMount() {
        if(!gstates.countrycode) {
            fetch(api.urls.get_country_code)
                .then((response) => response.json())
                .then((json) => {
                    this.setState({phoneCodeArray: json.data})
                })
        }else {
            this.setState({phoneCodeArray: gstates.countrycode})
        }
    }
    onSignUp = () => {
        const {email, pass, name, phonenumber, phoneCode} = this.state

        if (_.isEmpty(pass)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter your pass');
        }

        if (_.isEmpty(email)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter your email');
        }

        if (_.isEmpty(name)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter your name');
        }

        if (!_.isEmpty(pass) && !_.isEmpty(email) && !_.isEmpty(name)){
            var cutname = name.split(" ");
            const sign_parm = JSON.stringify({
                "email":email, "password":pass, "fname": cutname[0],
                "lname": cutname[1], "datetime": moment(new Date(), 'DD/MM/YYYY', true).format('DD-MM-YYYY'),
                "phone_code":phoneCode,
                "mobile_number":phonenumber
            })
            hudHandler.show('Loading')
            fetch(api.urls.create_profile, {
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
                        navHandler.navigate({ routeName: routeNames.app.welcome });
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
    onSelectValue(){
        this.setState({showcode: true, px:0, py:0})
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style = {styles.topHeader}>
                        <TouchableOpacity style={styles.backButton} onPress={()=>navHandler.popTo(0)}>
                            <Icon name="md-close" size={25} color="#ffffff" />
                        </TouchableOpacity>
                        <Text style={styles.titleText}>SIGN UP</Text>
                    </View>

                    <View style={styles.signupView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>NAME</Text>
                            <Text style={styles.required}>REQUIRED</Text>
                        </View>
                        <TextInput
                            style={styles.textinput}
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                        />
                    </View>

                    <View style={styles.signupView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>EMAIL ADDRESS</Text>
                            <Text style={styles.required}>REQUIRED</Text>
                        </View>
                        <TextInput
                            style={styles.textinput}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>

                    <View style={styles.signupView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>PASSWORD</Text>
                            <Text style={styles.required}>REQUIRED</Text>
                        </View>
                        <TextInput
                            style={styles.textinput}
                            secureTextEntry={true}
                            onChangeText={(pass) => this.setState({pass})}
                            value={this.state.pass}
                        />
                    </View>

                    <TouchableOpacity onPress={this.onSignUp}>
                        <View style={styles.loginButton}>
                            <Text style={styles.authButtonText}>Sign up</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.bottomSignUP}>Already a member?</Text>
                        <TouchableOpacity onPress={()=>navHandler.navigate({ routeName: routeNames.app.login })}>
                            <Text style={{marginLeft: 5, fontSize: 20, color: 'rgb(42, 139, 239)'}}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    <View style={styles.line} />
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 13, color: 'grey', textAlign: 'center'}}>By using shufi, you agree to our Terms of services and Privacy Policy</Text>
                    </View>
                </View>
                {this.state.showcode &&
                <View style={{
                    position: 'absolute',
                    left: 10,
                    top: 360+50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0000000c'
                }}>
                    {this.state.phoneCodeArray.map((data, i) => (
                        <TouchableOpacity key={i} onPress={()=>this.setState({phoneCode: data.phone_code, showcode: false})}>
                            <Text style={[styles.textinput, {width: 70, fontSize: 17, textAlign: 'center' }]}>+ {data.phone_code}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);