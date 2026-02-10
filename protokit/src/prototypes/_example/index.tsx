import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ExamplePrototype() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Example Prototype
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        This is a template prototype demonstrating various MUI components
        styled with the project theme. Copy this folder to create a new
        prototype.
      </Typography>

      <Stack spacing={3}>
        {/* Buttons */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Buttons
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button variant="contained">Primary</Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
              <Button variant="contained" startIcon={<AddIcon />}>
                With Icon
              </Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Form
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {submitted ? (
              <Alert
                icon={<CheckCircleIcon />}
                severity="success"
                onClose={() => {
                  setSubmitted(false);
                  setName('');
                }}
              >
                Hello, {name}!
              </Alert>
            ) : (
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}
              >
                <TextField
                  label="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Chips */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Chips
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="Default" />
              <Chip label="Primary" color="primary" />
              <Chip label="Secondary" color="secondary" />
              <Chip label="Success" color="success" />
              <Chip label="Warning" color="warning" />
              <Chip label="Error" color="error" />
              <Chip label="Outlined" variant="outlined" />
              <Chip
                label="Clickable"
                color="primary"
                onClick={() => alert('Clicked!')}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Typography Scale
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1}>
              <Typography variant="h1">H1 Heading</Typography>
              <Typography variant="h2">H2 Heading</Typography>
              <Typography variant="h3">H3 Heading</Typography>
              <Typography variant="h4">H4 Heading</Typography>
              <Typography variant="h5">H5 Heading</Typography>
              <Typography variant="h6">H6 Heading</Typography>
              <Typography variant="body1">
                Body 1 — Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </Typography>
              <Typography variant="body2">
                Body 2 — Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
