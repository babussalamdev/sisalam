<template>
  <section id="topup">
    <div class="media mx-auto">
      <div class="container">
        <div class="d-flex justify-content-between">
          <nuxt-link to="/card">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Top Up</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>
        <Pay class="mt-2" />
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";

export default {
  middleware({ $auth, redirect }) {
    if ($auth.user.cnc === '-') {
      return redirect('/card')
    }
  },
  async asyncData({ store }) {
    store.dispatch("topup/loadForm");
  },
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
        const result = await this.$apiCard.$put(`put-card?method=topup`, data);
        if (result) {
          this.btn = true;
          Swal.fire({
            icon: "success",
            text: result.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.$refs.formData.reset()
        }
      } catch (error) {
        this.btn = true;
        Swal.fire({
          icon: "error",
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
/* all */
#topup {
  /* padding-top: 20px; */
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
