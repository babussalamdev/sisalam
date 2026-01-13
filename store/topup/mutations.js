export default {
  setReceipePayment(state, data) {
    state.receipePayment = data;
  },
  statusPayment(state, data) {
    state.payment = { ...state.payment, ...data.flipLog };
    state.slip = "yes";
  },
  setValue(state, data) {
    state[data.key] = data.value;
  },
  changeLoad(state) {
    state.load = state.load ? false : true;
  },
  updateStatus(state, data) {
    state.user.Status = data;
    state.form = state.forms[data];
    state.content = state.contents.filter((item) => item.SK.includes(state.form.Content));
  },

  loadForm(state, data) {
    // const { User, Layout, Form, Content, Bank, Payment } = data
    const { Bank, Payment, Limit, Card } = data;
    state.payment = Payment;
    state.arrayBank = Bank;
    state.limit = Limit;
    state.card = Card;
    // state.user = User
    // state.layout = Layout
    // state.forms = Form
    // state.contents = Content
    // state.form = Form[User.Status]
    // state.content = Content.filter(item => item.SK.includes(state.form.Content));
  },

  loadStatus(state, data) {
    state.user = { ...state.user, ...data };
  },

  setSelect(state, data) {
    state.selectedFile = data;
    state.button = true;
  },

  matchVoucher(state, data) {
    state.user = { ...state.user, ...data };
  },

  getInvoice(state, event) {
    const data = Object.fromEntries(new FormData(event.target));

    state.bank = data.Bank;
    state.amount = +data.Amount; // Example: 10000

    // 1. Define QRIS Rate (0.7%)
    const qrisRate = 0.7 / 100;

    // 2. Define Divisor (0.993)
    const divisor = 1 - qrisRate;

    // 3. Calculate Total AND Round Up to nearest integer
    // We use Math.ceil() so 10070.49 becomes 10071
    // This ensures you receive the full 10.000, not 9.999
    const grossAmount = Math.ceil(state.amount / divisor);

    // 4. Calculate the Fee (Total - Original)
    const feeValue = grossAmount - state.amount;

    // Save to state
    state.feeQris = feeValue;

    // If you need the Total for the UI:
    // state.totalBill = grossAmount;
  },

  removeBank(state) {
    state.bank = "";
    state.amount = 0;
  },

  setPayment(state, data) {
    state.payment = data;
  },

  changeExpired(state) {
    state.bank = "";
    state.payment = "";
  },

  resetTopup(state) {
    state.slip = "no";
    state.bank = "";
  },
};
