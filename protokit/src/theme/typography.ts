import type { TypographyVariantsOptions } from '@mui/material/styles';

export const typography: TypographyVariantsOptions = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.625rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2.125rem',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.625rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.375rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1.125rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  button: {
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: '0.05em',
  },
};

// Стили текста для кнопок разных размеров (MTS Design System)
export const buttonTypography = {
  // 24 Extra Small, 32 Small
  c2: {
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '14px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
  },
  // 44 Medium, 52 Large
  c1: {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '18px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
  },
  // 72 Extra Large (удален, но оставлен для совместимости)
  p4: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '22px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
  },
};
