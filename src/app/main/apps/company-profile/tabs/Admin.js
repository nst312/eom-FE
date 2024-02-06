import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import RoleForm from '../Components/RoleForm';
import {useEffect, useState} from "react"

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

function Admin() {

  const [isSubmit, setIsSubmit] = useState(false)

  return (
    <>
      {/* CEO */}
      <Card sx={{ minWidth: 275 }} className="rounded-none my-10">
        <CardContent>
          <Typography variant="h5" className="font-bold" color="text.secondary" gutterBottom>
            CEO
          </Typography>
          <Divider />
          <Box className="py-10">
            <Typography variant="body1">CEO is the head of the organization.</Typography>
            <Typography variant="body1">
              For Organisation Chart, addition of CEO is required.
            </Typography>
          </Box>
          <Box className="py-10">
            <Typography variant="body1">CEO is also the HR Admin.</Typography>
            <Typography variant="body1">CEO's permissions apply to all employees.</Typography>
          </Box>
          <Box className="py-10">
            <Typography variant="body1">CEO can</Typography>
            <Box className="pl-10 pt-10">
              <Typography variant="body1">View all employee profile information </Typography>
              <Typography variant="body1">
                View sensitive employee information (such as PAN Card, IDs and salary)
              </Typography>
              <Typography variant="body1">Edit employee profiles</Typography>
              <Typography variant="body1">Edit Upload and Approve Attendance and Leaves</Typography>
              <Typography variant="body1">
                Create and remove admins, and edit admin permissions
              </Typography>
              <Typography variant="body1">CEO is also the HR Admin.</Typography>
            </Box>
          </Box>
          <RoleForm role="CEO" setIsSubmit={setIsSubmit} isSubmit={isSubmit} />
        </CardContent>
      </Card>
      {/* HR ADMIN */}
      <Card sx={{ minWidth: 275 }} className="rounded-none my-10">
        <CardContent>
          <Typography variant="h5" className="font-bold" color="text.secondary" gutterBottom>
            HR ADMIN
          </Typography>
          <Divider />
          <Box className="py-10">
            <Typography variant="body1">HR Admin's permissions apply to all employees.</Typography>
          </Box>
          <Box className="py-10">
            <Typography variant="body1">This admin can:</Typography>
            <Box className="pl-10 pt-10">
              <Typography variant="body1">View all employee profile information </Typography>
              <Typography variant="body1">
                View sensitive employee information (such as PAN Card, IDs and salary)
              </Typography>
              <Typography variant="body1">Edit employee profiles</Typography>
              <Typography variant="body1">
                Edit, Upload and Approve Attendance and Leaves
              </Typography>
              <Typography variant="body1">
                Create and remove admins, and edit admin permissions
              </Typography>
            </Box>
          </Box>
          <RoleForm role="HR_ADMIN"  setIsSubmit={setIsSubmit} isSubmit={isSubmit} />
        </CardContent>
      </Card>
      {/*     FINANCE ADMIN */}
      <Card sx={{ minWidth: 275 }} className="rounded-none my-10">
        <CardContent>
          <Typography variant="h5" className="font-bold" color="text.secondary" gutterBottom>
            FINANCE ADMIN
          </Typography>
          <Divider />
          <Box className="py-10">
            <Typography variant="body1">
              Finance admin's permissions apply to all employees.
            </Typography>
          </Box>
          <Box className="py-10">
            <Typography variant="body1">This admin can:</Typography>
            <Box className="pl-10 pt-10">
              <Typography variant="body1">
                View salary and bank details of employee profiles
              </Typography>
              <Typography variant="body1">
                View sensitive employee information (such as PAN Card and IDs)
              </Typography>
            </Box>
          </Box>
          <RoleForm role="FINANCE_ADMIN"  setIsSubmit={setIsSubmit} isSubmit={isSubmit}  />
        </CardContent>
      </Card>
      {/*   HR EXECUTIVE */}
      <Card sx={{ minWidth: 275 }} className="rounded-none my-10">
        <CardContent>
          <Typography variant="h5" className="font-bold" color="text.secondary" gutterBottom>
            HR EXECUTIVE
          </Typography>
          <Divider />
          <Box className="py-10">
            <Typography variant="body1">
              HR Executive's permissions apply to all employees.
            </Typography>
          </Box>
          <Box className="py-10">
            <Typography variant="body1">This admin can:</Typography>
            <Box className="pl-10 pt-10">
              <Typography variant="body1">
                View all employee profile information (Non-payroll)
              </Typography>
              <Typography variant="body1">
                View sensitive employee information (such as PAN Card, IDs, DOB etc)
              </Typography>
              <Typography variant="body1">Add and edit employee profiles</Typography>
              <Typography variant="body1">
                Edit, Upload and Approve Attendance and Leaves
              </Typography>
              <Typography variant="body1">This Admin will not have any payroll access.</Typography>
            </Box>
          </Box>
          <RoleForm role="HR_EXECUTIVE"  setIsSubmit={setIsSubmit} isSubmit={isSubmit}   />
        </CardContent>
      </Card>
    </>
  );
}

export default Admin;
