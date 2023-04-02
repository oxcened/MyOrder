import * as React from 'react';
import classNames from 'classnames';

export type ButtonProps = {
  color: 'primary' | 'light' | 'danger'
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const enabledClasses = {
    'bg-primary-100 text-primary-500 hover:bg-primary-200': props.color === 'primary',
    'bg-white hover:bg-gray-200': props.color === 'light',
    'bg-white bg-opacity-10 text-red-500 hover:bg-gray-200': props.color === 'danger',
  };

  const classes = classNames(
    'rounded-md px-4 py-3 text-sm transition ease-in-out duration-300 font-bold flex items-center',
    props.disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100' : enabledClasses,
    props.className
  );

  return <button
    {...props}
    className={classes}
  />;
};

export default Button;
