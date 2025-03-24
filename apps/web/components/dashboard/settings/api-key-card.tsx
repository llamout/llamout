'use client';

import { useState } from 'react';
import { Copy, Eye, EyeOff } from 'lucide-react';

import { useToast } from '@workspace/ui/hooks/use-toast';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { CodeBlock } from '@workspace/ui/components/code';

export function ApiKeyCard({ secret }: { secret: string | null }) {
  // Component
  const [showApiKey, setShowApiKey] = useState(false);

  // Hooks
  const { toast } = useToast();

  if (!secret) return null;

  const maskedApiKey = secret.replace(/./g, '•');

  const handleCopy = () => {
    navigator.clipboard.writeText(secret);

    toast({
      title: 'API Key copied',
      description: 'The API Key has been copied to the clipboard.',
      duration: 2000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>API Key</CardTitle>
        <CardDescription>
          Use this key to check the payment status of your orders using the Llamout API.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <Input value={showApiKey ? secret : maskedApiKey} readOnly />
            <Button variant='outline' size='icon' onClick={handleCopy} title='Copy API Key'>
              <Copy className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon' onClick={() => setShowApiKey(!showApiKey)} title='Show API Key'>
              {showApiKey ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
            </Button>
          </div>
          <p className='text-muted-foreground'>
            Keep this key secure. Don't share it publicly or include it in client-side code.
          </p>
        </div>

        <Tabs defaultValue='setup'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='setup'>Configuration</TabsTrigger>
            <TabsTrigger value='verify'>Verify Orden</TabsTrigger>
          </TabsList>
          <TabsContent value='setup' className='space-y-4'>
            <div className='space-y-2'>
              <h4 className='font-medium'>Header Configuration</h4>
              <p className='text-muted-foreground'>
                Include your API Key in the header <code className='text-foreground'>ll-api-key</code> of your HTTP
                requests:
              </p>
              <CodeBlock code={`ll-api-key: ${showApiKey ? secret.substring(0, 10) + '...' : maskedApiKey}`} />
              <p className='text-muted-foreground mt-2'>
                This header is required to authenticate all your requests to the Llamout API.
              </p>
            </div>

            <div className='space-y-2'>
              <h4 className='font-medium'>Available endpoints</h4>
              <ul className='space-y-1 text-muted-foreground'>
                <li>
                  <code className='text-foreground'>/api/v1/verify</code> - Check if an order has been paid
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value='verify' className='space-y-4'>
            <div className='space-y-2'>
              <h4 className='font-medium'>Verify an Order</h4>
              <p className='text-muted-foreground'>
                To check if an order has been paid, use the endpoint{' '}
                <code className='text-foreground'>/api/v1/verify</code> with the parameter{' '}
                <code className='text-foreground'>orderHash</code>:
              </p>
              <CodeBlock code={`GET /api/v1/verify?orderHash=ABC123`} />
            </div>

            <div className='space-y-2'>
              <h4 className='font-medium'>Example with JavaScript</h4>
              <CodeBlock
                code={`fetch('https://api.llamout.com/api/v1/verify?orderHash=ABC123', {
  headers: {
    'll-api-key': '${showApiKey ? secret.substring(0, 10) + '...' : '******'}',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Estado de pago:', data.data.paid ? 'Pagado' : 'Pendiente');
    console.log('Detalles de la orden:', data.data);
  } else {
    console.error('Error:', data.error);
  }
})
.catch(error => console.error('Error:', error));`}
              />
            </div>

            <div className='space-y-2'>
              <h4 className='font-medium'>Example with cURL</h4>
              <CodeBlock
                code={`curl -X GET \\
  "https://api.llamout.com/api/v1/verify?orderHash=abc123xyz456" \\
  -H "ll-api-key: ${showApiKey ? secret.substring(0, 10) + '...' : '******'}" \\
  -H "Content-Type: application/json"`}
              />
            </div>

            <div className='space-y-2'>
              <h4 className='font-medium'>Sample answer</h4>
              <CodeBlock
                code={`{
  "success": true,
  "data": {
    "paid": true,
    "order": {
      "id": "abc123...",
      "hash": "abc123...",
      "created_at": "1742839683151",
      "updated_at": "1742839683151"
    },
    "product": {
      "name": "VIP access",
      "description": "Full access to the event",
      "price": {
        "amount": 25000,
        "currency": "SATS"
      }
    },
    "customer": {
      "name": "Satoshi Nakamoto",
      "email": "satoshi@bitcoin.org",
      "pubkey": "npub..."
    }
  }
}`}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* <Alert>
          <AlertDescription className='text-sm flex items-center justify-between'>
            <span>¿Necesitas más información sobre cómo utilizar la API?</span>
            <Button variant='link' className='h-auto p-0' asChild>
              <a href='/docs/api' target='_blank' rel='noopener noreferrer'>
                Ver documentación completa
                <ExternalLink className='ml-1 h-3 w-3' />
              </a>
            </Button>
          </AlertDescription>
        </Alert> */}
      </CardContent>
    </Card>
  );
}
