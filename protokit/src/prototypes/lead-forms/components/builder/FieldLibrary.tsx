import Box from '@mui/material/Box';
import MuiList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import TextFields from '@mui/icons-material/TextFields';
import Notes from '@mui/icons-material/Notes';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Numbers from '@mui/icons-material/Numbers';
import ListIcon from '@mui/icons-material/List';
import Checklist from '@mui/icons-material/Checklist';
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked';
import CheckBox from '@mui/icons-material/CheckBox';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import type { FieldType } from '../../types';

interface FieldLibraryProps {
  onAddField: (type: FieldType) => void;
}

const fieldGroups = [
  {
    title: 'Базовые',
    fields: [
      { type: 'text' as FieldType, label: 'Текст', icon: TextFields },
      { type: 'textarea' as FieldType, label: 'Текстовая область', icon: Notes },
      { type: 'email' as FieldType, label: 'Email', icon: Email },
      { type: 'phone' as FieldType, label: 'Телефон', icon: Phone },
      { type: 'number' as FieldType, label: 'Число', icon: Numbers },
    ],
  },
  {
    title: 'Выбор',
    fields: [
      { type: 'select' as FieldType, label: 'Выпадающий список', icon: ListIcon },
      { type: 'multi-select' as FieldType, label: 'Множественный выбор', icon: Checklist },
      { type: 'radio' as FieldType, label: 'Радио-кнопки', icon: RadioButtonChecked },
      { type: 'checkbox' as FieldType, label: 'Чекбоксы', icon: CheckBox },
    ],
  },
  {
    title: 'Специальные',
    fields: [
      { type: 'date' as FieldType, label: 'Дата', icon: CalendarMonth },
    ],
  },
];

export default function FieldLibrary({ onAddField }: FieldLibraryProps) {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="subtitle2" sx={{ px: 2, mb: 1, color: 'text.secondary' }}>
        Библиотека полей
      </Typography>
      
      {fieldGroups.map((group) => (
        <Box key={group.title} sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ px: 2, color: 'text.secondary', fontWeight: 500 }}>
            {group.title}
          </Typography>
          <MuiList dense disablePadding>
            {group.fields.map((field) => {
              const Icon = field.icon;
              return (
                <ListItem key={field.type} disablePadding>
                  <ListItemButton onClick={() => onAddField(field.type)} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={field.label}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </MuiList>
        </Box>
      ))}
    </Box>
  );
}
