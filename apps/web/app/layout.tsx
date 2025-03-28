import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

import { Toaster } from '@workspace/ui/components/toaster';

import { siteConfig } from '@/config/site';

import './globals.css';

const GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS || '';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ''),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['nextjs', 'react', 'payment', 'checkout', 'lightning network', 'bitcoin'],
  authors: [
    {
      name: 'unllamas',
      url: 'https://www.jonallamas.com',
    },
  ],
  creator: 'unllamas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@unllamas',
  },
  icons: {
    icon: '/icon.png',
  },
  // manifest: `${process.env.NEXT_PUBLIC_APP_URL}/site.webmanifest`,
};

const CRISP_ID = process.env.CRISP_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link href='https://fonts.cdnfonts.com/css/satoshi' rel='stylesheet' />
        <Script
          id='crisp-chat'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = "${CRISP_ID}";
            (function() {
              var d = document;
              var s = d.createElement("script");
              s.src = "https://client.crisp.chat/l.js";
              s.async = 1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `,
          }}
        />
        {/* <script type='text/javascript'></script> */}
      </head>
      <body className={`antialiased`}>
        {children}
        <Toaster />
        <Analytics />
        <GoogleAnalytics gaId={GOOGLE_ANALYTICS} />
      </body>
    </html>
  );
}
