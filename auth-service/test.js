// Simple test to see if there are dependency issues
console.log('Testing dependencies...');

try {
  const express = require('express');
  console.log('✓ Express imported successfully');
} catch (e) {
  console.error('✗ Express import failed:', e.message);
}

try {
  const cors = require('cors');
  console.log('✓ Cors imported successfully');
} catch (e) {
  console.error('✗ Cors import failed:', e.message);
}

try {
  require('dotenv').config();
  console.log('✓ Dotenv imported and configured successfully');
} catch (e) {
  console.error('✗ Dotenv import/config failed:', e.message);
}

try {
  const { betterAuth } = require('better-auth');
  console.log('✓ Better-auth imported successfully');
} catch (e) {
  console.error('✗ Better-auth import failed:', e.message);
}

try {
  const { prismaAdapter } = require('better-auth/adapters/prisma');
  console.log('✓ Prisma adapter imported successfully');
} catch (e) {
  console.error('✗ Prisma adapter import failed:', e.message);
}

try {
  const { PrismaClient } = require('@prisma/client');
  console.log('✓ Prisma client imported successfully');
} catch (e) {
  console.error('✗ Prisma client import failed:', e.message);
}

console.log('Dependency test completed.');