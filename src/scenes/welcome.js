
import React, { Component } from 'react';
import { View, Text, Image, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';

import styles from '../styles/welcome'
import PageControl from '../components/PageControl'

const {width, height} = Dimensions.get('window');

const { navigation: navHandler } = handler;

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        };
    }

    onScroll = (event) => {
        var offsetX = event.nativeEvent.contentOffset.x,
        pageWidth = width;
        this.setState({
          currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <ScrollView
                        ref="ad"
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        onScroll={this.onScroll}
                        scrollEventThrottle={16}
                    >
                        <View style={{width:width,  height:height - 70, alignItems:'center', flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row', width:width, height: height/2}}><Image style={{width: width,resizeMode: 'center', marginTop: -150}} source={require('../../assets/shared/images/welcome.png')}/></View>
                            <View style={{height: 60}} />
                            <Text style={{fontSize: 30, color: '#0784DC', margin: 20, fontWeight: '500'}}>WELCOME</Text>
                            <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '300', color: 'grey', marginBottom: 3}}>Shufi is a system that gives you</Text>
                            <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '300', color: 'grey', marginBottom: 3}}>suggestion for the offers Nearby your</Text>
                            <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '300', color: 'grey'}}>position by using your GPS system</Text>
                        </View>
                        <View style={{width:width,  height:height - 70, alignItems:'center'}}>
                        <View style={{flexDirection: 'row', width:width, height: height/2}}><Image style={{width: width,resizeMode: 'center', marginTop: -150}} source={require('../../assets/shared/images/welcome.png')}/></View>
                            <View style={{height: 60}} />
                            <Text style={{fontSize: 30, color: 'rgb(0, 137, 215)', margin: 20, fontWeight: '500'}}>WELCOME</Text>
                            <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '300', color: 'grey', marginBottom: 3}}>Shufi is a system that gives you</Text>
                            <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '300', color: 'grey', marginBottom: 3}}>suggestion for the offers Nearby your</Text>
                            <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '300', color: 'grey'}}>position by using your GPS system</Text>
                        </View>
                        <View style={{width:width,  height:height - 70, alignItems:'center'}}>
                        <View style={{flexDirection: 'row', width:width, height: height/2}}><Image style={{width: width,resizeMode: 'center', marginTop: -150}} source={require('../../assets/shared/images/welcome.png')}/></View>
                            <View style={{height: 60}} />
                            <Text style={{fontSize: 30, color: 'rgb(0, 137, 215)', margin: 20, fontWeight: '500'}}>WELCOME</Text>
                            <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '300', color: 'grey', marginBottom: 3}}>Shufi is a system that gives you</Text>
                            <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '300', color: 'grey', marginBottom: 3}}>suggestion for the offers Nearby your</Text>
                            <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '300', color: 'grey'}}>position by using your GPS system</Text>
                        </View>
                    </ScrollView>
                    <PageControl
                        style={{ position:'absolute', left:0, right:0, bottom:35, alignItems:'center', justifyContent: 'center', flexDirection: 'row' }}
                        numberOfPages={3} currentPage={this.state.currentPage}
                        hidesForSinglePage
                        pageIndicatorTintColor='gray'
                        indicatorSize={{ width:8, height:8 }}
                        currentPageIndicatorTintColor='rgb(0, 137, 215)'
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>navHandler.navigate({ routeName: routeNames.app.interests })}>
                    <Text style={styles.getstart}>Get Started</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
