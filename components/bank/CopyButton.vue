<template>
  <span v-if="payment.sender_bank === 'bsm'">
    <span>{{ type === 'atm' ? '6059' + payment.receiver_bank_account.account_number : type === 'ebanking' ? '9006059' +
      payment.receiver_bank_account.account_number : type === 'other' ? ' 4519006059' +
        payment.receiver_bank_account.account_number : payment.receiver_bank_account.account_number }}</span>
    <a @click="copyToClipboard(type === 'atm' ? '6059' + payment.receiver_bank_account.account_number : type === 'ebanking' ? '9006059' + payment.receiver_bank_account.account_number : type === 'other' ? ' 4519006059' + payment.receiver_bank_account.account_number : payment.receiver_bank_account.account_number)"
      v-if="this.buttonText === 'Copy'" class="material-symbols-outlined copy-code">
      content_copy
    </a>
    <a v-else class="material-symbols-outlined copy-code">
      check
    </a>
  </span>
  <span v-else>
    <span>{{ payment.receiver_bank_account.account_number }}</span>
    <a @click="copyToClipboard(payment.receiver_bank_account.account_number)" v-if="this.buttonText === 'Copy'"
      class="material-symbols-outlined copy-code">
      content_copy
    </a>
    <a v-else class="material-symbols-outlined copy-code">
      check
    </a>
  </span>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['type'],
  data() {
    return {
      buttonText: 'Copy'
    };
  },
  computed: {
    ...mapState('formulir', ['payment'])
  },
  methods: {
    async copyToClipboard(number) {
      try {
        await navigator.clipboard.writeText(number);
        this.buttonText = 'Copied!';
        setTimeout(() => {
          this.buttonText = 'Copy';
        }, 5000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  }
};
</script>

<style scoped>
a.copy-code {
  font-size: 12px;
  background-color: rgb(197, 197, 197);
  padding: 2px;
  border-radius: 2px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

span {
  font-weight: bold;
}

span.copy-code {
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 2px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
