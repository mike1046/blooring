// import uniqueId from 'react-native-unique-id';
import { handler } from '@redux';
import settings from './settings';

const { main: mainHandler } = handler;

class AppStates {

  number: string = '';
  firstName: string = null;
  lastName: string = null;
  email: string = null;
  countrycode: Object = null;
  user_id: number = null;
  userInfo: Object = null;
  instestes: Object = null;
  category_id: Object = null;
  deails_detail: Object = null;
  category_name: string = null;
  phoneCode: string = null;
  country_code: string = null;
  latlong = {
      latitude: string = null,
      longitude: string = null,
  }

  constructor() {
    this.loadSetting();
  }

  async loadSetting() {
    settings.getCountryCode().then((res)=>{
      this.countrycode = JSON.parse(res)
    });

    this.user_id = await settings.getUserId();
    this.firstName = await settings.getFirstName();
    this.lastName = await settings.getLastName();
    this.email = await settings.getEmail();
    this.phoneCode = await settings.getPhoneCode();
    this.country_code = await settings.getCountry_Code();

    settings.getUserInfo().then((res)=>{
        this.userInfo = JSON.parse(res)
    });

    settings.getInterests().then(res=>{
      this.instestes = JSON.parse(res)
    })

    settings.getCategoryId().then(res => {
      this.category_item = JSON.parse(res)
    })
  }

  setCountryCode(data) {
    this.countrycode = data;
    settings.setCountryCode(data)
  }

  setUserId(data) {
    this.user_id = data;
    settings.setUserId(data)
  }

  setFirstName(data) {
    this.firstName = data;
    settings.setFirstName(data)
  }

  setLastName(data) {
    this.lastName = data;
    settings.setLastName(data)
  }
  setEmail(data) {
    this.email = data;
    settings.setEmail(data)
  }
  setUserInfo(data) {
    this.userInfo = data;
    settings.setUserInfo(data)
  }
  setInterests(data) {
    this.instestes = data;
    settings.setInterests(data)
  }

  setCategoryId(data) {
    this.category_item = data;
    settings.setCategoryId(data)
  }

  setPhoneCode(data) {
    this.phoneCode = data;
    settings.setPhoneCode(data)
  }

  setCountry_Code(data) {
    this.country_code = data
    settings.setCountry_Code(data)
  }
}

export default new AppStates();
