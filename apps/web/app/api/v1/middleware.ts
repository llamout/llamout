import { type NextRequest, NextResponse } from 'next/server';

import { db } from '@/config/instantdb';

import type { ApiResponse } from '@/types/api';

export async function withApiKey(
  request: NextRequest,
  handler: (req: NextRequest, store: any) => Promise<NextResponse>,
) {
  // Verificar API key en el header
  const apiKey = request.headers.get('ll-api-key');

  if (!apiKey) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'API key requerida',
        code: 'UNAUTHORIZED',
      },
      { status: 401 },
    );
  }

  try {
    // Buscar la tienda asociada a la API key
    const query = {
      stores: {
        $: {
          limit: 1,
          where: {
            api_key: apiKey,
          },
        },
      },
    };

    const { stores } = await db.query(query);

    if (!stores || stores.length === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'API key inválida',
          code: 'INVALID_API_KEY',
        },
        { status: 401 },
      );
    }

    // Continuar con el handler, pasando la tienda
    return handler(request, stores[0]);
  } catch (error) {
    console.error('Error al verificar API key:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Error al verificar credenciales',
        code: 'SERVER_ERROR',
      },
      { status: 500 },
    );
  }
}
