import { ContactRound } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@workspace/ui/components/tooltip';
import { Card } from '@workspace/ui/components/card';

import { db } from '@/lib/database';
import { timeAgo } from '@/lib/date';

export function CustomerSection({ store_id }: { store_id: string }) {
  const queryStore = {
    customers: {
      orders: {},
    },
  };

  const { data, isLoading } = db.useQuery(queryStore);
  const customers = data?.customers;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Customers</h1>
          {/* <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p> */}
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        {!customers || customers?.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-4 w-full py-8 bg-white border border-dashed rounded-lg'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-t from-background to-transparent border rounded-lg shadow-sm text-muted-foreground'>
                <ContactRound className='size-6' />
              </div>
              <h3 className='text-lg'>No active customers</h3>
              <p className='text-sm text-muted-foreground'>
                Active customers linked to this product will be listed here.
              </p>
            </div>
          </div>
        ) : (
          <Card>
            <Table>
              {/* {data?.length === 0 && (
                <TableCaption className='pb-4'>A list of your recent customers.</TableCaption>
              )} */}
              <TableHeader className='px-4'>
                <TableRow className=''>
                  <TableHead className='w-3'></TableHead>
                  {/* <TableHead className='max-w-[100px]'>Pubkey</TableHead> */}
                  <TableHead className='overflow-hidden max-w-[200px]'>Customer</TableHead>
                  {/* <TableHead className='whitespace-nowrap'>Name</TableHead> */}
                  <TableHead className='hidden sm:table-cell w-20 whitespace-nowrap'>Ago</TableHead>
                  {/* <TableHead className='w-[60px]'></TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers?.length > 0 &&
                  customers?.map((customer: any) => (
                    <TableRow key={customer?.id}>
                      {/* <TableCell className='overflow-hidden max-w-[100px] text-ellipsis'>
                        {customer?.pubkey ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className='overflow-hidden max-w-[100px] text-ellipsis'>
                                {customer?.pubkey}
                              </TooltipTrigger>
                              <TooltipContent side='top' align='start'>
                                <p>{customer?.pubkey}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          '-'
                        )}
                      </TableCell> */}
                      <TableCell>
                        <div
                          className={`w-3 h-3 rounded-full ${customer?.orders[0]?.paid ? 'bg-green-600' : 'bg-gray-200'}`}
                        ></div>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='overflow-hidden max-w-[200px] text-ellipsis'>
                              {customer?.pubkey || customer?.email}
                            </TooltipTrigger>
                            <TooltipContent side='top' align='start'>
                              <p>{customer?.pubkey || customer?.email}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      {/* <TableCell>{customer?.name || '-'}</TableCell> */}
                      <TableCell className='hidden sm:table-cell whitespace-nowrap'>
                        {timeAgo(customer?.created_at)}
                      </TableCell>
                      {/* <TableCell>
                      <Button variant='outline' size='icon'>
                        <Eye />
                      </Button>
                    </TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
}
