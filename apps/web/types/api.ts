export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface VerifyPaymentResponse {
  paid: boolean;
  order: {
    id: string;
    hash: string;
    created_at: number;
    updated_at: number;
  };
  customer: {
    name: string | null;
    email: string | null;
    pubkey: string | null;
  };
  product?: {
    name: string;
    description: string | null;
    price: {
      amount: number;
      currency: string;
    };
  };
}
