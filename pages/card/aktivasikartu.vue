<template>
  <section id="gantipin">
    <div v-if="notification" class="container">
      <div class="all d-flex flex-column align-items-center justify-content-center">
        <img src="~/assets/image/success.png" alt="" width="200" />
        <h1 class="text-primary fw-bold mt-5">Aktivasi Kartu Berhasil!</h1>
        <p class="w-75 text-center mb-5">
          Kembali ke kartu untuk mulai mengakses fitur
        </p>
        <nuxt-link to="/card" class="btn btn-primary text-decoration-none py-2 px-5 mt-3">Kembali ke Kartu</nuxt-link>
      </div>
    </div>
    <div v-else class="media mx-auto">
      <div class="container">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/card">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Aktivasi</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>

        <!-- Content -->
        <div class="mt-5 mb-4">
          <h1 class="fw-semibold">Aktivasi kartu baru</h1>
          <p class="fw-light text-secondary">
            untuk menggunakan kartu di makshaf, <br />
            aktifkan terlebih dahulu
          </p>
        </div>

        <form @submit.prevent="submit">
          <!-- Pin Lama -->
          <label for="pin" class="mb-2">Masukkan CNC dari kartu</label><br />
          <div class="input-group">
            <input id="pin" name="CNC" type="number" class="form-control" placeholder="CNC" required v-model="ccnc" />
          </div>
          <p v-if="ccnc.length < 10" class="mb-0 text-danger">*cnc harus 10 angka</p>
          <!-- Pin Baru -->
          <label for="pinCheck" class="mb-2 mt-3">Masukkan PIN Baru</label><br />
          <div class="input-group">
            <input id="newPin" name="PIN" :type="type" class="form-control" placeholder="6 Digit Angka" required
              v-model="cpin" />
            <span @click="showpassword" class="input-group-text" id="basic-addon1">
              <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
              <i v-else class="bi bi-eye"></i>
            </span>
          </div>
          <p v-if="cpin.length < 6" class="mb-0 text-danger">*pin kurang dari 6 angka</p>
          <p v-if="cpin.length > 6" class="mb-0 text-danger">*pin lebih dari 6 angka</p>
          <!-- konfirmasi Pin -->
          <label for="pinCheck" class="mb-2 mt-3">Ulangi PIN</label><br />
          <div class="input-group mb-4">
            <input id="pinCheck" name="cPIN" :type="type" class="form-control" placeholder="Konfirmasi" required />
            <span @click="showpassword" class="input-group-text" id="basic-addon1">
              <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
              <i v-else class="bi bi-eye"></i>
            </span>
          </div>
          <!-- Submit -->
          <button v-if="btn" type="submit" class="btn btn-primary">
            Aktivasi
          </button>
          <button v-else class="btn btn-secondary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      type: "password",
      btn: true,
      ccnc: '',
      cpin: '',
      notification: false
    };
  },
  methods: {
    async submit(event) {
      //manggil API
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      if (data.PIN.length > 6 || data.PIN.length < 6) {
        this.btn = true;
        return Swal.fire({
          icon: "warning",
          text: 'Jumlah PIN tidak sesuai',
          showConfirmButton: false,
          timer: 1500,
        })
      }
      if (data.PIN !== data.cPIN) {
        this.btn = true;
        return Swal.fire({
          icon: "warning",
          text: "Konfirmasi PIN salah",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      data['CNC'] = 'CNC-' + data.CNC
      delete data.cPIN
      try {
        const sk = this.$auth.user.SK.replace('#', '%23')
        const result = await this.$apiCard.$put(`put-card?method=activation&sk=${sk}`, data);
        if (result) {
          this.btn = true;
          this.notification = true
          const userToUpdate = { ...this.$auth.user };
          userToUpdate.cnc = data['CNC'];
          this.$auth.setUser(userToUpdate);
        }
        // lempar ke laman berikutnya yang di request
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
