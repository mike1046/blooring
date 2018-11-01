import React, { Component } from 'react';
import _ from 'lodash'
import { View, TextInput, Text, TouchableOpacity, Image, Dimensions, ScrollView, TouchableWithoutFeedback, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';
import moment from 'moment';
import { consts } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/SiginUp'
import gstates from '../../common/states'
import Header from '../../components/Header'
const {width, height} = Dimensions.get('window');
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;
import ImagePicker from 'react-native-image-picker';
import api from '../../common/api';
class ChangeAccountInfo extends Component{
    constructor(props) {
        super(props);
        this.state = { fname: gstates.userInfo.fname, lname: gstates.userInfo.lname, email: gstates.userInfo.email, pass: '', phonenumber:gstates.userInfo.mobile_number, phoneCode: '961', phoneCodeArray:[], showcode: false, px:10, py:360};
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
    onImagePicker = () => {
        var options = {
            title: 'Select Avatar',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    save = () => {
        const {email, fname, name, phonenumber, phoneCode, lname} = this.state

        if (_.isEmpty(fname)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter your First Name');
        }

        if (_.isEmpty(email)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter your email');
        }

        if (_.isEmpty(lname)){
            hudHandler.hide();
            dropHandler.showError(consts.appName, 'Please Enter your Last Name');
        }

        if (!_.isEmpty(fname) && !_.isEmpty(email) && !_.isEmpty(lname)){
            const sign_parm = JSON.stringify({
                "user_id": gstates.user_id,
                "email":email,
                "fname": fname,
                "lname": lname,
                "datetime": moment(new Date(), 'DD/MM/YYYY', true).format('DD-MM-YYYY'),
                "phone_code": phoneCode,
                "mobile_number": phonenumber,
                "image": gstates.userInfo.profile_image
            })
            hudHandler.show('Loading')
            fetch(api.urls.edit_profile, {
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
    onSelectValue(){
        this.setState({showcode: true, px:0, py:0})
    }
    render() {
        var userInfo = gstates.userInfo
        var profileimage = {uri: "https:"+ userInfo.profile_image.split("//")[1]}
        if (this.state.avatarSource) {
            profileimage = this.state.avatarSource
        }
        return (
            <View style={styles.container}>
                <Header title={'CHANGE ACCOUNT INFO'} leftIcon="ios-arrow-back" onLeftClick={()=>navHandler.navback()} onRightClick={()=>{}}/>
                <View style={{}}>
                    <ImageBackground  style={{width: width, height: height/2.5 - 60, alignItems:'center', justifyContent: 'center'}} source={require('../../../assets/shared/images/change_account_info_background.png')}>
                        <View style={{width: 174, height: 174, borderRadius: 90}}>
                            <Image style={{width: 175, height: 175, borderRadius: 90}} source={profileimage}/>
                            <TouchableOpacity
                                style={{width: 40, height: 40, borderRadius: 25, backgroundColor:'rgb(0, 137, 215)', position: 'absolute', right: 5, bottom: 5, alignItems:'center', justifyContent: 'center'}}
                                onPress={this.onImagePicker}
                            >
                                <Icon name="ios-camera-outline" size={30} color="#ffffff" />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                    <View style={styles.signupView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>FIRST NAME</Text>
                        </View>
                        <TextInput
                            placeholderTextColor = '#747474'
                            style={styles.textinput}
                            onChangeText={(fname) => this.setState({fname})}
                            value={this.state.fname}
                        />
                    </View>
                    <View style={styles.signupView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>LAST NAME</Text>
                        </View>
                        <TextInput
                            placeholderTextColor = '#747474'
                            style={styles.textinput}
                            onChangeText={(lname) => this.setState({lname})}
                            value={this.state.lname}
                        />
                    </View>

                    <View style={styles.signupView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>EMAIL ADDRESS</Text>
                        </View>
                        <TextInput
                            placeholderTextColor = '#747474'
                            style={styles.textinput}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>

                    <View style={styles.signupView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>PHONE NUMBER</Text>
                        </View>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <TouchableOpacity ref="container" style={[styles.textinput, {width:70, justifyContent:'center'}]} onPress={()=>this.onSelectValue()}>
                                <Text style={[{fontSize: 17,}]}>+ {this.state.phoneCode}</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholderTextColor = '#747474'
                                style={[styles.textinput, {marginLeft: 10, flex: 1}]}
                                secureTextEntry={false}
                                onChangeText={(phonenumber) => this.setState({phonenumber})}
                                value={this.state.phonenumber}
                            />
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{width: width, height: 55, position: 'absolute', left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center',  backgroundColor:'rgb(0, 137, 215)',}}
                                    onPress={this.save}
                >
                    <Text style={{color: 'white', fontSize: 30}}>SAVE</Text>
                </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAccountInfo);

