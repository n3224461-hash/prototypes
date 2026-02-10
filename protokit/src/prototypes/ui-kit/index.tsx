import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Badge from '@mui/material/Badge';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h4" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
      )}
      {!description && <Box sx={{ mb: 3 }} />}
      {children}
    </Box>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tableRows = [
  { id: 1, name: 'Anna Smith', role: 'Designer', status: 'Active' },
  { id: 2, name: 'John Doe', role: 'Developer', status: 'Active' },
  { id: 3, name: 'Maria Garcia', role: 'PM', status: 'On leave' },
  { id: 4, name: 'Alex Johnson', role: 'QA', status: 'Active' },
  { id: 5, name: 'Sarah Wilson', role: 'Designer', status: 'Inactive' },
];

const autocompleteOptions = [
  'React',
  'Vue',
  'Angular',
  'Svelte',
  'Next.js',
  'Remix',
  'Astro',
  'Solid',
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function UiKitPrototype() {
  const [tabValue, setTabValue] = useState(0);
  const [alignment, setAlignment] = useState<string>('left');
  const [formats, setFormats] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('one');
  const [sliderValue, setSliderValue] = useState<number>(40);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('option1');
  const [rating, setRating] = useState<number | null>(3);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [selectValue, setSelectValue] = useState('designer');

  return (
    <Box sx={{ maxWidth: 960 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          UI Kit
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          A comprehensive showcase of all MUI components styled with the
          ProtoKit theme. Use this as a visual reference when building
          prototypes.
        </Typography>
        <Divider />
      </Box>

      {/* ================================================================= */}
      {/* BUTTONS */}
      {/* ================================================================= */}
      <Section
        title="Buttons"
        description="Various button styles, sizes, and states."
      >
        <SubSection title="Contained">
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button variant="contained">Primary</Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="contained" color="success">
              Success
            </Button>
            <Button variant="contained" color="error">
              Error
            </Button>
            <Button variant="contained" color="warning">
              Warning
            </Button>
            <Button variant="contained" color="info">
              Info
            </Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
          </Stack>
        </SubSection>

        <SubSection title="Outlined">
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button variant="outlined">Primary</Button>
            <Button variant="outlined" color="secondary">
              Secondary
            </Button>
            <Button variant="outlined" color="success">
              Success
            </Button>
            <Button variant="outlined" color="error">
              Error
            </Button>
            <Button variant="outlined" disabled>
              Disabled
            </Button>
          </Stack>
        </SubSection>

        <SubSection title="Text">
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button variant="text">Primary</Button>
            <Button variant="text" color="secondary">
              Secondary
            </Button>
            <Button variant="text" disabled>
              Disabled
            </Button>
          </Stack>
        </SubSection>

        <SubSection title="Sizes">
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
            <Button variant="contained" size="small">
              Small
            </Button>
            <Button variant="contained" size="medium">
              Medium
            </Button>
            <Button variant="contained" size="large">
              Large
            </Button>
          </Stack>
        </SubSection>

        <SubSection title="With Icons">
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button variant="contained" startIcon={<AddIcon />}>
              Create
            </Button>
            <Button variant="outlined" startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Button variant="contained" endIcon={<SearchIcon />}>
              Search
            </Button>
          </Stack>
        </SubSection>

        <SubSection title="Icon Buttons">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <IconButton color="primary">
              <FavoriteIcon />
            </IconButton>
            <IconButton color="secondary">
              <ShareIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
            <IconButton disabled>
              <SettingsIcon />
            </IconButton>
          </Stack>
        </SubSection>



        <SubSection title="FAB">
          <Stack direction="row" spacing={2} alignItems="center">
            <Fab color="primary" size="small">
              <AddIcon />
            </Fab>
            <Fab color="primary">
              <AddIcon />
            </Fab>
            <Fab color="secondary" variant="extended">
              <AddIcon sx={{ mr: 1 }} />
              Create
            </Fab>
          </Stack>
        </SubSection>

        <SubSection title="Toggle Buttons">
          <Stack spacing={3}>
            <ToggleButtonGroup
              value={selectedTab}
              exclusive
              onChange={(_, v) => v && setSelectedTab(v)}
            >
              <ToggleButton value="one">One</ToggleButton>
              <ToggleButton value="two">Two</ToggleButton>
              <ToggleButton value="three">Three</ToggleButton>
            </ToggleButtonGroup>

            <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={(_, v) => v && setAlignment(v)}
              >
                <ToggleButton value="left">
                  <FormatAlignLeftIcon />
                </ToggleButton>
                <ToggleButton value="center">
                  <FormatAlignCenterIcon />
                </ToggleButton>
                <ToggleButton value="right">
                  <FormatAlignRightIcon />
                </ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup
                value={formats}
                onChange={(_, v) => setFormats(v)}
              >
                <ToggleButton value="bold">
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic">
                  <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined">
                  <FormatUnderlinedIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
        </SubSection>
      </Section>

      {/* ================================================================= */}
      {/* FORM INPUTS */}
      {/* ================================================================= */}
      <Section
        title="Form Inputs"
        description="Text fields, selects, checkboxes, radios, switches, sliders, and more."
      >
        <SubSection title="Text Fields">
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <TextField label="Name" placeholder="Enter your name" />
            <TextField label="Email" placeholder="example@mail.com" helperText="We'll never share your email" />
            <TextField label="Required field" error helperText="This field is required" />
            <TextField label="Disabled" disabled value="Cannot edit" />
            <TextField label="Multiline" multiline rows={3} placeholder="Write something..." />
            <TextField label="Password" type="password" value="secret123" />
          </Stack>
        </SubSection>

        <SubSection title="Select">
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <FormControl>
              <InputLabel>Role</InputLabel>
              <Select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                renderValue={(value) => {
                  const labels: Record<string, string> = {
                    designer: 'Designer',
                    developer: 'Developer',
                    pm: 'Product Manager',
                    qa: 'QA Engineer',
                  };
                  return labels[value as string] ?? value;
                }}
              >
                {['designer', 'developer', 'pm', 'qa'].map((value) => {
                  const labels: Record<string, string> = {
                    designer: 'Designer',
                    developer: 'Developer',
                    pm: 'Product Manager',
                    qa: 'QA Engineer',
                  };
                  return (
                    <MenuItem key={value} value={value} sx={{ justifyContent: 'space-between' }}>
                      {labels[value]}
                      {selectValue === value && (
                        <CheckIcon sx={{ color: '#FF0032', fontSize: 20, ml: 2 }} />
                      )}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
        </SubSection>

        <SubSection title="Dropdown data">
          <Stack direction="row" spacing={2} sx={{ maxWidth: 400 }}>
            <Autocomplete
              freeSolo
              options={['29.12.2022', '30.12.2022', '31.12.2022', '01.01.2023', '02.01.2023']}
              defaultValue="29.12.2022"
              sx={{ flex: 1 }}
              popupIcon={<CalendarTodayIcon sx={{ fontSize: 20 }} />}
              renderInput={(params) => (
                <TextField {...params} label="Дата" placeholder="ДД.ММ.ГГГГ" />
              )}
            />
            <Autocomplete
              freeSolo
              options={['09 : 00', '10 : 00', '12 : 00', '14 : 00', '16 : 00', '18 : 00']}
              defaultValue="14 : 00"
              sx={{ flex: 1 }}
              popupIcon={<AccessTimeIcon sx={{ fontSize: 20 }} />}
              renderInput={(params) => (
                <TextField {...params} label="Label" placeholder="ЧЧ : ММ" />
              )}
            />
          </Stack>
        </SubSection>

        <SubSection title="Autocomplete">
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <Autocomplete
              options={autocompleteOptions}
              renderInput={(params) => (
                <TextField {...params} label="Framework" />
              )}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    {option}
                    {selected && <CheckIcon sx={{ color: '#FF0032', fontSize: 20, ml: 2 }} />}
                  </Box>
                </li>
              )}
            />
            <Autocomplete
              multiple
              options={autocompleteOptions}
              defaultValue={[autocompleteOptions[0], autocompleteOptions[2]]}
              renderInput={(params) => (
                <TextField {...params} label="Дополнения к заказу" helperText="Выберите из списка, что добавить к заказу" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...rest } = getTagProps({ index });
                  return <Chip key={key} label={option} {...rest} />;
                })
              }
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    {option}
                    {selected && <CheckIcon sx={{ color: '#FF0032', fontSize: 20, ml: 2 }} />}
                  </Box>
                </li>
              )}
            />
          </Stack>
        </SubSection>

        <SubSection title="Checkboxes">
          <Stack>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />
            <FormControlLabel control={<Checkbox />} label="Unchecked" />
            <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
            <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
          </Stack>
        </SubSection>

        <SubSection title="Radio Buttons">
          <FormControl>
            <FormLabel>Choose an option</FormLabel>
            <RadioGroup
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
            >
              <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
              <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
              <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
              <FormControlLabel value="option4" control={<Radio disabled />} label="Disabled" />
            </RadioGroup>
          </FormControl>
        </SubSection>

        <SubSection title="Switches">
          <Stack>
            <FormControlLabel
              control={
                <Switch
                  checked={switchChecked}
                  onChange={(e) => setSwitchChecked(e.target.checked)}
                />
              }
              label={switchChecked ? 'On' : 'Off'}
            />
            <FormControlLabel
              control={<Switch defaultChecked color="secondary" />}
              label="Secondary"
            />
            <FormControlLabel
              control={<Switch disabled />}
              label="Disabled"
            />
          </Stack>
        </SubSection>

        <SubSection title="Slider">
          <Box sx={{ maxWidth: 400 }}>
            <Slider
              value={sliderValue}
              onChange={(_, v) => setSliderValue(v as number)}
              valueLabelDisplay="auto"
            />
            <Slider defaultValue={[20, 60]} valueLabelDisplay="auto" />
            <Slider defaultValue={30} step={10} marks min={0} max={100} />
          </Box>
        </SubSection>

        <SubSection title="Rating">
          <Stack spacing={1}>
            <Rating
              value={rating}
              onChange={(_, v) => setRating(v)}
            />
            <Rating value={4} readOnly />
            <Rating value={3} disabled />
            <Rating
              value={rating}
              onChange={(_, v) => setRating(v)}
              icon={<FavoriteIcon color="error" />}
              emptyIcon={<FavoriteIcon />}
            />
          </Stack>
        </SubSection>
      </Section>

      {/* ================================================================= */}
      {/* DATA DISPLAY */}
      {/* ================================================================= */}
      <Section
        title="Data Display"
        description="Chips, avatars, badges, tooltips, tables, and lists."
      >
        <SubSection title="Chips">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Default" />
            <Chip label="Primary" color="primary" />
            <Chip label="Secondary" color="secondary" />
            <Chip label="Success" color="success" />
            <Chip label="Warning" color="warning" />
            <Chip label="Error" color="error" />
            <Chip label="Info" color="info" />
            <Chip label="Outlined" variant="outlined" />
            <Chip label="Deletable" onDelete={() => {}} color="primary" />
            <Chip
              label="With Avatar"
              avatar={<Avatar>M</Avatar>}
              color="primary"
              variant="outlined"
            />
            <Chip
              label="Clickable"
              onClick={() => {}}
              color="secondary"
            />
          </Stack>
        </SubSection>

        <SubSection title="Avatars">
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
              <Avatar sx={{ bgcolor: 'success.main' }}>C</Avatar>
              <Avatar sx={{ bgcolor: 'error.main' }}>D</Avatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
              <Avatar variant="rounded" sx={{ bgcolor: 'primary.main' }}>
                N
              </Avatar>
              <Avatar variant="square" sx={{ bgcolor: 'secondary.main' }}>
                S
              </Avatar>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>S</Avatar>
              <Avatar>M</Avatar>
              <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
            </Stack>
            <AvatarGroup max={4}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
              <Avatar sx={{ bgcolor: 'success.main' }}>C</Avatar>
              <Avatar sx={{ bgcolor: 'error.main' }}>D</Avatar>
              <Avatar sx={{ bgcolor: 'warning.main' }}>E</Avatar>
            </AvatarGroup>
          </Stack>
        </SubSection>

        <SubSection title="Badges">
          <Stack direction="row" spacing={4}>
            <Badge badgeContent={4} color="primary">
              <MailIcon />
            </Badge>
            <Badge badgeContent={99} color="error">
              <NotificationsIcon />
            </Badge>
            <Badge badgeContent={0} showZero color="primary">
              <MailIcon />
            </Badge>
            <Badge variant="dot" color="error">
              <MailIcon />
            </Badge>
            <Badge
              badgeContent=""
              color="success"
              variant="dot"
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
            </Badge>
          </Stack>
        </SubSection>

        <SubSection title="Tooltips">
          <Stack direction="row" spacing={2}>
            <Tooltip title="Add item">
              <Button variant="outlined">Hover me</Button>
            </Tooltip>
            <Tooltip title="Edit" arrow>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Bottom placement" placement="bottom">
              <Chip label="Bottom tooltip" />
            </Tooltip>
          </Stack>
        </SubSection>

        <SubSection title="Table">
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={
                          row.status === 'Active'
                            ? 'success'
                            : row.status === 'On leave'
                              ? 'warning'
                              : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SubSection>

        <SubSection title="List">
          <Paper variant="outlined" sx={{ maxWidth: 400 }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" secondary="Main page" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favorites" secondary="Your saved items" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" secondary="App preferences" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2026" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.light' }}>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Feb 3, 2026" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.light' }}>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="Mar 15, 2026" />
              </ListItem>
            </List>
          </Paper>
        </SubSection>
      </Section>

      {/* ================================================================= */}
      {/* FEEDBACK */}
      {/* ================================================================= */}
      <Section
        title="Feedback"
        description="Alerts, snackbars, progress indicators, and skeletons."
      >
        <SubSection title="Alerts">
          <Stack spacing={2}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              This is a success alert with a title.
            </Alert>
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              This is an info alert with a title.
            </Alert>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              This is a warning alert with a title.
            </Alert>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert with a title.
            </Alert>
            <Alert severity="success" variant="outlined">
              Outlined success alert.
            </Alert>
            <Alert severity="error" variant="filled">
              Filled error alert.
            </Alert>
            <Alert
              severity="info"
              action={
                <Button color="inherit" size="small">
                  UNDO
                </Button>
              }
            >
              Alert with action button.
            </Alert>
            <Alert icon={<CheckCircleIcon />} severity="success">
              Alert with custom icon.
            </Alert>
          </Stack>
        </SubSection>

        <SubSection title="Snackbar">
          <Button variant="outlined" onClick={() => setSnackbarOpen(true)}>
            Show Snackbar
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message="This is a snackbar message"
          />
        </SubSection>

        <SubSection title="Progress">
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Linear — Indeterminate
              </Typography>
              <LinearProgress />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Linear — Determinate (60%)
              </Typography>
              <LinearProgress variant="determinate" value={60} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Linear — Buffer
              </Typography>
              <LinearProgress variant="buffer" value={40} valueBuffer={70} />
            </Box>
            <Stack direction="row" spacing={3} alignItems="center">
              <CircularProgress size={30} />
              <CircularProgress />
              <CircularProgress color="secondary" />
              <CircularProgress variant="determinate" value={75} />
            </Stack>
          </Stack>
        </SubSection>

        <SubSection title="Skeletons">
          <Stack spacing={1} sx={{ maxWidth: 400 }}>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="rounded" height={120} />
          </Stack>
        </SubSection>
      </Section>

      {/* ================================================================= */}
      {/* NAVIGATION */}
      {/* ================================================================= */}
      <Section
        title="Navigation"
        description="Tabs, breadcrumbs, pagination, and stepper."
      >
        <SubSection title="Tabs">
          <Paper variant="outlined" sx={{ mb: 2 }}>
            <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
              <Tab label="Overview" />
              <Tab label="Details" />
              <Tab label="Reviews" />
              <Tab label="Related" />
            </Tabs>
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Content for tab {tabValue + 1}. Switch between tabs to see the
                active state change.
              </Typography>
            </Box>
          </Paper>
        </SubSection>

        <SubSection title="Breadcrumbs">
          <Stack spacing={2}>
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Category
              </Link>
              <Typography color="text.primary">Current Page</Typography>
            </Breadcrumbs>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link underline="hover" color="inherit" href="#">
                Dashboard
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Users
              </Link>
              <Typography color="text.primary">Edit</Typography>
            </Breadcrumbs>
          </Stack>
        </SubSection>

        <SubSection title="Pagination">
          <Stack spacing={2}>
            <Pagination count={10} color="primary" />
            <Pagination count={10} variant="outlined" color="primary" />
            <Pagination count={10} shape="rounded" />
            <Pagination count={10} size="small" />
          </Stack>
        </SubSection>

        <SubSection title="Stepper">
          <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
            <Step>
              <StepLabel>Select plan</StepLabel>
            </Step>
            <Step>
              <StepLabel>Enter details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Review</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm</StepLabel>
            </Step>
          </Stepper>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              size="small"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((s) => s - 1)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              size="small"
              disabled={activeStep === 3}
              onClick={() => setActiveStep((s) => s + 1)}
            >
              Next
            </Button>
          </Stack>
        </SubSection>
      </Section>

      {/* ================================================================= */}
      {/* SURFACES */}
      {/* ================================================================= */}
      <Section
        title="Surfaces"
        description="Cards, paper, and accordions."
      >
        <SubSection title="Cards">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            flexWrap="wrap"
            useFlexGap
          >
            <Card sx={{ maxWidth: 300, flex: '1 1 260px' }}>
              <CardMedia
                sx={{
                  height: 140,
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ImageIcon sx={{ fontSize: 48, color: 'primary.contrastText' }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Card Title
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Card description goes here. This is a standard card with
                  media, content, and actions.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
                <IconButton size="small">
                  <FavoriteIcon />
                </IconButton>
                <IconButton size="small">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 300, flex: '1 1 260px' }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>R</Avatar>}
                title="Card with Header"
                subheader="February 8, 2026"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This card uses CardHeader for a richer top area with avatar,
                  title and subtitle.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Action
                </Button>
              </CardActions>
            </Card>

            <Card variant="outlined" sx={{ maxWidth: 300, flex: '1 1 260px' }}>
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  Outlined Card
                </Typography>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  128
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total active users this week. Up 12% from last week.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </SubSection>

        <SubSection title="Paper Elevations">
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {[0, 1, 2, 3, 4, 8, 12, 24].map((elevation) => (
              <Paper
                key={elevation}
                elevation={elevation}
                sx={{
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption">e={elevation}</Typography>
              </Paper>
            ))}
          </Stack>
        </SubSection>

        <SubSection title="Accordion">
          <Box sx={{ maxWidth: 600 }}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion Item 1 (expanded by default)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion Item 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla pariatur.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion Item 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </SubSection>
      </Section>

      {/* ================================================================= */}
      {/* TYPOGRAPHY */}
      {/* ================================================================= */}
      <Section
        title="Typography"
        description="The full typography scale from the theme."
      >
        <Stack spacing={1}>
          <Typography variant="h1">H1 — Main Heading</Typography>
          <Typography variant="h2">H2 — Section Heading</Typography>
          <Typography variant="h3">H3 — Subsection</Typography>
          <Typography variant="h4">H4 — Card Title</Typography>
          <Typography variant="h5">H5 — Small Title</Typography>
          <Typography variant="h6">H6 — Label</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1">
            Subtitle 1 — Used for emphasis in cards
          </Typography>
          <Typography variant="subtitle2">
            Subtitle 2 — Secondary emphasis
          </Typography>
          <Typography variant="body1">
            Body 1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Typography>
          <Typography variant="body2">
            Body 2 — Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </Typography>
          <Typography variant="caption" display="block">
            Caption — Small helper text
          </Typography>
          <Typography variant="overline" display="block">
            Overline — Category Label
          </Typography>
        </Stack>
      </Section>
    </Box>
  );
}
