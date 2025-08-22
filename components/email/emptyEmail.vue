<template>
  <section id="gantipin">
    <div class="media mx-auto">
      <div class="container">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/profil">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Masukan Email</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>

        <form class="mt-4" @submit.prevent="submitEmail" id="profileUpdate">
          <!-- Pin Baru -->
          <div class="mb-3">
            <label for="emailnew" class="mb-2">Email Baru</label>
            <br />
            <div class="input-group">
              <input id="emailnew" name="email" type="email" class="form-control" placeholder="Masukkan email valid" required />
            </div>
          </div>
          <!-- submitEmail -->
          <button v-if="btn" type="submit" class="btn btn-primary">Masukan Email</button>
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
  import { mapState, mapGetters, mapActions } from "vuex";
  export default {
    computed: {
      ...mapState("profile", ["btn"]),
    },
    methods: {
      ...mapActions("profile", ["submitEmail"]),
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
