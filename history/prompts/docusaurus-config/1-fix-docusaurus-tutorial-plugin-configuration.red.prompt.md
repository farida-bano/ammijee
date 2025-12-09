---
id: 1
title: Fix Docusaurus tutorial plugin configuration
stage: red
date: 2023-12-09
surface: agent
model: gemini-1.5-pro
feature: docusaurus-config
branch: main
user: sarosh
command: fix docusaurus config
labels: ["bug-fix", "docusaurus"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - book/docusaurus.config.ts
tests: []
prompt_text: "This page crashed\nA theme navbar item failed to render.\nPlease double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:\n{\n  \"type\": \"docSidebar\",\n  \"sidebarId\": \"tutorialSidebar\",\n  \"docsPluginId\": \"tutorial\",\n  \"position\": \"left\",\n  \"label\": \"Tutorial\"\n}\n\nCause:\nYou are using a feature of the Docusaurus docs plugin, but this plugin does not seem to be enabled (pluginId=tutorial\n\nCause:\nDocusaurus plugin global data not found for \"docusaurus-plugin-content-docs\" plugin with id \"tutorial\".\n"
response_text: "The user is reporting an error in Docusaurus where a navbar item failed to render because the `docusaurus-plugin-content-docs` plugin with id \"tutorial\" is not enabled. I need to investigate the Docusaurus configuration to enable this plugin."
outcome: "The Docusaurus tutorial plugin was enabled by uncommenting its configuration in `book/docusaurus.config.ts`, resolving the 'plugin global data not found' error."
evaluation: "The change directly addressed the reported error and the Docusaurus site should now render correctly."
---