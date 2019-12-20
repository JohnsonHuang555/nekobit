import React from 'react';
import '@styles/components/shared/button.scss';

type ButtonProps = {
  className?: string;
  title: string;
  onClick?: (el: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button = (props: ButtonProps) => {
  const {
    className,
    title,
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
    >
      {title}
    </button>
  )
};

export default Button;
