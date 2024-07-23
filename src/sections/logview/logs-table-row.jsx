import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fDate } from 'src/utils/format-time';
import { formatName } from 'src/utils/format-Name';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function UserTableRow({
  name,
  playbook_name,
  Createat,
  status,
  handleClick,
  variable,
}) {
  return (
    <TableRow hover tabIndex={-1} onClick={handleClick}>
      <TableCell>{formatName(playbook_name)}</TableCell>
      <TableCell>{name || 'No Name'}</TableCell>
      <TableCell>{fDate(Createat)}</TableCell>
      <TableCell>{ variable }</TableCell>
      <TableCell>
        <Label color={(status.toLowerCase() === 'failed') ? 'error' : 'success'}>
          {status}
        </Label>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  playbook_name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  Createat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  status: PropTypes.string.isRequired,
  variable: PropTypes.string.isRequired,
};
