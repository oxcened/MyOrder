import * as React from 'react';
import { ComponentProps, useEffect, useState } from 'react';
import { OrderCart } from '../OrderCart/OrderCart';
import locale from '@/common/utils/locale';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Product } from '../models';
import { useSuccessModal } from '@/common/utils/hooks';
import { ProductModal } from '../ProductModal/ProductModal';
import { api } from '../api';
import { OrderMenu } from '../OrderMenu/OrderMenu';

const OrderDetail = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as { isEdit: true; id: string; } | { isEdit: false };

  const { data: menu, isLoading } = api.useGetRestaurantMenuQuery();
  const [getOrder, {
    data: cachedOrder,
    error: cachedOrderError
  }] = api.useLazyGetOrderQuery();
  const [makeOrder, makeOrderResult] = api.useLazyMakeOrderQuery();
  const [updateOrder, updateOrderResult] = api.useLazyUpdateOrderQuery();

  const [order, setOrder] = useState<Product[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [productModalPayload, setProductModalPayload] =
    useState<Readonly<Pick<ComponentProps<typeof ProductModal>, 'product' | 'quantity' | 'isEdit'>>>();

  const { renderModal: makeSuccessModal, showModal: showMakeSuccess } = useSuccessModal({
    children: locale.pages.orderDetail.orderPlaceSuccess
  });
  const { renderModal: updateSuccessModal, showModal: showUpdateSuccess } = useSuccessModal({
    children: locale.pages.orderDetail.orderUpdateSuccess
  });

  useEffect(() => {
    if (loaderData.isEdit && loaderData.id) {
      getOrder(loaderData.id);
    }
  }, []);

  useEffect(() => {
    // Could not load order, exit
    if (cachedOrderError) {
      navigate('/404', { replace: true });
    }
  }, [cachedOrderError]);

  useEffect(() => {
    if (cachedOrder) {
      setOrder(cachedOrder.products);

      setNotes(cachedOrder.notes ?? '');
    }
  }, [cachedOrder]);

  useEffect(() => {
    if (makeOrderResult.isSuccess) {
      showMakeSuccess({
        callback: () => navigate('/')
      });
    }

    if (updateOrderResult.isSuccess) {
      showUpdateSuccess({
        callback: () => navigate('/')
      });
    }
  }, [makeOrderResult, updateOrderResult]);

  const onOpenProduct = (product: Product, quantity?: number, isEdit?: boolean) => {
    setShowProductModal(true);
    setProductModalPayload({
      product,
      quantity: quantity ?? 1,
      isEdit: isEdit ?? false
    });
  };

  const onAddProduct = (quantity: number) => {
    if (!productModalPayload?.product) {
      return;
    }

    const newProducts = new Array(quantity).fill(productModalPayload.product);

    setOrder(prevState => [...prevState, ...newProducts]);

    cleanOpenedProduct();
  };

  const onDeleteProduct = () => {
    if (!productModalPayload?.product) {
      return;
    }

    setOrder(order => order.filter(p => p.id !== productModalPayload.product?.id));

    cleanOpenedProduct();
  };

  const onUpdateProduct = (quantity: number) => {
    if (!productModalPayload?.product) {
      return;
    }

    setOrder(order => {
      return [
        ...order.filter(p => p.id !== productModalPayload?.product?.id),
        ...new Array(quantity).fill(productModalPayload.product)
      ];
    });

    cleanOpenedProduct();
  };

  const cleanOpenedProduct = () => {
    setShowProductModal(false);
  };

  const onMakeOrder = (notes: string) => {
    if (loaderData.isEdit && loaderData.id) {
      updateOrder({
        id: loaderData.id,
        order: {
          products: order,
          notes
        }
      });
    } else {
      makeOrder({
        products: order,
        notes
      });
    }
  };

  return <main>
    <div className="flex w-full flex-col sm:flex-row-reverse">
      <OrderCart
        order={order}
        notes={notes}
        isEdit={loaderData.isEdit}
        loadingMakeOrder={makeOrderResult.isLoading}
        onProductClick={(p, q) => onOpenProduct(p, q, true)}
        onMakeOrder={onMakeOrder}
        onNotesChange={setNotes}
      />

      <OrderMenu
        menu={menu}
        isLoading={isLoading}
        onAddProduct={onOpenProduct} />
    </div>

    <ProductModal
      isOpen={showProductModal}
      product={productModalPayload?.product}
      quantity={productModalPayload?.quantity}
      isEdit={productModalPayload?.isEdit}
      onBackdropClick={cleanOpenedProduct}
      onSubmit={onAddProduct}
      onDelete={onDeleteProduct}
      onUpdate={onUpdateProduct}
      onConfirm={cleanOpenedProduct}
    />

    {makeSuccessModal}
    {updateSuccessModal}
  </main>;
};

export {
  OrderDetail
};
