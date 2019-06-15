const auth = require('basic-auth');


const LOGIN = 'tanujm241@gmail.com';
const PASSWORD = 'mehtaisgenius';

function authenticate(req, res, next) {
  if (LOGIN && PASSWORD) {
    const credentials = auth(req);
    if (!credentials || credentials.name !== LOGIN || credentials.pass !== PASSWORD) {
      res.setHeader('WWW-Authenticate', `Basic realm="Bandwidth-Hero Compression Service"`);

      return res.status(401).end('Access denied')
    }
  }

  next()
}

module.exports = authenticate;
