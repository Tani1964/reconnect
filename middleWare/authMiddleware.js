const jwt = require('jsonwebtoken');

// Middleware function to authenticate user
const authMiddleware = (req, res, next) => {
  // Get token from request headers
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your environment
    req.user = decoded; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
