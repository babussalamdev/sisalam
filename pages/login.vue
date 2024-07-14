<template>
  <div class="main">
    <div class="container">
      <div class="login d-block d-md-flex justify-content-center align-items-center">
        <div class="login-card">
          <form @submit.prevent="submit" class="mx-auto" ref="login">
            <div class="d-flex justify-content-center mb-5">
              <img src="~/assets/image/logo.png" alt="" width="80" />
            </div>
            <h3 class="fw-bold text-center mt-4">Ahlan Wa Sahlan</h3>
            <p class="text-center mb-5 mx-auto">
              Memudahkan santri mengakses dan mengelola data
            </p>
            <div class="mb-3">
              <div class="input-group">
                <input name="username" type="text" class="form-control" placeholder="Username" required />
              </div>
            </div>
            <div class="mb-lg-3">
              <div class="input-group mb-3">
                <input name="password" :type="type" class="form-control" placeholder="Password" required />
                <span @click="showpassword" class="input-group-text" id="basic-addon1">
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
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
              </button>
            </div>
            <!-- have account -->
            <!-- <h6 class="text-center mx-auto fw-normal">
              Belum punya kartu?
              <nuxt-link to="/signup" class="text-decoration-none">Aktivasi</nuxt-link>
            </h6> -->
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
        const result = await this.$auth.loginWith("local", { data: data });
        if (result) {
          this.btn = true;
          this.$cookies.set("AccessToken", result.data.AccessToken, {
            expires: 1,
          });
          this.$refs.login.reset();
          this.$router.push("/");
        }
      } catch (error) {
        this.btn = true;
        if (error.response && error.response.status === 500) {
          this.btn = true;
          Swal.fire({
            text: error.response.data.name.replace(/(?=[A-Z])/g, " "),
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.btn = true;
          Swal.fire({
            text: error.message,
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
