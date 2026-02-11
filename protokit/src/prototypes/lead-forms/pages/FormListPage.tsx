import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { useFormsContext } from '../context/FormsContext';
import FormCard from '../components/FormCard';

const templates = [
  { id: 'subscription', name: 'Форма подписки', description: 'Минимальная форма для сбора контактов' },
  { id: 'request', name: 'Форма заявки', description: 'Форма для сбора заявок с дополнительным контекстом' },
  { id: 'survey', name: 'Опрос/Анкета', description: 'Форма для опросов и анкетирования' },
  { id: 'blank', name: 'С нуля', description: 'Создать пустую форму' },
];

export default function FormListPage() {
  const { state, dispatch } = useFormsContext();
  const navigate = useNavigate();
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);

  const handleCreateClick = () => {
    setTemplateDialogOpen(true);
  };

  const handleTemplateSelect = (templateId: string) => {
    setTemplateDialogOpen(false);
    // TODO: Create form with template and navigate to builder
    // For now, templateId is unused but will be used for template selection
    void templateId;
    navigate('/lead-forms/new');
  };

  const handleEdit = (formId: string) => {
    navigate(`/lead-forms/${formId}/edit`);
  };

  const handleLeads = (formId: string) => {
    navigate(`/lead-forms/${formId}/leads`);
  };

  const handleDelete = (formId: string) => {
    if (confirm('Удалить форму?')) {
      dispatch({ type: 'DELETE_FORM', payload: formId });
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    // Could show a snackbar here
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Лид-формы</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Создать форму
        </Button>
      </Box>

      {/* Forms Grid */}
      <Grid container spacing={2}>
        {state.forms.map((form) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={form.id}>
            <FormCard
              form={form}
              onEdit={() => handleEdit(form.id)}
              onLeads={() => handleLeads(form.id)}
              onDelete={() => handleDelete(form.id)}
              onCopyLink={form.url ? () => handleCopyLink(form.url!) : undefined}
            />
          </Grid>
        ))}
      </Grid>

      {/* Template Selection Dialog */}
      <Dialog open={templateDialogOpen} onClose={() => setTemplateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Выберите шаблон</DialogTitle>
        <DialogContent>
          <List>
            {templates.map((template) => (
              <ListItem key={template.id} disablePadding>
                <ListItemButton onClick={() => handleTemplateSelect(template.id)}>
                  <ListItemText
                    primary={template.name}
                    secondary={template.description}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
