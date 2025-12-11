import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics Book',
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
    navbar: {
      title: 'Physical AI & Humanoid Robotics Book',
      logo: {
        alt: 'Physical AI & Humanoid Robotics Logo',
        src: 'img/logo.png',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Book Chapters',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Quick Start',
        },
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
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Chapter 1: Physics Simulators',
              to: '/docs/chapter-01',
            },
            {
              label: 'Chapter 2: Hardware Components',
              to: '/docs/chapter-02',
            },
            {
              label: 'Chapter 3: Control Systems',
              to: '/docs/chapter-03',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
            {
              label: 'API Reference',
              to: '/docs/chapter-01',
            },
            {
              label: 'Tutorials',
              to: '/docs/chapter-02',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/farida-bano/physical-ai-humanoid-robotics-book',
            },
            {
              html: `
                <div style="margin-top: 1rem;">
                  <a href="https://github.com/farida-bano/physical-ai-humanoid-robotics-book" target="_blank">
                    <img src="https://img.shields.io/github/stars/farida-bano/physical-ai-humanoid-robotics-book?style=social" alt="GitHub Stars" />
                  </a>
                </div>
              `,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics. Powered by Farida Bot AI Assistant. Built with Docusaurus.`,
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
      indexName: 'physical-ai-humanoid-robotics',
      contextualSearch: true,
    },
    metadata: [
      {name: 'keywords', content: 'physical AI, humanoid robotics, AI assistant, robotics, machine learning'},
      {name: 'author', content: 'Farida Bano'},
      {property: 'og:image', content: 'img/1.jpg'},
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
