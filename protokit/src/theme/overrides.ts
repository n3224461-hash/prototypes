import type { Components, Theme } from '@mui/material/styles';
import { buttonTypography } from './typography';

// Размеры кнопок из MTS Design System
const buttonSizes = {
  '24': {
    height: 24,
    padding: '0 8px',
    borderRadius: 12,
    fontSize: buttonTypography.c2.fontSize,
    fontWeight: buttonTypography.c2.fontWeight,
    lineHeight: buttonTypography.c2.lineHeight,
    letterSpacing: buttonTypography.c2.letterSpacing,
    iconSize: 16,
    gap: 4,
  },
  '32': {
    height: 32,
    padding: '0 12px',
    borderRadius: 16,
    fontSize: buttonTypography.c2.fontSize,
    fontWeight: buttonTypography.c2.fontWeight,
    lineHeight: buttonTypography.c2.lineHeight,
    letterSpacing: buttonTypography.c2.letterSpacing,
    iconSize: 16,
    gap: 4,
  },
  '44': {
    height: 44,
    padding: '0 16px',
    borderRadius: 22,
    fontSize: buttonTypography.c1.fontSize,
    fontWeight: buttonTypography.c1.fontWeight,
    lineHeight: buttonTypography.c1.lineHeight,
    letterSpacing: buttonTypography.c1.letterSpacing,
    iconSize: 24,
    gap: 8,
  },
  '52': {
    height: 52,
    padding: '0 20px',
    borderRadius: 26,
    fontSize: buttonTypography.c1.fontSize,
    fontWeight: buttonTypography.c1.fontWeight,
    lineHeight: buttonTypography.c1.lineHeight,
    letterSpacing: buttonTypography.c1.letterSpacing,
    iconSize: 24,
    gap: 8,
  },
};

export const overrides: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'uppercase',
        fontWeight: 700,
        letterSpacing: '0.5px',
        borderRadius: 26,
        '&.MuiButton-sizeExtraSmall': {
          height: buttonSizes['24'].height,
          padding: buttonSizes['24'].padding,
          borderRadius: buttonSizes['24'].borderRadius,
          fontSize: buttonSizes['24'].fontSize,
          fontWeight: buttonSizes['24'].fontWeight,
          lineHeight: buttonSizes['24'].lineHeight,
          letterSpacing: buttonSizes['24'].letterSpacing,
          gap: buttonSizes['24'].gap,
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            margin: 0,
            '& > *:first-of-type': {
              fontSize: buttonSizes['24'].iconSize,
            },
          },
        },
        '&.MuiButton-sizeSmall': {
          height: buttonSizes['32'].height,
          padding: buttonSizes['32'].padding,
          borderRadius: buttonSizes['32'].borderRadius,
          fontSize: buttonSizes['32'].fontSize,
          fontWeight: buttonSizes['32'].fontWeight,
          lineHeight: buttonSizes['32'].lineHeight,
          letterSpacing: buttonSizes['32'].letterSpacing,
          gap: buttonSizes['32'].gap,
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            margin: 0,
            '& > *:first-of-type': {
              fontSize: buttonSizes['32'].iconSize,
            },
          },
        },
        '&.MuiButton-sizeMedium': {
          height: buttonSizes['44'].height,
          padding: buttonSizes['44'].padding,
          borderRadius: buttonSizes['44'].borderRadius,
          fontSize: buttonSizes['44'].fontSize,
          fontWeight: buttonSizes['44'].fontWeight,
          lineHeight: buttonSizes['44'].lineHeight,
          letterSpacing: buttonSizes['44'].letterSpacing,
          gap: buttonSizes['44'].gap,
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            margin: 0,
            '& > *:first-of-type': {
              fontSize: buttonSizes['44'].iconSize,
            },
          },
        },
        '&.MuiButton-sizeLarge': {
          height: buttonSizes['52'].height,
          padding: buttonSizes['52'].padding,
          borderRadius: buttonSizes['52'].borderRadius,
          fontSize: buttonSizes['52'].fontSize,
          fontWeight: buttonSizes['52'].fontWeight,
          lineHeight: buttonSizes['52'].lineHeight,
          letterSpacing: buttonSizes['52'].letterSpacing,
          gap: buttonSizes['52'].gap,
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            margin: 0,
            '& > *:first-of-type': {
              fontSize: buttonSizes['52'].iconSize,
            },
          },
        },
        // Alternative style (dark background)
        '&.MuiButton-alternative': {
          backgroundColor: '#1D2023',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#000000',
          },
        },
        // Always White style
        '&.MuiButton-alwaysWhite': {
          backgroundColor: '#FFFFFF',
          color: '#1D2023',
          border: '1px solid #E8EAED',
          '&:hover': {
            backgroundColor: '#F2F3F7',
          },
        },
        // Secondary style
        '&.MuiButton-secondaryStyle': {
          backgroundColor: '#F2F3F7',
          color: '#1D2023',
          '&:hover': {
            backgroundColor: '#E8EAED',
          },
        },
        // Ghost style
        '&.MuiButton-ghost': {
          backgroundColor: 'transparent',
          color: '#1D2023',
          '&:hover': {
            backgroundColor: '#F2F3F7',
          },
        },
        // Negative style
        '&.MuiButton-negative': {
          backgroundColor: '#F2F3F7',
          color: '#F95721',
          '&:hover': {
            backgroundColor: '#E8EAED',
          },
        },
        // Disabled style override
        '&.Mui-disabled': {
          backgroundColor: '#E8EAED',
          color: '#969FA8',
        },
      },
    },
    defaultProps: {
      disableElevation: true,
      size: 'medium',
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  // ─── Input fields: общие стили для TextField, Select, Autocomplete ───

  MuiInputLabel: {
    defaultProps: {
      shrink: true,
    },
    styleOverrides: {
      root: {
        position: 'static',
        transform: 'none',
        marginBottom: 4,
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        color: 'inherit',
        '&.Mui-focused': {
          color: 'inherit',
        },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        height: 44,
        borderRadius: 16,
        '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
          borderColor: '#007CFF',
        },
        // Multiline: снимаем фиксированную высоту, чтобы textarea растягивался
        '&.MuiInputBase-multiline': {
          height: 'auto',
          padding: '10px 16px',
          '& textarea': {
            padding: 0,
          },
        },
      },
      notchedOutline: {
        // Убираем notch (вырез под floating label)
        '& legend': {
          display: 'none',
        },
        top: 0,
      },
      input: {
        padding: '10px 16px',
        height: 'auto',
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginTop: 4,
        marginLeft: 0,
        marginRight: 0,
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
  },

  MuiSelect: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
    styleOverrides: {
      select: {
        // Выравнивание текста внутри Select по высоте 44px
        display: 'flex',
        alignItems: 'center',
      },
    },
  },

  MuiAutocomplete: {
    styleOverrides: {
      inputRoot: {
        // Autocomplete оборачивает OutlinedInput, корректируем padding
        // minHeight вместо height: для single — всегда 44, для multiple — растёт с chips
        height: 'auto',
        minHeight: 44,
        padding: '5px 4px !important',
        flexWrap: 'wrap',
        gap: 4,
        '& .MuiAutocomplete-input': {
          padding: '5px 4px !important',
          minWidth: 40,
        },
      },
      option: {
        '&[aria-selected="true"]': {
          backgroundColor: 'transparent !important',
          '&.Mui-focused': {
            backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
          },
        },
      },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },

  MuiFormControl: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        gap: 0,
      },
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        borderRadius: '12px !important',
        border: 'none !important',
        height: 44,
        padding: '0 12px',
        textTransform: 'none',
        fontSize: 17,
        fontWeight: 500,
        lineHeight: '24px',
        backgroundColor: 'transparent',
        color: '#1D2023',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        '&.Mui-selected': {
          backgroundColor: '#FF0032',
          color: '#FAFAFA',
          '&:hover': {
            backgroundColor: '#E6002D',
          },
        },
      },
    },
  },
};

// Extend MUI Button variants
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