'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { House, LogOut, SettingsIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { Button } from '@workspace/ui/components/button';

import { db } from '@/lib/database';

export function NavStore() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { user } = db.useAuth();

  const query = {
    store: {
      $: {
        where: {
          id: params?.id,
          user_id: user?.id || '',
        },
      },
    },
  };

  const { data } = db.useQuery(query);

  if (!user || data?.store?.length === 0) {
    return <Skeleton className='w-8 h-8 bg-gray-200 rounded-full' />;
  }

  const store = data?.store[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          {store?.image ? (
            <div className='overflow-hidden w-8 h-8 rounded-full'>
              <img className='object-cover' src={store?.image} alt={store?.name} />
            </div>
          ) : (
            <Skeleton className='w-8 h-8 bg-gray-200 rounded-full' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        side={'bottom'}
        align='end'
        sideOffset={12}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            {store?.image ? (
              <div className='overflow-hidden w-8 h-8 rounded-full'>
                <img className='object-cover' src={store?.image} alt={store?.name} />
              </div>
            ) : (
              <Skeleton className='w-8 h-8 bg-gray-200 rounded-full' />
            )}
            <div className='text-sm leading-tight'>
              <span className='overflow-hidden block max-w-[150px] truncate font-semibold text-ellipsis'>
                {store?.name}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/${store?.id}`}>
              <House />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/${store?.id}/settings`}>
              <SettingsIcon />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            db.auth.signOut();
            router.push('/auth');
          }}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
