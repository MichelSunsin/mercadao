import React from 'react';

import './styles.scss';

type ButtonProps = {
  secondary?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button(props: ButtonProps) {
  const { children, className, secondary, ...buttonProps } = props;

  const buttonType = secondary ? 'secondary' : 'primary';

  return (
    <button
      {...buttonProps}
      className={`mrc-button ${buttonType} ${className ? className : ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
