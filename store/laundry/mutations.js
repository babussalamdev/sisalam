export default {
  setRender(state, value) {
    state.card = value.card[0];
    state.laundryLog = value.laundry;
    // state.topup = value.topup
    // state.invoice = value.invoice
  },
};
