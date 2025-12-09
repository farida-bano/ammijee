---
id: 0005
title: Fix Docusaurus main book visibility
stage: green
date: 2025-12-08
surface: agent
model: gemini-pro
feature: 002-physical-ai-book
branch: 002-physical-ai-book
user: sarosh
command: ab docsaurus main book show nahi ho rahi qion?
labels: []
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - book/docusaurus.config.ts
  - book/sidebars.ts
tests:
---

## Prompt

ab docsaurus main book show nahi ho rahi qion?

## Response snapshot

I have updated the Docusaurus configuration to include the 'manuscript' directory as a separate book section and added a link to it in the navigation bar.

To verify, please build and serve your Docusaurus site. The 'manuscript' chapters should now be accessible under the '/book' route and listed in the new 'Book' section of your navigation.

## Outcome

- ✅ Impact: Docusaurus main book should now be visible.
- 🧪 Tests: Manual verification by user is required to confirm the fix.
- 📁 Files: Modified Docusaurus configuration and sidebar files.
- 🔁 Next prompts: User to verify the Docusaurus site.
- 🧠 Reflection: Identified missing configuration for manuscript directory and sidebar entry.

## Evaluation notes (flywheel)

- Failure modes observed: null
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
