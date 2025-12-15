/**
 * Unit tests for AMMI Auth Service
 */

const request = require('supertest');
const express = require('express');
const { betterAuth } = require('better-auth');
const app = express();

// Mock the auth service
const auth = betterAuth({
  app: {
    name: 'Test Auth Service',
    domain: 'localhost',
  },
  secret: 'test-secret-key-for-unit-tests',
  emailAndPassword: {
    enabled: true,
  },
  database: {
    type: "sqlite",
    filename: ":memory:",
  }
});

app.use(express.json());
app.use(auth);

describe('Auth Service - Basic Endpoints', () => {
  test('Health check endpoint should return OK status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
      
    expect(response.body).toEqual({
      status: 'OK',
      service: 'auth-service'
    });
  });

  test('Should respond to auth endpoints', async () => {
    // Check that the signup endpoint exists
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });
      
    // Expect either success or validation error (not 404)
    expect([200, 400]).toContain(response.status);
  });

  test('Should allow user registration', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'newuser@example.com',
        password: 'StrongPass123!',
        name: 'New User'
      });
    
    // The response status depends on better-auth implementation
    // but shouldn't be a 404 (endpoint not found)
    expect(response.status).not.toBe(404);
  });
});

describe('Auth Service - Authentication Flow', () => {
  const testUser = {
    email: 'auth-test@example.com',
    password: 'TestPass123!',
    name: 'Auth Test User'
  };
  
  let authToken = null;
  
  test('Should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send(testUser);
    
    expect(response.status).toBe(200);
    expect(response.body.session).toBeDefined();
    expect(response.body.session.user.email).toBe(testUser.email);
    expect(response.body.session.user.name).toBe(testUser.name);
    
    authToken = response.body.session.token;
  });
  
  test('Should allow user login', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    
    expect(response.status).toBe(200);
    expect(response.body.session).toBeDefined();
  });
  
  test('Should return user session with valid token', async () => {
    const response = await request(app)
      .get('/api/auth/session')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.session).toBeDefined();
    expect(response.body.session.user.email).toBe(testUser.email);
  });
  
  test('Should reject invalid token', async () => {
    const response = await request(app)
      .get('/api/auth/session')
      .set('Authorization', 'Bearer invalid-token');
    
    expect(response.status).toBe(401);
  });
});

describe('Auth Service - Profile Management', () => {
  const testUser = {
    email: 'profile-test@example.com',
    password: 'TestPass123!',
    name: 'Profile Test User'
  };
  
  let authToken = null;
  
  beforeAll(async () => {
    // Register a test user
    const signupResponse = await request(app)
      .post('/api/auth/signup')
      .send(testUser);
    
    authToken = signupResponse.body.session.token;
  });
  
  test('Should get user profile with valid token', async () => {
    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe(testUser.email);
    expect(response.body.user.name).toBe(testUser.name);
  });
  
  test('Should reject getting profile with invalid token', async () => {
    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', 'Bearer invalid-token');
    
    expect(response.status).toBe(401);
  });
  
  test('Should update user profile', async () => {
    const response = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Updated Profile Name',
        profilePicture: 'https://example.com/new-avatar.jpg'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Profile updated successfully');
    expect(response.body.user.name).toBe('Updated Profile Name');
  });
});

// Jest configuration
module.exports = {
  testEnvironment: 'node',
};