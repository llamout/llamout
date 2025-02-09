import { useEffect, useState } from 'react';

import { addWaitlist } from '@/actions/waitlist';
import { getLocal, setLocal } from '@/lib/config';

import { CustomTabs } from './custom-tabs';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';

const tabs = [
  { id: 1, name: 'Email', active: true },
  { id: 2, name: 'Nostr', active: true },
];

export function Form(props: any) {
  const [showTab, setShowTab] = useState(0);
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [registered, setRegistered] = useState(false);

  async function onSubmit(e: any) {
    e.preventDefault();
    setDisabled(true);

    if (!value || registered) {
      setDisabled(false);
      return;
    }

    const isEmail = showTab === 0;

    const { error, data } = await addWaitlist({ email: isEmail ? value : '', pubkey: !isEmail ? value : '' });

    if (error) {
      setDisabled(false);
      return;
    }

    setLocal('waitlist-id', data);
    setRegistered(true);
    setValue('');
  }

  useEffect(() => {
    const isRegistered = getLocal('waitlist-id');
    setRegistered(isRegistered);
  }, []);

  return (
    <div className='flex flex-col gap-4 w-full max-w-sm mx-auto'>
      <CustomTabs
        onChange={(value) => {
          setValue('');
          setShowTab(value);
        }}
        tabs={tabs}
      />
      <form onSubmit={onSubmit}>
        {tabs?.map((tab, index) => (
          <div key={index} className={`relative flex-col gap-2 ${showTab === index ? 'flex' : 'hidden'}`}>
            <Input
              {...props}
              className='pr-24'
              type={showTab === 1 ? 'text' : 'email'}
              placeholder={showTab === 1 ? 'you@nip05, npub... or hex format' : 'you@email.com'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={registered}
            />
            <div className='absolute right-2 top-0 flex items-center h-full'>
              <Button size='sm' type='submit' disabled={!value || disabled || registered}>
                Join Waitlist
              </Button>
            </div>
          </div>
        ))}
      </form>
      {registered && (
        <div className=''>
          <p className='text-muted-foreground'>Thanks for joining our waitlist!</p>
        </div>
      )}
    </div>
  );
}
