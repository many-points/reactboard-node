const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const ssr = express.Router();

const { Post, Thread } = require('./models');
const hash = require('./utils/hash');
const generateToken = require('./utils/token');

const config = './config';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './client/src/App';

function returnError(res, err) {
  return res.json({ success: false, error: err });
}

ssr.get('/', renderer);

function renderer(req, res, next) {
  const template = path.resolve(__dirname, 'client', 'build', 'index.html');

  fs.readFile(template, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).end();
    }

    console.log(typeof App === 'function')
    const html = ReactDOMServer.renderToString(React.createElement(App, null, null));

    console.log(html);
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    );
  })
}


module.exports = ssr;