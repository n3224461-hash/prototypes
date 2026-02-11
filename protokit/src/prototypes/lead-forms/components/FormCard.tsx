import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import type { LeadForm, FormStatus } from '../types';

interface FormCardProps {
  form: LeadForm;
  onEdit: () => void;
  onLeads: () => void;
  onDelete: () => void;
  onCopyLink?: () => void;
}

const statusColors: Record<FormStatus, 'default' | 'success' | 'warning'> = {
  draft: 'default',
  active: 'success',
  inactive: 'warning',
};

const statusLabels: Record<FormStatus, string> = {
  draft: 'Черновик',
  active: 'Активна',
  inactive: 'Неактивна',
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function FormCard({ form, onEdit, onLeads, onDelete, onCopyLink }: FormCardProps) {
  return (
    <Card elevation={1} sx={{ borderRadius: 2, height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header: Name + Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ flex: 1, pr: 1 }}>
            {form.name}
          </Typography>
          <Chip
            label={statusLabels[form.status]}
            color={statusColors[form.status]}
            size="small"
          />
        </Box>

        {/* Metrics */}
        <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {form.leadsCount} лидов
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {form.calledPercent}% обзвонено
          </Typography>
        </Stack>

        {/* Date */}
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
          Создана: {formatDate(form.createdAt)}
        </Typography>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={onEdit}
          >
            Редактировать
          </Button>
          <Button
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={onLeads}
          >
            Лиды
          </Button>
          {onCopyLink && (
            <Button
              size="small"
              startIcon={<LinkIcon />}
              onClick={onCopyLink}
            >
              Копировать ссылку
            </Button>
          )}
          <Box sx={{ flex: 1 }} />
          <IconButton
            size="small"
            color="error"
            onClick={onDelete}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
