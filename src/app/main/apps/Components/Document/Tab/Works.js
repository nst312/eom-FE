import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import moment from 'moment/moment';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableContainer,
} from '@mui/material';
import withReducer from 'app/store/withReducer';
import TableBody from '@mui/material/TableBody';
import { CloudDownload, Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  deleteWork,
  getWorkById,
  getWorks,
  openEditWorksDialog,
  openNewWorksDialog,
  setAllWorks,
  setWork,
} from '../store/documentSlice';
import WorksDialog from '../components/WorksDialog';
import reducer from '../store';
import constants from '../../../../../fuse-configs/constants';

const defaultValues = {
  title: '',
  description: '',
  path: '',
};
function Works() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const user = useSelector(({ auth }) => auth.user);
  console.log('user   ====>', user);
  const onDeleteWork = (id) => {
    setOpen(false);
    dispatch(deleteWork(id)).then((resp) => {
      getAllworks();
    });
  };

  const setEditClick = (id) => {
    setSelectedId(id);
    dispatch(getWorkById(id)).then((res) => {
      if (res.payload) {
        dispatch(openEditWorksDialog());
        dispatch(setWork(res.payload));
      }
    });
    openEditWorksDialog();
  };

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLoadingFalse = (value) => {
    setLoading(value);
  };

  // const profileData = useSelector(({ userProfile }) => userProfile.profile);
  const worksData = useSelector(({ documents }) => documents.documents.works);

  useEffect(() => {
    getAllworks();
  }, [dispatch]);

  const { employeeId } = useParams();

  const getAllworks = () => {
    const empId = employeeId || user?.employee_id;

    console.log('employeId', user);

    dispatch(getWorks(empId)).then((res) => {
      if (res.payload) {
        dispatch(setAllWorks(res.payload));
      }
    });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Title
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Uploaded By
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Uploaded On
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {worksData.length === 0 && (
              <TableRow>
                <TableCell
                  align="left"
                  colSpan="4"
                  style={{ minWidth: 80 }}
                  className="table-right-border"
                >
                  <h3>No Work document Found </h3>
                </TableCell>
              </TableRow>
            )}
            {worksData &&
              worksData.map((item, index) => {
                const {
                  title,
                  uploadedBy: { firstName },
                  updatedAt,
                  path,
                } = item;

                return (
                  <TableRow key={index}>
                    <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                      {title}
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                      {firstName}
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                      {moment(updatedAt).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                      {path && (
                        <a
                          className="bg-white text-white"
                          href={`${constants.API_URL}/images/${path}`}
                          target="newpage"
                        >
                          <Tooltip title="Download ID">
                            <IconButton>
                              <CloudDownload />
                            </IconButton>
                          </Tooltip>
                        </a>
                      )}
                      <Tooltip title="Edit">
                        <IconButton>
                          <Edit onClick={() => setEditClick(item.id)} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleClickOpen(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="p-10">
        <DialogActions
          className="px-8 py-16 justify-start inline-flex"
          onClick={() => {
            dispatch(openNewWorksDialog());
          }}
        >
          <div className="px-16">
            <Button type="submit" variant="contained" color="secondary">
              Add Works
            </Button>
          </div>
        </DialogActions>
      </Box>
      <WorksDialog workFormData={defaultValues} selectedId={selectedId} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Work</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => onDeleteWork(selectedId)}>Yes</Button>
          <Button onClick={(e) => handleClose()}>No</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default withReducer('documents', reducer)(Works);
