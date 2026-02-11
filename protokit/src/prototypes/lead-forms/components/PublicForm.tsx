import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormGroup,
  Checkbox,
  Button,
  Alert,
} from '@mui/material';
import type { LeadForm, FormField } from '../types';

interface PublicFormProps {
  form: LeadForm;
  onSubmit: (answers: Record<string, string | string[]>) => void;
}

interface FieldErrors {
  [fieldId: string]: boolean;
}

export default function PublicForm({ form, onSubmit }: PublicFormProps) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    let hasErrors = false;

    // Validate required fields
    form.fields.forEach((field) => {
      if (field.required) {
        const value = answers[field.id];
        const isEmpty = !value ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'string' && value.trim() === '');

        if (isEmpty) {
          newErrors[field.id] = true;
          hasErrors = true;
        }
      }
    });

    // Validate consent
    if (!consent) {
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = () => {
    setShowErrors(true);

    if (validateForm()) {
      onSubmit(answers);
      setSubmitted(true);
    }
  };

  const updateAnswer = (fieldId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: false }));
    }
  };

  const renderField = (field: FormField) => {
    const value = answers[field.id] || '';
    const hasError = showErrors && errors[field.id];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <TextField
            fullWidth
            label={field.label}
            type={field.type === 'email' ? 'email' : 'text'}
            value={value}
            onChange={(e) => updateAnswer(field.id, e.target.value)}
            helperText={field.description}
            required={field.required}
            error={hasError}
            placeholder={field.placeholder}
          />
        );

      case 'number':
        return (
          <TextField
            fullWidth
            label={field.label}
            type="number"
            value={value}
            onChange={(e) => updateAnswer(field.id, e.target.value)}
            helperText={field.description}
            required={field.required}
            error={hasError}
            placeholder={field.placeholder}
          />
        );

      case 'textarea':
        return (
          <TextField
            fullWidth
            label={field.label}
            multiline
            rows={3}
            value={value}
            onChange={(e) => updateAnswer(field.id, e.target.value)}
            helperText={field.description}
            required={field.required}
            error={hasError}
            placeholder={field.placeholder}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth required={field.required} error={hasError}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => updateAnswer(field.id, e.target.value)}
              label={field.label}
            >
              {field.options?.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
            {field.description && <FormHelperText>{field.description}</FormHelperText>}
          </FormControl>
        );

      case 'multi-select': {
        const multiValue = (answers[field.id] as string[]) || [];
        return (
          <FormControl fullWidth required={field.required} error={hasError}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              multiple
              value={multiValue}
              onChange={(e) => {
                const value = e.target.value;
                updateAnswer(field.id, typeof value === 'string' ? value.split(',') : value);
              }}
              label={field.label}
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {field.options?.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
            {field.description && <FormHelperText>{field.description}</FormHelperText>}
          </FormControl>
        );
      }

      case 'radio':
        return (
          <FormControl fullWidth required={field.required} error={hasError}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {field.label}
              {field.required && (
                <Typography component="span" color="error">
                  {' *'}
                </Typography>
              )}
            </Typography>
            <RadioGroup
              value={value}
              onChange={(e) => updateAnswer(field.id, e.target.value)}
            >
              {field.options?.map((opt) => (
                <FormControlLabel
                  key={opt}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
            {field.description && <FormHelperText>{field.description}</FormHelperText>}
          </FormControl>
        );

      case 'checkbox': {
        const checkboxValue = (answers[field.id] as string[]) || [];
        return (
          <FormControl fullWidth required={field.required} error={hasError}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {field.label}
              {field.required && (
                <Typography component="span" color="error">
                  {' *'}
                </Typography>
              )}
            </Typography>
            <FormGroup>
              {field.options?.map((opt) => (
                <FormControlLabel
                  key={opt}
                  control={
                    <Checkbox
                      checked={checkboxValue.includes(opt)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateAnswer(field.id, [...checkboxValue, opt]);
                        } else {
                          updateAnswer(
                            field.id,
                            checkboxValue.filter((v) => v !== opt)
                          );
                        }
                      }}
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
            {field.description && <FormHelperText>{field.description}</FormHelperText>}
          </FormControl>
        );
      }

      case 'date':
        return (
          <TextField
            fullWidth
            label={field.label}
            type="date"
            value={value}
            onChange={(e) => updateAnswer(field.id, e.target.value)}
            helperText={field.description}
            required={field.required}
            error={hasError}
            InputLabelProps={{ shrink: true }}
          />
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <Box sx={{ maxWidth: 560, mx: 'auto', px: 2 }}>
        <Card>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}assets/mts-logo.svg`}
              alt="МТС"
              sx={{ width: 40, height: 40, mb: 3, objectFit: 'contain' }}
            />
            <Alert severity="success" sx={{ justifyContent: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {form.successMessage}
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto', px: 2 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          {/* MTS Logo */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}assets/mts-logo.svg`}
              alt="МТС"
              sx={{ width: 40, height: 40, objectFit: 'contain' }}
            />
          </Box>

          {/* Form Title */}
          <Typography variant="h5" component="h1" gutterBottom align="center">
            {form.name}
          </Typography>

          {/* Form Description */}
          {form.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              {form.description}
            </Typography>
          )}

          {/* Form Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
            {form.fields.map((field) => (
              <Box key={field.id}>{renderField(field)}</Box>
            ))}

            {/* Consent Checkbox */}
            <FormControl error={showErrors && !consent}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                }
                label="Я согласен на обработку персональных данных"
              />
              {showErrors && !consent && (
                <FormHelperText error>Необходимо согласие на обработку данных</FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmit}
              sx={{
                mt: 2,
                bgcolor: form.buttonColor,
                '&:hover': {
                  bgcolor: form.buttonColor,
                  opacity: 0.9,
                },
              }}
            >
              {form.buttonText}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
