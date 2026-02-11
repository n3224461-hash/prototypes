import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Warning from '@mui/icons-material/Warning';
import ContentCopy from '@mui/icons-material/ContentCopy';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Campaign from '@mui/icons-material/Campaign';
import type { LeadForm } from '../types';
import Stack from '@mui/material/Stack';

interface PublishDialogProps {
  open: boolean;
  onClose: () => void;
  form: LeadForm;
  onPublish: () => void;
}

export default function PublishDialog({
  open,
  onClose,
  form,
  onPublish,
}: PublishDialogProps) {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [published, setPublished] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasFields = form.fields.length > 0;
  const hasRequiredFields = form.fields.some((f) => f.required);
  const prerequisitesMet = hasFields && hasRequiredFields;

  const handlePublish = () => {
    onPublish();
    setPublished(true);
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setAgreed(false);
      setPublished(false);
      setCopied(false);
    }, 300);
  };

  const handleCopyLink = () => {
    const url = `https://mts.ru/forms/${form.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreview = () => {
    navigate(`/prototypes/lead-forms/${form.id}/preview`);
  };

  const handleLaunchAds = () => {
    alert('Функция запуска рекламы будет доступна в следующей версии');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      {!published ? (
        <>
          <DialogTitle>Публикация формы</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Проверка готовности
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {hasFields ? (
                      <CheckCircle color="success" fontSize="small" />
                    ) : (
                      <Warning color="warning" fontSize="small" />
                    )}
                    <Typography variant="body2">
                      {hasFields
                        ? 'Форма содержит поля'
                        : 'Добавьте хотя бы одно поле'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {hasRequiredFields ? (
                      <CheckCircle color="success" fontSize="small" />
                    ) : (
                      <Warning color="warning" fontSize="small" />
                    )}
                    <Typography variant="body2">
                      {hasRequiredFields
                        ? 'Есть обязательные поля'
                        : 'Добавьте хотя бы одно обязательное поле'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {!prerequisitesMet && (
                <Alert severity="warning">
                  Для публикации необходимо выполнить все требования
                </Alert>
              )}

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Для публикации необходимо принять оферту
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    maxHeight: 120,
                    overflow: 'auto',
                    p: 2,
                    bgcolor: 'grey.50',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Текст оферты... Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Typography>
                </Paper>
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                }
                label="Я согласен с офертой и принимаю ответственность"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button
              variant="contained"
              onClick={handlePublish}
              disabled={!agreed || !prerequisitesMet}
            >
              Опубликовать
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
            <CheckCircle color="success" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h6">Форма опубликована!</Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Ссылка на форму"
                value={`https://mts.ru/forms/${form.id}`}
                InputProps={{
                  readOnly: true,
                }}
              />

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<ContentCopy />}
                  onClick={handleCopyLink}
                  sx={{ flex: 1, minWidth: 140 }}
                >
                  {copied ? 'Скопировано!' : 'Копировать ссылку'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<OpenInNew />}
                  onClick={handlePreview}
                  sx={{ flex: 1, minWidth: 140 }}
                >
                  Посмотреть форму
                </Button>
              </Box>

              <Button
                variant="contained"
                startIcon={<Campaign />}
                onClick={handleLaunchAds}
                fullWidth
              >
                Запустить рекламу
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
