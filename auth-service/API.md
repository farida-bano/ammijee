# API Documentation - AMMI Auth Service

## Base URL
```
http://localhost:3001/api
```

## Authentication Endpoints

### POST /auth/signup
Register a new user account.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "name": "John Doe"
}
```

#### Response
```json
{
  "success": true,
  "session": {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "profilePicture": null
    }
  }
}
```

### POST /auth/signin
Sign in with existing credentials.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

#### Response
```json
{
  "success": true,
  "session": {
    "token": "jwt_token",
    "user": { "..." }
  }
}
```

### POST /auth/signout
Log out the current user.

#### Headers
```
Authorization: Bearer {token}
```

#### Response
```json
{
  "success": true
}
```

### GET /auth/session
Get the current user's session.

#### Headers
```
Authorization: Bearer {token}
```

#### Response
```json
{
  "session": {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "profilePicture": null
    }
  }
}
```

### POST /auth/forgot-password
Request password reset.

#### Request Body
```json
{
  "email": "user@example.com"
}
```

#### Response
```json
{
  "success": true
}
```

### POST /auth/reset-password
Reset password with token.

#### Request Body
```json
{
  "token": "reset_token",
  "newPassword": "new_secure_password"
}
```

#### Response
```json
{
  "success": true
}
```

## Custom Endpoints

### GET /profile
Get current user's profile.

#### Headers
```
Authorization: Bearer {token}
```

#### Response
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "profilePicture": null
  }
}
```

### PUT /profile
Update current user's profile.

#### Headers
```
Authorization: Bearer {token}
```

#### Request Body
```json
{
  "name": "Updated Name",
  "profilePicture": "https://example.com/image.jpg"
}
```

#### Response
```json
{
  "message": "Profile updated successfully",
  "user": { "..." }
}
```

## Admin Endpoints (Requires admin role)

### GET /admin/users
Get all users (admin only).

#### Headers
```
Authorization: Bearer {token}
```

#### Response
```json
{
  "users": [
    {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  ]
}
```

### PUT /admin/users/{userId}/role
Update user's role (admin only).

#### Headers
```
Authorization: Bearer {token}
```

#### Request Body
```json
{
  "role": "admin"
}
```

#### Response
```json
{
  "message": "User role updated to admin",
  "userId": "user_id",
  "newRole": "admin"
}
```

## Health Check

### GET /health
Check if the auth service is running.

#### Response
```json
{
  "status": "OK",
  "service": "auth-service"
}
```

## Error Responses
All error responses follow this format:
```json
{
  "error": "Error message here"
}
```

## HTTP Status Codes
- 200: Success
- 400: Bad Request (invalid input)
- 401: Unauthorized (missing or invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Resource not found
- 500: Internal Server Error