export default {
  getCode(state) {
    return state.code
  },
  days: (state) => Math.floor(state.remainingTime / (1000 * 60 * 60 * 24)),
  hours: (state) => Math.floor((state.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  minutes: (state) => Math.floor((state.remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
  seconds: (state) => Math.floor((state.remainingTime % (1000 * 60)) / 1000),
  isCountdownFinished: (state) => state.remainingTime <= 0,
  isCountdownActive: (state) => state.isCountdownActive
}
