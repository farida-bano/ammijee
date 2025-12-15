/**
 * Better Auth Client Utilities
 * Client-side utilities for integrating with the auth service
 */

class AuthService {
  constructor(baseURL = process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:3001') {
    this.baseURL = baseURL;
  }

  /**
   * Sign up a new user
   */
  async signUp(email, password, name) {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      
      if (data.session) {
        localStorage.setItem('auth_token', data.session.token);
        return { success: true, user: data.session.user, token: data.session.token };
      }
      
      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Sign in existing user
   */
  async signIn(email, password) {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.session) {
        localStorage.setItem('auth_token', data.session.token);
        return { success: true, user: data.session.user, token: data.session.token };
      }
      
      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Sign out current user
   */
  async signOut() {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return { success: true };

      await fetch(`${this.baseURL}/api/auth/signout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem('auth_token');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get current session
   */
  async getSession() {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return { session: null };

      const response = await fetch(`${this.baseURL}/api/auth/session`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.session) {
        return { session: data.session };
      }
      
      return { session: null };
    } catch (error) {
      return { session: null };
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  /**
   * Get auth token
   */
  getToken() {
    return localStorage.getItem('auth_token');
  }

  /**
   * Forgot password
   */
  async forgotPassword(email) {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      return { success: response.ok, ...data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Reset password
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      
      return { success: response.ok, ...data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;

// Named exports
export { AuthService };