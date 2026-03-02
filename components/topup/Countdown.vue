<template>
  <div class="timer-wrapper d-flex flex-column align-items-center mt-4 mb-3">
    <p v-if="remainingTime >= 0" class="timer-label text-muted text-uppercase mb-2 fw-bold">Sisa Waktu Pembayaran</p>

    <div v-if="remainingTime >= 0" :class="['premium-timer-pill', { 'is-urgent': isUrgent }]">
      <div class="icon-bubble shadow-sm">
        <i class="bi bi-stopwatch-fill"></i>
      </div>

      <div class="time-display font-monospace tracking-wide">
        <span v-if="rawDays > 0" class="me-2 text-dark">
          {{ rawDays }}
          <small class="text-muted">Hr</small>
        </span>
        <span class="time-segment">{{ hours }}</span>
        <span class="time-colon">:</span>
        <span class="time-segment">{{ minutes }}</span>
        <span class="time-colon">:</span>
        <span class="time-segment">{{ seconds }}</span>
      </div>
    </div>

    <div v-else class="premium-timer-pill expired shadow-sm">
      <div class="icon-bubble bg-danger text-white border-0">
        <i class="bi bi-x-circle-fill"></i>
      </div>
      <span class="fw-bolder tracking-wide text-danger ms-2">WAKTU HABIS</span>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex";

  export default {
    data() {
      return {
        countDownDate: null,
        remainingTime: null,
        intervalId: null,
      };
    },
    computed: {
      ...mapState("topup", ["payment"]),

      // NEW: Triggers a visual change when less than 5 minutes remain
      isUrgent() {
        return this.remainingTime > 0 && this.remainingTime < 5 * 60 * 1000;
      },

      rawDays() {
        return Math.floor(this.remainingTime / (1000 * 60 * 60 * 24));
      },
      hours() {
        const h = Math.floor((this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return String(h).padStart(2, "0");
      },
      minutes() {
        const m = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        return String(m).padStart(2, "0");
      },
      seconds() {
        const s = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
        return String(s).padStart(2, "0");
      },
    },
    mounted() {
      this.$connectSocket(`${this.$config.websocket}?sk=${this.$auth.user.SK.replace(/#/g, "%23")}&program=${this.$auth.user.profile}`);
      this.startTimer();
    },
    methods: {
      ...mapMutations("topup", ["changeExpired", "statusPayment"]),
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
      },
    },
    beforeDestroy() {
      this.stopTimer();
      this.$closeSocket();
    },
  };
</script>

<style scoped>
  /* Wrapper & Labels */
  .timer-label {
    font-size: 11px;
    letter-spacing: 1.5px;
    color: #64748b; /* Slate gray */
  }

  /* Premium Pill Design */
  .premium-timer-pill {
    background: linear-gradient(135deg, #fff0f5 0%, #ffe0e9 100%);
    border: 1px solid rgba(221, 36, 118, 0.15);
    box-shadow: 0 4px 15px rgba(221, 36, 118, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.8);
    padding: 8px 24px 8px 8px; /* Extra padding on right to balance the icon on left */
    border-radius: 50px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  /* Inner Icon Bubble */
  .icon-bubble {
    width: 36px;
    height: 36px;
    background-color: #fff;
    color: #dd2476;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    box-shadow: 0 2px 6px rgba(221, 36, 118, 0.15);
  }

  /* Typography for Time */
  .time-display {
    font-size: 1.2rem;
    color: #dd2476;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin-top: 1px;
  }

  .tracking-wide {
    letter-spacing: 1.5px;
  }

  /* Blinking Colons */
  .time-colon {
    margin: 0 4px;
    opacity: 1;
    animation: blink 1s linear infinite;
    color: rgba(221, 36, 118, 0.6);
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  /* --- URGENT STATE (< 5 Minutes) --- */
  .premium-timer-pill.is-urgent {
    background: linear-gradient(135deg, #ffeaee 0%, #ffc5d0 100%);
    border-color: rgba(220, 53, 69, 0.4);
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4);
    animation: pulse-border 2s infinite;
  }

  .premium-timer-pill.is-urgent .icon-bubble {
    color: #dc3545; /* Deeper red */
    animation: shake 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  }

  .premium-timer-pill.is-urgent .time-display {
    color: #dc3545;
  }

  .premium-timer-pill.is-urgent .time-colon {
    color: rgba(220, 53, 69, 0.6);
    animation: blink 0.5s linear infinite; /* Blinks twice as fast */
  }

  /* Animations */
  @keyframes pulse-border {
    0% {
      box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
    }
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0) rotate(-5deg);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0) rotate(5deg);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-2px, 0, 0) rotate(-5deg);
    }
    40%,
    60% {
      transform: translate3d(2px, 0, 0) rotate(5deg);
    }
  }

  /* Expired State Override */
  .premium-timer-pill.expired {
    background: #f8f9fa;
    border-color: #dee2e6;
    box-shadow: none;
  }
</style>
