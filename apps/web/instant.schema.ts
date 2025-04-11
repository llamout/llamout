import { i } from '@instantdb/core';

const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    stores: i.entity({
      id: i.string().unique().indexed(),
      api_key: i.string(),
      has_subscription: i.boolean(),
      image: i.string().optional(),
      name: i.string(),
      website: i.string().optional(),
      lnaddress: i.string(),
      // Status
      status: i.string(),
      updated_at: i.date(),
      created_at: i.date(),
    }),
    products: i.entity({
      id: i.string().unique().indexed(),
      is_subscription: i.boolean(),
      hash: i.string().unique(),
      // Data
      image: i.string().optional(),
      name: i.string(),
      description: i.string().optional(),
      success_url: i.string().optional(),
      // Status
      status: i.string(),
      updated_at: i.date(),
      created_at: i.date(),
    }),
    prices: i.entity({
      id: i.string().unique().indexed(),
      name: i.string().optional(),
      description: i.string().optional(),
      interval: i.string().optional(),
      type: i.string(),
      price: i.number(),
      currency: i.string(),
      // Status
      status: i.string(),
      updated_at: i.date(),
      created_at: i.date(),
    }),
    orders: i.entity({
      id: i.string().unique().indexed(),
      hash: i.string().unique().indexed(),
      quantity: i.number().optional(),
      amount: i.number(),
      currency: i.string(),
      paid: i.boolean(),
      // Status
      updated_at: i.date(),
      created_at: i.date(),
    }),
    customers: i.entity({
      id: i.string().unique().indexed(),
      email: i.string(),
      name: i.string(),
      pubkey: i.string(),
      // Status
      created_at: i.date(),
    }),
  },
  links: {
    userStores: {
      forward: { on: 'stores', has: 'one', label: '$user' },
      reverse: { on: '$users', has: 'many', label: 'stores' },
    },
    storeProducts: {
      forward: { on: 'products', has: 'one', label: 'store' },
      reverse: { on: 'stores', has: 'many', label: 'products' },
    },
    productPrices: {
      forward: { on: 'prices', has: 'one', label: 'product' },
      reverse: { on: 'products', has: 'many', label: 'prices' },
    },
    productOrders: {
      forward: { on: 'orders', has: 'one', label: 'product' },
      reverse: { on: 'products', has: 'many', label: 'orders' },
    },
    orderStore: {
      forward: { on: 'orders', has: 'one', label: 'store' },
      reverse: { on: 'stores', has: 'many', label: 'orders' },
    },
    customerOrder: {
      forward: { on: 'customers', has: 'many', label: 'orders' },
      reverse: { on: 'orders', has: 'one', label: 'customer' },
    },
    storeCustomers: {
      forward: { on: 'customers', has: 'one', label: 'store' },
      reverse: { on: 'stores', has: 'many', label: 'customers' },
    },
  },
});

// This helps Typescript display better intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
