import ActionTypes from './types';
const initialState = {
  tabbar: [
      {
          icon: 'md-flame',
          text: 'Hot Deals',
          selected: true,
      },
      {
          icon: 'md-person',
          text: 'My Acount',
          selected: false
      },
      {
          icon: 'ios-checkmark-circle',
          text: 'Booked',
          selected: false
      },
      {
          icon: 'ios-bookmark',
          text: 'BookMarks',
          selected: false
      },
      {
          icon: 'history',
          text: 'History',
          selected: false
      },
  ],
  tabbarSate: 0,
  tabbarName: 'Hot Deals',
  isModal: false
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TABBAR:
      var data = state.tabbar
      var name = state.tabbarName
      for (var i = 0; i < data.length; i++){
          if(i == action.payload){
              data[i].selected = true
              name = data[i].text
          }else{
              data[i].selected = false
          }
      }
      return {
        ...state,
        tabbar: state.tabbar,
        tabbarSate: action.payload,
        tabbarName: name,
      };
    case ActionTypes.MODAL:       
      return {
          ...state,
          isModal: action.payload
      };
    case ActionTypes.BOOKING:       
        return {
            ...state,
            bookingId: action.payload
        }
    default:
      return state;
  }
}
