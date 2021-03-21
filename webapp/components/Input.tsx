import React, { CSSProperties } from 'react';
import styles from 'styles/components/input.module.scss';

type InputProps = {
  type: 'text' | 'password' | 'number';
  value: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  customStyles?: CSSProperties;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
};

const Input = (props: InputProps) => {
  const {
    type = 'text',
    value,
    label,
    disabled = false,
    customStyles,
    placeholder,
    onChange,
    onKeyDown,
    onBlur,
  } = props;
  return (
    <div className={styles.input} style={customStyles}>
      {label && <div className={styles.titleLabel}>{label}</div>}
      <input
        autoComplete="off"
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
