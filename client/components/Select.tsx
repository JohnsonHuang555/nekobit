import { CSSProperties } from 'react';
import ReactSelect from 'react-select';
import styles from 'styles/components/select.module.scss';

export type OptionType = {
  label: string;
  value: string;
};

interface SelectProps<O> {
  options: OptionType[];
  value?: O;
  label?: string;
  customStyles?: CSSProperties;
  onChange: (selected: O) => void;
}

const Select = (props: SelectProps<OptionType>) => {
  const {
    options,
    value,
    label,
    customStyles,
    onChange,
  } = props;

  return (
    <div className={styles.select} style={customStyles}>
      {label && <div className={styles.titleLabel}>{label}</div>}
      <ReactSelect
        options={options}
        value={value}
        onChange={(o: any) => onChange(o)}
      />
    </div>
  );
};

export default Select;
