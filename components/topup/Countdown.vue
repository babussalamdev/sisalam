<template>
  <div v-if="payment.sender_bank_type !== 'wallet_account'">
    <h5 class="fw-bold text-danger" v-if="remainingTime >= 0">
      {{ days }} Hari {{ hours }}:{{ minutes }}:{{ seconds }}
    </h5>
    <span v-else>
      Expired
    </span>
  </div>
  <div v-else>
    <small class="fw-bold text-dark" v-if="remainingTime >= 0">
      Lakukan Pembayaran Dalam : <span class="text-danger fw-bold">
        {{ days }}D {{ hours }}:{{ minutes }}:{{ seconds }}
      </span>
    </small>
    <span v-else>
      Expired
    </span>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      countDownDate: null,
      remainingTime: null,
      intervalId: null
    };
  },
  computed: {
    ...mapState('topup', ['payment']),
    days() {
      return Math.floor(this.remainingTime / (1000 * 60 * 60 * 24));
    },
    hours() {
      return Math.floor((this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    },
    minutes() {
      return Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    },
    seconds() {
      return Math.floor((this.remainingTime % (1000 * 60)) / 1000);
    }
  },
  mounted() {
    this.$connectSocket(`${this.$config.websocket}?sk=${this.$auth.user.SK.replace(/#/g, '%23')}&program=${this.$auth.user.profile}`);
    this.startTimer();
  },
  methods: {
    ...mapMutations('topup', ['changeExpired', 'statusPayment']),
    startTimer() {
      const targetDateTime = this.payment.expired_date;
      this.countDownDate = new Date(targetDateTime).getTime();

      this.intervalId = setInterval(() => {
        const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
        const nowTime = new Date(now).getTime();
        this.remainingTime = this.countDownDate - nowTime;
        if (this.remainingTime < 0) {
          this.stopTimer();
          this.changeExpired();
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.intervalId);
      this.remainingTime = null;
    }
  },
  beforeDestroy() {
    this.stopTimer();
    this.$closeSocket();
  }
};
</script>
