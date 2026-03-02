<template>
  <span class="copy-wrapper bg-light border border-secondary-subtle rounded-3 px-2 py-1 d-inline-flex align-items-center gap-2 shadow-sm mt-1 mb-1">
    <span class="fw-bold tracking-wider text-dark font-monospace" style="font-size: 13px">
      {{ displayNumber }}
    </span>
    <a
      @click="copyToClipboard(displayNumber)"
      class="copy-btn d-flex align-items-center justify-content-center rounded"
      :class="buttonText === 'Copy' ? 'text-primary' : 'text-success'"
      title="Copy to clipboard">
      <span v-if="buttonText === 'Copy'" class="material-icons" style="font-size: 15px">content_copy</span>
      <span v-else class="material-icons" style="font-size: 15px">check_circle</span>
    </a>
  </span>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    props: ["type"],
    data() {
      return {
        buttonText: "Copy",
      };
    },
    computed: {
      ...mapState("topup", ["payment"]),

      // Extracted the BSM logic into a clean computed property
      displayNumber() {
        const accNumber = this.payment.receiver_bank_account.account_number;

        if (this.payment.sender_bank === "bsm") {
          if (this.type === "atm") return "6059" + accNumber;
          if (this.type === "ebanking") return "9006059" + accNumber;
          if (this.type === "other") return "4519006059" + accNumber;
        }
        return accNumber;
      },
    },
    methods: {
      async copyToClipboard(number) {
        try {
          await navigator.clipboard.writeText(number);
          this.buttonText = "Copied!";
          setTimeout(() => {
            this.buttonText = "Copy";
          }, 3000); // Reduced to 3 seconds for a snappier feel
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      },
    },
  };
</script>

<style scoped>
  .copy-wrapper {
    transition: all 0.2s ease;
  }

  .copy-wrapper:hover {
    border-color: #4b55a2 !important;
    box-shadow: 0 4px 6px rgba(75, 85, 162, 0.1) !important;
  }

  .tracking-wider {
    letter-spacing: 1px;
  }

  .copy-btn {
    cursor: pointer;
    padding: 4px;
    background-color: #f1f5f9;
    transition: all 0.2s ease;
  }

  .copy-btn:hover {
    background-color: #e2e8f0;
  }

  .copy-btn:active {
    transform: scale(0.9);
  }
</style>
