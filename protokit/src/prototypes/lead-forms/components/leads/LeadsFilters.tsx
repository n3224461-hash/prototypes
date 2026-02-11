import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import type { LeadStatus } from '../../types';

interface LeadsFiltersProps {
  statusFilter: LeadStatus | 'all';
  onStatusChange: (status: LeadStatus | 'all') => void;
  dateFilter: '7' | '30' | 'all';
  onDateChange: (days: '7' | '30' | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const statusOptions: { value: LeadStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Новый' },
  { value: 'viewed', label: 'Просмотрен' },
  { value: 'called', label: 'Обзвонен' },
];

const dateOptions: { value: '7' | '30' | 'all'; label: string }[] = [
  { value: '7', label: '7 дней' },
  { value: '30', label: '30 дней' },
  { value: 'all', label: 'Все' },
];

export default function LeadsFilters({
  statusFilter,
  onStatusChange,
  dateFilter,
  onDateChange,
  searchQuery,
  onSearchChange,
}: LeadsFiltersProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Status filter */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        {statusOptions.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            variant={statusFilter === option.value ? 'filled' : 'outlined'}
            color={statusFilter === option.value ? 'primary' : 'default'}
            onClick={() => onStatusChange(option.value)}
            size="small"
          />
        ))}
      </Box>

      {/* Date filter and Search */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {dateOptions.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              variant={dateFilter === option.value ? 'filled' : 'outlined'}
              color={dateFilter === option.value ? 'primary' : 'default'}
              onClick={() => onDateChange(option.value)}
              size="small"
            />
          ))}
        </Box>

        <Box sx={{ flex: 1, minWidth: 200 }}>
          <TextField
            size="small"
            placeholder="Поиск по лидам..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

      </Box>
    </Box>
  );
}
