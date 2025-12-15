/**
 * Auth Middleware
 * Middleware for validating auth tokens in other services
 */

const axios = require('axios');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

class AuthMiddleware {
  /**
   * Validate token from incoming request
   */
  static async validateToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or invalid' });
      }
      
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      
      // Verify token with auth service
      const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/session`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.session) {
        req.user = response.data.session.user;
        next();
      } else {
        return res.status(401).json({ error: 'Invalid token' });
      }
    } catch (error) {
      console.error('Token validation error:', error.message);
      return res.status(401).json({ error: 'Token validation failed' });
    }
  }

  /**
   * Get current user from request
   */
  static async getCurrentUser(token) {
    try {
      const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/session`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data?.session?.user || null;
    } catch (error) {
      console.error('Get user error:', error.message);
      return null;
    }
  }
}

module.exports = AuthMiddleware;