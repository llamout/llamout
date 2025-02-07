import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@workspace/ui/components/tooltip';
import { Card } from '@workspace/ui/components/card';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';

import { formatBigNumbers } from '@/lib/number';

const SALES: any = [
  // {
  //   id: 1,
  //   name: 'Jeremias',
  //   pubkey: '',
  //   email: 'jereflores@hotmail.es',
  //   created_at: 1738614061415,
  // },
  // {
  //   id: 2,
  //   name: '',
  //   pubkey: 'tincho@hodl.ar',
  //   email: '',
  //   created_at: 1738689769584,
  // },
  // {
  //   id: 3,
  //   name: '',
  //   pubkey: 'npub18ggwqfvqmxt3m6f4ek2q55nghlj9380me364wd67wz8yzpyh8wusevpdmh',
  //   email: '',
  //   created_at: 1738199211938,
  // },
];

function formatDate(timestamp: any) {
  const date = new Date(timestamp);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function SaleSection() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Sales</h1>
          {/* <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p> */}
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        {SALES?.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-4 w-full py-8 bg-white border border-dashed rounded-lg'>
            <div className='flex flex-col gap-2 text-center'>
              <h3 className='text-lg'>There's nothing to see here yet.</h3>
              <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        ) : (
          <Card>
            <Table>
              {SALES?.length === 0 && <TableCaption className='pb-4'>A list of your recent customers.</TableCaption>}
              <TableHeader className='px-4'>
                <TableRow className=''>
                  <TableHead className='w-full'>Customer</TableHead>
                  <TableHead className='hidden sm:table-cell w-auto whitespace-nowrap'>Date</TableHead>
                  <TableHead className='text-end'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SALES?.length > 0 &&
                  SALES?.map((customer: any) => (
                    <TableRow key={customer?.id}>
                      <TableCell className='overflow-hidden max-w-[120px] text-ellipsis'>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='overflow-hidden max-w-[120px] text-ellipsis'>
                              {customer?.pubkey}
                            </TooltipTrigger>
                            <TooltipContent side='top' align='start'>
                              <p>{customer?.pubkey}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      {/* <TableCell>AlignUI・Code Library</TableCell> */}
                      <TableCell className='hidden sm:table-cell w-auto whitespace-nowrap'>
                        {formatDate(customer?.created_at)}
                      </TableCell>
                      <TableCell className='text-end'>
                        <div className='flex items-center justify-end gap-1'>
                          <Satoshi className='size-4' />
                          <div className='text-md font-semibold'>{formatBigNumbers(199000)}</div>
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
