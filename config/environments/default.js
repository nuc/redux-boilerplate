'use strict';

export default {
  /**
   * Front-End Server
   */
  server: {
    host: 'dev.moviepilot.com',
    port: 3010
  },

  /**
   * API Server
   */
  apiServer: {
    urlPrefix: 'http://api-staging.moviepilot.com'
  },

  /**
   * API Server accessed from the client
   */
  clientApiServer: {
    urlPrefix: 'http://api-staging.moviepilot.com'
  },

  /**
   * WebpackDevServer
   */
  webpackDevServer: {
    host: 'localhost',
    port: 8081
  },

  /**
   * browserSync
   */
  browserSyncServer: {
    host: 'localhost',
    port: 8082
  }
};

