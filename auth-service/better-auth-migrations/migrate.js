/**
 * Better Auth Migrations
 * This script handles database migrations for the better-auth schema
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function migrate() {
  try {
    console.log('Starting better-auth migrations...');

    // Run Prisma commands to generate and apply migrations
    console.log('Validating Prisma schema...');
    execSync('npx prisma validate', { stdio: 'inherit' });

    console.log('Running Prisma generate...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('Running Prisma database push (applies the schema to the database)...');
    execSync('npx prisma db push', { stdio: 'inherit' }); // Use db push for development/testing

    console.log('Better-auth migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message || error);
    process.exit(1);
  }
}

async function generateOnly() {
  try {
    console.log('Generating Prisma client only...');

    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('Prisma client generation completed successfully!');
  } catch (error) {
    console.error('Generation failed:', error.message || error);
    process.exit(1);
  }
}

async function createMigration(name = 'better-auth-init') {
  try {
    console.log(`Creating named migration: ${name}`);

    console.log('Validating Prisma schema...');
    execSync('npx prisma validate', { stdio: 'inherit' });

    console.log('Creating new migration...');
    // For non-interactive environments, we'll just run db push and note the process
    console.log('Applying current schema to database (using db push)...');
    execSync('npx prisma db push', { stdio: 'inherit' });

    console.log('For production migrations, you\'d typically:');
    console.log('1. Run `npx prisma migrate dev --name <migration-name>` in a local/interactive environment');
    console.log('2. Then apply with `npx prisma migrate deploy` in production');

    console.log(`Migration "${name}" process completed (current schema pushed to DB)!`);
  } catch (error) {
    console.error('Migration creation failed:', error.message || error);
    process.exit(1);
  }
}

async function resetDatabase() {
  try {
    console.log('Resetting the database...');

    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });

    console.log('Database reset successfully!');
  } catch (error) {
    console.error('Database reset failed:', error.message || error);
    process.exit(1);
  }
}

// Check command line arguments
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const name = args[1] || 'better-auth-init';

  switch(command) {
    case '--generate-only':
      generateOnly();
      break;
    case '--create-migration':
      createMigration(name);
      break;
    case '--reset':
      resetDatabase();
      break;
    case '--status':
      console.log('Checking migration status...');
      try {
        execSync('npx prisma migrate status', { stdio: 'inherit' });
      } catch (error) {
        console.log('Note: No migration files found. This is expected when using `db push` instead of `migrate dev`.');
        console.log('To create migration files, use: npx prisma migrate dev --name init');
      }
      break;
    default:
      migrate();
      break;
  }
}

module.exports = { migrate, generateOnly, createMigration, resetDatabase };