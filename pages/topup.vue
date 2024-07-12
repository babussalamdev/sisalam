<template>
  <section id="topup">
    <div class="media mx-auto">
      <div class="container">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/cardInfo">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Top Up</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>

        <!-- Content -->
        <div class="mt-5 mb-4">
          <h1 class="fw-semibold">Masukkan Kode Voucher</h1>
          <p class="fw-light text-secondary">
            untuk menambah saldo di kartu anda <br />masukkan voucher sekarang
          </p>
        </div>

        <form @submit.prevent="submit">
          <!-- voucher -->
          <div class="mb-3">
            <label for="code" class="mb-2">Kode Voucher</label><br />
            <input id="code" name="code" type="text" class="form-control" placeholder="10 Digit Angka" required />
          </div>
          <!-- PIN -->
          <div class="mb-5">
            <label for="pin" class="mb-2">Masukkan PIN</label><br />
            <div class="input-group">
              <input id="pin" name="pin" :type="type" class="form-control" placeholder="6 Digit Angka" required />
              <span @click="showpassword" class="input-group-text" id="basic-addon1">
                <i v-if="type === 'password'" class="bi bi-eye-slash"></i>
                <i v-else class="bi bi-eye"></i>
              </span>
            </div>
          </div>
          <!-- submit -->
          <div class="">
            <button v-if="btn" type="submit" class="btn btn-primary fw-semibold">
              Top Up Sekarang
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
    };
  },
  methods: {
    async submit(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["cnc"] = this.$store.state.card.number;
      try {
        const result = await this.$axios.$put(`card/topup`, data);
        if (result) {
          Swal.fire({
            icon: "success",
            text: result.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        this.btn = true;
        this.$router.push("success_topup");
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        this.btn = true;
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
#topup {
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
