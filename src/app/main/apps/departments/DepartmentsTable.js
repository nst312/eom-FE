import FuseScrollbars from "@fuse/core/FuseScrollbars";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Edit } from "@mui/icons-material";
import { Box, CircularProgress, Fade } from "@mui/material";
import { debounce } from "lodash";
import {
  getAllDepartments,
  getDepartmentById,
  openEditDepartmentDialog,
  removeDepartments,
} from "./store/DepartmentsSlice";
import DepartmentTableHead from "./DepartmentsTableHead";
import FuseProgress from "../Components/FuseProgress";

function DepartmentsTable(props) {
  console.log(props);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [departmentDetails, setDepartmentDetails] = useState([]);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllDepartmentsDetails = () => {
    dispatch(getAllDepartments({ page: 1, perPage: 10 })).then((res1) => {
      props.setDepartmentDetails(res1.payload);
      props.setLoadingMore(false);
      props.setLoading(false);
      props.setAtEnd(true);
    });
  };

  const onDeleteDepartment = (id) => {
    setOpen(false);
    props.setLoading(true);
    dispatch(removeDepartments({ id })).then((res) => {
      props.setLoading(false);
      getAllDepartmentsDetails();
    });
  };

  const setEditClick = (id) => {
    props.setSelectedId(id);
    dispatch(getDepartmentById(id)).then((res) => {
      if (res.payload) {
        props.departmentData(res.payload);
        dispatch(openEditDepartmentDialog());
      }
    });
    openEditDepartmentDialog();
  };

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";
    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }
    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(props.departmentDetails.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  if (!props.loading && props.departmentDetails.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full h-[400px]"
      >
        <Typography color="textSecondary" variant="h5">
          There are no Departments!
        </Typography>
      </motion.div>
    );
  }

  return props.loading ? (
    <FuseProgress />
  ) : (
    <div className="w-full flex flex-col h-[400px] overflow-auto">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader aria-labelledby="tableTitle">
          <DepartmentTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            // onRequestSort={handleRequestSort}
            rowCount={props.departmentDetails.length}
            onMenuItemClick={handleDeselect}
          />
          <TableBody>
            {_.orderBy(
              props.departmentDetails,
              [
                (o) => {
                  switch (order.id) {
                    case "categories": {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n, i) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{n?.department_name}</TableCell>
                    {n.deletedAt ? (
                      <TableCell
                        className=" md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        <Typography className="text-green">Accepted</Typography>
                      </TableCell>
                    ) : (
                      <TableCell
                        className="p-4 md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        <Tooltip title="Edit">
                          <IconButton onClick={() => setEditClick(n.id)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleClickOpen(n.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        {props.departmentDetails.length < props.totalCount && (
          <Box className="relative flex justify-center p-12">
            {props.departmentDetails.length >= 10 && (
              <Fade in={!props.loadingMore}>
                <Button
                  className="absolute"
                  variant="text"
                  onClick={debounce(() => props.setAtEnd(true), 100)}
                >
                  Load More
                </Button>
              </Fade>
            )}
            <Fade in={props.loadingMore}>
              <CircularProgress className="absolute" color="secondary" />
            </Fade>
          </Box>
        )}
      </FuseScrollbars>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Department</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => onDeleteDepartment(selectedId)}>Yes</Button>
          <Button onClick={(e) => handleClose()}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(DepartmentsTable);
