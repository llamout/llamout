import { BadgeDollarSign } from 'lucide-react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Card } from '@workspace/ui/components/card';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@workspace/ui/components/tooltip';

import { formatBigNumbers } from '@/lib/number';
import { timeAgo } from '@/lib/date';

export function SaleSection({ data }: { data: { id: string; amount: number; created_at: number }[] | any }) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Sales</h1>
          {/* <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p> */}
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        {!data || data?.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-4 w-full py-8 bg-white border border-dashed rounded-lg'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-t from-background to-transparent border rounded-lg shadow-sm text-muted-foreground'>
                <BadgeDollarSign className='size-6' />
              </div>
              <h3 className='text-lg'>No active sales</h3>
              <p className='text-sm text-muted-foreground'>There's nothing to see here yet.</p>
            </div>
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader className='px-4'>
                <TableRow className=''>
                  <TableHead className='w-full'>Identifier</TableHead>
                  <TableHead className='hidden sm:table-cell w-auto whitespace-nowrap'>Ago</TableHead>
                  <TableHead className='text-end'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length > 0 &&
                  data?.map((sale: any) => (
                    <TableRow key={sale?.id}>
                      <TableCell className='overflow-hidden max-w-[180px] text-ellipsis'>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='overflow-hidden max-w-[180px] text-ellipsis'>
                              {sale?.hash}
                            </TooltipTrigger>
                            <TooltipContent side='top' align='start'>
                              <p>{sale?.hash}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      {/* <TableCell>AlignUI・Code Library</TableCell> */}
                      <TableCell className='hidden sm:table-cell w-auto whitespace-nowrap'>
                        {timeAgo(sale?.created_at)}
                      </TableCell>
                      <TableCell className='text-end'>
                        <div className='flex items-center justify-end gap-1'>
                          {sale?.currency === 'SAT' ? (
                            <Satoshi className='w-4 h-4' />
                          ) : (
                            <span className='text-sm'>$</span>
                          )}
                          <div className='text-md font-semibold'>{formatBigNumbers(sale?.amount)}</div>
                          <span className='text-sm text-muted-foreground'>
                            {sale?.currency === 'SAT' ? 'SAT' : sale?.currency}
                          </span>
                        </div>
                      </TableCell>
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
