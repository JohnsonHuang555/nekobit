import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d1d1d',
    },
    secondary: {
      main: '#57a5c7',
    },
    info: {
      main: '#5796c7',
    },
    success: {
      main: '#72be52',
      dark: '',
    },
    warning: {
      main: '#deb56f',
      dark: '#b9975d',
      light: '#e2c138',
    },
    error: {
      main: '#de6f6f',
    },
    background: {
      default: '#121314',
    },
    text: {
      primary: '#fff',
    },
  },
});

export default theme;
