import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import Snackbar from '@mui/material/Snackbar';
import { useFormsContext, useForm, useLeads } from '../context/FormsContext';
import LeadsFilters from '../components/leads/LeadsFilters';
import LeadsTable from '../components/leads/LeadsTable';
import LeadDrawer from '../components/leads/LeadDrawer';
import type { LeadStatus } from '../types';

export default function FormLeadsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useFormsContext();
  const form = useForm(id || '');
  const allLeads = useLeads(id || '');
  
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<'7' | '30' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [exportSnackbar, setExportSnackbar] = useState(false);
  
  const filteredLeads = useMemo(() => {
    return allLeads.filter(lead => {
      // Status filter
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
      
      // Date filter
      if (dateFilter !== 'all') {
        const days = parseInt(dateFilter);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        if (new Date(lead.createdAt) < cutoff) return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const answers = Object.values(lead.answers).join(' ').toLowerCase();
        return answers.includes(query);
      }
      
      return true;
    });
  }, [allLeads, statusFilter, dateFilter, searchQuery]);
  
  const selectedLead = useMemo(() => 
    allLeads.find(l => l.id === selectedLeadId) || null,
    [allLeads, selectedLeadId]
  );
  
  const handleExport = () => {
    // Simulate export
    setExportSnackbar(true);
  };
  
  const handleUpdateLeadStatus = (leadId: string, status: LeadStatus) => {
    dispatch({ type: 'UPDATE_LEAD_STATUS', payload: { leadId, status } });
  };
  
  const handleAddComment = (leadId: string, text: string) => {
    dispatch({
      type: 'ADD_LEAD_COMMENT',
      payload: {
        leadId,
        comment: {
          id: crypto.randomUUID(),
          text,
          createdAt: new Date().toISOString(),
        },
      },
    });
  };
  
  const handleDeleteLead = (leadId: string) => {
    if (confirm('Удалить лид?')) {
      dispatch({ type: 'DELETE_LEAD', payload: leadId });
      setSelectedLeadId(null);
    }
  };
  
  if (!form) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Форма не найдена</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/lead-forms')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">{form.name} — Лиды</Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Скачать Excel
        </Button>
      </Box>
      
      {/* Filters */}
      <LeadsFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Table */}
      <LeadsTable
        leads={filteredLeads}
        selectedLeadId={selectedLeadId}
        onSelectLead={setSelectedLeadId}
      />
      
      {/* Drawer */}
      <LeadDrawer
        lead={selectedLead}
        open={Boolean(selectedLeadId)}
        onClose={() => setSelectedLeadId(null)}
        form={form}
        onUpdateStatus={handleUpdateLeadStatus}
        onAddComment={handleAddComment}
        onDelete={handleDeleteLead}
      />
      
      {/* Export notification */}
      <Snackbar
        open={exportSnackbar}
        autoHideDuration={3000}
        onClose={() => setExportSnackbar(false)}
        message="Файл скачан"
      />
    </Box>
  );
}
