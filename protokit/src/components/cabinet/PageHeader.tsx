import type { ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

export interface PageHeaderProps {
  /** Заголовок страницы */
  title?: string;
  /** Показывать ли заголовок */
  showTitle?: boolean;
  /** Показывать ли кнопку действия */
  showActionButton?: boolean;
  /** Текст кнопки действия */
  actionButtonText?: string;
  /** Callback при нажатии на кнопку действия */
  onActionClick?: () => void;
  /** Пользовательский контент вместо заголовка */
  customTitle?: ReactNode;
  /** Пользовательский контент вместо кнопки действия */
  customAction?: ReactNode;
  /** Дополнительные стили для контейнера */
  sx?: SxProps<Theme>;
  /** Дополнительный контент слева (рядом с заголовком) */
  leftContent?: ReactNode;
  /** Дополнительный контент справа (рядом с кнопкой) */
  rightContent?: ReactNode;
}

export function PageHeader({
  title = 'Title',
  showTitle = true,
  showActionButton = true,
  actionButtonText = 'Кнопка',
  onActionClick,
  customTitle,
  customAction,
  sx,
  leftContent,
  rightContent,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2,
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {leftContent}
        {showTitle &&
          (customTitle || (
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, fontSize: { xs: 20, sm: 24 } }}
            >
              {title}
            </Typography>
          ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {rightContent}
        {showActionButton &&
          (customAction || (
            <Button
              variant="contained"
              size="small"
              onClick={onActionClick}
              sx={{
                textTransform: 'uppercase',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0,
                borderRadius: 3,
                py: 1,
                px: 2,
                whiteSpace: 'nowrap',
              }}
            >
              {actionButtonText}
            </Button>
          ))}
      </Box>
    </Box>
  );
}
