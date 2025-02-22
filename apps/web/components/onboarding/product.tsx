import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { Select, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Badge } from '@workspace/ui/components/badge';
import { useToast } from '@workspace/ui/hooks/use-toast';

import { formatBigNumbers } from '@/lib/number';

import { LIMIT_PRICE_PRODUCT } from '@/config/system';

export function ProductStep({ data, updateData }: { data: any; updateData: (value: any) => void }) {
  // Hooks
  const { toast } = useToast();

  return (
    <div className='flex flex-col gap-8'>
      {/* <div className='flex flex-col items-center text-center gap-2'>
        <ShoppingBag className='size-8' />
        <h1 className='text-xl font-bold'>Product</h1>
        <p className='text-muted-foreground'>Add a new product to your store.</p>
      </div> */}
      <div className='flex flex-col gap-4'>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='mediaUrl'>Image URL</Label>
            <Input
              id='mediaUrl'
              placeholder='https://example.com/media.jpg'
              value={data?.image}
              onChange={(e) => updateData({ ...data, image: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='productName'>
              Name <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='productName'
              placeholder='Enter product name'
              value={data?.name}
              onChange={(e) => updateData({ ...data, name: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              placeholder='Enter product description'
              value={data?.description}
              onChange={(e) => updateData({ ...data, description: e.target.value })}
            />
          </div>
        </form>

        <Tabs className='w-full' defaultValue='one_payment'>
          <TabsList className='w-full'>
            <TabsTrigger className='w-full' value='one_payment'>
              One Pay
            </TabsTrigger>
            <TabsTrigger className='w-full' value='subscription' disabled={true}>
              Subscription <Badge className='ml-2'>Soon</Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='one_payment'>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2 w-full'>
                <Label htmlFor='price'>
                  Price <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='price'
                  type='number'
                  placeholder='0'
                  value={data?.prices[0]?.price ?? null}
                  onChange={(e) => {
                    if (
                      Number(e.target.value) === LIMIT_PRICE_PRODUCT ||
                      Number(e.target.value) > LIMIT_PRICE_PRODUCT
                    ) {
                      toast({
                        variant: 'destructive',
                        title: 'Oops!',
                        description: `Maximum amount ${formatBigNumbers(LIMIT_PRICE_PRODUCT)} SATs`,
                      });
                      return;
                    }

                    if (Number(e.target.value) > 0) {
                      updateData({
                        ...data,
                        prices: [{ price: Number(e.target.value), type: 'one_time', interval: null }],
                      });
                    }
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='currency'>Currency</Label>
                <Select disabled>
                  <SelectTrigger className='w-[80px]'>
                    <SelectValue placeholder='SAT' />
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </TabsContent>
          {/* <TabsContent value='subscription'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-row items-center justify-between p-4 bg-white rounded-lg border shadow-sm'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='airplane-mode'>Show yearly pricing</Label>
                  <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                </div>
                <Switch onCheckedChange={setShowYearlyPricing} id='airplane-mode' />
              </div>
              <div className='flex gap-4 items-end'>
                <div className='flex flex-col gap-2 w-full'>
                  <Label htmlFor='price'>
                    Price p/month <span className='text-destructive'>*</span>
                  </Label>
                  <Input
                    id='price'
                    type='number'
                    placeholder='0'
                    value={data?.price ?? null}
                    onChange={(e) => updateData({ ...data, price: e.target.value })}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='currency'>Currency</Label>
                  <Select disabled>
                    <SelectTrigger className='w-[80px]'>
                      <SelectValue placeholder='SAT' />
                    </SelectTrigger>
                  </Select>
                </div>
              </div>
              {showYearlyPricing && (
                <div className='flex gap-4 items-end'>
                  <div className='flex flex-col gap-2 w-full'>
                    <Label htmlFor='price'>
                      Price p/year <span className='text-destructive'>*</span>
                    </Label>
                    <Input
                      id='price'
                      type='number'
                      placeholder='0'
                      value={data?.price ?? null}
                      onChange={(e) => updateData({ ...data, price: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='currency'>Currency</Label>
                    <Select disabled>
                      <SelectTrigger className='w-[80px]'>
                        <SelectValue placeholder='SAT' />
                      </SelectTrigger>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
