import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Define the book sidebar with manual entries
  bookSidebar: [
    {
      type: 'category',
      label: 'Book Chapters',
      items: [
        'chapter-01',
        'chapter-02',
        'chapter-03',
        'chapter-04',
        'chapter-05',
        'chapter-06',
        'chapter-07',
        'chapter-08',
        'chapter-09',
        'chapter-10',
        'chapter-11',
        'chapter-12',
        'chapter-13',
        'chapter-14',
        'chapter-template'
      ],
    },
  ],
};

export default sidebars;
