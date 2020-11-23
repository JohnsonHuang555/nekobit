import React, { CSSProperties } from 'react';
import styles from 'styles/components/button.module.scss';

interface ButtonProps extends Omit<Partial<React.HTMLAttributes<HTMLButtonElement>>, 'onClick'> {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'grey-4';
  styles?: CSSProperties;
  disabled?: boolean;
  onClick?: (el: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button = (props: ButtonProps) => {
  const {
    title,
    type = 'button',
    color = 'primary',
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
      className={styles[color]}
    >
      {children || title}
    </button>
  );
};

export default Button;
