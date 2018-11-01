import { AsyncStorage } from 'react-native';

export default class AppSettings {

  static async getValue(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  static async getBoolean(key: string) {
    const value = await this.getValue(key);
    if (value) {
      return Boolean(value);
    }
    return false;
  }

  static async setValue(key: string, value: *) {
    await AsyncStorage.setItem(key, `${value}`);
    return value;
  }

  static setCountryCode(data) {
    return this.setValue('booring.countrycode', JSON.stringify(data))
  }

  static getCountryCode() {
    return this.getValue('booring.countrycode')
  }

  static setUserId(id) {
    return this.setValue('booring.user_id', id.toString())
  }

  static getUserId() {
    return this.getValue('booring.user_id')
  }

  static setFirstName(name) {
    return this.setValue('booring.firstname', name)
  }

  static getFirstName() {
    return this.getValue('booring.firstname')
  }

  static setLastName(name) {
    return this.setValue('booring.lastname', name)
  }

  static getLastName() {
    return this.getValue('booring.lastname')
  }

  static setEmail(email) {
    return this.setValue('booring.email', email)
  }

  static getEmail() {
    return this.getValue('booring.email')
  }

  static setUserInfo(info) {
    return this.setValue('booring.userinfo', JSON.stringify(info))
  }

  static getUserInfo() {
    return this.getValue('booring.userinfo')
  }

  static getInterests() {
    return this.getValue('booring.interests')
  }

  static setInterests(value) {
    return this.setValue('booring.interests', JSON.stringify(value))
  }

  static setCategoryId(value) {
    return this.setValue('booring.categoryid', JSON.stringify(value))
  }

  static getCategoryId() {
    return this.getValue('booring.categoryid')
  }

  static setPhoneCode(value) {
    return this.setValue('booring.phonecode', value)
  }

  static getPhoneCode() {
    return this.getValue('booring.phonecode')
  }

  static setCountry_Code(value) {
    return this.setValue('booring.country_code', value)
  }

  static getCountry_Code() {
    return this.getValue('booring.country_code')
  }
}
