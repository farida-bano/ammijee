import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Book',
  tagline: 'Farida Bano - With Integrated AI Assistant',
  favicon: 'img/2.jpg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/book/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'YourOrganization', // Usually your GitHub org/user name.
  projectName: 'physical-ai-book', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          routeBasePath: '/', // Serve the docs at the site's root
          editUrl: undefined, // Explicitly set to undefined to remove "edit this page" links
          editCurrentVersion: false, // Disable editing of current version
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/1.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: 'Book',
      logo: {
        alt: 'Book Logo',
        src: 'img/logo.png',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Chapters',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/your-org/physical-ai-book',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Book Sections',
          items: [
            {
              label: 'Chapter 1: Physics Simulators',
              to: '/chapter-01',
            },
            {
              label: 'Chapter 2: Hardware Components',
              to: '/chapter-02',
            },
            {
              label: 'Chapter 3: Control Systems',
              to: '/chapter-03',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Documentation',
              to: '/intro',
            },
            {
              label: 'API Reference',
              to: '/chapter-01',
            },
            {
              label: 'Tutorials',
              to: '/chapter-02',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Book. Powered by Farida Bot AI Assistant. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'YOUR_ALGOLIA_APP_ID',
      // Public API key: it is safe to commit it
      apiKey: 'YOUR_ALGOLIA_API_KEY',
      indexName: 'jee',
      contextualSearch: true,
    },
    metadata: [
      {name: 'keywords', content: 'jee, AI assistant, education, learning'},
      {name: 'author', content: 'Farida Bano'},
      {property: 'og:image', content: 'img/1.jpg'},
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
