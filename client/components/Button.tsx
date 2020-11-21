import React, { CSSProperties } from 'react';

interface ButtonProps extends Omit<Partial<React.HTMLAttributes<HTMLButtonElement>>, 'onClick'> {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  styles?: CSSProperties;
  disabled?: boolean;
  onClick?: (el: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button = (props: ButtonProps) => {
  const {
    title,
    type = 'button',
    disabled,
    children,
    onClick = () => {},
  } = props;

  return (
    <button
      onClick={e => {
        const el = (e as unknown) as React.ChangeEvent<HTMLInputElement>;
        onClick(el);
        el.target.blur();
      }}
      disabled={disabled}
      type={type}
    >
      {children || title}
    </button>
  );
};

export default Button;
