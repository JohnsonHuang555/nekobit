import { CSSProperties } from "react";
import ReactSelect from "react-select";
import styles from "styles/components/select.module.scss";

export type OptionType = {
  label: string;
  value: string;
};

interface SelectProps<O> {
  options: OptionType[];
  value?: O;
  label?: string;
  customStyles?: CSSProperties;
  placeholder: string;
  onChange: (selected: O) => void;
}

const Select = (props: SelectProps<OptionType>) => {
  const { options, value, label, customStyles, placeholder, onChange } = props;

  return (
    <div className={`select ${styles.select}`} style={customStyles}>
      {label && <div className={styles.titleLabel}>{label}</div>}
      <ReactSelect
        classNamePrefix="select"
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={(o: any) => onChange(o)}
      />
    </div>
  );
};

export default Select;
