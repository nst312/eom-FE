import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';

const rows = [
    {
        id: 'sr_no',
        align: 'left',
        disablePadding: false,
        label: 'Sr no',
        sort: true,
    },
    {
        id: 'JobPosition',
        align: 'left',
        disablePadding: false,
        label: 'Job Position',
        sort: true,
    },
    {
        id: 'department_name',
        align: 'left',
        disablePadding: false,
        label: 'Department',
        sort: true,
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Action',
        sort: true,
    },
];

function JobPositionTableHead(props) {
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

export default JobPositionTableHead;
