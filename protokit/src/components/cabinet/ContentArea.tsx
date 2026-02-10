import type { ReactNode } from 'react';
import { Paper, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

export interface ContentAreaProps {
  /** Дочерние элементы (контент) */
  children?: ReactNode;
  /** Показывать ли placeholder */
  showPlaceholder?: boolean;
  /** Текст placeholder */
  placeholderText?: string;
  /** Минимальная высота контентной области */
  minHeight?: number | string | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  /** Максимальная высота контентной области */
  maxHeight?: number | string | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  /** Дополнительные стили для контейнера */
  sx?: SxProps<Theme>;
  /** Стили для placeholder */
  placeholderSx?: SxProps<Theme>;
  /** Отображать ли рамку/фон */
  bordered?: boolean;
  /** Отступы внутри контентной области */
  padding?: number | string;
  /** Callback при клике на placeholder */
  onPlaceholderClick?: () => void;
  /** Показывать ли иконку или элемент в placeholder */
  placeholderIcon?: ReactNode;
}

export function ContentArea({
  children,
  showPlaceholder = false,
  placeholderText = 'Your content',
  minHeight = { xs: 300, sm: 400, md: 524 },
  maxHeight,
  sx,
  placeholderSx,
  bordered = true,
  padding = 0,
  onPlaceholderClick,
  placeholderIcon,
}: ContentAreaProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        minHeight,
        maxHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: showPlaceholder ? 'center' : 'flex-start',
        p: padding,
        ...(bordered && {
          bgcolor: 'background.paper',
        }),
        ...sx,
      }}
    >
      {showPlaceholder ? (
        <>
          {placeholderIcon}
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              textAlign: 'center',
              cursor: onPlaceholderClick ? 'pointer' : 'default',
              ...placeholderSx,
            }}
            onClick={onPlaceholderClick}
          >
            {placeholderText}
          </Typography>
        </>
      ) : (
        children
      )}
    </Paper>
  );
}
