import { useState } from 'react';
import type { ReactNode } from 'react';
import { Box, Paper, Button, TextField, IconButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { Search, Settings, Download } from '@mui/icons-material';

export interface FilterToolbarProps {
  /** Показывать ли кнопку "ФИЛЬТРЫ" */
  showFiltersButton?: boolean;
  /** Текст кнопки фильтров */
  filtersButtonText?: string;
  /** Callback при нажатии на кнопку фильтров */
  onFiltersClick?: () => void;
  /** Показывать ли поле поиска */
  showSearch?: boolean;
  /** Placeholder для поиска */
  searchPlaceholder?: string;
  /** Значение поиска (controlled) */
  searchValue?: string;
  /** Callback при изменении поиска */
  onSearchChange?: (value: string) => void;
  /** Показывать ли кнопку настроек */
  showSettings?: boolean;
  /** Callback при нажатии на настройки */
  onSettingsClick?: () => void;
  /** Показывать ли кнопку скачивания */
  showDownload?: boolean;
  /** Callback при нажатии на скачивание */
  onDownloadClick?: () => void;
  /** Пользовательский контент слева (вместо или рядом со стандартным) */
  customLeftContent?: ReactNode;
  /** Пользовательский контент справа (вместо или рядом со стандартным) */
  customRightContent?: ReactNode;
  /** Заменить левую часть полностью */
  replaceLeftContent?: boolean;
  /** Заменить правую часть полностью */
  replaceRightContent?: boolean;
  /** Дополнительные стили */
  sx?: SxProps<Theme>;
  /** Высота тулбара */
  height?: number;
}

export function FilterToolbar({
  showFiltersButton = true,
  filtersButtonText = 'ФИЛЬТРЫ',
  onFiltersClick,
  showSearch = true,
  searchPlaceholder = 'Поиск по названию или номеру',
  searchValue,
  onSearchChange,
  showSettings = true,
  onSettingsClick,
  showDownload = true,
  onDownloadClick,
  customLeftContent,
  customRightContent,
  replaceLeftContent = false,
  replaceRightContent = false,
  sx,
  height = 48,
}: FilterToolbarProps) {
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue || '');

  const currentSearchValue = onSearchChange ? searchValue ?? '' : internalSearchValue;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setInternalSearchValue(value);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        borderRadius: 2,
        height,
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...sx,
      }}
    >
      {/* Left side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {replaceLeftContent ? (
          customLeftContent
        ) : (
          <>
            {showFiltersButton && (
              <Button
                size="small"
                onClick={onFiltersClick}
                sx={{
                  textTransform: 'uppercase',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0,
                  borderRadius: 3,
                  py: 1,
                  px: 2,
                  bgcolor: 'grey.100',
                  color: 'text.primary',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    bgcolor: 'grey.200',
                  },
                }}
              >
                {filtersButtonText}
              </Button>
            )}
            {showSearch && (
              <TextField
                placeholder={searchPlaceholder}
                size="small"
                value={currentSearchValue}
                onChange={handleSearchChange}
                sx={{
                  width: { xs: '100%', sm: 300, md: 400 },
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'background.default',
                    height: 32,
                  },
                  '& .MuiInputBase-input::placeholder': {
                    fontSize: 14,
                  },
                  '& .MuiInputBase-input': {
                    textAlign: 'left',
                    paddingLeft: '0px !important',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Search sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                  ),
                }}
              />
            )}
            {customLeftContent}
          </>
        )}
      </Box>

      {/* Right side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {replaceRightContent ? (
          customRightContent
        ) : (
          <>
            {customRightContent}
            {showSettings && (
              <IconButton
                onClick={onSettingsClick}
                sx={{
                  bgcolor: 'grey.100',
                  borderRadius: 3,
                  width: 32,
                  height: 32,
                  '&:hover': { bgcolor: 'grey.200' },
                }}
              >
                <Settings sx={{ fontSize: 20 }} />
              </IconButton>
            )}
            {showDownload && (
              <IconButton
                onClick={onDownloadClick}
                sx={{
                  bgcolor: 'grey.100',
                  borderRadius: 3,
                  width: 32,
                  height: 32,
                  '&:hover': { bgcolor: 'grey.200' },
                }}
              >
                <Download sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
}
