<template>
  <div class="main">
    <div class="container d-flex justify-content-center">
      <div class="all">
        <div class="d-flex justify-content-center">
          <img src="~/assets/image/logo.png" alt="" width="150px" />
        </div>
        <h3 class="fw-bold text-white text-center mt-3 mb-4">Aktivasi Kartu</h3>
        <form @submit.prevent="submit" class="mx-auto">
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
          <p class="text-center text-white mx-auto">
            Sudah punya kartu?
            <nuxt-link to="/" class="text-decoration-none text-warning"
              >Masuk</nuxt-link
            >
          </p>
        </form>
      </div>
    </div>
    <Footer />
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
.main {
  background-image: url(~/assets/image/bg-main.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}
.all {
  width: 100%;
}
input {
  height: 50px;
}
.btn {
  width: 100%;
  height: 50px;
}

/* media */
form {
  width: 35%;
}

@media screen and (max-width: 362px) {
  .main {
    height: max-content;
  }
  .container {
    align-items: start;
    padding-bottom: 10px;
  }
}

@media screen and (max-width: 576px) {
  .main {
    height: 100vh;
  }
  .container {
    height: 100%;
    align-items: center;
    padding-top: 0 !important;
  }
  /* media */
  form {
    width: 100% !important;
  }
}

/* tablet */
@media screen and (max-width: 991px) {
  form {
    width: 70%;
  }
}
</style>
