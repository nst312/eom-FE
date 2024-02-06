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
import TableHead from '@mui/material/TableHead';

import { useState } from 'react';
import { Box } from '@mui/system';
import { setAllInvoiceData } from '../store/invoicesSlice';
import { useDispatch } from 'react-redux';

const rows = [
  {
    id: 'invoiceNumberPrefix',
    align: 'left',
    disablePadding: false,
    label: 'invoice Number',
    sort: true,
  },
  {
    id: 'client_name',
    align: 'left',
    disablePadding: false,
    label: 'client name',
    sort: false,
  },
  {
    id: 'work_email',
    align: 'left',
    disablePadding: false,
    label: 'work email',
    sort: false,
  },
  {
    id: 'grandTotal',
    align: 'left',
    disablePadding: false,
    label: 'Grand Total',
    sort: true,
  },
  {
    id: 'invoiceDate',
    align: 'left',
    disablePadding: false,
    label: 'Invoice Date',
    sort: true,
  },
  {
    id: 'dueDate',
    align: 'left',
    disablePadding: false,
    label: 'Due Date',
    sort: true,
  },
  {
    id: 'discountAmount',
    align: 'left',
    disablePadding: false,
    label: 'Discount Amount',
    sort: true,
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
    sort: true,
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    label: 'Action',
    sort: true,
  },
];

function InvoiceTableHeader(props) {
  const { selectedInvoiceIds } = props;
  const numSelected = selectedInvoiceIds?.length;
  const [selectedInvoiceMenu, setSelectedInvoiceMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedInvoiceMenu(event) {
    setSelectedInvoiceMenu(event.currentTarget);
  }

  function closeSelectedInvoiceMenu() {
    setSelectedInvoiceMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64 capitalize">
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
              <IconButton aria-haspopup="true" size="large">
                <Icon
                  aria-owns={selectedInvoiceMenu ? 'selectedInvoiceMenu' : null}
                  aria-haspopup="true"
                  onClick={openSelectedInvoiceMenu}
                  size="large"
                >
                  more_horiz
                </Icon>
              </IconButton>
              <Menu
                id="selectedInvoiceMenu"
                anchorEl={selectedInvoiceMenu}
                open={Boolean(selectedInvoiceMenu)}
                onClose={closeSelectedInvoiceMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      props.onMenuItemClick();
                      closeSelectedInvoiceMenu();
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
              {/* {row.sort && ( */}
              <Tooltip
                title="Sort"
                placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  className="font-semibold"
                  active={props.order.id === row.id}
                  direction={props.order.direction}
                  onClick={row.sort ? createSortHandler(row.id) : null}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
              {/* )} */}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default InvoiceTableHeader;
