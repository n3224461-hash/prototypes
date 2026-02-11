import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useFormsContext, useForm } from '../context/FormsContext';
import BuilderToolbar from '../components/builder/BuilderToolbar';
import FieldLibrary from '../components/builder/FieldLibrary';
import FormCanvas from '../components/builder/FormCanvas';
import FieldProperties from '../components/builder/FieldProperties';
import FormSettings from '../components/builder/FormSettings';
import PublishDialog from '../components/PublishDialog';
import type { FormField, FieldType, LeadForm } from '../types';

export default function FormBuilderPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { dispatch } = useFormsContext();
  const existingForm = useForm(id || '');

  const isNew = !id;
  const [form, setForm] = useState<LeadForm>(() => {
    if (existingForm) return existingForm;
    // Create new form
    return {
      id: crypto.randomUUID(),
      name: 'Новая форма',
      status: 'draft',
      fields: [],
      buttonColor: '#FF0032',
      buttonText: 'Отправить',
      successMessage: 'Спасибо! Мы скоро свяжемся с вами.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      leadsCount: 0,
      calledPercent: 0,
    };
  });

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedField = useMemo(
    () => form.fields.find((f) => f.id === selectedFieldId) || null,
    [form.fields, selectedFieldId]
  );

  // Auto-save simulation
  useEffect(() => {
    // Set saving state in a microtask to avoid cascading renders
    Promise.resolve().then(() => setSaving(true));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (isNew) {
        dispatch({ type: 'ADD_FORM', payload: form });
      } else {
        dispatch({
          type: 'UPDATE_FORM',
          payload: { id: form.id, changes: form },
        });
      }
      setSaving(false);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [form, isNew, dispatch]);

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleAddField = (type: FieldType) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: getDefaultLabel(type),
      required: false,
      ...(type === 'select' ||
      type === 'multi-select' ||
      type === 'radio' ||
      type === 'checkbox'
        ? { options: ['Вариант 1', 'Вариант 2'] }
        : {}),
    };
    setForm((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
      updatedAt: new Date().toISOString(),
    }));
    setSelectedFieldId(newField.id);
  };

  const handleUpdateField = (changes: Partial<FormField>) => {
    if (!selectedFieldId) return;
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((f) =>
        f.id === selectedFieldId ? { ...f, ...changes } : f
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleDeleteField = (fieldId: string) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== fieldId),
      updatedAt: new Date().toISOString(),
    }));
    if (selectedFieldId === fieldId) setSelectedFieldId(null);
  };

  const handleReorderFields = (fieldIds: string[]) => {
    const fieldMap = new Map(form.fields.map((f) => [f.id, f]));
    const reordered = fieldIds
      .map((id) => fieldMap.get(id))
      .filter((f): f is FormField => f !== undefined);
    setForm((prev) => ({
      ...prev,
      fields: reordered,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handlePreview = () => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    window.open(`${baseUrl}/lead-forms/${form.id}/preview`, '_blank');
  };

  const handleOpenPublish = () => {
    setPublishDialogOpen(true);
  };

  const handleFormSettingsChange = (changes: Partial<LeadForm>) => {
    setForm((prev) => ({
      ...prev,
      ...changes,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handlePublish = () => {
    // Update form status to active and generate URL
    const updatedForm = {
      ...form,
      status: 'active' as const,
      url: `https://mts.ru/forms/${form.id}`,
      updatedAt: new Date().toISOString(),
    };
    setForm(updatedForm);
    dispatch({ type: 'UPDATE_FORM', payload: { id: form.id, changes: updatedForm } });
    setPublishDialogOpen(false);
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 52px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BuilderToolbar
        formName={form.name}
        onNameChange={handleNameChange}
        onPreview={handlePreview}
        onPublish={handleOpenPublish}
        onBack={() => navigate('/lead-forms')}
        saving={saving}
      />
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Field Library */}
        <Box
          sx={{
            width: 240,
            borderRight: '1px solid',
            borderColor: 'divider',
            overflow: 'auto',
          }}
        >
          <FieldLibrary onAddField={handleAddField} />
        </Box>

        {/* Center: Canvas */}
        <Box
          sx={{ flex: 1, p: 3, overflow: 'auto', bgcolor: 'grey.50' }}
        >
          <FormCanvas
            fields={form.fields}
            selectedFieldId={selectedFieldId}
            onSelectField={setSelectedFieldId}
            onReorder={handleReorderFields}
            onDeleteField={handleDeleteField}
          />
        </Box>

        {/* Right: Properties */}
        <Box
          sx={{
            width: 300,
            borderLeft: '1px solid',
            borderColor: 'divider',
            overflow: 'auto',
          }}
        >
          {selectedField ? (
            <FieldProperties field={selectedField} onChange={handleUpdateField} />
          ) : (
            <FormSettings form={form} onChange={handleFormSettingsChange} />
          )}
        </Box>
      </Box>

      <PublishDialog
        open={publishDialogOpen}
        onClose={() => setPublishDialogOpen(false)}
        form={form}
        onPublish={handlePublish}
      />
    </Box>
  );
}

function getDefaultLabel(type: FieldType): string {
  const labels: Record<FieldType, string> = {
    text: 'Текст',
    textarea: 'Текстовая область',
    email: 'Email',
    phone: 'Телефон',
    number: 'Число',
    select: 'Выпадающий список',
    'multi-select': 'Множественный выбор',
    radio: 'Радио-кнопки',
    checkbox: 'Чекбоксы',
    date: 'Дата',
  };
  return labels[type];
}
