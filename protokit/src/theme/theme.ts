import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { overrides } from './overrides';

// Расширение типов для кнопок MTS Design System
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    alternative: true;
    alwaysWhite: true;
    secondaryStyle: true;
    ghost: true;
    negative: true;
  }
  interface ButtonPropsSizeOverrides {
    extraSmall: true;
  }
}

export const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 8,
  },
  components: overrides,
});
