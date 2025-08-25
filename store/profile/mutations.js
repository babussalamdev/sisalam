export default {
  btn(state) {
    state.btn = !state.btn;
  },
  setCooldown(state, value) {
    state.cooldown = value;
  },
  decrementCooldown(state) {
    if (state.cooldown > 0) {
      state.cooldown--;
    }
  },
};
