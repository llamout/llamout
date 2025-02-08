'use client';

import { useState } from 'react';
import { init } from '@instantdb/react';
import { LoaderCircle } from 'lucide-react';

import { validateWaitlist } from '@/actions/waitlist';

import { useToast } from '@workspace/ui/hooks/use-toast';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Badge } from '@workspace/ui/components/badge';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@workspace/ui/components/input-otp';

import { CustomTabs } from './landing/custom-tabs';
import { db } from '@/lib/database';

const tabs = [
  { id: 1, name: 'Email', active: true },
  { id: 1, name: 'Nostr', active: false },
];

export function LoginForm() {
  // Hooks
  const { toast } = useToast();

  // States
  const [sentEmail, setSentEmail] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;
    setLoading(true);

    // TO-DO
    // Remove validation
    const isListed = await validateWaitlist({ email });

    if (isListed?.error) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'It looks like you are not on the waiting list.',
      });

      return;
    }

    db.auth.sendMagicCode({ email }).catch((err) => {
      setSentEmail('');
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: err.body?.message,
      });
    });

    setLoading(false);
    setSentEmail(email);
  };

  const handleConfirmCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    db.auth.signInWithMagicCode({ email: sentEmail, code }).catch((err) => {
      setCode('');
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: err.body?.message,
      });
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      <CustomTabs onChange={(value) => null} tabs={tabs} />
      {!sentEmail ? (
        <>
          <form className='flex flex-col gap-4' onSubmit={handleSendCode}>
            <div className='flex flex-col gap-4'>
              <p className='text-sm text-muted-foreground'>Enter your email, and we’ll send you a verification code.</p>
              <div className='grid gap-2'>
                {/* <Label htmlFor='email'>Email</Label> */}
                <Input
                  id='email'
                  type='email'
                  placeholder='satoshi@bitcoin.org'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type='submit' className='w-full' disabled={!email || loading}>
                {loading ? <LoaderCircle className='size-8 animate-spin' /> : 'Send Code'}
              </Button>
            </div>
          </form>
        </>
      ) : (
        <form className='flex flex-col gap-4' onSubmit={handleConfirmCode}>
          <div className='flex flex-col gap-4'>
            <p className='text-sm text-muted-foreground'>
              We sent an email to <strong className='text-foreground'>{email}</strong>. Check your email, and paste the
              code you see.
            </p>
            <div className='flex flex-col gap-2'>
              {/* <Label htmlFor='code'>Code</Label> */}
              <InputOTP id='code' maxLength={6} value={code} onChange={(value) => setCode(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button type='submit' disabled={!code || code?.length < 6 || loading}>
              {loading ? <LoaderCircle className='size-8 animate-spin' /> : 'Verify'}
            </Button>
          </div>
        </form>
      )}
      {/* <div className='flex items-center gap-2 px-4'>
        <div className='w-full h-[1px] bg-gray-300'></div>
        <span className='text-sm text-muted-foreground'>or</span>
        <div className='w-full h-[1px] bg-gray-300'></div>
      </div>
      <Button variant='secondary' disabled>
        Continue with Nostr
        <Badge variant='outline'>Soon</Badge>
      </Button> */}
    </div>
  );
}
