#!/usr/bin/env node
'use strict';
const app = require('express')();
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Automatically allow cross-origin requests
app.use(cors({origin: true}));
admin.initializeApp(functions.config().firebase);

const authenticate = require('./src/authenticate');
const params = require('./src/params');
const proxy = require('./src/proxy');

//const PORT = process.env.PORT || 8080;

app.enable('trust proxy');
app.get('/', authenticate, params, proxy);
app.get('/favicon.ico', (req, res) => res.status(204).end());
//app.listen(PORT, () => console.log(`Listening on ${PORT}`));


exports.service = functions.region('asia-northeast1').https.onRequest(app);
