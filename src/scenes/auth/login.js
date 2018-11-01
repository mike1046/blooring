import React, { Component } from 'react';
import _ from 'lodash'
import { View, ImageBackground, Text, TouchableOpacity, Image, TextInput, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import Geocoder from 'react-native-geocoder';
import { handler } from '@redux';
import { routeNames } from '@routes';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import {gstates} from '../../common'
import styles from '../../styles/Login'
import { consts } from '../../theme';
import api from '../../common/api'

const { navigation: navHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = { email: '', pass: '', country_code: ''};
    }

    componentWillMount() {
        Geocoder.geocodePosition({lat: gstates.latlong.latitude, lng: gstates.latlong.longitude})
        .then(res => {
            console.log('position', res[0].countryCode)
            this.setState({country_code: res[0].countryCode})
        })
        .catch(err => console.log(err))              
    }

    googleSignIn = () => {
        GoogleSignin.configure({
            iosClientId: "*********", // only for iOS
        })
        .then(() => {
            GoogleSignin.signIn()
                .then((user) => {
                    dropHandler.showSuccess(consts.appName, 'Register successfully.');
                    navHandler.navigate({ routeName: routeNames.app.welcome });
                    this.setState({user: user});
                })
                .catch((err) => {
                    console.log('WRONG SIGNIN');
                })
                .done();
        });
    }
    
    facebookLogin_api = (user) => {    
        var fb_login_param = JSON.stringify(
            {
                "email":user.email,
                "fname":user.first_name,
                "lname":user.last_name,
                "facebook_id":user.id,
                "datetime":dateFormat(new Date(), "yyyy-mm-dd hh:mm:ss"),
                "image":user.picture.data.url,
                "countrycode":this.state.country_code
            }
        )
        console.log('param', fb_login_param)
        fetch(api.urls.login_fb, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: fb_login_param,
        })
        .then((response) => { return response.json()})
        .then((json) => {
            hudHandler.hide()
            console.log('facebook user', json)
            if (json.status_code == 1) {
                gstates.setUserInfo(json.data)
                gstates.setUserId(json.data.id)
                gstates.setFirstName(json.data.fname)
                gstates.setLastName(json.data.lname)
                gstates.setEmail(json.data.email)
                dropHandler.showSuccess(consts.appName, json.message);
                navHandler.navigate({ routeName: routeNames.app.welcome });                
            }else if(json.status_code == 2){
                navHandler.navigate({ routeName: routeNames.app.welcome });                
            }
            else{
                dropHandler.showError(consts.appName, json.message);
            }
        })
        .catch(() => {
            hudHandler.hide()
            console.warn('ERROR GETTING DATA FROM FACEBOOK')
        })
        hudHandler.hide()
    }

    facebookLogin = () => {   
        var _this = this;
        hudHandler.show('Loading')                
        FBLoginManager.loginWithPermissions(["email"],function(error, data){
            if (!error) {                
                let api = `https://graph.facebook.com/v3.0/me?fields=id,email,first_name,last_name,picture{url}&access_token=${data.credentials.token}`                
                _this.setState({ user : data});
                    console.log('user', data)
                    fetch(api)
                    .then((response) => {
                        hudHandler.hide()
                        return response.json()                                                                            
                    })
                    .then(json => {
                        console.log('user', json)                                                                    
                        _this.facebookLogin_api(json) 
                    })                
                    .catch(() => {
                        hudHandler.hide()
                        reject('ERROR GETTING DATA FROM FACEBOOK')
                    })
            } else {
                console.log('error', error, data);
            }
        });
        hudHandler.hide()     
    }

    onLogin = () => {
        const {email, pass} = this.state
        if (_.isEmpty(pass)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter your pass');
        }

        if (_.isEmpty(email)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter your email');
        }

        if (!_.isEmpty(pass) && !_.isEmpty(email)){
            hudHandler.show('loading')
            const {email, pass} = this.state
            var login_parm = JSON.stringify({"email":email, "password":pass})
            console.log('email user', login_parm)
            fetch(api.urls.login, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: login_parm,
            })
            .then((response) => response.json())
            .then((json) => {
                hudHandler.hide();
                console.log('login user', json)
                if (json.status_code == 1) {
                    gstates.setUserInfo(json.data)
                    gstates.setUserId(json.data.id)
                    gstates.setFirstName(json.data.fname)
                    gstates.setLastName(json.data.lname)
                    gstates.setEmail(json.data.email)
                    for(var i = 0; i < gstates.countrycode.length; i++){
                        if(gstates.countrycode[i].country_id == json.data.country_id){
                            gstates.setPhoneCode(gstates.countrycode[i].phone_code)
                            gstates.setCountry_Code(gstates.countrycode[i].country_code)
                        }
                    }
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

    render() {        
        let _this = this
        return (
            <View style={styles.container}>
                <View style={{flex:4.5}}>
                    <View style = {styles.topHeader}>
                        <Image style={styles.topTitle} resizeMode='center' source={require('../../../assets/shared/images/login_shufi.png')} />
                        <TouchableOpacity style={styles.backbuttonView} onPress={()=>navHandler.popTo(0)}>
                            <Image resizeMode="contain" style={styles.backButton} source={require('../../../assets/shared/icons/back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.socialLogin}>
                        <TouchableOpacity style={styles.facebookView} onPress={this.facebookLogin}>
                            <View style={styles.facebookIcon}>
                                <Image resizeMode="contain" style={styles.facebookImageicon} source={require('../../../assets/shared/icons/facebook.png')} />
                            </View>
                            <View style={styles.facebookContent}>                                
                                <Text style={styles.socialText}>Log in with Facebook</Text>
                            </View>
                        </TouchableOpacity>
                    </View>                    
                    <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', marginHorizontal: 10, marginTop: 40, marginBottom: 30}}>
                        <View style={styles.lineView}>
                            <View style={styles.line} />
                            <Text style={styles.or}>OR</Text>
                            <View style={styles.line} />
                        </View>
                    </View>

                    <View style={{}}>
                        <TextInput
                            style={styles.textinput}
                            onChangeText={(email) => this.setState({email})}
                            placeholder = {'Email'}
                            value={this.state.email}
                        />
                        <TextInput
                            style={styles.textinput}
                            onChangeText={(pass) => this.setState({pass})}
                            secureTextEntry={true}
                            placeholder = {'Password'}
                            value={this.state.pass}
                        />
                        <TouchableOpacity onPress={this.onLogin}>
                            <View style={styles.loginButton}>
                                <Text style={styles.authButtonText}>Log In</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.forgot}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.bottomSignUP}>Dont't have an account? </Text>
                        <TouchableOpacity onPress={()=>navHandler.navigate({ routeName: routeNames.app.signup })}>
                            <Text style={{marginLeft: 5, fontSize: 20, color: 'rgb(42, 139, 239)'}}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineBottom} />
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 13, color: 'grey', textAlign: 'center'}}>By using Blooring, you agree to our Terms of services and Privacy Policy</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
