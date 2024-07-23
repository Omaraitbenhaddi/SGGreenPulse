import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import {
  Card, Stack, Table, Alert, Container, TableBody, Typography,
  TableContainer, TablePagination
} from '@mui/material';

import { fetchLog } from 'src/api/playbook';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../logs-table-row';
import UserTableHead from '../logs-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../logs-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

const headLabel = [
  { id: 'playbook_name', label: 'Services' },
  { id: 'name', label: 'Nom' },
  { id: 'Createat', label: 'Créé le' },
  { id: 'argument', label: 'Argument' },
  { id: 'status', label: 'Statut' },
];

export default function LogPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [log, setlog] = useState([]);
  const [longeur, setlongeur] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [error, setError ] = useState(null)

  const fetchLogsCall = useCallback(async (id) => {
    fetchLog(id ,setlongeur,setlog,setError)
    
  },[]) 


  useEffect(() => {
    fetchLogsCall(page);
  }, [fetchLogsCall, page]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = log.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (row) => {
    console.log(row);
    if (!row.user.username) {
      console.log('Element without name clicked');
    }
    navigate('/logs', { state: { playbook_name: row.playbook_name , created_at: row.created_at } });
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: log,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
                          {error && (
                        <Alert severity="error">
                        {error}
                        </Alert>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Playbook Log</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={longeur}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={headLabel}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      playbook_name={row.playbook_name}
                      name={row.user.username}
                      Createat={row.created_at}
                      status={row.statut}
                      variable={row.variable}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={() => handleClick(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, longeur )}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={longeur}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
