export const theme = {
  colors: {
   primary: '#121314',
   secondary: '#57A5C7',
   success: '#72BE52',
   info: '#5796C7',
   warning: '#DEB56F',
   danger: '#DE6F6F',
   black: '#1D1D1D',
   white: '#FFF',
   grey4: '#4B4B4B',
   grey3: '#6D6D6D',
   grey2: '#919191',
   grey1: '#CFCFCF',
  },
  typography: {
    htmlFontSize: 16,
    h1: { fontSize: '6rem'},
    h2: { fontSize: '4.5rem'},
    h3: { fontSize: '3.75rem'},
    h4: { fontSize: '3rem'},
    h5: { fontSize: '2.25rem'},
    h6: { fontSize: '1.75rem'},
    content: { fontSize: '1rem'},
  },
  spacing: 8,
  getSpacing: (num = 1) => {
    return 8 * num;
  }
}
