<template>
  <section id="gantikartu">
    <div class="media mx-auto">
      <div class="container">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/menu">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Tukar Kartu</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>

        <!-- Content -->
        <div class="mt-5 mb-4">
          <h1 class="fw-semibold">Request Nonaktif Kartu</h1>
          <p class="fw-light text-secondary">
            untuk menukar kartu dengan yang baru <br />
            Nonaktifkan kartu lama anda
          </p>
        </div>

        <form @submit.prevent="coba">
          <div class="mb-4">
            <label for="number" class="mb-2">Kode Kartu Anda</label>
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
          <div class="mb-5">
            <label for="pin" class="mb-2">PIN Anda</label>
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
              Nonaktifkan
            </button>
            <button v-else class="btn btn-secondary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
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
    coba() {
      this.$router.push("success_card");
    },
    async submit(event) {
      //manggil API
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      console.log(data);
      try {
        const result = await this.$axios.$post(`card/changecard`, data);
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
/* all */
#gantikartu {
  padding-top: 20px;
}
.fake-image {
  opacity: 0;
}

/* judul */
h1 {
  font-size: 24px;
}
p {
  font-size: 14px;
}

/* form */
input {
  height: 50px;
}
button {
  width: 100%;
  height: 50px;
}

.media {
  width: 40%;
}

@media screen and (max-width: 576px) {
  .media {
    width: 100% !important;
  }
}
/* tablet */
@media screen and (max-width: 991px) {
  .media {
    width: 70%;
  }
}
</style>
