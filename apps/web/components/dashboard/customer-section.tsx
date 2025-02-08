import { ContactRound } from 'lucide-react';
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

const CUSTOMERS: any = [
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

export function CustomerSection({
  data,
}: {
  data: { id: string; name: string; email: string; pubkey: string; store: string; created_at: number }[] | any;
}) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Customers</h1>
          {/* <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p> */}
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        {!data || data?.length === 0 ? (
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
                  <TableHead className='max-w-[100px]'>Pubkey</TableHead>
                  <TableHead className='max-w-[100px]'>Email</TableHead>
                  <TableHead className='whitespace-nowrap'>Name</TableHead>
                  <TableHead className='hidden sm:table-cell whitespace-nowrap'>Created at</TableHead>
                  {/* <TableHead className='w-[60px]'></TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length > 0 &&
                  data?.map((customer: any) => (
                    <TableRow key={customer?.id}>
                      <TableCell className='overflow-hidden max-w-[100px] text-ellipsis'>
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
                      </TableCell>
                      <TableCell className='overflow-hidden max-w-[100px] text-ellipsis'>
                        {customer?.email ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>{customer?.email}</TooltipTrigger>
                              <TooltipContent side='top' align='start'>
                                <p>{customer?.email}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>{customer?.name || '-'}</TableCell>
                      <TableCell className='hidden sm:table-cell whitespace-nowrap'>
                        {formatDate(customer?.created_at)}
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
