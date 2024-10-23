let development = process.env.NODE_ENV !== 'production'
export default {
  env: {
    version: require('./package.json').version,
  },
  server: {
    host: "0.0.0.0",
    port: 7020
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Aplikasi Santri',
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
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
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
    { src: '~/plugins/axios-instances.js' },
    { src: '~/plugins/cookies.client.js', mode: 'client' }
  ],

  loading: '~/components/Loader.vue',

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/utama',
      '~/components/home',
      '~/components/history',
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
    baseURL:  process.env.API_BASE,
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_BASE,
    },
    base: process.env.API_BASE,
    card: process.env.API_CARD,
    office: process.env.API_OFFICE,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'IdToken',
          maxAge: 15,
          global: true,
        },
        refreshToken: {
          property: 'RefreshToken',
          data: 'RefreshToken',
          maxAge: false
        },
        endpoints: {
          login: { url: '/signin-account', method: 'post' },
          refresh: { url: '/refresh-token', method: 'post' },
          user: { url: '/get-account', method: 'get' },
          logout: { url: '/signout-account', method: 'post' }
        },
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: false
    }
  }

}
