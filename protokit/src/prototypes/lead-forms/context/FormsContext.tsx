import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from 'react';
import type { LeadForm, FormField, Lead, LeadStatus } from '../types';
import { mockForms, mockLeads } from '../data/mock-data';

// ── State ──────────────────────────────────────────────

interface FormsState {
  forms: LeadForm[];
  leads: Lead[];
}

const initialState: FormsState = {
  forms: mockForms,
  leads: mockLeads,
};

// ── Actions ────────────────────────────────────────────

type FormsAction =
  | { type: 'ADD_FORM'; payload: LeadForm }
  | { type: 'UPDATE_FORM'; payload: { id: string; changes: Partial<LeadForm> } }
  | { type: 'DELETE_FORM'; payload: string }
  | { type: 'ADD_FIELD'; payload: { formId: string; field: FormField } }
  | {
      type: 'UPDATE_FIELD';
      payload: { formId: string; fieldId: string; changes: Partial<FormField> };
    }
  | { type: 'DELETE_FIELD'; payload: { formId: string; fieldId: string } }
  | {
      type: 'REORDER_FIELDS';
      payload: { formId: string; fieldIds: string[] };
    }
  | { type: 'ADD_LEAD'; payload: Lead }
  | {
      type: 'UPDATE_LEAD_STATUS';
      payload: { leadId: string; status: LeadStatus };
    }
  | {
      type: 'ADD_LEAD_COMMENT';
      payload: { leadId: string; comment: { id: string; text: string; createdAt: string } };
    }
  | { type: 'DELETE_LEAD'; payload: string };

// ── Reducer ────────────────────────────────────────────

function formsReducer(state: FormsState, action: FormsAction): FormsState {
  switch (action.type) {
    case 'ADD_FORM':
      return { ...state, forms: [...state.forms, action.payload] };

    case 'UPDATE_FORM':
      return {
        ...state,
        forms: state.forms.map((f) =>
          f.id === action.payload.id ? { ...f, ...action.payload.changes } : f,
        ),
      };

    case 'DELETE_FORM':
      return {
        ...state,
        forms: state.forms.filter((f) => f.id !== action.payload),
        leads: state.leads.filter((l) => l.formId !== action.payload),
      };

    case 'ADD_FIELD':
      return {
        ...state,
        forms: state.forms.map((f) =>
          f.id === action.payload.formId
            ? { ...f, fields: [...f.fields, action.payload.field] }
            : f,
        ),
      };

    case 'UPDATE_FIELD':
      return {
        ...state,
        forms: state.forms.map((f) =>
          f.id === action.payload.formId
            ? {
                ...f,
                fields: f.fields.map((field) =>
                  field.id === action.payload.fieldId
                    ? { ...field, ...action.payload.changes }
                    : field,
                ),
              }
            : f,
        ),
      };

    case 'DELETE_FIELD':
      return {
        ...state,
        forms: state.forms.map((f) =>
          f.id === action.payload.formId
            ? {
                ...f,
                fields: f.fields.filter(
                  (field) => field.id !== action.payload.fieldId,
                ),
              }
            : f,
        ),
      };

    case 'REORDER_FIELDS':
      return {
        ...state,
        forms: state.forms.map((f) => {
          if (f.id !== action.payload.formId) return f;
          const fieldMap = new Map(f.fields.map((field) => [field.id, field]));
          const reordered = action.payload.fieldIds
            .map((id) => fieldMap.get(id))
            .filter((field): field is FormField => field !== undefined);
          return { ...f, fields: reordered };
        }),
      };

    case 'ADD_LEAD':
      return {
        ...state,
        leads: [...state.leads, action.payload],
        forms: state.forms.map((f) =>
          f.id === action.payload.formId
            ? { ...f, leadsCount: f.leadsCount + 1 }
            : f,
        ),
      };

    case 'UPDATE_LEAD_STATUS':
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.payload.leadId
            ? { ...l, status: action.payload.status }
            : l,
        ),
      };

    case 'ADD_LEAD_COMMENT':
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.payload.leadId
            ? { ...l, comments: [...l.comments, action.payload.comment] }
            : l,
        ),
      };

    case 'DELETE_LEAD':
      return {
        ...state,
        leads: state.leads.filter((l) => l.id !== action.payload),
      };

    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────

interface FormsContextValue {
  state: FormsState;
  dispatch: React.Dispatch<FormsAction>;
}

const FormsContext = createContext<FormsContextValue | null>(null);

// ── Provider ───────────────────────────────────────────

export function FormsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formsReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
  );
}

// ── Hooks ──────────────────────────────────────────────

export function useFormsContext() {
  const ctx = useContext(FormsContext);
  if (!ctx) {
    throw new Error('useFormsContext must be used within FormsProvider');
  }
  return ctx;
}

export function useForm(id: string) {
  const { state } = useFormsContext();
  return useMemo(() => state.forms.find((f) => f.id === id), [state.forms, id]);
}

export function useLeads(formId: string) {
  const { state } = useFormsContext();
  return useMemo(
    () => state.leads.filter((l) => l.formId === formId),
    [state.leads, formId],
  );
}
