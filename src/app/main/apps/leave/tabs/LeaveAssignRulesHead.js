import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '@mui/system';
import TableHead from '@mui/material/TableHead';
import FormControl from "@mui/material/FormControl";
import {Controller, useForm} from "react-hook-form";
import {FormControlLabel} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import Button from "@mui/material/Button";
import {addAssignRules} from "../store/LeaveAssignRulesSlice";

const rows = [
    {
        id: 'employeeName',
        align: 'left',
        disablePadding: false,
        label: 'Employee Name',
        sort: true,
    },
    {
        id: 'department',
        align: 'left',
        disablePadding: false,
        label: 'Department',
        sort: true,
    },
    {
        id: 'manager',
        align: 'left',
        disablePadding: false,
        label: 'Manager',
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
        id: 'rulesApplied',
        align: 'left',
        disablePadding: false,
        label: 'Rules Applied',
        sort: true,
    },

];

const defaultValues = {
};

const schema = yup.object().shape({
});


function LeaveAssignRulesHead(props) {
    const { selectedOrderIds, leaveRules, assignRules, getAssignRuleFunction,setSelectedCheck } = props;
    const user = useSelector(({auth})=> auth.user)
    const numSelected = selectedOrderIds?.length;
    const assignUsers = useSelector(({ leavesApp }) => leavesApp.leaveRules.leaveData)
    const [selected, setSelected] = useState([]);
    const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);
    const [open,setOpen] = useState(false);

    const dispatch = useDispatch();

    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
    };

    function openSelectedOrdersMenu(event) {
        setSelectedOrdersMenu(event.currentTarget);
    }

    function closeSelectedOrdersMenu() {
        setSelectedOrdersMenu(null);
        setSelectedCheck([])
        setSelected([])
    }

    const {handleSubmit, formState, reset, control, getValues} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const {isValid, dirtyFields, errors} = formState;

    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    }


    const onSubmit = () => {
        const assignData = {
            employeeId: selectedOrderIds,
            leave_rulesId: selected,
        }
        dispatch(addAssignRules(assignData)).then((res) => {
            getAssignRuleFunction(user.company_id)
            setOpen(false)
        });
        closeSelectedOrdersMenu()
    };

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
                                aria-owns={selectedOrdersMenu ? 'selectedOrdersMenu' : null}
                                aria-haspopup="true"
                                onClick={openSelectedOrdersMenu}
                                size="large"
                            >
                                <Icon>more_horiz</Icon>
                            </IconButton>
                            <Menu
                                id="selectedOrdersMenu"
                                anchorEl={selectedOrdersMenu}
                                open={Boolean(selectedOrdersMenu)}
                                onClose={closeSelectedOrdersMenu}
                            >
                                <MenuList>
                                    <MenuItem>
                                       <div>
                                           {
                                               assignUsers?.map((column, index) => {
                                                   const isSelected = selected.indexOf(column.id) !== -1;
                                                   return(
                                                       <div>
                                                       <FormControl>
                                                       <Controller
                                                           name="name"
                                                           type="checkbox"
                                                           control={control}
                                                           defaultValue={false}
                                                           label="negativeLeavesAllowed"
                                                           render={({field: {onChange, value}}) => (
                                                               <FormControlLabel name="weekendsBetweenLeave" control={
                                                                   <Checkbox
                                                                   checked={isSelected}
                                                                   onChange={(event) => handleCheck(event, column.id)}
                                                                   />
                                                               } label={`${column.name}`}
                                                               />
                                                           )}
                                                       />
                                                   </FormControl>
                                                       </div>
                                                   )
                                               })
                                           }
                                           <br/>
                                       </div>
                                    </MenuItem>
                                    <div className="flex justify-end">
                                    <Button
                                        variant="contained"
                                        onClick={() => onSubmit()}
                                        open={open}
                                    >
                                        Add
                                    </Button>
                                    </div>
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

export default LeaveAssignRulesHead;
