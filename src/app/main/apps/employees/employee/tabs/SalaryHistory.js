import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import moment from "moment/moment";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {downloadSalaryHistory} from "../../store/salaryHistorySlice";



const SalaryHistory = (props) => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const { salaryHistoryDetail, setSalaryHistoryDetails } = props;

  const DownloadPdf = (historyId) => {
    const data = {
      id: historyId,
    };

    dispatch(downloadSalaryHistory(data)).then((res) => {
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
            {/* <caption className="w-full text-20 text-grey-900" style={{ textAlign: 'center' }}> */}
            {/*  salary history not found. */}
            {/* </caption> */}
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Created At
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Department
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Designation
                </TableCell>
                <TableCell align="left" className="table-right-border" style={{ minWidth: 80 }}>
                  Gross Salary
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Net Pay
                </TableCell>
                <TableCell align="left" style={{ minWidth: 80 }} className="table-right-border">
                  Download
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryHistoryDetail?.data?.map((column, index) => (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell align="left" className="table-right-border">
                    {moment(column.createdAt).format('ll')}
                  </TableCell>
                  <TableCell align="left" className="table-right-border">
                    {column.name}
                  </TableCell>
                  <TableCell align="left" className="table-right-border">
                    {column.department}
                  </TableCell>
                  <TableCell align="left" className="table-right-border">
                    {column.designation}
                  </TableCell>
                  <TableCell align="left" className="table-right-border">
                    {column.gross}
                  </TableCell>
                  <TableCell align="left" className="table-right-border">
                    {column.netPay}
                  </TableCell>
                  <TableCell align="left" className="table-right-border">
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
export default SalaryHistory;
