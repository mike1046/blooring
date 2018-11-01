import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StatusBar, AsyncStorage, Image } from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';

import styles from '../styles/Splash'
import {gstates} from '../common'
import api from '../common/api';

const { navigation: navHandler } = handler;

class Splash extends Component{
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            gstates.latlong = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
        },
        (error) => alert({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    setTimeout(() => {
      if(gstates.instestes) {        
        navHandler.navigate({ routeName: routeNames.app.main })
      }
      if(!gstates.countrycode) {
        fetch(api.urls.get_country_code)
        .then((response) => response.json())
        .then((json) => {
            // console.warn('ok');
            gstates.setCountryCode(json.data)
        })
      }
    }, 300);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
            animated={true}
        />
        <ImageBackground style={styles.splashimage} source={require('../../assets/shared/images/splash.png')} >
          <View style={styles.containView}>
            <View style={{flex:1, alignItems: 'center'}}>
              <Image style={styles.appName} resizeMode='center'  source={require('../../assets/shared/images/shufi_logo.png')}></Image>
              <Text style={styles.appContent}>Get it the way you want it</Text>
            </View>
            <TouchableOpacity onPress={()=>navHandler.navigate({ routeName: routeNames.app.signup })}>
              <View style={styles.sinupButton}>
                  <Text style={styles.authButtonText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navHandler.navigate({ routeName: routeNames.app.login })}>
              <View style={styles.loginButton}>
                <Text style={styles.authButtonText}>Log In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
