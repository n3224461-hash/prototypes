export type FieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'phone'
  | 'number'
  | 'select'
  | 'multi-select'
  | 'radio'
  | 'checkbox'
  | 'date';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  options?: string[]; // For select, multi-select, radio, checkbox
}

export type FormStatus = 'draft' | 'active' | 'inactive';

export interface LeadForm {
  id: string;
  name: string;
  description?: string;
  status: FormStatus;
  fields: FormField[];
  buttonColor: string;
  buttonText: string;
  successMessage: string;
  notificationEmail?: string;
  createdAt: string;
  updatedAt: string;
  leadsCount: number;
  calledPercent: number;
  url?: string;
}

export type LeadStatus = 'new' | 'viewed' | 'called';

export interface LeadComment {
  id: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  formId: string;
  status: LeadStatus;
  answers: Record<string, string | string[]>;
  createdAt: string;
  comments: LeadComment[];
}
