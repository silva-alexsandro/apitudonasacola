const { v4: uuidv4 } = require('uuid');

function ownerMiddleware(req, res, next) {
  let owner = req.headers['x-owner-id'] || req.body.owner;
  if (!owner) {
    owner = uuidv4();
  }
  req.owner = owner;
  next();
}

module.exports = ownerMiddleware;
