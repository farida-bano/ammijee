---
id: 0001
title: Update Project Constitution
stage: constitution
date: 2025-12-08
surface: agent
model: gemini-1.5-pro
feature: none
branch: 001-physical-ai-book
user: sarosh
command: /sp.constitution
labels: [constitution, project-governance]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .specify/memory/constitution.md
tests:

---

## Prompt

---
description: Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

Follow this execution flow:

1. Load the existing constitution template at `.specify/memory/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.

2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

4. Consistency propagation checklist (convert prior checklist into active validations):
   - Read `.specify/templates/plan-template.md` and ensure any "Constitution Check" or rules align with updated principles.
   - Read `.specify/templates/spec-template.md` for scope/requirements alignment—update if constitution adds/removes mandatory sections or constraints.
   - Read `.specify/templates/tasks-template.md` and ensure task categorization reflects new or removed principle-driven task types (e.g., observability, versioning, testing discipline).
   - Read each command file in `.specify/templates/commands/*.md` (including this one) to verify no outdated references (agent-specific names like CLAUDE only) remain when generic guidance is required.
   - Read any runtime guidance docs (e.g., `README.md`, `docs/quickstart.md`, or agent-specific guidance files if present). Update references to principles changed.

5. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):
   - Version change: old → new
   - List of modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if any placeholders intentionally deferred.

6. Validation before final output:
   - No remaining unexplained bracket tokens.
   - Version line matches report.
   - Dates ISO format YYYY-MM-DD.
   - Principles are declarative, testable, and free of vague language ("should" → replace with MUST/SHOULD rationale where appropriate).

7. Write the completed constitution back to `.specify/memory/constitution.md` (overwrite).

8. Output a final summary to the user with:
   - New version and bump rationale.
   - Any files flagged for manual follow-up.
   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Do not create a new template; always operate on the existing `.specify/memory/constitution.md` file.

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.constitution 
# **Constitution Prompt for SpeckitPlus**

**Project:** *The Future of Work: Human-AI-Robot Partnership in the Era of Physical AI & Humanoid Robotics*

**Type:** Book (Building on existing work)

---

## **CONSTITUTION**

### **CORE PRINCIPLES**
1. **Human-Centric Future:** Focus on augmentation, not replacement—emphasizing partnership between humans, AI agents, and robots.
2. **Skill Transition Framework:** Analyze how jobs transform rather than disappear, identifying emerging skill demands.
3. **Technical Accessibility:** Bridge cutting-edge Physical AI concepts for a computer science audience without oversimplification.
4. **Evidence-Based Forecasting:** Ground future projections in current research, pilot programs, and adoption trends.
5. **Ethical & Practical Balance:** Address both the potential and the challenges of human-robot collaboration.

---

## **KEY STANDARDS**

### **Content Integrity:**
- **Source Hierarchy:** 
  1. Peer-reviewed research (journals, conferences)
  2. Industry white papers & technical reports
  3. Case studies & pilot program documentation
  4. Reputable news/analysis (limited to trend reporting)
- **Minimum Sources:** 20 total sources
  - At least 10 peer-reviewed articles (50%)
  - At least 3 industry case studies
  - At least 2 labor economics/workforce studies
- **Citation Format:** APA 7th Edition (author-date, full reference list)
- **Claim Verification:** Every forward-looking statement must be anchored in at least one current data point or research trend.

### **Writing Quality:**
- **Audience:** Computer science students, educators, tech professionals
- **Clarity Level:** Flesch-Kincaid Grade 10-12
- **Tone:** Professional yet engaging; explanatory but not promotional
- **Structure:**
  - Clear thesis in introduction
  - Logical progression: Current State → Transition → Future Vision
  - Chapter summaries or key takeaways
  - Glossary of specialized terms (Physical AI, embodied cognition, sim-to-real, etc.)

---

## **SPECIFIC CONSTRAINTS**

### **Scope Boundaries:**
- **Time Horizon:** Focus on 5-15 year outlook
- **Geographic Scope:** Global perspective with recognition of regional disparities
- **Technological Scope:** 
  - Primarily Physical AI & Humanoid Robotics
  - Tangential mention of other AI/robotics as context
- **Exclusions:** 
  - Minimal focus on fully autonomous systems without human partnership
  - Avoid science fiction speculation without research foundation

### **Content Requirements:**
- **Word Count:** 6,000-8,000 words (building upon existing work)
- **Required Chapters/Sections:**
  1. The Partnership Model Defined (Human-AI-Robot triad)
  2. Current State of Physical AI & Humanoid Robotics
  3. Skill Transformation: From Job Loss to Job Evolution
  4. Case Studies in Partnership (minimum 3 detailed examples)
  5. Educational & Training Pathways
  6. Ethical Considerations & Guardrails
  7. Implementation Roadmap for Organizations
- **Visual Elements:** 
  - 3-5 original diagrams (workflow, skill maps, adoption curves)
  - Tables comparing old vs. new skill demands
- **Format:** 
  - PDF with clickable citations
  - Hyperlinked references where available
  - Accessible formatting (proper headings, alt-text for images)

---

## **TECHNICAL IMPLEMENTATION & DEPLOYMENT**

### **Technical Stack for Book Development:**
- **Documentation Framework:** Use **Docusaurus** for creating a structured, searchable companion website with versioning capabilities.
- **API & Backend Services:** Implement **FastAPI** backend for:
  1. Serving simulation/data dashboards for case studies
  2. Managing glossary and interactive elements
  3. Hosting **Chatbot RAG (Retrieval-Augmented Generation)** system for querying book content
- **Sub-agent Orchestration:** Design writing/research process using sub-agent system (LangChain/AutoGen/custom) with specialized agents:
  - `ResearchAgent`: Source finding and summarization
  - `ValidationAgent`: Claim verification and plagiarism checks
  - `WritingAgent`: Tone, structure, and audience alignment
  - `TechnicalDiagramAgent`: Diagram and table generation
- **Version Control:** Use **Git** (GitHub/GitLab) for:
  - Manuscript version tracking (`.md`/`.tex` files)
  - Companion website code management
  - Collaboration with reviewers via Issues and Pull Requests

### **Deployment Strategy (Vercel Optimization):**
- **Markdown Parsing Fix:** Implement pre-deployment build process to correct Vercel-specific Markdown-to-HTML issues:
  - Validate code block closures
  - Escape special characters in citations
  - Resolve image paths and alt-text formatting
- **Hybrid Deployment Model:**
  - **Frontend (Docusaurus):** Deploy on **Vercel** for global CDN benefits
  - **Backend (FastAPI & RAG):** Deploy on **Railway/Fly.io/AWS EC2** to avoid serverless timeouts
- **Mac-Friendly Local Setup:** Provide Homebrew-based installation scripts for local development environment

## Response snapshot

- New version: 2.0.0 (Major bump due to complete overhaul of the constitution).
- No files require manual follow-up.
- Suggested commit message: `docs: amend constitution to v2.0.0 (new project constitution)`

## Outcome

- ✅ Impact: Project constitution updated to version 2.0.0.
- 🧪 Tests: None
- 📁 Files: One file updated.
- 🔁 Next prompts: Awaiting user command.
- 🧠 Reflection: Successfully updated the constitution and handled the PHR creation fallback.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` script produced an incorrect path and did not create the file in the workspace.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
