import * as React from 'react';
import classNames from 'classnames';
import { useAuth } from '@/modules/auth/useAuth';
import locale from '@/common/utils/locale';
import Button from '@/common/components/Button/Button';
import { DEFAULT_AVATAR, getAllAvatars } from '@/common/images/avatars/avatars';
import Modal from '@/common/components/Modal/Modal';
import { useAppSelector } from '@/common/utils/hooks';
import { useDispatch } from 'react-redux';
import { setAvatar as setCurrent, showAvatarModal } from '@/modules/auth/AvatarModal/avatarModal.slice';
import { User } from '@/modules/auth/User';
import { twMerge } from 'tailwind-merge';

export const AvatarModal = () => {
  const { user, setAvatar } = useAuth();
  const isOpen = useAppSelector(state => state.avatarModal.isAvatarModalOpen);
  const current = useAppSelector(state => state.avatarModal.avatar ?? state.auth.user?.avatar ?? DEFAULT_AVATAR);
  const dispatch = useDispatch();

  const onClose = () => dispatch(showAvatarModal(false));
  const onChange = (avatar: User['avatar']) => dispatch(setCurrent(avatar));

  const onSubmit = () => {
    if (current == null) return;

    if (user) {
      setAvatar(current);
    }

    onClose();
  };

  return <Modal isOpen={isOpen} onBackdropClick={onClose}>
    <p className='text-xl font-bold'>{locale.components.avatarModal.title}</p>

    <div
      className='grid gap-3 grid-cols-[repeat(auto-fit,3rem)] justify-center my-3 max-h-[calc(100vh-10rem)] overflow-auto'>
      {getAllAvatars().map((a, i) => {
        const isCurrent = i === current;
        return (
          <img
            key={a}
            src={a}
            alt={`avatar_${a}`}
            className={twMerge(
              'border cursor-pointer rounded-full',
              isCurrent && 'bg-gray-200 border-black animate-spin'
            )}
            onClick={() => onChange(i)}
          />
        );
      })}
    </div>

    <Button
      color='dark'
      className='w-full justify-center'
      disabled={current === undefined}
      onClick={onSubmit}
    >{locale.shared.ok}</Button>
  </Modal>;
};

export default AvatarModal;
