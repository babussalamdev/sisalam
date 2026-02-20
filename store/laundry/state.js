export default () => ({
  card: {
    Balance: 0, // Initialize with 0 to prevent NaN during first render
  },
  laundryLog: [],
  bill: "",
  topup: 0,
  invoice: 0,
});
