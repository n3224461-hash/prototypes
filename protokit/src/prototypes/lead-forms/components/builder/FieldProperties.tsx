import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import type { FormField } from '../../types';

interface FieldPropertiesProps {
  field: FormField | null;
  onChange: (changes: Partial<FormField>) => void;
}

export default function FieldProperties({ field, onChange }: FieldPropertiesProps) {
  if (!field) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          Выберите поле для редактирования
        </Typography>
      </Box>
    );
  }

  const hasOptions = ['select', 'multi-select', 'radio', 'checkbox'].includes(field.type);

  const handleAddOption = () => {
    const options = field.options || [];
    onChange({
      options: [...options, `Вариант ${options.length + 1}`],
    });
  };

  const handleUpdateOption = (index: number, value: string) => {
    const options = [...(field.options || [])];
    options[index] = value;
    onChange({ options });
  };

  const handleDeleteOption = (index: number) => {
    const options = (field.options || []).filter((_, i) => i !== index);
    onChange({ options });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Свойства поля
      </Typography>

      <TextField
        fullWidth
        label="Название поля"
        value={field.label}
        onChange={(e) => onChange({ label: e.target.value })}
        size="small"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Подсказка (placeholder)"
        value={field.placeholder || ''}
        onChange={(e) => onChange({ placeholder: e.target.value })}
        size="small"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Описание под полем"
        value={field.description || ''}
        onChange={(e) => onChange({ description: e.target.value })}
        size="small"
        multiline
        rows={2}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={field.required}
            onChange={(e) => onChange({ required: e.target.checked })}
          />
        }
        label="Обязательное поле"
        sx={{ mb: hasOptions ? 2 : 0 }}
      />

      {hasOptions && (
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Варианты ответа
          </Typography>
          <List dense disablePadding>
            {(field.options || []).map((option, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <TextField
                  fullWidth
                  size="small"
                  value={option}
                  onChange={(e) => handleUpdateOption(index, e.target.value)}
                  placeholder={`Вариант ${index + 1}`}
                />
                <IconButton
                  size="small"
                  onClick={() => handleDeleteOption(index)}
                  disabled={field.options && field.options.length <= 1}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <TextField
            fullWidth
            size="small"
            placeholder="Добавить вариант..."
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={handleAddOption} edge="end">
                  <Add fontSize="small" />
                </IconButton>
              ),
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddOption();
              }
            }}
            sx={{ mt: 1 }}
          />
        </Box>
      )}
    </Box>
  );
}
