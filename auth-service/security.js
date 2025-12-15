/**
 * Security Middleware
 * Additional security measures for the auth service
 */

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('validator');

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Specific rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth attempts per windowMs
  message: {
    error: 'Too many authentication attempts from this IP, please try again later.'
  },
  skipSuccessfulRequests: true, // Only count failed requests
});

// Helmet security middleware configuration
const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://*.googleapis.com", "https://*.github.com"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: 'deny'
  },
  referrerPolicy: {
    policy: 'same-origin'
  }
});

// Input validation middleware
const validateInput = (req, res, next) => {
  // Validate email format if present in request
  if (req.body.email && !validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password strength if present
  if (req.body.password) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' 
      });
    }
  }

  next();
};

// CORS with security considerations
const corsOptions = {
  origin: function (origin, callback) {
    // In production, replace with your specific allowed origins
    const allowedOrigins = [
      'http://localhost:3000', // React default
      'http://localhost:3001', // Our service
      'http://localhost:3002', // Next.js default
      'http://localhost:8080', // Common dev server
      'https://yourdomain.com', // Production domain (to be updated)
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = {
  limiter,
  authLimiter,
  securityMiddleware,
  validateInput,
  corsOptions
};