import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { Order } from '../../models/Order';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocFromServer,
  getDocsFromServer,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { firestore as db, functions } from '../../core/firebase';
import { DbCollection } from '../../models/DbCollection';
import { Product } from '../../models/Product';
import { RootState } from '../store';
import { DateTime } from 'luxon';

const ordersApi = createApi({
  reducerPath: 'orders',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getTodayOrders: builder.query<Order[], void>({
      queryFn: async () => {
        const today = DateTime.now().startOf('day');

        const orderQuery = query(
          collection(db, DbCollection.ORDERS),
          where('created', '>=', today.toJSDate()),
          orderBy('created', 'desc')
        );

        const response = await getDocsFromServer(orderQuery);

        return {
          data: response.docs.map(d => {
            return {
              ...d.data(),
              id: d.id
            } as Order
          })
        };
      }
    }),
    getOrder: builder.query<Order, string>({
      queryFn: async (id) => {
        const ref = doc(db, DbCollection.ORDERS, id);

        try {
          const order = await getDocFromServer(ref);

          if (order.exists()) {
            return { data: order.data() as Order }
          } else {
            return { error: new Error('Not found') }
          }
        } catch (e) {
          console.error(e);
          return { error: e };
        }
      }
    }),
    makeOrder: builder.query<void, Product[]>({
      queryFn: async (products, { getState }) => {
        const { auth: { user } } = getState() as RootState;

        const ref = collection(db, DbCollection.ORDERS);

        await addDoc(ref, {
          created: serverTimestamp(),
          author: user,
          products
        });

        return {
          data: void 0
        };
      }
    }),
    updateOrder: builder.query<void, { id: string; products: Product[]; }>({
      queryFn: async ({ id, products }) => {
        const ref = doc(db, DbCollection.ORDERS, id);

        await updateDoc(ref, { products });

        return {
          data: void 0
        };
      }
    }),
    deleteOrder: builder.query<void, string>({
      queryFn: async (id, { getState }) => {
        const ref = doc(db, DbCollection.ORDERS, id);

        await deleteDoc(ref);

        return {
          data: void 0
        };
      }
    }),
    printOrderSummary: builder.query<void, {
      amount: number;
      orders: number;
      paid: boolean;
    }>({
      queryFn: async (args) => {
        try {
          const fun = httpsCallable<typeof args, {
            updates: { updatedRows: number }
          }>(functions, 'printOrderSummary');

          const res = await fun(args);

          if (res.data.updates.updatedRows > 0) {
            return {
              data: void 0
            }
          } else {
            return { error: new Error('Something went wrong during submission') };
          }
        } catch (error) {
          return { error };
        }
      }
    })
  })
});

export default ordersApi;
