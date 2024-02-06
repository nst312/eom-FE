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
        id: 'createdAt',
        align: 'left',
        disablePadding: false,
        label: 'Created At',
        sort: true,
    },
    {
        id: 'basic',
        align: 'left',
        disablePadding: false,
        label: 'Basic',
        sort: true,
    },
    {
        id: 'hra',
        align: 'left',
        disablePadding: false,
        label: 'HRA',
        sort: true,
    },
    {
        id: 'specialAllowance',
        align: 'left',
        disablePadding: false,
        label: 'Special',
        sort: true,
    },
    {
        id: 'conveyance',
        align: 'left',
        disablePadding: false,
        label: 'Conveyance',
        sort: true,
    },
    {
        id: 'medical',
        align: 'left',
        disablePadding: false,
        label: 'Medical',
        sort: true,
    },
    {
        id: 'professionalTax',
        align: 'left',
        disablePadding: false,
        label: 'Professional Tax',
        sort: true,
    },
    {
        id: 'tds',
        align: 'left',
        disablePadding: false,
        label: 'TDS',
        sort: true,
    },
    {
        id: 'total',
        align: 'left',
        disablePadding: false,
        label: 'Total',
        sort: true,
    },
    {
        id: 'download',
        align: 'left',
        disablePadding: false,
        label: 'Download',
        sort: true,
    },

];

function SalaryHistoryTableHead(props) {
    const { selectedEmployeeSalaryIds } = props;
    const numSelected = selectedEmployeeSalaryIds?.length;
    const [selectedEmployeeMenu, setSelectedEmployeeMenu] = useState(null);

    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
    };

    function openSelectedEmployeeMenu(event) {
        setSelectedEmployeeMenu(event.currentTarget);
    }

    function closeSelectedEmployeeMenu() {
        setSelectedEmployeeMenu(null);
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
                                aria-owns={selectedEmployeeMenu ? 'selectedEmployeeMenu' : null}
                                aria-haspopup="true"
                                onClick={openSelectedEmployeeMenu}
                                size="large"
                            >
                                <Icon>more_horiz</Icon>
                            </IconButton>
                            <Menu
                                id="selectedEmployeeMenu"
                                anchorEl={selectedEmployeeMenu}
                                open={Boolean(selectedEmployeeMenu)}
                                onClose={selectedEmployeeMenu}
                            >
                                <MenuList>
                                    <MenuItem
                                        onClick={() => {
                                            props.onMenuItemClick();
                                            closeSelectedEmployeeMenu();
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

export default SalaryHistoryTableHead;
