import { useState, useEffect, useRef, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Add, Refresh, Apps, MoreVert } from '@mui/icons-material';

export interface TopBarProps {
  /** Показывать ли логотип МТС Маркетолог */
  showLogo?: boolean;
  /** Показывать ли навигационные табы */
  showNavigation?: boolean;
  /** Массив табов для навигации */
  tabs?: string[];
  /** Индекс активного таба */
  activeTab?: number;
  /** Callback при смене таба */
  onTabChange?: (index: number) => void;
  /** Показывать ли кнопки действий (Создать, AI маркетолог) */
  showActionButtons?: boolean;
  /** Показывать ли виджет кошелька */
  showWallet?: boolean;
  /** Баланс кошелька */
  walletBalance?: string;
  /** Показывать ли виджет баллов */
  showPoints?: boolean;
  /** Количество баллов */
  pointsCount?: string;
  /** Показывать ли меню приложений */
  showAppsMenu?: boolean;
  /** Показывать ли аватар пользователя */
  showAvatar?: boolean;
  /** Пользовательский контент вместо стандартных кнопок действий */
  customActions?: ReactNode;
  /** Пользовательский контент в правой части (перед аватаром) */
  customRightContent?: ReactNode;
  /** Callback нажатия на кнопку "Создать" */
  onCreateClick?: () => void;
  /** Callback нажатия на кнопку "AI маркетолог" */
  onAIClick?: () => void;
}

const defaultTabs = ['Рассылки и звонки', 'Реклама в интернете', 'Настройки', 'Помощь'];

export function TopBar({
  showLogo = true,
  showNavigation = true,
  tabs = defaultTabs,
  activeTab = 0,
  onTabChange,
  showActionButtons = true,
  showWallet = true,
  walletBalance = '72 200,36 ₽',
  showPoints = true,
  pointsCount = '13 000',
  showAppsMenu = true,
  showAvatar = true,
  customActions,
  customRightContent,
  onCreateClick,
  onAIClick,
}: TopBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  const [maxVisibleTabs, setMaxVisibleTabs] = useState(tabs.length);
  const [tabsMenuAnchor, setTabsMenuAnchor] = useState<null | HTMLElement>(null);
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<null | HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const currentActiveTab = onTabChange ? activeTab : internalActiveTab;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (onTabChange) {
      onTabChange(newValue);
    } else {
      setInternalActiveTab(newValue);
    }
  };

  const handleTabsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setTabsMenuAnchor(event.currentTarget);
  };

  const handleTabsMenuClose = () => {
    setTabsMenuAnchor(null);
  };

  const handleActionsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionsMenuAnchor(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setActionsMenuAnchor(null);
  };

  // Calculate visible tabs based on available width
  useEffect(() => {
    const calculateVisibleTabs = () => {
      const containerWidth = tabsRef.current?.parentElement?.clientWidth || 1200;
      // Reserve space for logo (200px) and right section (500px)
      const availableWidth = containerWidth - 700;
      const tabWidth = 180; // Approximate tab width
      const maxVisible = Math.floor(availableWidth / tabWidth);
      setMaxVisibleTabs(Math.max(1, Math.min(maxVisible, tabs.length)));
    };

    calculateVisibleTabs();
    window.addEventListener('resize', calculateVisibleTabs);
    return () => window.removeEventListener('resize', calculateVisibleTabs);
  }, [tabs.length]);

  // Fixed tab visibility: always show first N tabs, active tab can be in hidden
  const visibleTabs = useMemo(() => {
    return tabs.slice(0, maxVisibleTabs);
  }, [tabs, maxVisibleTabs]);
  
  const hiddenTabs = useMemo(() => {
    return tabs.slice(maxVisibleTabs);
  }, [tabs, maxVisibleTabs]);
  
  // Check if active tab is in hidden tabs
  const isActiveTabHidden = currentActiveTab >= maxVisibleTabs;

  // Check if we should show desktop action buttons or mobile "+" button
  const showDesktopActions = maxVisibleTabs >= 3; // Arbitrary breakpoint - when we have enough space for tabs

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        width: '100vw',
        left: 0,
        right: 0,
        borderRadius: 0,
      }}
    >
      <Toolbar
        sx={{
          minHeight: '52px !important',
          height: '52px',
          px: { xs: 1, sm: 2, md: 2.5 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          maxWidth: '100%',
        }}
      >
        {/* Left: Logo */}
        {showLogo && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <Box
              component="img"
              src="/assets/mts-logo.svg"
              alt="МТС"
              sx={{ width: 32, height: 32 }}
            />
            <Box
              component="img"
              src="/assets/marketolog-text.svg"
              alt="Маркетолог"
              sx={{
                width: 135,
                height: 12,
                display: { xs: 'none', sm: 'block' },
              }}
            />
          </Box>
        )}

        {/* Center: Tabs with responsive behavior */}
        {showNavigation && (
          <Box ref={tabsRef} sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <Tabs
              value={isActiveTabHidden ? 'more' : currentActiveTab}
              onChange={handleTabChange}
              sx={{
                minHeight: 52,
                '& .MuiTabs-flexContainer': {
                  gap: { xs: 0.5, sm: 1, md: 2 },
                },
              }}
              TabIndicatorProps={{
                sx: {
                  height: 2,
                  bottom: 0,
                },
              }}
            >
              {visibleTabs.map((tab, index) => (
                <Tab
                  key={tab}
                  label={tab}
                  value={index}
                  sx={{
                    minHeight: 52,
                    px: { xs: 1, sm: 1.5 },
                    textTransform: 'none',
                    fontSize: { xs: 12, sm: 13, md: 14 },
                    fontWeight: 700,
                    color: 'text.primary',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.15px',
                    '&.Mui-selected': {
                      color: 'text.primary',
                    },
                    minWidth: 'auto',
                  }}
                />
              ))}
              {hiddenTabs.length > 0 && (
                <Tab
                  icon={<MoreVert />}
                  value="more"
                  onClick={handleTabsMenuOpen}
                  sx={{
                    minHeight: 52,
                    minWidth: 40,
                    color: 'text.primary',
                    marginLeft: 'auto',
                  }}
                />
              )}
            </Tabs>

            {/* Hidden tabs menu */}
            <Menu
              anchorEl={tabsMenuAnchor}
              open={Boolean(tabsMenuAnchor)}
              onClose={handleTabsMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              {hiddenTabs.map((tab, hiddenIndex) => {
                const tabIndex = maxVisibleTabs + hiddenIndex;
                return (
                  <MenuItem
                    key={tab}
                    onClick={() => {
                      handleTabChange({} as React.SyntheticEvent, tabIndex);
                      handleTabsMenuClose();
                    }}
                    selected={currentActiveTab === tabIndex}
                  >
                    {tab}
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        )}

        {/* Right: Action Buttons / +, Widgets, Avatar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            flexShrink: 0,
          }}
        >
          {/* Group 1: Action Buttons */}
          {showActionButtons && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {showDesktopActions ? (
                customActions || (
                  <>
                    <Button
                      size="small"
                      startIcon={<Add sx={{ fontSize: 16, color: 'text.primary' }} />}
                      onClick={onCreateClick}
                      sx={{
                        textTransform: 'uppercase',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 0,
                        borderRadius: 2,
                        py: 0.5,
                        px: 2,
                        minWidth: 'auto',
                        bgcolor: 'grey.100',
                        color: 'text.primary',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          bgcolor: 'grey.200',
                        },
                      }}
                    >
                      создать
                    </Button>
                    <Button
                      size="small"
                      startIcon={
                        <Box
                          component="img"
                          src="/assets/spark.svg"
                          alt="AI"
                          sx={{ width: 16, height: 16 }}
                        />
                      }
                      onClick={onAIClick}
                      sx={{
                        textTransform: 'uppercase',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 0,
                        borderRadius: 2,
                        py: 0.5,
                        px: 2,
                        minWidth: 'auto',
                        bgcolor: 'grey.100',
                        color: 'text.primary',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          bgcolor: 'grey.200',
                        },
                      }}
                    >
                      AI маркетолог
                    </Button>
                  </>
                )
              ) : (
                <IconButton
                  size="small"
                  onClick={handleActionsMenuOpen}
                  sx={{ 
                    p: 0.5,
                    color: 'text.primary',
                  }}
                >
                  <Add sx={{ fontSize: 24 }} />
                </IconButton>
              )}
            </Box>
          )}

          {/* Actions menu for mobile/tablet */}
          <Menu
            anchorEl={actionsMenuAnchor}
            open={Boolean(actionsMenuAnchor)}
            onClose={handleActionsMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <MenuItem
              onClick={() => {
                onCreateClick?.();
                handleActionsMenuClose();
              }}
            >
              Создать
            </MenuItem>
            <MenuItem
              onClick={() => {
                onAIClick?.();
                handleActionsMenuClose();
              }}
            >
              AI маркетолог
            </MenuItem>
          </Menu>

          {/* Group 2: Widgets (Balance + Points) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Wallet Widget */}
            {showWallet && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  component="img"
                  src="/assets/wallet.svg"
                  alt="Wallet"
                  sx={{ width: 24, height: 24 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    fontSize: { xs: 12, sm: 14 },
                    whiteSpace: 'nowrap',
                  }}
                >
                  {walletBalance}
                </Typography>
                <Refresh
                  sx={{
                    fontSize: 16,
                    color: 'text.secondary',
                    cursor: 'pointer',
                    display: { xs: 'none', sm: 'block' },
                  }}
                />
              </Box>
            )}

            {/* Points Widget */}
            {showPoints && (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                <Box
                  component="img"
                  src="/assets/cashback.svg"
                  alt="Cashback"
                  sx={{ width: 24, height: 24 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    fontSize: { xs: 12, sm: 14 },
                    whiteSpace: 'nowrap',
                  }}
                >
                  {pointsCount}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Custom Right Content */}
          {customRightContent}

          {/* Group 3: Icons (Apps + Avatar) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Apps Icon */}
            {showAppsMenu && (
              <IconButton size="small" sx={{ p: 0.5 }}>
                <Apps sx={{ fontSize: 28, color: 'text.secondary' }} />
              </IconButton>
            )}

            {/* Avatar */}
            {showAvatar && (
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 2,
                  bgcolor: 'grey.400',
                }}
              />
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
