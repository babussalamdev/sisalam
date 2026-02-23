export default {
  setRender(state, value) {
    state.card = value.card[0];
    state.laundryLog = value.laundry;
  },
  setRenderBill(state, value) {
    state.bill = value;
  },
  changeLoad(state) {
    state.load = state.load ? false : true;
  },
};
