export default {
  setRender(state, value) {
    state.card = value.database[0]
    state.cardLog = value.logs
    state.topup = value.topup
    state.invoice = value.invoice
  },
}
