import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'FAQ | Modulus',
  tagline: 'Nyttig informasjon om Modulus',
  favicon: 'img/favicon.ico',

  url: 'https://modulus.nokkenforlag.no',
  baseUrl: '/',

  i18n: {
    defaultLocale: 'no',
    locales: ['no'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
         },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Modulus',
      logo: {
        alt: 'Modulus Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        // {to: '/blog', label: 'Blog', position: 'left'}, // deaktivert inntil videre
        {
          href: 'https://nokkenforlag.no',
          label: 'Nøkken Forlag',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Kom i gang',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Kontakt',
          items: [
            {
              label: 'Support',
              href: 'mailto:support@nokkenforlag.no',
            },
          ],
        },
        {
          title: 'Mer',
          items: [
            {
              label: 'Nøkken Forlag',
              href: 'https://nokkenforlag.no',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Nøkken Forlag. Bygget med Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
