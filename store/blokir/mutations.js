export default {
  setRender(state, value) {
    state.card = value.database[0]
  },
  setStatus(state, value) {
    state.card.Status = value.Status
  }
}
