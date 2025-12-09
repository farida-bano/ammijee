# Tasks: Physical AI & Humanoid Robotics Book

**Input**: Design documents from `/specs/002-physical-ai-book/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the book's repository structure and companion website.

- [X] T001 Create the book's directory structure in `book/` as defined in `plan.md`.
- [X] T002 [P] Initialize a Docusaurus project in `website/frontend/`.
- [X] T003 [P] Initialize a FastAPI project in `website/backend/`.
- [X] T004 [P] Create a template for chapter markdown files based on the structure in `plan.md`.

---

## Phase 2: Foundational Content (Chapters 1-4)

**Goal**: Write the foundational chapters covering embodied intelligence, hardware, ROS 2, and kinematics.
**Independent Test**: A reader can set up their ROS 2 environment and understand the core concepts of robot kinematics.

- [X] T005 [US1] Write content for Chapter 1: Introduction to Embodied Intelligence.
- [X] T006 [P] [US1] Create diagrams for Chapter 1.
- [X] T007 [US1] Write content for Chapter 2: The Hardware Stack.
- [X] T008 [P] [US1] Create diagrams and tables for Chapter 2.
- [X] T009 [US1] Write content for Chapter 3: ROS 2 Fundamentals.
- [X] T010 [P] [US1] Create code examples for Chapter 3 in `book/code-examples/chapter-03/`.
- [X] T011 [US1] Write content for Chapter 4: Robot Description & Kinematics.
- [X] T012 [P] [US1] Create code examples for Chapter 4 (URDF files) in `book/code-examples/chapter-04/`.

---

## Phase 3: Core Systems & Simulation (Chapters 5-8)

**Goal**: Write the chapters on simulation and core AI perception and navigation.
**Independent Test**: A reader can create a simulated robot in Gazebo and run basic navigation tasks.

- [X] T013 [US1] Write content for Chapter 5: Physics Simulation with Gazebo.
- [X] T014 [P] [US1] Create code examples for Chapter 5 in `book/code-examples/chapter-05/`.
- [X] T015 [US1] Write content for Chapter 6: High-Fidelity Simulation.
- [X] T016 [P] [US1] Create code examples for Chapter 6 in `book/code-examples/chapter-06/`.
- [X] T017 [US1] Write content for Chapter 7: Perception Systems.
- [X] T018 [P] [US1] Create code examples for Chapter 7 in `book/code-examples/chapter-07/`.
- [X] T019 [US1] Write content for Chapter 8: Navigation & Motion Planning.
- [X] T020 [P] [US1] Create code examples for Chapter 8 in `book/code-examples/chapter-08/`.

---

## Phase 4: AI Integration (Chapters 9-12)

**Goal**: Write the chapters on VLA, cognitive architectures, and the capstone project.
**Independent Test**: A reader can integrate an LLM with their robot for task planning and complete the main capstone project.

- [X] T021 [US1] Write content for Chapter 9: Language Interface for Robots.
- [X] T022 [P] [US1] Create code examples for Chapter 9 in `book/code-examples/chapter-09/`.
- [X] T023 [US1] Write content for Chapter 10: Cognitive Architectures.
- [X] T024 [P] [US1] Create diagrams for Chapter 10.
- [X] T025 [US1] Write content for Chapter 11: The Autonomous Humanoid Project.
- [X] T026 [P] [US1] Create the complete code for the capstone project in `book/code-examples/chapter-11/`.
- [X] T027 [US1] Write content for Chapter 12: Advanced Projects.
- [X] T028 [P] [US1] Create code examples for the advanced projects in `book/code-examples/chapter-12/`.

---

## Phase 5: Deployment & Finalization (Chapters 13-14)

**Goal**: Write the final chapters on deployment and future directions.
**Independent Test**: A reader understands the process of deploying a robot from simulation to the real world.

- [X] T029 [US1] Write content for Chapter 13: From Simulation to Reality.
- [X] T030 [P] [US1] Create checklists and guides for Chapter 13.
- [X] T031 [US1] Write content for Chapter 14: The Future of Physical AI.
- [X] T032 [P] [US1] Gather resources and links for Chapter 14.

---

## Phase 6: Polish & Website Development

**Purpose**: Final review of the manuscript and development of the companion website.

- [X] T033 [P] Perform a full technical review of the manuscript and all code examples.
- [X] T034 [P] Proofread and edit the entire manuscript.
- [X] T035 [P] Populate the Docusaurus website in `website/frontend/` with the book content.
- [X] T036 [P] Implement the FastAPI backend in `website/backend/` to serve interactive elements.
- [X] T037 [P] Create the final PDF and EPUB artifacts from the markdown files.
- [X] T038 Run a final validation of all exercises and projects.

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** must be completed before any other phase.
- **Phases 2-5 (Content Creation)** are largely sequential, as each chapter builds on the previous ones. However, tasks within each phase marked with `[P]` can be parallelized (e.g., writing content while creating code examples).
- **Phase 6 (Polish)** can begin after all content creation phases are complete.

---

## Implementation Strategy

### Incremental Delivery
1.  Complete Phase 1 (Setup).
2.  Complete Phase 2 (Foundational Content) and release as an "Early Access" version.
3.  Complete subsequent phases and release them as updates, allowing for reader feedback during the process.
4.  The final MVP is the completed book with all chapters and code examples, as defined by the "Comprehensive Learning Path" user story.
