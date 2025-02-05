export type SiteConfig = typeof siteConfig;

const links = {
  x: 'https://twitter.com/unllamas',
  github: 'https://github.com/unllamas/llamout',
  githubAccount: 'https://github.com/unllamas',
  discord: 'https://discord.com/users/unllamas',
};

export const siteConfig = {
  name: 'Llamout',
  description:
    'An open-source payment system designed to allow you to offer your products or services without commission.',
  url: 'https://llamout.vercel.app/',
  ogImage: 'https://llamout.vercel.app/opengraph-image.png',
  links,
};
