import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ImageBackground, ScrollView, Modal} from 'react-native';
import gstate from '../../common/states'
import styles from './style'
import Ionicons from 'react-native-vector-icons/Ionicons';
class ShareButton extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        const {onPress, ShareText, background, iconname, iconcolor} = this.props
        return (
            <TouchableOpacity style={[styles.sharebuttonView, {backgroundColor: background}]} onPress={onPress}>
                <Text style={[styles.sharebuttonText, ]}>{ShareText}</Text>
                <Ionicons  name={iconname} size={30} color={iconcolor} style={styles.shareIconImage}/>
            </TouchableOpacity>
        );
    }
}

export default ShareButton;

