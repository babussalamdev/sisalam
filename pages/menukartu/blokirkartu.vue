<template>
  <section id="blokir">
    <div class="media mx-auto">
      <div class="container">
        <!-- Judul -->
        <div class="d-flex justify-content-between mb-4">
          <nuxt-link to="/menukartu">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Blokir Kartu</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>

        <!-- check BOX -->
        <p>Status</p>
        <div class="form-switch d-flex justify-content-between">
          <div>
            <h4 :class="{ block: !blok }">
              {{ blok === true ? "Kartu aktif" : "Kartu di Blokir" }}
            </h4>
          </div>
          <div>
            <input v-model="blok" class="form-check-input mb-4" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
          </div>
        </div>
        <div class="card bg-gradient shadow">
          <p v-if="blok" class="p-3 bg-warning">
            Perhatian! Tindakan menonaktifkan kartu akan menyebabkan kartu tidak bisa digunakan untuk bertransaksi di outlet. Hanya nonaktifkan ketika
            kartu anda hilang
          </p>
          <p v-else class="p-3 bg-danger text-white">Kartu anda tak bisa digunakan, aktifkan untuk kembali bertransaksi</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Swal from "sweetalert2";
  import { mapGetters, mapState } from "vuex";

  export default {
    async asyncData({ store }) {
      store.dispatch("blokir/renderPage");
    },
    computed: {
      ...mapGetters("blokir", ["getStatus"]),
      blok: {
        get() {
          const condition = this.getStatus === "active" ? true : false;
          return condition;
        },
        set(value) {
          const condition = value ? "active" : "blokir";
          this.$store.dispatch("blokir/setStatus", condition);
        },
      },
    },
  };
</script>

<style scoped>
  .fake-image {
    opacity: 0;
  }

  input {
    height: 25px;
    width: 50px !important;
  }

  h4 {
    margin-left: -40px;
  }

  .block {
    color: grey;
  }

  p {
    font-size: 16px;
    margin-bottom: 0 !important;
  }
</style>
