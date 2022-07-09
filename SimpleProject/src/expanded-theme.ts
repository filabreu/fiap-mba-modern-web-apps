import '@material-ui/core/styles';

import { OverridableStringUnion } from '@mui/types';
import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';
import { ButtonPropsVariantOverrides } from '@mui/material';

declare module '@mui/material/styles' {  
  interface CustomPalette{
      neutral: PaletteColor;   
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    disabled: true;
  }

  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}