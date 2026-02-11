import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import DragIndicator from '@mui/icons-material/DragIndicator';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { FormField } from '../../types';

interface FormCanvasProps {
  fields: FormField[];
  selectedFieldId: string | null;
  onSelectField: (id: string) => void;
  onReorder: (fieldIds: string[]) => void;
  onDeleteField: (fieldId: string) => void;
}

interface SortableFieldProps {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

function SortableField({ field, isSelected, onSelect, onDelete }: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      elevation={isSelected ? 2 : 1}
      onClick={onSelect}
      sx={{
        p: 2,
        mb: 2,
        cursor: 'pointer',
        border: '2px solid',
        borderColor: isSelected ? 'primary.main' : 'transparent',
        position: 'relative',
        '&:hover .delete-button': {
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 1,
        }}
      >
        <Box {...attributes} {...listeners} sx={{ cursor: 'grab', display: 'flex' }}>
          <DragIndicator fontSize="small" color="action" />
        </Box>
        <Typography variant="subtitle2" sx={{ flex: 1 }}>
          {field.label}
          {field.required && (
            <Typography component="span" color="error" sx={{ ml: 0.5 }}>
              *
            </Typography>
          )}
        </Typography>
        <IconButton
          size="small"
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{
            opacity: 0,
            transition: 'opacity 0.2s',
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Box>

      <Box onClick={(e) => e.stopPropagation()}>
        <FieldPreview field={field} />
      </Box>
    </Paper>
  );
}

function FieldPreview({ field }: { field: FormField }) {
  const label = field.placeholder || '';

  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
    case 'number':
      return (
        <TextField
          fullWidth
          size="small"
          placeholder={label}
          type={field.type === 'number' ? 'number' : 'text'}
          disabled
        />
      );

    case 'textarea':
      return (
        <TextField
          fullWidth
          size="small"
          placeholder={label}
          multiline
          rows={3}
          disabled
        />
      );

    case 'select':
      return (
        <TextField
          fullWidth
          size="small"
          select
          placeholder={label}
          value=""
          disabled
        >
          {(field.options || ['Вариант 1', 'Вариант 2']).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      );

    case 'multi-select':
      return (
        <FormControl fullWidth size="small" disabled>
          <TextField
            fullWidth
            size="small"
            select
            SelectProps={{ multiple: true }}
            value={[]}
            placeholder={label}
            disabled
          >
            {(field.options || ['Вариант 1', 'Вариант 2']).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      );

    case 'radio':
      return (
        <FormControl disabled>
          <RadioGroup>
            {(field.options || ['Вариант 1', 'Вариант 2']).map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio size="small" />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );

    case 'checkbox':
      return (
        <FormGroup>
          {(field.options || ['Вариант 1', 'Вариант 2']).map((option) => (
            <FormControlLabel
              key={option}
              control={<Checkbox size="small" disabled />}
              label={option}
            />
          ))}
        </FormGroup>
      );

    case 'date':
      return (
        <TextField
          fullWidth
          size="small"
          type="date"
          disabled
          InputLabelProps={{ shrink: true }}
        />
      );

    default:
      return null;
  }
}

export default function FormCanvas({
  fields,
  selectedFieldId,
  onSelectField,
  onReorder,
  onDeleteField,
}: FormCanvasProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      const newOrder = arrayMove(fields, oldIndex, newIndex).map((f) => f.id);
      onReorder(newOrder);
    }
  };

  if (fields.length === 0) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Добавьте поля из библиотеки слева
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field) => (
            <SortableField
              key={field.id}
              field={field}
              isSelected={selectedFieldId === field.id}
              onSelect={() => onSelectField(field.id)}
              onDelete={() => onDeleteField(field.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  );
}
