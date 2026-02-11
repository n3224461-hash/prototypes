import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { Lead, LeadStatus } from '../../types';

const statusConfig: Record<LeadStatus, { label: string; color: 'default' | 'primary' | 'success' }> = {
  new: { label: 'Новый', color: 'default' },
  viewed: { label: 'Просмотрен', color: 'primary' },
  called: { label: 'Обзвонен', color: 'success' },
};

interface LeadsTableProps {
  leads: Lead[];
  selectedLeadId: string | null;
  onSelectLead: (id: string) => void;
}

const formatDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function LeadsTable({ leads, selectedLeadId, onSelectLead }: LeadsTableProps) {
  const getLeadName = (lead: Lead) => {
    // Try to find name in answers
    const nameKey = Object.keys(lead.answers).find(key => 
      key.includes('name') || key.includes('имя')
    );
    return nameKey ? String(lead.answers[nameKey]) : '—';
  };

  const getLeadContact = (lead: Lead) => {
    // Try phone first, then email
    const phoneKey = Object.keys(lead.answers).find(key => 
      key.includes('phone') || key.includes('телефон')
    );
    const emailKey = Object.keys(lead.answers).find(key => 
      key.includes('email') || key.includes('почта')
    );
    return phoneKey ? String(lead.answers[phoneKey]) : 
           emailKey ? String(lead.answers[emailKey]) : '—';
  };

  const getLeadPreview = (lead: Lead) => {
    // Try to find a message/comment field
    const messageKey = Object.keys(lead.answers).find(key => 
      key.includes('message') || key.includes('comment') || 
      key.includes('сообщение') || key.includes('комментарий')
    );
    if (!messageKey) return null;
    const message = String(lead.answers[messageKey]);
    return message.length > 50 ? message.slice(0, 50) + '...' : message;
  };

  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" sx={{ width: 40 }}>
              <Checkbox size="small" />
            </TableCell>
            <TableCell sx={{ width: 140 }}>Дата</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Контакт</TableCell>
            <TableCell sx={{ width: 120 }}>Статус</TableCell>
            <TableCell>Превью</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                <Typography color="text.secondary">
                  Нет лидов по выбранным фильтрам
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow
                key={lead.id}
                hover
                selected={lead.id === selectedLeadId}
                onClick={() => onSelectLead(lead.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell padding="checkbox">
                  <Checkbox 
                    size="small" 
                    checked={lead.id === selectedLeadId}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDateTime(lead.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {getLeadName(lead)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {getLeadContact(lead)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusConfig[lead.status].label}
                    color={statusConfig[lead.status].color}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {getLeadPreview(lead) || '—'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
