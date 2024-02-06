import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import {
  deleteAttendanceRules,
  openEditAttendanceShiftDialog,
} from '../store/attendanceShiftSlice';
import reducer from '../store';
import withReducer from '../../../../store/withReducer';

function AttendanceShiftRules() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const getAttendanceData = useSelector(
    ({ attendanceApp }) => attendanceApp.attendanceShiftData.attendanceShiftAllData
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const onDeleteAttendanceRules = (id) => {
    setOpen(false);
    dispatch(deleteAttendanceRules({ id })).then((res) => {});
  };

  if (getAttendanceData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          Attendance Rules not found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        {getAttendanceData?.map((column, index) => {
          return (
            <Card className="rounded-none  key={index}">
              <CardContent className="flex justify-between">
                <Typography sx={{ fontSize: 18 }} className="gap-10" variant="h5" gutterBottom>
                  {column.ruleName}
                </Typography>
                <ListItemIcon>
                  <Icon
                    className="cursor-pointer"
                    onClick={(e) =>
                      e.stopPropagation(dispatch(openEditAttendanceShiftDialog(column)))
                    }
                  >
                    edit
                  </Icon>
                  <Icon
                    className="cursor-pointer"
                    onClick={(e) => e.stopPropagation(handleClickOpen(column.id))}
                  >
                    delete
                  </Icon>
                </ListItemIcon>
              </CardContent>
              <CardContent>
                <div>
                  <Typography className="font-medium">
                    Shift Time : {moment(column.shiftInTime).format('hA')} -{' '}
                    {moment(column.shiftOutTime).format('hA')} ({column.durationCount}hours)
                  </Typography>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Work Shift</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => onDeleteAttendanceRules(selectedId)}>Yes</Button>
          <Button onClick={(e) => handleClose()}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default withReducer('attendanceApp', reducer)(AttendanceShiftRules);
