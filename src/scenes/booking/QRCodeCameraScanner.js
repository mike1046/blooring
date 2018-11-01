import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, FlatList, Modal, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handler } from '@redux';
import gstate from '../../common/states'
import api from '../../common/api';
const { navigation: navHandler, main: mainHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;
class QRCodeCameraScanner extends Component{
    componentWillMount(){
        mainHandler.changeModal(false)
    }
    onSuccess = (e) => {             
        fetch(api.urls.scan, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"booking_id":this.props.booking_id}),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data.status_code == 1) {
                mainHandler.changeModal(true)
                navHandler.navback()
            } else {
                dropHandler.showError(consts.appName, json.message);
            }
            hudHandler.hide()
        })
    }
    render() {        
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                topContent={(
                    <Text style={styles.centerText}>
                        Blooring
                    </Text>
                )}
                bottomContent={(
                    <TouchableOpacity style={styles.buttonTouchable} onPress={()=>navHandler.navback()}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },

    textBold: {
        fontWeight: '500',
        color: '#000',
    },

    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },

    buttonTouchable: {
        padding: 16,
    },
});

const mapStateToProps = state => ({
    booking_id : state.main.bookingId
})
export default connect(mapStateToProps)(QRCodeCameraScanner);

