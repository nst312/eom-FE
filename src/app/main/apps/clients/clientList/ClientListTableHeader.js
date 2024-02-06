import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';

const rows = [
  {
    id: 'image',
    align: 'left',
    disablePadding: false,
    label: '',
    sort: true,
  },

  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Type',
    sort: true,
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name',
    sort: true,
  },
  {
    id: 'contact_number',
    align: 'left',
    disablePadding: false,
    label: 'Contact',
    sort: true,
  },
  {
    id: 'work_email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
    sort: true,
  },
  {
    id: 'website',
    align: 'left',
    disablePadding: false,
    label: 'Website',
    sort: true,
  },
];

function ClientListTableHead(props) {
  const { selectedEmployeeIds } = props;
  const numSelected = selectedEmployeeIds?.length;
  const [selectedClientMenu, setSelectedClientMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedClientMenu(event) {
    setSelectedClientMenu(event.currentTarget);
  }

  function closeSelectedClientMenu() {
    setSelectedClientMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.paper,
              }}
            >
              <IconButton
                aria-owns={selectedClientMenu ? 'selectedClientMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedClientMenu}
                size="large"
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedClientMenu"
                anchorEl={selectedClientMenu}
                open={Boolean(selectedClientMenu)}
                onClose={closeSelectedClientMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      props.onDelete();
                      closeSelectedClientMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default ClientListTableHead;
