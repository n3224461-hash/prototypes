import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import { prototypes } from '../router';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Prototypes
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Select a prototype from the list below or from the sidebar.
      </Typography>

      {prototypes.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              No prototypes yet. Copy{' '}
              <code>src/prototypes/_example/</code> to create your first
              prototype.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {prototypes.map((proto) => (
            <Card key={proto.slug}>
              <CardActionArea onClick={() => navigate(`/${proto.slug}`)}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {proto.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {proto.description}
                  </Typography>
                  <Chip
                    label={proto.date}
                    size="small"
                    variant="outlined"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
