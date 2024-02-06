import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import debounce from '@mui/utils/debounce';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import {
  downloadSalarySlip,
  getEmployeeSalaryDetails,
  SendSalaryDetails,
} from '../../store/empSalarySlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  container: {
    maxHeight: '100%',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

function EmployeeSalaryList({ userId }) {
  const dispatch = useDispatch();
  const totalCount = useSelector(({ eomApp }) => eomApp?.empSalary?.count);
  const empSalaryData = useSelector(({ eomApp }) => eomApp?.empSalary?.data);
  const leaves = useSelector(({eomApp})=> eomApp?.empSalary?.data[0]?.leave);
  console.log(leaves)
  const [salaryListData, setSalaryListData] = useState([]);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const routeParams = useParams();
  const [isProgress, setIsProgress] = useState(false);
  const [selectedSalaryId, setSelectedSalaryId] = useState(null);

  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getSalaryListData();
    }
    if (!isLastPage && salaryListData.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [empSalaryData, dispatch, atEnd, loadingMore]);

  useEffect(() => {
    if (empSalaryData) {
      if (atEnd) {
        setSalaryListData([...salaryListData, ...empSalaryData]);
        setAtEnd(false);
      } else {
        setSalaryListData(empSalaryData);
      }
    }
  }, [empSalaryData]);

  const getSalaryListData = () => {
    dispatch(
      getEmployeeSalaryDetails({ employeeId: routeParams.employeeId, page, perPage: 10 })
    ).then((res) => {
      setLoadingMore(false);
    });
  };

  const onClickSalaryDetails = (data) => {
    if (data.id) {
      setSelectedSalaryId(data.id);
      setIsProgress(true);
      const sendSalaryData = {
        userId: data.employees.users.id,
        id: data.id,
      };
      dispatch(SendSalaryDetails(sendSalaryData)).then((res) => {
        if (res) {
          setIsProgress(false);
        }
      });
    } else {
      setIsProgress(false);
    }
  };

  const DownloadPdf = (salaryId) => {
    const data = {
      id: salaryId,
      empId: routeParams.employeeId,
    };

    dispatch(downloadSalarySlip(data)).then((res) => {
      if (res) {
        const a = document.createElement('a');
        a.href = `data:data:application/pdf;base64,${res.payload.pdf}`;
        a.download = 'salarySlip.pdf';
        a.click();
      }
    });
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            {salaryListData.length === 0 && (
              <caption className="w-full text-20 text-grey-900" style={{ textAlign: 'center' }}>
                Employee salary not found.
              </caption>
            )}
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Month
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Gross Salary
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Basic Salary
                </TableCell>
                <TableCell align="left" className="table-right-border" style={{ minWidth: 80 }}>
                  HRA
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Special
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Conveyance
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Medical
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Professional Tax
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  TDS
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Net Pay
                </TableCell>

                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Action
                </TableCell>

                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Download
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryListData.length !== 0 &&
                salaryListData.map((column, index) => {
                  const totalSalary =
                    column.basic +
                    column.hra +
                    column.specialAllowance +
                    column.conveyance +
                    column.medical;
                  console.log("column.gross",column.gross/30)
                  const perDaySal = (column.gross / 30)
                  const netSalary = (totalSalary * column.tds) / 100;
                  const netTotal = totalSalary - netSalary - column.professionalTax - (perDaySal*leaves);

                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell align="left" className="table-right-border">
                        {column.month}
                      </TableCell>
                      <TableCell align="left" className="table-right-border">
                        {column.gross}
                      </TableCell>
                      <TableCell align="left" className="table-right-border">
                        {column.basic}
                      </TableCell>
                      <TableCell align="left" className="table-right-border">
                        {column.hra}
                      </TableCell>
                      <TableCell align="left" className="table-right-border">
                        {column.specialAllowance}
                      </TableCell>
                      <TableCell align="left" className="table-right-border">
                        {column.conveyance}
                      </TableCell>
                      <TableCell align="left" className="table-right-border">
                        {column.medical}
                      </TableCell>
                      <TableCell align="left" className="table-right-border">
                        {column.professionalTax}
                      </TableCell>
                      <TableCell align="left" className="table-right-border">
                        {column.tds}%
                      </TableCell>
                      <TableCell align="left" className="table-right-border">
                        {Math.round(netTotal)}
                      </TableCell>

                      <TableCell align="left" className="table-right-border cursor-pointer">
                        {isProgress && column.id === selectedSalaryId ? (
                          <CircularProgress size={25} />
                        ) : (
                          <Tooltip disableFocusListener title="Send Email">
                            <Icon className="text-20" onClick={() => onClickSalaryDetails(column)}>
                              send
                            </Icon>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Download Pdf" className="table-right-border cursor-pointer">
                          <Icon
                            onClick={() => {
                              DownloadPdf(column.id);
                            }}
                          >
                            cloud_download
                          </Icon>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {salaryListData.length < totalCount && (
            <Box className="relative flex justify-center p-12">
              {salaryListData.length >= 10 && (
                <Fade in={!loadingMore}>
                  <Button
                    className="absolute"
                    variant="text"
                    onClick={debounce(() => setAtEnd(true), 100)}
                  >
                    Load More
                  </Button>
                </Fade>
              )}
              <Fade in={loadingMore}>
                <CircularProgress className="absolute" color="secondary" />
              </Fade>
            </Box>
          )}
        </TableContainer>
      </Paper>
    </>
  );
}

export default EmployeeSalaryList;
