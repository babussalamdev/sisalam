export default () => ({
  load: false, invoice: false, user: {}, layout: {}, payment: {}, forms: [], contents: [], form: { "Method": "loading-page" }, content: [], code: '',
  button: false, selectedFile: null,
  bank: '',
  amount: 0,
  feeQris: 1500,
  feeBank: 3500,
  slip: 'no',
  arrayBank: [],
  countDownDate: null,
  remainingTime: null,
  isCountdownActive: false,
  intervalId: null,

  receipePayment: false
})
