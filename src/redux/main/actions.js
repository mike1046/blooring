import ActionTypes from './types';

export const actions = {
  changeTabBar: (tabbar) => ({
    type: ActionTypes.TABBAR,
    payload: tabbar,
  }),
  changeModal: (isModal) => ({
    type: ActionTypes.MODAL,
    payload: isModal
  }),
  getBookingID: (bookingId) => ({
    type: ActionTypes.BOOKING,
    payload: bookingId
  })
}

export default actions

