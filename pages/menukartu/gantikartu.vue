<template>
  <section id="gantikartu">
    <div v-if="confirmation" class="container">
      <div class="all d-flex flex-column align-items-center justify-content-center">
        <img src="~/assets/image/success.png" alt="" width="200" />
        <h1 class="text-primary fw-bold mt-5 text-center">
          Kartu telah diganti!
        </h1>
        <p class="w-75 text-center mb-5">
          Balik ke laman Card untuk mengakses kembali fitur dari aplikasi ini
        </p>
        <nuxt-link to="/card" class="btn btn-primary text-decoration-none py-2 px-5 mt-3">Card</nuxt-link>
      </div>
    </div>
    <div v-else class="media mx-auto">
      <div class="container">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/menukartu">
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

        <form @submit.prevent="submit">
          <div class="mb-4">
            <label for="number" class="mb-2">Kode Kartu Lama</label>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">CNC</span>
              <input name="oldcnc" type="number" class="form-control" placeholder="10 Digit Angka" required />
            </div>
          </div>
          <div class="mb-4">
            <label for="number" class="mb-2">Kode Kartu Baru</label>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">CNC</span>
              <input name="newcnc" type="number" class="form-control" placeholder="10 Digit Angka" required />
            </div>
          </div>
          <div class="mb-5">
            <label for="pin" class="mb-2">PIN Anda</label>
            <div class="input-group mb-3">
              <input id="pin" name="pin" :type="type" class="form-control" placeholder="Masukkan PIN" required />
              <span @click="showpassword" class="input-group-text" id="basic-addon1">
                <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
                <i v-else class="bi bi-eye"></i>
              </span>
            </div>
          </div>
          <div class="mb-3">
            <!-- Route dynamic -->
            <button v-if="btn" class="btn btn-primary" type="submit">
              Ganti Kartu
            </button>
            <button v-else class="btn btn-secondary" type="button" disabled>
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
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
      confirmation: false
    };
  },
  methods: {
    async submit(event) {
      //manggil API
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      const ocnc = data.oldcnc
      const ncnc = data.newcnc
      delete data.newcnc
      delete data.oldcnc
      console.log(data, ocnc, ncnc)
      try {
        const result = await this.$apiCard.$put(`put-card?method=changecard&oldcnc=CNC-${ocnc}&newcnc=CNC-${ncnc}`, data);
        if (result) {
          this.btn = true;
          this.confirmation = true
        }
      } catch (error) {
        this.btn = true;
        Swal.fire({
          icon: "warning",
          text: error,
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
@media screen and (max-width: 576px) {
  .container {
    height: 100vh;
  }

  .all {
    height: 100%;
  }
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
