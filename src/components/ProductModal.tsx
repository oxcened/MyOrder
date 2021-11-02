import IconButton from './IconButton';
import { MinusIcon, PlusIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/solid';
import Button from './Button';
import Modal from './Modal';
import * as React from 'react';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { Product } from '../models/Product';

const ProductModal = (
  {
    product,
    quantity: pQuantity,
    isEdit = false,
    onSubmit,
    onUpdate,
    onDelete,
    onConfirm,
    ...props
  }: {
    product?: Product,
    quantity?: number;
    isEdit?: boolean;
    onSubmit?: (quantity: number) => void;
    onUpdate?: (quantity: number) => void;
    onDelete?: () => void;
    onConfirm?: () => void;
  } & ComponentPropsWithoutRef<typeof Modal>) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (props.isOpen) {
      setQuantity(pQuantity ?? 1);
    }
  }, [props.isOpen]);

  const isUpdated = isEdit && pQuantity !== quantity;

  const onSubmitClick = () => {
    if (isUpdated) {
      onUpdate?.(quantity);
    } else if (isEdit) {
      onConfirm?.();
    } else {
      onSubmit?.(quantity);
    }
  };

  return <Modal
    className='text-center'
    {...props}
  >
    {product
    && <>
      <div className='flex'>
        <div className='flex-1' />
        <div className='text-xl font-bold flex-1'>{product.title}</div>
        <div className='flex-1'>
          <IconButton color='white' className='ml-auto p-1' onClick={onConfirm}>
            <XIcon className='h-6' />
          </IconButton>
        </div>
      </div>

      <div className='flex items-center justify-center space-x-5 mt-8'>
        <IconButton
          color='primary'
          className='w-7 h-7'
          disabled={quantity < 2}
          onClick={() => setQuantity(q => q - 1)}
        >
          <MinusIcon className='h-5 text-primary-500' />
        </IconButton>

        <p className='text-3xl'>{quantity}</p>

        <IconButton
          color='primary'
          className='w-7 h-7'
          onClick={() => setQuantity(q => q + 1)}
        >
          <PlusIcon className='h-5 text-primary-500' />
        </IconButton>
      </div>

      <div className='mt-8'>
        {isEdit
        && <Button
          color='danger'
          className='w-full justify-center mb-2'
          onClick={onDelete}
        >
          Remove from order
        </Button>}

        <Button
          color='primary'
          className='w-full justify-center'
          onClick={onSubmitClick}
        >
          <ShoppingCartIcon className='h-5 opacity-100 mr-2' />
          {isUpdated
            ? 'Update'
            : isEdit
              ? 'Confirm'
              : 'Add to Order'}
        </Button>
      </div>
    </>}
  </Modal>;
};

export default ProductModal;
