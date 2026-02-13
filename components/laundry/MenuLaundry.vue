<template>
  <div class="menu-container d-flex justify-content-evenly mt-4 px-2 mb-4">
    <nuxt-link v-if="$auth.user.cnc === '-'" to="/card/aktivasikartu" class="menu-item text-decoration-none text-center">
      <div class="menu-icon-wrapper">
        <div class="menu-icon shadow-sm">
          <i class="bi bi-postcard-fill"></i>
        </div>
      </div>
      <span class="menu-label">Aktivasi</span>
    </nuxt-link>

    <a @click="toTopup()" href="javascript:;" class="menu-item text-decoration-none text-center" :class="{ 'disabled-item': $auth.user.cnc === '-' }">
      <div class="menu-icon-wrapper">
        <div class="menu-icon shadow-sm">
          <i class="bi bi-receipt-cutoff"></i>
        </div>
      </div>
      <span class="menu-label">Pay Laundry</span>
    </a>

    <nuxt-link to="/laundry/history" class="menu-item text-decoration-none text-center" :class="{ 'disabled-item': $auth.user.cnc === '-' }">
      <div class="menu-icon-wrapper">
        <div class="menu-icon shadow-sm">
          <i class="bi bi-clock-history"></i>
        </div>
      </div>
      <span class="menu-label">History</span>
    </nuxt-link>
  </div>
</template>

<script>
  import Swal from "sweetalert2";

  export default {
    methods: {
      toTopup() {
        const email = this.$auth.user.email;
        const emailStatus = this.$auth.user.email_verified;

        if (email && emailStatus === "true") {
          this.$router.push("/laundry/billPay");
        } else {
          // Combined Alert Logic
          const msg = email && emailStatus === "false" ? "Email anda belum terverifikasi!" : "Anda belum memiliki email yang valid!";

          Swal.fire({
            title: "Opps...",
            text: msg,
            icon: "warning",
            confirmButtonColor: "#dd2476",
            confirmButtonText: "Atur Email",
            background: "#fff",
            customClass: {
              popup: "rounded-4 shadow-lg",
              confirmButton: "rounded-3 px-4",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/menukartu/gantiemail");
            }
          });
        }
      },
    },
  };
</script>

<style scoped>
  /* Wrapper ensures scale effect doesn't jitter layout */
  .menu-item {
    cursor: pointer;
    width: 80px;
    transition: all 0.2s ease;
  }

  .menu-icon-wrapper {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }

  .menu-icon {
    width: 56px;
    height: 56px;
    /* Gradient matches the "Total Tagihan" bridge colors */
    background: linear-gradient(135deg, #667eea 0%, #dd2476 100%);
    border-radius: 18px; /* Squircle */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Hover & Active Effects */
  .menu-item:hover .menu-icon {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(221, 36, 118, 0.3) !important;
  }

  .menu-item:active .menu-icon {
    transform: scale(0.92);
  }

  .menu-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: #64748b;
    display: block;
  }

  /* Disabled State */
  .disabled-item {
    opacity: 0.5;
    pointer-events: none;
    filter: grayscale(80%);
  }
</style>
