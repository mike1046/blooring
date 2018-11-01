import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'

const { navigation: navHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;

class Header extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {onRightClick, title, leftIcon, rightIcon, rightText, onLeftClick, tabbarSate} = this.props
        return (
            <View style={styles.container}>
                <View style = {styles.topHeader}>
                    <View style={styles.iconContent}>
                        <TouchableOpacity onPress={()=>onLeftClick()} style={{flex:1}}>
                            <Icon name={leftIcon} size={25} color="#ffffff" />
                        </TouchableOpacity>
                        <Text style={styles.titleText}>{title}</Text>
                        <TouchableOpacity onPress={()=>onRightClick()} style={{flex:1, alignItems: 'flex-end'}}>
                            {rightIcon && <Icon name={rightIcon} size={25} color="#ffffff" />}
                            {rightText && <Text style={styles.doneText}>Done</Text>}
                            {tabbarSate == 0 && <Icon name={'ios-search'} size={25} color="#ffffff" />}
                            {tabbarSate == 2 && <Icon name={'ios-share-outline'} size={25} color="#ffffff" />}
                            {tabbarSate == 3 && <Text style={styles.doneText}>Sort</Text>}
                            {tabbarSate == 4 && <Text style={styles.doneText}>Sort</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default Header;

