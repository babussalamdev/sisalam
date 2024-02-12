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
              Aktivasi sekarang untuk akses fitur
            </p>
            <!-- kode kartu -->
            <div class="mb-4">
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
            <!-- NISS -->
            <div class="mb-4">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">NISS</span>
                <input
                  name="niss"
                  type="text"
                  class="form-control"
                  placeholder="10 Digit Angka"
                  required
                />
              </div>
            </div>
            <div class="mb-4">
              <!-- pass -->
              <div class="input-group mb-4">
                <input
                  name="pin"
                  :type="type"
                  class="form-control"
                  placeholder="Password Baru"
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

              <!-- konfirmasi password -->
              <div class="mb-4">
                <div class="input-group">
                  <input
                    name="confirm"
                    :type="type"
                    class="form-control"
                    placeholder="Konfirmasi Password"
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
            </div>
            <!-- submit -->
            <div class="mb-3">
              <!-- Route dynamic -->
              <button v-if="btn" class="btn btn-primary" type="submit">
                Aktivasi
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
            <p class="text-center mx-auto">
              Sudah punya kartu?
              <nuxt-link to="/" class="text-decoration-none">Masuk</nuxt-link>
            </p>
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
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      try {
        const result = await this.$axios.$post(`card`, data);
        this.btn = true;
        this.$router.push("/success_active");
      } catch (error) {
        console.log(error.response);
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
@import url(~/assets/css/signup.css);
</style>
