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
          <i class="bi bi-wallet-fill"></i>
        </div>
      </div>
      <span class="menu-label">Top Up</span>
    </a>

    <nuxt-link to="/history" class="menu-item text-decoration-none text-center" :class="{ 'disabled-item': $auth.user.cnc === '-' }">
      <div class="menu-icon-wrapper">
        <div class="menu-icon shadow-sm">
          <i class="bi bi-hourglass-split"></i>
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
          this.$router.push("/topup");
        } else {
          // Cleaner Alert logic using the new style
          const msg = email && emailStatus === "false" ? "Email anda belum terverifikasi!" : "Anda belum memiliki email yang valid!";

          Swal.fire({
            title: "Opps...",
            text: msg,
            icon: "warning",
            confirmButtonColor: "#4b55a2", // Matches the new card theme
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
  /* Container spacing */
  .menu-container {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Individual Menu Item */
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
    /* Matching the blue gradient from the card style */
    background: linear-gradient(135deg, #66a6ea 0%, #4b55a2 100%);
    border-radius: 18px; /* Squircle effect */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.4rem;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Hover & Click Animations */
  .menu-item:hover .menu-icon {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(75, 85, 162, 0.25) !important;
  }

  .menu-item:active .menu-icon {
    transform: scale(0.92);
  }

  .menu-label {
    font-size: 12px;
    font-weight: 600;
    color: #4b55a2; /* Using the theme color instead of light grey */
    display: block;
  }

  /* Disabled/Inactive State */
  .disabled-item {
    opacity: 0.4;
    pointer-events: none;
    filter: grayscale(100%);
  }
</style>
