<template>
  <div class="main">
    <div class="container">
      <div
        class="login d-block d-md-flex justify-content-center align-items-center"
      >
        <div class="login-card">
          <form @submit.prevent="submit" class="mx-auto">
            <div class="d-flex justify-content-center mb-5">
              <img src="~/assets/image/logo.png" alt="" width="80" />
            </div>
            <h3 class="fw-bold text-center mt-4">Welcome to Card'M</h3>
            <p class="text-center mb-5 mx-auto">
              Kemudahan dalam proses transaksi
            </p>
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">CNC</span>
                <input
                  name="cnc"
                  type="number"
                  class="form-control"
                  placeholder="12 Digit Angka"
                  required
                />
              </div>
            </div>
            <div class="mb-lg-3">
              <div class="input-group mb-3">
                <input
                  name="pin"
                  :type="type"
                  class="form-control"
                  placeholder="Masukkan PIN"
                  required
                />
                <span
                  @click="showpassword"
                  class="input-group-text"
                  id="basic-addon1"
                >
                  <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
                  <i v-else class="bi bi-eye"></i>
                </span>
              </div>
            </div>
            <div class="mb-5">
              <!-- Route dynamic -->
              <button v-if="btn" class="btn btn-primary" type="submit">
                Login to continue
              </button>
              <button v-else class="btn btn-secondary" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            </div>
            <!-- have account -->
            <h6 class="text-center mx-auto fw-normal">
              Belum punya kartu?
              <nuxt-link to="/signup" class="text-decoration-none"
                >Aktivasi</nuxt-link
              >
            </h6>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  layout: "verification",
  data() {
    return {
      type: "password",
      btn: true,
    };
  },
  methods: {
    async submit(event) {
      //manggil API
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      try {
        const result = await this.$axios.$post(`card/login`, data);
        if (result && result.token) {
          this.btn = true;
          Swal.fire({
            icon: "success",
            text: "Berhasil Masuk",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        localStorage.setItem("card", result.data);
        // lempar ke laman berikutnya yang di request
        this.$router.push("cardInfo");
      } catch (error) {
        this.btn = true;
        Swal.fire({
          icon: "warning",
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    showpassword() {
      const show = this.type === "password" ? "text" : "password";
      this.type = show;
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/index.css);
</style>
