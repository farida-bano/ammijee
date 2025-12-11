# Farida Bot - AI Assistant Integration

This project includes an AI chatbot assistant named "Farida Bot" (FB Chatbot) integrated into the Docusaurus documentation site.

## Features

- **Floating Chat Interface**: A colorful chat button appears on all documentation pages
- **"Farida Bot" Name**: The chatbot is named after the project's theme "Farida Bano"
- **"FB" Initials**: The chatbot is also referred to as "FB Chatbot" using the initials
- **Context-Aware**: Provides assistance specifically related to Physical AI & Humanoid Robotics
- **Modern UI**: Colorful gradient design with animations and responsive layout

## Implementation Details

### Components

- `src/components/ChatBot/ChatBot.tsx`: Main React component for the chatbot
- `src/components/ChatBot/chatbot.css`: Styling for the chatbot interface
- `src/theme/Root.tsx`: Global wrapper that adds the chatbot to all pages
- `static/img/farida-bot-icon.svg`: Custom icon for the chatbot

### Design Elements

- Colorful gradient design with purple/blue tones
- Floating button with "FB" badge
- Animated typing indicators
- Responsive layout for mobile and desktop
- Custom SVG icon representing a chatbot

### Integration

- The chatbot is automatically added to all documentation pages via the Root theme component
- It connects to the existing backend endpoints (`/chat-stream` and `/chat`)
- Chat history clears when navigating between pages
- Includes a clear chat functionality

## Customization

To customize the chatbot's appearance or behavior, modify:

- `src/components/ChatBot/chatbot.css` for visual styling
- `src/components/ChatBot/ChatBot.tsx` for behavior and functionality
- The welcome message can be changed in the component's clearChat function

## Backend Connection

The chatbot connects to your existing backend API endpoints:
- `/chat-stream` for streaming responses
- `/chat` for regular responses

## Branding Updates

The site's tagline and footer have been updated to reflect the AI assistant integration:
- Tagline: "Farida Bano - With Integrated AI Assistant"
- Footer: "Powered by Farida Bot AI Assistant"