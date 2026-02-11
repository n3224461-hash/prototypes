import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import CloudUpload from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';

interface BuilderToolbarProps {
  formName: string;
  onNameChange: (name: string) => void;
  onPreview: () => void;
  onPublish: () => void;
  onBack: () => void;
  saving: boolean;
}

export default function BuilderToolbar({
  formName,
  onNameChange,
  onPreview,
  onPublish,
  onBack,
  saving,
}: BuilderToolbarProps) {
  return (
    <Box
      sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ textTransform: 'none' }}
        >
          Назад
        </Button>
        <TextField
          value={formName}
          onChange={(e) => onNameChange(e.target.value)}
          variant="standard"
          size="small"
          sx={{ minWidth: 200 }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {saving ? (
            <>
              <CircularProgress size={14} thickness={5} />
              <Typography variant="caption" color="text.secondary">
                Сохранение...
              </Typography>
            </>
          ) : (
            <Typography variant="caption" color="text.secondary">
              Сохранено
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          startIcon={<Visibility />}
          variant="outlined"
          onClick={onPreview}
          sx={{ textTransform: 'none' }}
        >
          Превью
        </Button>
        <Button
          startIcon={<CloudUpload />}
          variant="contained"
          onClick={onPublish}
          sx={{ textTransform: 'none' }}
        >
          Опубликовать
        </Button>
      </Box>
    </Box>
  );
}
