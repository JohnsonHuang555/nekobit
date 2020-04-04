import React from 'react';
import '@styles/components/shared/button.scss';

type ButtonProps = {
  title: string;
  className?: string;
  disabled?: boolean;
  onClick?: (el: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button = (props: ButtonProps) => {
  const {
    className,
    title,
    disabled,
    onClick = () => {}
  } = props;
  return (
    <button
      className={className}
      onClick={(e) => {
        const el = e as unknown as React.ChangeEvent<HTMLInputElement>;
        onClick(el);
        el.target.blur();
      }}
      disabled={disabled}
    >
      {title}
    </button>
  )
};

export default Button;
