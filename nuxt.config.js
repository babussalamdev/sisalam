let development = process.env.NODE_ENV !== 'production'
export default {
  server: {
    host: "0.0.0.0",
    port: 1234
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Card Babussalam',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'logo.png' },
      { href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css", rel: "stylesheet" },
      { href: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap", rel: "stylesheet" }
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', type: 'text/javascript' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '~/assets/css/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/utama',
      '~/components/home'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: development ? 'http://192.168.10.2:5000/market' : 'https://apidauroh.babussalam.sch.id/market',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

}
