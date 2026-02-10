import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import { TopBar } from './TopBar';
import type { TopBarProps } from './TopBar';
import { PageHeader } from './PageHeader';
import type { PageHeaderProps } from './PageHeader';
import { FilterToolbar } from './FilterToolbar';
import type { FilterToolbarProps } from './FilterToolbar';
import { ContentArea } from './ContentArea';
import type { ContentAreaProps } from './ContentArea';

export interface CabinetLayoutProps {
  /** Дочерние элементы (контент) */
  children?: ReactNode;
  /** Показывать ли верхний тубар */
  showTopBar?: boolean;
  /** Пропсы для TopBar */
  topBarProps?: TopBarProps;
  /** Показывать ли заголовок страницы */
  showPageHeader?: boolean;
  /** Пропсы для PageHeader */
  pageHeaderProps?: PageHeaderProps;
  /** Показывать ли фильтр бар */
  showFilterToolbar?: boolean;
  /** Пропсы для FilterToolbar */
  filterToolbarProps?: FilterToolbarProps;
  /** Пропсы для ContentArea (всегда показывается) */
  contentAreaProps?: ContentAreaProps;
  /** Отступы основного контента */
  contentPadding?: number | { xs?: number; sm?: number; md?: number };
  /** Минимальная высота страницы */
  minHeight?: string;
}

export function CabinetLayout({
  children,
  showTopBar = true,
  topBarProps,
  showPageHeader = true,
  pageHeaderProps,
  showFilterToolbar = true,
  filterToolbarProps,
  contentAreaProps,
  contentPadding = { xs: 2, sm: 3, md: 4 },
  minHeight = '100vh',
}: CabinetLayoutProps) {
  return (
    <Box sx={{ minHeight, minWidth: 900, bgcolor: 'background.default', overflowX: 'auto' }}>
      {showTopBar && <TopBar {...topBarProps} />}

      <Box sx={{ p: contentPadding, minWidth: 900 - 48 }}>
        {showPageHeader && <PageHeader {...pageHeaderProps} />}
        {showFilterToolbar && <FilterToolbar {...filterToolbarProps} />}
        <ContentArea {...contentAreaProps}>{children}</ContentArea>
      </Box>
    </Box>
  );
}

// Ре-экспорт отдельных компонентов для гибкого использования
export { TopBar, PageHeader, FilterToolbar, ContentArea };
export type { TopBarProps, PageHeaderProps, FilterToolbarProps, ContentAreaProps };
