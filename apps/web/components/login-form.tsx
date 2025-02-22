'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { Button } from '@workspace/ui/components/button';

import { db } from '@/lib/database';

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_CLIENT = process.env.GOOGLE_CLIENT_NAME;

export function LoginForm() {
  // States
  const [nonce] = useState(crypto.randomUUID());

  return (
    <div className='flex items-center flex-col gap-6'>
      <GoogleOAuthProvider clientId={GOOGLE_ID as string}>
        <GoogleLogin
          text='signin_with'
          locale='en'
          width={'100%'}
          nonce={nonce}
          onError={() => alert('Login failed')}
          onSuccess={({ credential }) => {
            db.auth
              .signInWithIdToken({
                clientName: GOOGLE_CLIENT as string,
                idToken: credential as string,
                nonce,
              })
              .catch((err) => {
                alert('Uh oh: ' + err.body?.message);
              });
          }}
        />
      </GoogleOAuthProvider>
      <Button variant='link' asChild>
        <Link href='/'>Go to Home</Link>
      </Button>
    </div>
  );
}
