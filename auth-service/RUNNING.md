# Running the AMMI Auth Service

## Option 1: Using Docker (Recommended for Production)

1. Navigate to the auth service directory:
```bash
cd /Users/sarosh/Desktop/ammi/auth-service
```

2. Create a .env file from the example:
```bash
cp .env.example .env
```

3. Edit the .env file to add your configuration:
```bash
nano .env  # or use your preferred editor
```

4. Build and run with Docker Compose:
```bash
docker-compose up --build
```

The service will be available at `http://localhost:3001`

## Option 2: Local Development

1. Navigate to the auth service directory:
```bash
cd /Users/sarosh/Desktop/ammi/auth-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file from the example:
```bash
cp .env.example .env
```

4. Edit the .env file to add your configuration:
```bash
nano .env  # or use your preferred editor
```

5. Run the development server:
```bash
npm run dev
```

The service will be available at `http://localhost:3001`

## Environment Variables

Make sure to set these values in your `.env` file:

```bash
AUTH_SECRET=your-super-secret-key-change-in-production  # Generate a strong secret
DATABASE_URL="postgresql://postgres:password@localhost:5432/ammi_auth"  # If using external DB
AUTH_DOMAIN=localhost
PORT=3001
# Optional: Social Login
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## Testing the Service

1. After starting the service, test the health endpoint:
```bash
curl http://localhost:3001/health
```

2. You can run the unit tests with:
```bash
npm test
```

3. For tests with coverage:
```bash
npm run test:coverage
```

## API Endpoints

Once running, the service provides these endpoints:

- `POST /api/auth/signup` - Register new users
- `POST /api/auth/signin` - Login existing users
- `POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Get current session
- `GET /api/profile` - Get user profile (requires auth)
- `PUT /api/profile` - Update user profile (requires auth)
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:userId/role` - Update user role (admin only)

For detailed API documentation, see the `API.md` file.