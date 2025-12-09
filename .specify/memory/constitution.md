<!--
Sync Impact Report

- Version change: 1.0.0 → 2.0.0
- Modified principles: All principles are new.
- Added sections: Content Integrity, Writing Quality, Scope Boundaries, Content Requirements, Technical Implementation & Deployment.
- Removed sections: All old sections are removed.
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (No changes needed, gates are dynamically generated)
  - ✅ .specify/templates/spec-template.md (No changes needed)
  - ✅ .specify/templates/tasks-template.md (No changes needed)
- Follow-up TODOs: None
-->

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

---
**Version**: 2.0.0 | **Ratified**: 2025-12-08 | **Last Amended**: 2025-12-08