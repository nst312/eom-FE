import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CloseIcon from "@mui/icons-material/Close";
import FuseProgress from '../../Components/FuseProgress';
import LeaveAssignRulesHead from './LeaveAssignRulesHead';
import {deleteAssignRules, getAllLeaveAssignRules, getAssignRules} from "../store/LeaveAssignRulesSlice";
import withReducer from "../../../../store/withReducer";
import reducer from "../store";


function LeaveAssignRules(props) {
  const dispatch = useDispatch();
  const myUsers = useSelector(({ leavesApp }) => leavesApp.leaveAssignRules.users)
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const user = useSelector(({auth})=> auth.user)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [leaveRules, setLeaveRules] = useState([]);
  const [assignRules, setAssignRules] = useState({});
    console.log("assignRules",assignRules)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });


    useEffect(() => {
        dispatch(getAllLeaveAssignRules()).then((res) => {
            setLeaveRules(res.payload);
        });
    }, [dispatch]);

 function getAssignRuleFunction(id) {
    dispatch(getAssignRules(id)).then((res) => {
      setAssignRules(res.payload);
    });
  }

  const removeAssignLeave = (empId,leaveId) => {
    dispatch(deleteAssignRules({ empId, leaveId })).then((res) => {
      getAssignRuleFunction(user.company_id)
    });
  };



  useEffect(() => {
    getAssignRuleFunction(user.company_id)
  }, [dispatch]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(assignRules?.users.map((n) => n.employees.id));
      return;
    }
    setSelected([]);
  }



  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/apps/user/${item.id}`);
  }

  function handleCheck(event, id) {
    let selectedEmployee = []
    selectedEmployee.push(id)

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


  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseProgress />;
  }

  if (assignRules && assignRules.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There Are No Rules Find!
        </Typography>
      </motion.div>
    );
  }




  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <LeaveAssignRulesHead
            selectedOrderIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={assignRules && assignRules.length}
            onMenuItemClick={handleDeselect}
            leaveRules={leaveRules}
            assignRules={assignRules}
            getAssignRuleFunction={getAssignRuleFunction}
            setSelectedCheck={setSelected}
            // onDelete={deleteUsers}
          />

          <TableBody>
            {_.orderBy(
                myUsers,
              [
                (o) => {
                  switch (order.id) {
                    case 'id': {
                      return parseInt(o.id, 10);
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n?.employees?.id) !== -1;
                return (
                  <TableRow
                    className="h-72"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    // onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n?.employees?.id)}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16 " component="th" scope="row">
                      {n.firstName}
                    </TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">
                      {n.employees?.jobPosition?.company_department?.department_name}
                    </TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">
                      {n.employees?.employeeData[0]?.managerBy?.users?.firstName}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.employees?.employeeData && n.employees?.empType}
                    </TableCell>
                    <TableCell>
                      {n?.employees?.aasignLeaveRule?.map((item) => {
                        return(
                            <>
                      <div className=" pr-46 p-5 inline-flex  items-center border-1 rounded-[500px] mr-10">
                        <Typography className="mx-12"> {item.leave_rules?.name} </Typography>
                        <CloseIcon cursor="pointer" onClick={() => removeAssignLeave(n?.employees?.id, item.leave_rules?.id)} />
                      </div>
                            </>
                        )})}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </div>
  );
}

export default withReducer('leavesAssignRules', reducer)(LeaveAssignRules);
