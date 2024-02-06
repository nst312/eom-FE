import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import TableHead from '@mui/material/TableHead';

const rows = [{
    id: 'displayName',
    align: 'left',
    disablePadding: false,
    label: 'Employee Name',
    sort: true,
},

    {
        id: 'type',
        align: 'left',
        disablePadding: false,
        label: 'Leave Type',
        sort: true,
    },
    {
        id: 'from',
        align: 'left',
        disablePadding: false,
        label: 'From',
        sort: true,
    },
    {
        id: 'to',
        align: 'left',
        disablePadding: false,
        label: 'To',
        sort: true,
    },

    {
        id: 'durationCount',
        align: 'center',
        disablePadding: false,
        label: 'Duration',
        sort: true,
    },
    {
        id: 'description',
        align: 'left',
        disablePadding: false,
        label: 'Description',
        sort: true,
    },
    {
        id: 'status',
        align: 'center',
        disablePadding: false,
        label: 'Status',
        sort: true,
    },
];

function AdminLeaveTableHead(props) {

    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className="h-48 sm:h-64">

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

export default AdminLeaveTableHead;
