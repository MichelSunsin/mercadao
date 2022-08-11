import React from 'react';

import './styles.scss';

type ButtonProps = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button(props: ButtonProps) {
  const { children, className } = props;

  return (
    <button className={`mrc-button ${className ? className : ''}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
