<template>
  <div>
    <header class="mt-5">
      <img src="~/assets/image/vueLogo.png" alt="Logo Vue" width="200px" />

      <!-- penerapan template syntax -->
      <h3 class="mt-5">{{ getName() }}</h3>

      <!-- live data input type text -->
      <input type="text" v-model="name" />
      <br /><br />

      <!-- directive -->
      <p v-text="batasBilangan"></p>
      <!-- event dengan pemanggilan computed layout -->
      <button @click="TambahBilangan">Tambah Bilangan</button>
      <button @click="KurangiBilangan">Kurangi Bilangan</button>
      <br /><br />

      <!-- class binding -->
      <div>
        <button
          :class="{ active: menu === 'home' }"
          @click="
            {
              menu = 'home';
            }
          "
        >
          Home
        </button>
        <button
          :class="{ active: menu === 'about' }"
          @click="
            {
              menu = 'about';
            }
          "
        >
          About
        </button>
        <button
          :class="{ active: menu === 'blog' }"
          @click="
            {
              menu = 'blog';
            }
          "
        >
          Blog
        </button>
      </div>

      <!-- penerapan Event -->
      <div class="mt-4">
        <a
          href="#"
          :class="{ linkActive: menu === 'home' }"
          @click="active('home')"
          >Home</a
        >
        <a
          href="#"
          :class="{ linkActive: menu === 'about' }"
          @click="active('about')"
          >About</a
        >
        <a
          href="#"
          :class="{ linkActive: menu === 'blog' }"
          @click="active('blog')"
          >Blog</a
        >
      </div>

      <!-- two way data binding -->

      <!-- live data input type checkbox -->
      <br /><br />
      <p>{{ langs }}</p>
      <label
        ><input type="checkbox" value="React" v-model="langs" /> React</label
      >
      <label
        ><input type="checkbox" value="VueJs" v-model="langs" /> VueJs</label
      >
      <label
        ><input type="checkbox" value="Angular" v-model="langs" />
        Angular</label
      >

      <!-- directive perulangan v-for -->
      <br /><br />
      <h4>Daftar Kelas ({{ langs.length }})</h4>
      <ul v-if="langs.length > 0">
        <li v-for="(lang, index) of langs">{{ index + 1 }} - {{ lang }}</li>
      </ul>
      <li v-else>Kelas tidak tersedia</li>
      <br /><br />
      <input
        type="text"
        placeholder="Tambah Kelas"
        v-on:keyup.enter="submit"
        v-model="kelasBaru"
      />

      <!-- filter angka -->
      <p class="mt-4">Mencari Angka Genap dari: {{ angka }}</p>
      <span>angka genap adalah :</span>
      <ul>
        <li v-for="a of bilanganGenap(angka)">{{ a }}</li>
      </ul>

      <!-- name project -->
      <p class="mt-3">The Progressive JavaScript Framework</p>
    </header>
    <br />
    <footer>
      <p>copyright 2024</p>
      <!-- <p>{{ totalBayar }}</p> -->
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Fauzan Gunawan",
      qty: 2,
      bilangan: 1,
      menu: "home",
      langs: [],
      kelasBaru: "",
      angka: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },

  methods: {
    getName() {
      return "Hello " + this.name;
    },
    TambahBilangan() {
      this.bilangan++;
    },
    KurangiBilangan() {
      this.bilangan--;
    },
    bilanganGenap(data) {
      return data.filter((angka) => {
        return angka % 2 == 0;
      });
    },
    active(data) {
      this.menu = data;
    },
    submit() {
      this.langs.unshift(this.kelasBaru);
      this.kelasBaru = "";
    },
  },
  computed: {
    totalBayar() {
      return this.qty * 10;
    },
    batasBilangan() {
      return this.bilangan < 0 ? "Error" : this.bilangan;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}
.active {
  background-color: red;
  color: white;
}
.linkActive {
  color: #fff;
  background-color: rgb(41, 139, 179);
  padding: 3px 8px;
}
</style>
