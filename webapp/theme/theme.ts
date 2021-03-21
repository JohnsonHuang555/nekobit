import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d1d1d',
    },
    secondary: {
      main: '#57a5c7',
    },
    error: {
      main: red.A400,
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
