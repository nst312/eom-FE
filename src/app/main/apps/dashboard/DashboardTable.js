import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Chip } from '@mui/material';
import { StarsRounded } from '@mui/icons-material';
import withRouter from '../../../../@fuse/core/withRouter';
import constants from '../../../fuse-configs/constants';

function BasicTable({ rating }) {
  return (
    <div className="flex justify-center item-center mt-10">
      <TableContainer component={Paper} className=" w-[75%] ">
        <Table sx={{ minWidth: 800 }} className="" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Rating Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rating.map(
              (row, index) => {
                if (index > 2) {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {index+1}
                      </TableCell>
                      <TableCell>
                        <Avatar
                          src={
                            row.totalRating !== 0
                              ? `${constants.API_URL}/api/avatar/${row.avatar_url}`
                              : 'assets/images/avatars/profile.jpg'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {row.firstName} {row.lastName}
                      </TableCell>
                      <TableCell>
                        <Chip icon={<StarsRounded />} label={row.totalRating} />
                      </TableCell>
                    </TableRow>
                  );
                }
              }
              // index > 2 && (
              //   <TableRow key={index}>
              //     <TableCell>
              //       <Avatar src={
              //         row.totalRating !== 0 ?
              //         `${constants.API_URL}/api/avatar/${row.avatar_url}`
              //         : 'assets/images/avatars/profile.jpg'
              //       } />
              //     </TableCell>
              //     {row.totalRating !== 0 ?
              //       (<TableCell>
              //       {row.firstName} {row.lastName}
              //     </TableCell>) :
              //         (
              //         <TableCell>
              //           Player Name
              //         </TableCell>
              //         )
              //     }
              //     <TableCell>
              //       <Chip icon={<StarsRounded />} label={row.totalRating} />
              //     </TableCell>
              //   </TableRow>
              // )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withRouter(BasicTable);
