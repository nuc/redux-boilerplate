'use strict';

import config from 'config';
import express from 'express';

const app = express();

/**
 * Since we don't want dev features enabled in staging|pre etc
 * if there is a NODE_ENV defined we always overwrite it as `production`
 * otherwise it's dev.
 */
const env = process.env.NODE_ENV ? 'production' : 'development';


// Serve static files
// --------------------------------------------------
import path from 'path';
app.use(express.static(path.resolve(process.cwd(), 'dist')));

app.use('/favicon.ico', function (req, res) {
  res.redirect('http://moviepilot.com/favicon.ico');
});

// View engine
// --------------------------------------------------
import expressHandlebars from 'express-handlebars';
import handlebars from 'handlebars';

handlebars.registerHelper('json-stringify', ::JSON.stringify);

app.engine('hbs', expressHandlebars());
app.set('view engine', 'hbs');


// Render layout
// --------------------------------------------------
import render from '../lib/render';

app.get('/*', (req, res) => {
  // Js files
  const jsPaths = [ 'vendor', 'main' ].map(basename => {
    if (env === 'development') {
      let host = config.get('webpackDevServer.host');
      let port = config.get('webpackDevServer.port');
      return `//${host}:${port}/js/${basename}.js`;
    }
    return `/dist/js/${basename}.js`;
  });

  if (env === 'development') {
    let host = config.get('browserSyncServer.host');
    let port = config.get('browserSyncServer.port');
    const BSVersion = require('browser-sync/package.json').version;
    jsPaths.push(`//${host}:${port}/browser-sync/browser-sync-client.${BSVersion}.js`);
  }

  // Render
  const layout = 'layouts/main';
  const payload = {
    jsPaths,
    body: '',
    env: {
      clientApiServer: config.get('clientApiServer')
    }
  };

  // if (env === 'development') {
  //   return res.render(layout, payload);
  // }

  render(req, res, layout, {
    payload
  });
});

const server = app.listen(config.get('server.port'), () => {
  const { address: host, port } = server.address();
  console.log(`Front-End server is running at ${host}:${port}`); // eslint-disable-line no-console
});
