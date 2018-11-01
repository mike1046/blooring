import { dispatch } from '../utils';
import actions from './actions';

const handler = {

  changeTabBar: (...args) => {    
    dispatch(actions.changeTabBar(...args));
  },
  changeModal: (...args) => {    
    dispatch(actions.changeModal(...args));
  },
  getBookingID: (...args) => {
    dispatch(actions.getBookingID(...args));
  }
};

export default handler;
