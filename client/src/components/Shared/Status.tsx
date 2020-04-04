const sizeClassNameMap: { [key: string]: string } = {
  large: 'lg',
  medium: 'md',
  small: 'sm',
};
export const sizeClassName = (size: string|undefined) => (size && sizeClassNameMap[size]) || 'pitaya-lg';

const stateClassNameMap: { [key: string]: string } = {
  'primary': 'btn-primary',
  'secondary': 'btn-secondary',
  'secondary-icon': 'btn-secondary-icon',
};
export const stateClassName = (state: string|undefined) => (state && stateClassNameMap[state]) || 'pitaya-btn-primary';
