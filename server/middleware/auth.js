const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  // TODO: Implement JWT authentication
  next();
};

exports.authorize = (roles = []) => {
  // roles param can be a single role string (e.g., 'admin') or an array of roles
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    // TODO: Implement role-based authorization
    next();
  };
}; 