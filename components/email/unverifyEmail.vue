<template>
  <section id="gantipin">
    <div class="media mx-auto">
      <div class="container">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/profil">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Verifikasi Email</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>

        <form class="mt-4" @submit.prevent="submitCode" id="profileUpdate">
          <!-- Pin Lama -->
          <div class="mb-3" v-if="this.$auth.user.email">
            <label for="emailnow" class="mb-2">Email Sekarang</label>
            <br />
            <div class="input-group">
              <input id="emailnow" type="email" class="form-control" :value="this.$auth.user.email" required disabled />
            </div>
          </div>
          <!-- Pin Baru -->
          <div class="mb-3">
            <label for="emailnew" class="mb-2">Code</label>
            <br />
            <div class="input-group">
              <input id="emailnew" name="code" type="number" class="form-control" placeholder="Masukkan email valid" required />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4 col-lg-4 py-2 py-md-0 py-lg-0">
              <!-- Submit Button -->
              <button v-if="btn" type="submit" class="btn btn-primary">Kirim Code</button>
              <button v-else class="btn btn-secondary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
              </button>
            </div>
            <div class="col-12 col-md-4 col-lg-4 py-2 py-md-0 py-lg-0">
              <!-- Submit Button -->
              <button v-if="btn" @click="removeEmail()" class="btn btn-danger">Ubah Email</button>
              <button v-else class="btn btn-secondary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
              </button>
            </div>
            <div class="col-12 col-md-4 col-lg-4 py-2 py-md-0 py-lg-0">
              <!-- Submit Button -->
              <button v-if="btn && cooldown === 0" @click="resetCode()" class="btn btn-warning">Kirim Ulang Code</button>

              <button v-else-if="cooldown > 0" class="btn btn-secondary" type="button" disabled>Tunggu {{ cooldown }} detik</button>

              <button v-else class="btn btn-secondary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  export default {
    computed: {
      ...mapState("profile", ["btn", "cooldown"]),
    },
    methods: {
      ...mapActions("profile", ["submitCode", "removeEmail", "resetCode"]),
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
