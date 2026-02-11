import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm, useFormsContext } from '../context/FormsContext';
import PublicForm from '../components/PublicForm';
import type { Lead } from '../types';

export default function FormPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const form = useForm(id || '');
  const { dispatch } = useFormsContext();

  const handleSubmit = (answers: Record<string, string | string[]>) => {
    const newLead: Lead = {
      id: crypto.randomUUID(),
      formId: id || '',
      status: 'new',
      answers,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    dispatch({ type: 'ADD_LEAD', payload: newLead });
  };

  if (!form) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Форма не найдена</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      {/* Preview mode notice */}
      <Box sx={{ maxWidth: 560, mx: 'auto', px: 2, mb: 2 }}>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          Режим предпросмотра — можно закрыть вкладку
        </Typography>
      </Box>

      <PublicForm form={form} onSubmit={handleSubmit} />
    </Box>
  );
}
