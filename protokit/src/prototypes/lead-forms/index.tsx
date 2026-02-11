import { Routes, Route } from 'react-router-dom';
import LeadFormsLayout from './components/LeadFormsLayout';
import FormListPage from './pages/FormListPage';
import FormBuilderPage from './pages/FormBuilderPage';
import FormLeadsPage from './pages/FormLeadsPage';
import FormPreviewPage from './pages/FormPreviewPage';

export default function LeadForms() {
  return (
    <Routes>
      <Route element={<LeadFormsLayout />}>
        <Route index element={<FormListPage />} />
        <Route path="new" element={<FormBuilderPage />} />
        <Route path=":id/edit" element={<FormBuilderPage />} />
        <Route path=":id/leads" element={<FormLeadsPage />} />
        <Route path=":id/preview" element={<FormPreviewPage />} />
      </Route>
    </Routes>
  );
}
