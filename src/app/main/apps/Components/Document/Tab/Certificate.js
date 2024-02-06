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
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useParams } from 'react-router';
import {
  deleteCertificate,
  getCertificateById,
  openEditCertificatesDialog,
  openNewCertificatesDialog,
  setCertificate,
  setAllCertificates,
  getCertificates,
} from '../store/documentSlice';
import reducer from '../store';
import CertificateDialog from '../components/CertificateDialog';
import constants from '../../../../../fuse-configs/constants';
import FuseUtils from '../../../../../../@fuse/utils';
import PERMISSION from '../../../../../fuse-configs/permission.constants';

const defaultValues = {
  title: '',
  description: '',
  path: '',
};
function Certificate() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const user = useSelector(({ auth }) => auth.user);

  const onDeleteCertificate = (id) => {
    setOpen(false);
    dispatch(deleteCertificate(id)).then((resp) => {
      getAllcertificates();
    });
  };

  const setEditClick = (id) => {
    setSelectedId(id);
    dispatch(getCertificateById(id)).then((res) => {
      if (res.payload) {
        dispatch(openEditCertificatesDialog());
        dispatch(setCertificate(res.payload));
      }
    });
    openEditCertificatesDialog();
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
  const certificatesData = useSelector(({ documents }) => documents.documents.certificates);

  useEffect(() => {
    getAllcertificates();
  }, [dispatch]);

  const { employeeId } = useParams();


  const getAllcertificates = () => {
    const empId = employeeId || user?.employee_id;

    dispatch(getCertificates(empId)).then((res) => {
      if (res.payload) {
        dispatch(setAllCertificates(res.payload));
      }
    });
  };

  const handleChange = (id) => {
    axios.post(`/api/course-certification/verification/${id}`).then(resp => {
      if(resp){
        getAllcertificates()
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
                Title
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Uploaded By
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                Type
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
            {certificatesData.length === 0 && (
              <TableRow>
                <TableCell
                  align="left"
                  colSpan="4"
                  style={{ minWidth: 80 }}
                  className="table-right-border"
                >
                  <h3>No Certificate Found </h3>
                </TableCell>
              </TableRow>
            )}
            {certificatesData &&
              certificatesData.map((item, index) => {
                const {
                  type,
                  verification,
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
                      {type}
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                      {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_COURSE_VERIFIED]) && <Switch onChange={() => handleChange(item.id)} checked={verification ? true : false} />}
                      {verification ? (
                        <p className="text-green">Verified</p>
                      ) : (
                        <p className="text-red">Unverified</p>
                      )}
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
            dispatch(openNewCertificatesDialog());
          }}
        >
          <div className="px-16">
            <Button type="submit" variant="contained" color="secondary">
              Add Certificate
            </Button>
          </div>
        </DialogActions>
      </Box>
      <CertificateDialog certificateFormData={defaultValues} selectedId={selectedId} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Certificate</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => onDeleteCertificate(selectedId)}>Yes</Button>
          <Button onClick={(e) => handleClose()}>No</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default withReducer('documents', reducer)(Certificate);
