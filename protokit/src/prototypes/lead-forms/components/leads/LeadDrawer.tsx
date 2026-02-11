import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import type { Lead, LeadForm, LeadStatus } from '../../types';

interface LeadDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  form: LeadForm;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onAddComment: (leadId: string, text: string) => void;
  onDelete: (leadId: string) => void;
}

const statusConfig: Record<LeadStatus, { label: string }> = {
  new: { label: 'Новый' },
  viewed: { label: 'Просмотрен' },
  called: { label: 'Обзвонен' },
};

const formatDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function LeadDrawer({
  lead,
  open,
  onClose,
  form,
  onUpdateStatus,
  onAddComment,
  onDelete,
}: LeadDrawerProps) {
  const [newComment, setNewComment] = useState('');

  if (!lead) return null;

  const handleStatusChange = (status: LeadStatus) => {
    onUpdateStatus(lead.id, status);
  };

  const handleCalledToggle = (checked: boolean) => {
    handleStatusChange(checked ? 'called' : 'viewed');
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(lead.id, newComment.trim());
      setNewComment('');
    }
  };

  const handleDelete = () => {
    onDelete(lead.id);
  };

  // Render answers based on form fields
  const renderAnswers = () => {
    return form.fields.map((field) => {
      const answer = lead.answers[field.id];
      if (answer === undefined || answer === '') return null;

      const displayValue = Array.isArray(answer) 
        ? answer.join(', ') 
        : String(answer);

      return (
        <Box key={field.id} sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {field.label}
          </Typography>
          <Typography variant="body2">
            {displayValue}
          </Typography>
        </Box>
      );
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 400 } }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Лид</Typography>
        <Box>
          <IconButton onClick={handleDelete} color="error" size="small" sx={{ mr: 1 }}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 2, overflow: 'auto', flex: 1 }}>
        {/* Metadata */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Дата получения
          </Typography>
          <Typography variant="body2">
            {formatDateTime(lead.createdAt)}
          </Typography>
        </Box>

        {/* Status */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Статус
          </Typography>
          <FormControl fullWidth size="small" sx={{ mt: 1 }}>
            <Select
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
            >
              {(Object.keys(statusConfig) as LeadStatus[]).map((status) => (
                <MenuItem key={status} value={status}>
                  {statusConfig[status].label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={lead.status === 'called'}
                onChange={(e) => handleCalledToggle(e.target.checked)}
              />
            }
            label="Обзвонен"
            sx={{ mt: 1 }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Lead Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Ответы
          </Typography>
          {renderAnswers()}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Comments */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Комментарии
          </Typography>
          
          {lead.comments.length > 0 ? (
            <List dense disablePadding>
              {lead.comments.map((comment) => (
                <ListItem key={comment.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemText
                    primary={comment.text}
                    secondary={formatDateTime(comment.createdAt)}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Пока нет комментариев
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField
              size="small"
              placeholder="Добавить комментарий..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              <SendIcon fontSize="small" />
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* History */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            История
          </Typography>
          <Typography variant="body2" color="text.secondary">
            История изменений будет здесь
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
