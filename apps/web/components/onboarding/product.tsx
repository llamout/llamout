import { useState } from 'react';
import { Plus } from 'lucide-react';

import { useToast } from '@workspace/ui/hooks/use-toast';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Tabs, TabsContent } from '@workspace/ui/components/tabs';
import { Button } from '@workspace/ui/components/button';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';

import { formatBigNumbers } from '@/lib/number';

import { LIMIT_PRICE_PRODUCT } from '@/config/system';

export function ProductStep({ data, updateData }: { data: any; updateData: (value: any) => void }) {
  // Hooks
  const { toast } = useToast();

  // Component
  const [showSuccessUrl, setShowSuccessUrl] = useState(false);

  return (
    <div className='flex flex-col gap-8'>
      {/* <div className='flex flex-col items-center text-center gap-2'>
        <ShoppingBag className='size-8' />
        <h1 className='text-xl font-bold'>Product</h1>
        <p className='text-muted-foreground'>Add a new product to your store.</p>
      </div> */}
      <div className='flex flex-col gap-4'>
        {/* <div className='flex flex-col gap-2'>
            <Label htmlFor='mediaUrl'>Image URL</Label>
            <Input
              id='mediaUrl'
              placeholder='https://example.com/media.jpg'
              value={data?.image}
              onChange={(e) => updateData({ ...data, image: e.target.value })}
            />
          </div> */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='productName'>
            Name <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='productName'
            placeholder='Enter product name'
            defaultValue={data?.name}
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

        <Tabs className='w-full' defaultValue='one_payment'>
          {/* <TabsList className='w-full'>
            <TabsTrigger className='w-full' value='one_payment'>
              One Pay
            </TabsTrigger>
            <TabsTrigger className='w-full' value='subscription' disabled={true}>
              Subscription <Badge className='ml-2'>Soon</Badge>
            </TabsTrigger>
          </TabsList> */}
          <TabsContent className='mt-0' tabIndex={-1} value='one_payment'>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2 w-full'>
                <Label htmlFor='price'>
                  Price <span className='text-destructive'>*</span>
                </Label>
                <div className='relative'>
                  <div className='absolute top-0 left-0 flex justify-center items-center h-full w-12 border-r'>
                    {data?.prices?.currency === 'SAT' ? (
                      <Satoshi className='w-4 h-4' />
                    ) : (
                      <span className='text-sm'>$</span>
                    )}
                  </div>
                  <Input
                    id='price'
                    type='number'
                    className='pl-16'
                    placeholder='0'
                    defaultValue={data?.prices?.price ?? null}
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
                          prices: { ...data?.prices, price: Number(e.target.value) },
                        });
                      }
                    }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='currency'>Currency</Label>
                <Select
                  defaultValue={data?.prices?.currency}
                  onValueChange={(value) => updateData({ ...data, prices: { ...data?.prices, currency: value } })}
                >
                  <SelectTrigger className='w-[80px]'>
                    <SelectValue placeholder='Currency' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='SAT'>SAT</SelectItem>
                    <SelectItem value='ARS'>ARS</SelectItem>
                    <SelectItem value='USD'>USD</SelectItem>
                    <SelectItem value='EUR'>EUR</SelectItem>
                  </SelectContent>
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

        <div className='flex flex-col gap-2'>
          {showSuccessUrl ? (
            <>
              <Label htmlFor='success'>Success URL</Label>
              <Input
                id='success'
                placeholder='https://example.com/thanks?order={ORDER_HASH}'
                defaultValue={''}
                onChange={(e) => updateData({ ...data, success_url: e.target.value })}
              />
              <p className='text-sm'>
                Include <strong>{`{ORDER_HASH}`}</strong> to receive the Order Hash on success.
              </p>
            </>
          ) : (
            <Button variant='ghost' onClick={() => setShowSuccessUrl(true)}>
              <Plus />
              Add Success URL
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
