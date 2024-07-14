<template>
  <section id="gantipin">
    <div v-if="confirmation" class="container">
      <div class="all d-flex flex-column align-items-center justify-content-center">
        <img src="~/assets/image/success.png" alt="" width="200" />
        <h1 class="text-primary fw-bold mt-5 text-center">Perubahan Berhasil!</h1>
        <p class="w-75 text-center mb-5">
          Kembali ke Card untuk mengakses fitur kembali
        </p>
        <nuxt-link to="/card" class="btn btn-primary text-decoration-none py-2 px-5 mt-3">Kembali ke
          Card</nuxt-link>
      </div>
    </div>
    <div v-else class="media mx-auto">
      <div class="container">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/profil">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Ganti Password</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>

        <!-- Content -->
        <div class="mt-5 mb-4">
          <h1 class="fw-semibold">Buat Password Baru</h1>
          <p class="fw-light text-secondary">
            untuk mengamankan akunmu, ganti <br />
            dengan password yang lebih kuat
          </p>
        </div>

        <form @submit.prevent="submit">
          <!-- Pin Lama -->
          <label for="pin" class="mb-2">Masukkan Password Lama</label><br />
          <div class="input-group mb-3">
            <input id="pin" name="oldPassword" :type="type" class="form-control" placeholder="Password Lama" required />
            <span @click="showpassword" class="input-group-text" id="basic-addon1">
              <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
              <i v-else class="bi bi-eye"></i>
            </span>
          </div>
          <!-- Pin Baru -->
          <label for="pinCheck" class="mb-2">Masukkan Password Baru</label><br />
          <div class="input-group mb-3">
            <input id="newPin" name="newPassword" :type="type" class="form-control" placeholder="Password Baru"
              required />
            <span @click="showpassword" class="input-group-text" id="basic-addon1">
              <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
              <i v-else class="bi bi-eye"></i>
            </span>
          </div>
          <!-- konfirmasi Pin -->
          <label for="pinCheck" class="mb-2">Konfirmasi Password</label><br />
          <div class="input-group mb-4">
            <input id="pinCheck" name="passwordCheck" :type="type" class="form-control" placeholder="Konfirmasi"
              required />
            <span @click="showpassword" class="input-group-text" id="basic-addon1">
              <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
              <i v-else class="bi bi-eye"></i>
            </span>
          </div>
          <!-- Submit -->
          <button v-if="btn" type="submit" class="btn btn-primary">
            Simpan Password
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
      if (data.newPassword !== data.passwordCheck) {
        this.btn = true;
        return Swal.fire({
          icon: "warning",
          text: "Konfirmasi Password salah",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      data['accessToken'] = this.$cookies.get('AccessToken')
      delete data.passwordCheck
      try {
        const result = await this.$axios.$put(`change-password`, data);
        if (result.message = 'success') {
          this.btn = true;
          this.confirmation = true
        }
      } catch (error) {
        this.btn = true;
        Swal.fire({
          icon: "warning",
          text: 'password sebelumnya salah atau gagal mengubah',
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
