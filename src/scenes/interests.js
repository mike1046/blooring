import React, { Component } from 'react';
import _ from 'lodash'
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { handler } from '@redux';
import { routeNames } from '@routes';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/interests'
import { consts } from '../theme';
import GridView from '../components/GridView/GridView'
import gstate from '../common/states'
import Header from '../components/Header'
import api from '../common/api';

const { navigation: navHandler } = handler;
const { hud: hudHandler, drop: dropHandler } = handler.alert;
var ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const data = [
    {
        index:0,
        text: 'Food and beverages',
        image:require('../../assets/shared/icons/food.png'),
        selected: false,
    }
    , {
        index:1,
        text: 'Spa',
        image:require('../../assets/shared/icons/spa.png'),
        selected:false,
    }, {
        index:2,
        text: 'Outdoor Activities',
        image:require('../../assets/shared/icons/outdoor.png'),
        selected: false
    }, {
        index:3,
        text: 'Indoor Activities',
        image:require('../../assets/shared/icons/indoor.png'),
        selected: false
    }, {
        index:4,
        text: 'Sports',
        image:require('../../assets/shared/icons/sports.png'),
        selected: false
    }, {
        index:5,
        text: 'Technology',
        image:require('../../assets/shared/icons/technology.png'),
        selected: false
    }]
class Interests extends Component{
    constructor(props) {
        super(props);
        this.state = {
            search: '', pass: '', user: '',
            dataSource: data,
            cellWidth: 0,
            cellHeight: 0,
            selectedData: [],
        };
    }
    conpleteInterests = () => {
        const {dataSource, selectedData} = this.state
        if(selectedData.length != 0) {
            var selectdata = []
            for (var i = 0; i < dataSource.length; i++) {
                if (dataSource[i].selected) {
                    selectdata.push(dataSource[i].index)
                }
            }
            var selectedIDs = JSON.stringify(selectdata).substr(1, (selectdata.length) * 2 - 1)
            gstate.setInterests(selectedData)
            hudHandler.show('Loading')
            fetch(api.urls.save_user_interests, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"user_id": gstate.user_id, "interests_id": selectedIDs}),
            })
                .then((response) => response.json())
                .then((json) => {
                    hudHandler.hide()
                    if (json.status_code == 1) {
                        dropHandler.showSuccess(consts.appName, json.message);
                        navHandler.navigate({routeName: routeNames.app.main});
                    } else {
                        dropHandler.showError(consts.appName, json.message);
                    }
                })
        }else{
            dropHandler.showError(consts.appName, 'Please select item!');
        }
    }

    onSelect(cell){
        var data = this.state.dataSource;
        var selectedData = []
        for (var i = 0 ; i < data.length; i++){
            if (cell.index == data[i].index) {
                data[i].selected = !data[i].selected
            }

            if (data[i].selected){
                selectedData.push(data[i])
            }
        }
        this.setState({dataSource: data, selectedData: selectedData})
    }

    onSearch = (search) => {
        this.setState({search: search})
        var arrary = []
        for(var i=0; i < data.length; ++i) {
            var person_i = data[i];
            if(person_i["text"].indexOf(search) > -1) {
                arrary.push(person_i)
            }
        }
        this.setState({dataSource: arrary})
    }

    _renderCell = (cell) => {
        return (
            <TouchableOpacity style={styles.gridView} onPress={() => this.onSelect(cell)}>
                <Image style={{width: 80, height: 80, marginTop: 15, tintColor: cell.selected ? 'rgb(42, 139, 239)' : 'grey'}} source={cell.image}/>
                <Text style={{backgroundColor:'#00000000',textAlign:'center', color:cell.selected ? 'black' : 'grey',fontSize:17, marginTop: 15}}>{cell.text}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title={'INTERESTS'} leftIcon="ios-arrow-back" rightText="Done" onLeftClick={()=>navHandler.navback()} onRightClick={this.conpleteInterests} />
                <TextInput
                    style={styles.searchInput}
                    onChangeText={this.onSearch}
                    value={this.state.search}
                    placeholder={'Search within your interests'}
                >
                </TextInput>

                <View ref="container" style={styles.gridContain}>
                    <View style={{padding: 10, height: 50, alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgb(244, 244, 244)'}}>
                        <Text style={{flex:1, fontSize: 17}}>You have {this.state.selectedData.length} interests</Text>
                        <View style={{flexDirection: 'row'}}>
                            {this.state.selectedData.map((data, i) =>
                                <Image key={i} style={{width:30, height: 30, tintColor:'rgb(42, 139, 239)' }} source={data.image}/>
                            )}
                        </View>
                    </View>
                    <GridView
                        dataSource = {ds.cloneWithCells(this.state.dataSource, 2)}
                        spacing = {1}
                        style = {{padding:0}}
                        renderCell = {this._renderCell}
                    />
                    {this.state.dataSource.length == 0 &&
                    <View syle={{position: 'absolute', left:0, top: 0, bottom:0, right:0, alignItems: 'center',backgroundColor:'#000000'}}>
                        <Image style={{height: 350, width: 550}} source={require('../../assets/shared/images/emputysearch.png')}/>
                    </View>}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
