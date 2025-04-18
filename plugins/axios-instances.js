// plugins/axios-instances.js
export default function ({ $axios, $config, $auth }, inject) {
  // Instance axios untuk API pengguna
  const apiBase = $axios.create({
    baseURL: $config.base
  })

  apiBase.interceptors.request.use(config => {
    const token = localStorage.getItem('auth._token.local')
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // Instance axios untuk API produk
  const apiCard = $axios.create({
    baseURL: $config.card
  })
  apiCard.interceptors.request.use(config => {
    const token = localStorage.getItem('auth._token.local')
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // Instance axios untuk API Sisalam
  const apiOffice = $axios.create({
    baseURL: $config.office
  })
  apiOffice.interceptors.request.use(config => {
    const token = localStorage.getItem('auth._token.local')
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // api Flip
  const apiFlip = $axios.create({
    baseURL: $config.flip
  })
  apiFlip.interceptors.request.use(config => {
    const token = localStorage.getItem('auth._token.local')
    if ( token ) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  // Inject instance ke dalam konteks Nuxt
  inject('apiBase', apiBase)
  inject('apiCard', apiCard)
  inject('apiOffice', apiOffice)
  inject('apiFlip', apiFlip)
}
