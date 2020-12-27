import ReactSelect from 'react-select';

export type OptionType = {
  label: string;
  value: string;
};

interface SelectProps<O> {
  options: OptionType[];
  value?: O;
  onChange: (selected: O) => void;
}

const Select = (props: SelectProps<OptionType>) => {
  const { options, value, onChange } = props;
  return (
    <ReactSelect
      options={options}
      value={value}
      onChange={(o: any) => onChange(o)}
    />
  );
};

export default Select;
