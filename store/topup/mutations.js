export default {
  setReceipePayment(state, data) {
    state.receipePayment = data
  },
  statusPayment(state, data) {
    state.payment = { ...state.payment, ...data.Payment }
    state.user = { ...state.user, ...data.QrData }
  },
  setValue(state, data) {
    state[data.key] = data.value
  },
  changeLoad(state) {
    state.load = state.load ? false : true
  },
  updateStatus(state, data) {
    state.user.Status = data
    state.form = state.forms[data]
    state.content = state.contents.filter(item => item.SK.includes(state.form.Content));
  },

  loadForm(state, data) {
    // const { User, Layout, Form, Content, Bank, Payment } = data
    const { Bank, Payment } = data
    state.payment = Payment
    state.arrayBank = Bank
    // state.user = User
    // state.layout = Layout
    // state.forms = Form
    // state.contents = Content
    // state.form = Form[User.Status]
    // state.content = Content.filter(item => item.SK.includes(state.form.Content));
  },

  loadStatus(state, data) {
    state.user = { ...state.user, ...data }
    console.log(state.user)
  },

  setSelect(state, data) {
    state.selectedFile = data;
    state.button = true
  },

  matchVoucher(state, data) {
    state.user = { ...state.user, ...data }
  },

  getInvoice(state, event) {
    const data = Object.fromEntries(new FormData(event.target));
    state.bank = data.Bank;
  },

  removeBank(state) {
    state.bank = '';
  },

  setPayment(state, data) {
    state.payment = true
    state.payment = data
  },

  changeExpired(state) {
    state.bank = ''
    state.payment = ''
  }
}


