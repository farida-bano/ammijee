# Project Structure Analysis Report

## Overview
Analysis of the AMMI project structure to identify problems and inconsistencies.

## Issues Found

### 1. Missing/Deleted Files
- **Problem**: Several documentation files in `website/frontend/docs/` have been deleted
  - `folder-structure.md`
  - `intro.md`
  - All files in `tutorial-basics/` and `tutorial-extras/` directories
  - `sidebars.js` (replaced by `sidebars.ts`)

### 2. Configuration Inconsistencies
- **Problem**: The `data_config.json` points to `book/manuscript` as data source, but the frontend also has chapters in `website/frontend/docs/`
- **Problem**: Multiple Docusaurus sites exist: `book/` and `website/frontend/` - potential duplication

### 3. Outdated Documentation
- **Problem**: `FOLDER_STRUCTURE.md` lists files that no longer exist (like `output.txt`, `Users:sarosh:.qwen.fileloc`)
- **Problem**: The folder structure document mentions `.qwen/` directory which appears to be deleted

### 4. Untracked Files
- **Problem**: Several important files are untracked: `RUNNING_PROJECT.md`, `chatbot_constitution.md`, `chatbot_dependencies.md`
- **Problem**: Database file: `auth-service/prisma/ammi_auth.db`
- **Problem**: Large binary file: `vectorstore.pkl` (91MB) should likely be in `.gitignore`

### 5. Security Issues
- **Problem**: `.env` files are tracked in git (should be in `.gitignore` for security)
- **Problem**: Hardcoded SECRET_KEY in `main.py` (line 22) - should be in environment variables only

### 6. Build Artifacts
- **Problem**: `package-lock.json` and `yarn.lock` files are present but may be inconsistent
- **Problem**: Build directories like `build/` and `node_modules/` should be in `.gitignore`

## Recommended Solutions

### 1. Update Documentation
- Update `FOLDER_STRUCTURE.md` to reflect the current structure
- Restore missing documentation files if they're needed
- Clarify the relationship between `book/` and `website/frontend/` directories

### 2. Security Fixes
- Add `.env` files to `.gitignore`
- Remove hardcoded SECRET_KEY from `main.py`
- Ensure sensitive files are properly excluded from version control

### 3. Git Management
- Add `vectorstore.pkl` to `.gitignore`
- Add build artifacts (node_modules, build, dist, etc.) to `.gitignore`
- Consider committing untracked files that are important for the project

### 4. Configuration Cleanup
- Clarify data source strategy (book/manuscript vs website/frontend/docs)
- Ensure consistent configuration across both Docusaurus sites if both are needed