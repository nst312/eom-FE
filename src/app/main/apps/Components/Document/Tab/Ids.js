import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
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
import Switch from '@mui/material/Switch';
import {
  deleteID,
  getIDById,
  getIDs,
  openEditIDsDialog,
  openNewIDsDialog,
  setAllIDs,
  setID,
} from '../store/documentSlice';
import reducer from '../store';
import IDsDialog from '../components/IDsDialog';
import constants from '../../../../../fuse-configs/constants';
import axios from 'axios';
import PERMISSION from '../../../../../fuse-configs/permission.constants';
import FuseUtils from '../../../../../../@fuse/utils';

const defaultValues = {
  title: '',
  description: '',
  path: '',
};
function IDs() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const user = useSelector(({ auth }) => auth.user);


  const onDeleteId = (id) => {
    setOpen(false);
    dispatch(deleteID(id)).then((resp) => {
      getAllids();
    });
  };

  const setEditClick = (id) => {
    setSelectedId(id);
    dispatch(getIDById(id)).then((res) => {
      if (res.payload) {
        dispatch(openEditIDsDialog());
        dispatch(setID(res.payload));
      }
    });
    openEditIDsDialog();
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

  const profileData = useSelector(({ userProfile }) => userProfile?.profile);
  const idsData = useSelector(({ documents }) => documents?.documents.ids);

  useEffect(() => {
    getAllids();
  }, [dispatch]);

  const { employeeId } = useParams();

  const getAllids = () => {
    const empId = employeeId || user?.employee_id;

    dispatch(getIDs(empId)).then((res) => {
      if (res.payload) {
        dispatch(setAllIDs(res.payload));
      }
    });
  };

  const handleClickDownload = (profileUrl) => {
    const fileName = `${constants.API_URL}/api/avatar/${profileUrl}`;
    const a = document.createElement('a');
    a.href = fileName;
    a.download = 'myImage.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [checked, setChecked] = useState(true);

  const handleChange = (id) => {
    axios.post(`/api/documents/verification/${id}`).then(resp => {
      if(resp){
        getAllids()
      }
    })
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Type
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                ID
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Uploaded By
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Verification
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {idsData && idsData.length === 0 && (
              <TableRow>
                <TableCell
                  align="left"
                  colSpan="4"
                  style={{ minWidth: 80 }}
                  className="table-right-border"
                >
                  <h3>No IDs document Found </h3>
                </TableCell>
              </TableRow>
            )}
            {idsData &&
              idsData.map((item, index) => {
                const {
                  type,
                  verification,
                  title,
                  docNumber,
                  uploadedBy: { firstName },
                  updatedAt,
                  path,
                } = item;


                return (
                  <TableRow key={index}>
                    <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                      {type}
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                      {docNumber}
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                      {firstName}
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                      {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_DOC_VERIFIED]) && <Switch {...label} onChange={() => handleChange(item.id)} checked={verification ? true : false} />}
                      {verification ? (
                        <p className="text-green">Verified</p>
                      ) : (
                        <p className="text-red">Unverified</p>
                      )}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: 80 }}
                      className="table-right-border "
                    >
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
            dispatch(openNewIDsDialog());
          }}
        >
          <div className="px-16">
            <Button type="submit" variant="contained" color="secondary">
              Add an ID
            </Button>
          </div>
        </DialogActions>
      </Box>
      <IDsDialog selectedId={selectedId} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete ID</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => onDeleteId(selectedId)}>Yes</Button>
          <Button onClick={(e) => handleClose()}>No</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default withReducer('documents', reducer)(IDs);
