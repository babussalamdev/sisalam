<template>
  <div class="menu-container d-flex justify-content-evenly mt-4 px-3">
    <nuxt-link v-if="$auth.user.cnc === '-'" to="/card/aktivasikartu" class="menu-item text-decoration-none text-center">
      <div class="menu-icon shadow-sm mb-2">
        <i class="bi bi-postcard-fill"></i>
      </div>
      <span class="menu-label">Aktivasi</span>
    </nuxt-link>

    <a
      @click="toTopup()"
      href="javascript:;"
      class="menu-item text-decoration-none text-center"
      :class="$auth.user.cnc !== '-' ? '' : 'disabled-item'">
      <div class="menu-icon shadow-sm mb-2">
        <i class="bi bi-receipt"></i>
      </div>
      <span class="menu-label">Pay Laundry</span>
    </a>

    <nuxt-link to="/laundry/history" class="menu-item text-decoration-none text-center" :class="$auth.user.cnc !== '-' ? '' : 'disabled-item'">
      <div class="menu-icon shadow-sm mb-2">
        <i class="bi bi-clock-history"></i>
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

        // Logic remains exactly the same as your original code
        if (email && emailStatus === "true") {
          this.$router.push("/laundry/billPay");
        } else if (email && emailStatus === "false") {
          Swal.fire({
            text: "Email anda belum terverifikasi!",
            icon: "warning",
            confirmButtonColor: "#dd2476", // Matches the red/pink theme
            confirmButtonText: "Verifikasi Email!",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/menukartu/gantiemail");
            }
          });
        } else {
          Swal.fire({
            text: "Anda belum memiliki email yang valid!",
            icon: "warning",
            confirmButtonColor: "#dd2476", // Matches the red/pink theme
            confirmButtonText: "Tambahkan Email!",
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
  /* THEME BRIDGE: 
     Combines Card Color (#667eea) and Tagihan Color (#dd2476)
  */
  .menu-icon {
    width: 55px;
    height: 55px;
    /* The Magic Gradient */
    background: linear-gradient(135deg, #667eea 0%, #dd2476 100%);
    border-radius: 18px; /* Modern Squircle */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: white;
    font-size: 1.5rem;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  /* Interaction: Button shrinks slightly when clicked */
  .menu-item:active .menu-icon {
    transform: scale(0.9);
  }

  .menu-label {
    font-size: 12px;
    font-weight: 600;
    color: #64748b; /* Neutral Slate color for text */
    margin-top: 4px;
    display: block;
  }

  .disabled-item {
    filter: grayscale(100%);
    opacity: 0.4;
    pointer-events: none;
  }
</style>
