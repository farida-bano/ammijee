# Auth Service

This service handles authentication for the AMMI platform using Better Auth.

## Features

- Email/password authentication
- Social login (Google, GitHub)
- Session management
- JWT tokens

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (copy `.env.example` to `.env`):
```bash
cp .env.example .env
```

3. Run migrations:
```bash
npm run migrate
```

4. Start the service:
```bash
npm run dev
```

## Environment Variables

- `AUTH_SECRET`: Secret key for signing tokens (use a strong random string)
- `DATABASE_URL`: Database connection string
- `GOOGLE_CLIENT_ID`: Google OAuth client ID (optional)
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret (optional)
- `GITHUB_CLIENT_ID`: GitHub OAuth client ID (optional)
- `GITHUB_CLIENT_SECRET`: GitHub OAuth client secret (optional)
- `AUTH_DOMAIN`: Domain for the auth service (default: localhost)

## API Endpoints

Better Auth provides the following endpoints:

- `POST /api/auth/signin`: Sign in with email/password or social providers
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/signout`: Log out
- `GET /api/auth/session`: Get current session
- `POST /api/auth/change-password`: Change password
- `POST /api/auth/forgot-password`: Request password reset
- `POST /api/auth/reset-password`: Reset password

## Integration

To use this service in other parts of the application:

1. Call the auth endpoints directly from frontend
2. Use the provided client library to handle sessions
3. Protect routes in other services by validating tokens