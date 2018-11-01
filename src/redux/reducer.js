import { combineReducers } from 'redux';
import navigation from './navigation/reducer';
import alert from './alert/reducer';
import main from './main/reducer';

export default combineReducers({
  ...navigation,
  alert,
  main
});
