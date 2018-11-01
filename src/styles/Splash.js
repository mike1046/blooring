import { Dimensions,StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
  },
  splashimage: {
    width: width,
    height: height,
  },
  appName: {
    width: 167,
    height: 45,
    backgroundColor: '#00000000',
    marginTop: 50
  },
  appContent: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 30,
    backgroundColor: '#00000000',
    textAlign: 'center',
    marginTop: 15,
    width: 300,
    lineHeight: 40
  },
  containView: {
    width: width,
    height: height,
    backgroundColor: '#00000050',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  authButtonText: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: 'white'
  },
  sinupButton: {
    alignItems:'center',
    justifyContent: 'center',
    width: width-30,
    height: 60,
    backgroundColor: '#0784DC',
    borderRadius: 10
  },
  loginButton: {
    alignItems:'center',
    justifyContent: 'center',
    width: width-30,
    height: 60,
    borderRadius: 3,
    marginBottom: 10
  },
})

