import React from 'react';

import './styles.scss';

type ButtonProps = {
  secondary?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button(props: ButtonProps) {
  const { children, className } = props;
  const buttonType = props.secondary ? 'secondary' : 'primary';

  return (
    <button
      className={`mrc-button ${buttonType} ${className ? className : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
