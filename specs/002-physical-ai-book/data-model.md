# Data Model: Physical AI & Humanoid Robotics Book

This document defines the key entities that compose the book and its companion materials.

## Main Entities

### Book
The top-level container for all content.
- **Attributes**:
    - `title`: String
    - `subtitle`: String
    - `audience`: String
    - `level`: String
    - `core_thesis`: String
    - `parts`: has-many Part

### Part
A logical grouping of chapters that represents a major section of the book.
- **Attributes**:
    - `title`: String
    - `chapters`: has-many Chapter

### Chapter
A self-contained unit of learning.
- **Attributes**:
    - `title`: String
    - `learning_objectives`: Array of String
    - `prerequisites`: Text
    - `key_terms`: Array of KeyTerm
    - `code_examples`: has-many CodeExample
    - `visual_elements`: has-many VisualElement
    - `exercises`: has-many Exercise

### Module
A thematic grouping of content that maps to a specific learning path or hackathon requirement. It cross-references multiple chapters.
- **Attributes**:
    - `title`: String
    - `learning_objectives`: Array of String
    - `key_sections`: Array of String (references to chapter sections)

## Component Entities

### KeyTerm
A word or phrase with a specific definition.
- **Attributes**:
    - `term`: String
    - `definition`: Text

### CodeExample
A runnable block of code.
- **Attributes**:
    - `filename`: String (path in the repository)
    - `language`: String (e.g., "Python", "C++")
    - `description`: Text
    - `content`: Code block

### VisualElement
A diagram, flowchart, screenshot, or other image.
- **Attributes**:
    - `filename`: String (path in the repository)
    - `type`: String (e.g., "Diagram", "Screenshot")
    - `caption`: String
    - `alt_text`: String

### Exercise
A task for the reader to complete.
- **Attributes**:
    - `type`: String (e.g., "Basic", "Advanced")
    - `description`: Text
    - `solution`: Text (or link to solution)
