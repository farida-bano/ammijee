const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Security imports
const {
  limiter,
  authLimiter,
  securityMiddleware,
  validateInput,
  corsOptions
} = require('./security');

// Import better-auth
const { betterAuth } = require('better-auth');

// Local imports
const customRoutes = require('./routes');

// Configure better-auth
const auth = betterAuth({
  app: {
    name: 'AMMI Auth Service',
    domain: process.env.AUTH_DOMAIN || 'localhost',
  },
  secret: process.env.AUTH_SECRET || 'your-super-secret-key-change-in-production',
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  database: {
    provider: "sqlite",
    url: process.env.DATABASE_URL || "file:./ammi_auth.db"
  },
  advanced: {
    rateLimiter: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["email", "google", "github"],
    }
  },
  attributes: [
    {
      name: 'role',
      type: 'string',
      defaultValue: 'user',
    },
    {
      name: 'profilePicture',
      type: 'string',
      optional: true,
    }
  ]
});

const app = express();

// Security middleware
app.use(securityMiddleware);
app.use(limiter);

// Apply CORS with security options
app.use(cors(corsOptions));

// Apply specific rate limiting to auth endpoints
app.use('/api/auth/signin', authLimiter);
app.use('/api/auth/signup', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);

// Input validation middleware
app.use(validateInput);

app.use(express.json());

// Mount better-auth routes
app.use(auth);

// Mount custom routes after auth middleware
app.use('/api', customRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'auth-service' });
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});