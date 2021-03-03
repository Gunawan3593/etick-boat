export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'etick-boat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/apollo'
  ],

  apollo: {
    // Sets up the apollo client endpoints
    clientConfigs: {
      // recommended: use a file to declare the client configuration (see below for example)
      default: '~/plugins/my-alternative-apollo-config.js',

      // you can setup multiple clients with arbitrary names
      alternativeClient: {
        // required
        httpEndpoint: 'http://localhost:4000',

        // override HTTP endpoint in browser only
        browserHttpEndpoint: '/graphql',

        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          credentials: 'same-origin'
        },

        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        wsEndpoint: 'ws://localhost:4000/graphql',

        // LocalStorage token
        tokenName: 'apollo-token',

        // Enable Automatic Query persisting with Apollo Engine
        persisting: false,

        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false
      },
    },
    
    /**
     * default 'apollo' definition
     */
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    
    // setup a global query loader observer (see below for example)
    watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    
    // setup a global error handler (see below for example)
    errorHandler: '~/plugins/apollo-error-handler.js',

    // Sets the authentication type for any authorized request.
    authenticationType: 'Bearer', 

    // Token name for the cookie which will be set in case of authentication
    tokenName: 'apollo-token',

    // [deprecated] Enable the graphql-tag/loader to parse *.gql/*.graphql files
    includeNodeModules: true,

    // Cookie parameters used to store authentication token
    cookieAttributes: {
      /**
        * Define when the cookie will be removed. Value can be a Number
        * which will be interpreted as days from time of creation or a
        * Date instance. If omitted, the cookie becomes a session cookie.
        */
      expires: 7,

      /**
        * Define the path where the cookie is available. Defaults to '/'
        */
      path: '/',

      /**
        * Define the domain where the cookie is available. Defaults to
        * the domain of the page where the cookie was created.
        */
      domain: 'example.com',

      /**
        * A Boolean indicating if the cookie transmission requires a
        * secure protocol (https). Defaults to false.
        */
      secure: false,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
