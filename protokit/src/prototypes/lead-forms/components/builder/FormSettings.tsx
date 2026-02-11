import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import type { LeadForm } from '../../types';

interface FormSettingsProps {
  form: LeadForm;
  onChange: (changes: Partial<LeadForm>) => void;
}

const colorOptions = [
  { value: '#FF0032', label: 'МТС Красный' },
  { value: '#007CFF', label: 'Синий' },
  { value: '#26CD58', label: 'Зеленый' },
  { value: '#1D2023', label: 'Черный' },
];

export default function FormSettings({ form, onChange }: FormSettingsProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Настройки формы
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Описание формы"
          value={form.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          size="small"
          multiline
          rows={3}
          placeholder="Краткое описание для внутреннего использования"
        />

        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Цвет кнопки
          </Typography>
          <FormControl fullWidth>
            <RadioGroup
              value={form.buttonColor}
              onChange={(e) => onChange({ buttonColor: e.target.value })}
            >
              <Stack spacing={1}>
                {colorOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio size="small" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: 0.5,
                            bgcolor: option.value,
                            border: '1px solid rgba(0,0,0,0.1)',
                          }}
                        />
                        <Typography variant="body2">{option.label}</Typography>
                      </Box>
                    }
                  />
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>

        <TextField
          fullWidth
          label="Текст кнопки отправки"
          value={form.buttonText}
          onChange={(e) => onChange({ buttonText: e.target.value })}
          size="small"
          placeholder="Отправить"
        />

        <TextField
          fullWidth
          label="Сообщение после отправки"
          value={form.successMessage}
          onChange={(e) => onChange({ successMessage: e.target.value })}
          size="small"
          multiline
          rows={3}
          placeholder="Спасибо! Мы скоро свяжемся с вами."
        />

        <TextField
          fullWidth
          label="Email для уведомлений"
          value={form.notificationEmail || ''}
          onChange={(e) => onChange({ notificationEmail: e.target.value })}
          size="small"
          type="email"
          placeholder="optional@example.com"
        />
      </Stack>
    </Box>
  );
}
