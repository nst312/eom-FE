import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { addAssignAttendanceRules, getAssignRules } from '../store/attendanceShiftAssign';

const rows = [
  // {
  //   id: 'employeeName',
  //   align: 'left',
  //   disablePadding: false,
  //   label: '',
  //   sort: true,
  // },
  // {
  //   id: 'employeeName',
  //   align: 'left',
  //   disablePadding: false,
  //   label: '',
  //   sort: true,
  // },
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

const defaultValues = {};

const schema = yup.object().shape({});

function AttendanceShiftRulesHead(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const { selectedOrderIds, assignRules, getAssignRuleFunction, setSelectedCheck } = props;
  const getAttendanceData = useSelector(
    ({ attendanceApp }) => attendanceApp.attendanceShiftData.attendanceShiftAllData
  );
  const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);
  const [selected, setSelected] = useState([]);
  const [openRules, setOpenRules] = useState(false);
  const [open, setOpen] = useState(false);
  const numSelected = selectedOrderIds?.length;

  function openSelectedOrdersMenu(event) {
    setSelectedOrdersMenu(event.currentTarget);
  }

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function closeSelectedOrdersMenu() {
    setSelectedOrdersMenu(null);
    setSelectedCheck([]);
    setSelected([]);
  }

  const { handleSubmit, formState, reset, control, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

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
      employee_id: selectedOrderIds,
      attendance_id: selected,
    };
    dispatch(addAssignAttendanceRules(assignData)).then((res) => {
      dispatch(getAssignRules({ page: 1, perPage: 10, id: user.company_id }));
      setOpen(false);
    });
    closeSelectedOrdersMenu();
  };

  return (
    <>
      <TableHead>
        <TableRow className="h-48 sm:h-64">
          <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
            <Box
              style={{
                width: '175px',
              }}
              sx={{
                background: (theme) => theme.palette.background.paper,
              }}
            >
              <div className="flex">
                <IconButton
                  className="mr-10 bg-red"
                  aria-owns={selectedOrdersMenu ? 'selectedOrdersMenu' : null}
                  aria-haspopup="true"
                  onClick={openSelectedOrdersMenu}
                >
                  <Icon>more_horiz</Icon>
                </IconButton>
                <span>
                  <Typography className="mt-6 text-base font-medium">Assign Rules</Typography>
                </span>
              </div>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < props.rowCount}
                checked={props.rowCount !== 0 && numSelected === props.rowCount}
                onChange={props.onSelectAllClick}
              />
              <Menu
                id="selectedOrdersMenu"
                anchorEl={selectedOrdersMenu}
                open={Boolean(selectedOrdersMenu)}
                onClose={closeSelectedOrdersMenu}
              >
                {selectedOrderIds.length > 0 ? (
                  <MenuList>
                    <AppBar position="static" elevation={0}>
                      <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                          Rules Name
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <MenuItem>
                      <div>
                        {getAttendanceData?.map((column, index) => {
                          const isSelected = selected.indexOf(column.id) !== -1;
                          return (
                            <div>
                              <FormControl>
                                <Controller
                                  name="name"
                                  type="checkbox"
                                  control={control}
                                  defaultValue={false}
                                  label="negativeLeavesAllowed"
                                  render={({ field: { onChange, value } }) => (
                                    <FormControlLabel
                                      name="weekendsBetweenLeave"
                                      control={
                                        <Checkbox
                                          checked={isSelected}
                                          onChange={(event) => handleCheck(event, column.id)}
                                        />
                                      }
                                      label={`${column.ruleName}`}
                                    />
                                  )}
                                />
                              </FormControl>
                            </div>
                          );
                        })}
                        <br />
                      </div>
                    </MenuItem>
                    <div className="flex justify-end">
                      <Button variant="contained" onClick={() => onSubmit()} open={open}>
                        Assign
                      </Button>
                    </div>
                  </MenuList>
                ) : (
                  <Card className="rounded-none">
                    <CardContent className="flex justify-between">
                      <Typography
                        sx={{ fontSize: 18 }}
                        className="gap-10"
                        variant="h5"
                        gutterBottom
                      >
                        please Select at least One Employee
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Menu>
            </Box>
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
    </>
  );
}
export default AttendanceShiftRulesHead;
