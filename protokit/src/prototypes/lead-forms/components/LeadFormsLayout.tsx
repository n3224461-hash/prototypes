import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { TopBar } from '../../../components/cabinet';
import { FormsProvider } from '../context/FormsContext';

const tabs = ['Кампании', 'Шаблоны', 'Лид-формы', 'Настройки', 'Помощь'];
const ACTIVE_TAB = 2; // "Лид-формы"

export default function LeadFormsLayout() {
  const [activeTab, setActiveTab] = useState(ACTIVE_TAB);
  const location = useLocation();
  const isPreview = location.pathname.includes('/preview');

  return (
    <FormsProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        {!isPreview && (
          <TopBar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(index) => setActiveTab(index)}
          />
        )}
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </FormsProvider>
  );
}
