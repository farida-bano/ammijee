/**
 * Auth Middleware
 * Middleware for validating auth tokens in other services
 */

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

      // Verify token with auth service using fetch API (Edge Function compatible)
      const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/session`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.session) {
        req.user = data.session.user;
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
      const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/session`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data?.session?.user || null;
    } catch (error) {
      console.error('Get user error:', error.message);
      return null;
    }
  }
}

module.exports = AuthMiddleware;