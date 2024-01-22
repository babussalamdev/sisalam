<template>
  <div class="main">
    <div class="container d-flex justify-content-center">
      <div class="">
        <div class="d-flex justify-content-center">
          <img src="~/assets/image/logo.png" alt="" />
        </div>
        <h3 class="fw-bold text-white text-center mt-3">Card Babussalam</h3>
        <p class="text-white text-center mb-4 mx-auto">
          Login ke akun Card Babussalam untuk mengakses fitur fitur dari
          aplikasi ini
        </p>
        <form @submit.prevent="submit" class="mx-auto">
          <div class="mb-4">
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">CNC</span>
              <input
                name="number"
                type="number"
                class="form-control"
                placeholder="12 Digit Angka"
                required
              />
            </div>
          </div>
          <div class="mb-4">
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
          <div class="mb-3">
            <!-- Route dynamic -->
            <button v-if="btn" class="btn btn-primary" type="submit">
              Masuk
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
            Belum punya kartu?
            <nuxt-link to="/signup" class="text-decoration-none text-warning"
              >Daftar</nuxt-link
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
        const result = await this.$axios.$post(`card/userlogin`, data);
        if (result && result.token) {
          this.btn = true;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Berhasil Masuk",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        localStorage.setItem("cnc", result.cnc);
        // lempar ke laman berikutnya yang di request
        this.$router.push("cardInfo");
      } catch (error) {
        console.log(error.response);
        this.btn = true;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message,
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
  background-image: url(~/assets/image/bg-fiveth.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
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
  width: 70%;
}
p {
  width: 70%;
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
  }
  /* media */
  form {
    width: 100% !important;
  }
  p {
    width: 100% !important;
  }
}
</style>
