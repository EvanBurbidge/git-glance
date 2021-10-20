import React from 'react';

const getClass = type => {
  switch(type) {
    case 'error':
      return 'bg-error text-white';
    case 'secondary':
      return 'bg-white hover:bg-white-hover text-primary border border-primary';
    default:
      return 'bg-primary hover:bg-primary-hover text-white';
  }
}

export const Button = ({
  children,
  ...rest
}) => {
  const classes = getClass(rest.type);
  return (
    <button
      {...rest}
      className={`inline-flex items-center text-center px-10 py-2 border border-transparent text-sm font-medium rounded-md disabled:opacity-40 ${rest.extraClasses} ${classes}`}
    >
      {children}
    </button>
  )
}