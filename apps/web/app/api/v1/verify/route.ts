import { type NextRequest, NextResponse } from 'next/server';

import { db } from '@/config/instantdb';

import type { ApiResponse, VerifyPaymentResponse } from '@/types/api';

import { withApiKey } from '../middleware';

/**
 * Check if an order has been paid using its hash
 *
 * @route GET /api/v1/verify
 * @param request - The incoming HTTP request
 * @param store - The store associated with the API key
 * @returns A response with verification information
 */
async function handler(request: NextRequest, store: any): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const orderHash = searchParams.get('orderHash');

  if (!orderHash) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Order hash is required',
        code: 'MISSING_ORDER_HASH',
      },
      { status: 400 },
    );
  }

  // Search for the order by its hash
  const orderQuery = {
    order: {
      $: {
        limit: 1,
        where: {
          hash: orderHash,
          store_id: store.id,
        },
      },
    },
  };

  try {
    const { order } = await db.query(orderQuery);

    if (!order || order.length === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Order not found',
          code: 'ORDER_NOT_FOUND',
        },
        { status: 404 },
      );
    }

    const currentOrder = order[0];

    // Obtain additional information (product and customer)
    const detailsQuery = {
      product: {
        $: {
          limit: 1,
          where: {
            id: currentOrder?.product_id,
          },
        },
      },
      customer: {
        $: {
          limit: 1,
          where: {
            id: currentOrder?.customer_id,
          },
        },
      },
    };

    const { product, customer } = await db.query(detailsQuery);

    const priceQuery = {
      price: {
        $: {
          limit: 1,
          where: {
            product_id: currentOrder?.product_id,
            store_id: store.id,
          },
        },
      },
    };

    const { price } = await db.query(priceQuery);

    const response: VerifyPaymentResponse = {
      paid: currentOrder?.paid,
      order: {
        id: currentOrder?.id as string,
        hash: currentOrder?.hash,
        created_at: currentOrder?.created_at,
        updated_at: currentOrder?.updated_at,
      },
      product: {
        name: product[0]?.name,
        description: product[0]?.description,
        price: {
          amount: price[0]?.price,
          currency: price[0]?.currency,
        },
      },
      customer: {
        name: customer[0]?.name,
        email: customer[0]?.email,
        pubkey: customer[0]?.pubkey,
      },
    };

    return NextResponse.json<ApiResponse<VerifyPaymentResponse>>({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Error processing request',
        code: 'SERVER_ERROR',
      },
      { status: 500 },
    );
  }
}

export const GET = (request: NextRequest) => withApiKey(request, handler);
