import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import constants from '../../../../fuse-configs/constants';

function EmployeeHeader(props) {
  const navigate = useNavigate();
  const { tabValue, employeeData, handleClickEdit } = props;
  const theme = useTheme();

  const addNewSalary = () => {
    handleClickEdit(false);
  };

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            role="button"
            color="inherit"
            onClick={() => navigate(-1)}
          >
            <Icon className="text-20">
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">Employees</span>
          </Typography>
        </motion.div>
        <div className="flex items-center max-w-full">
          <Avatar
            alt="user photo"
            src={
              employeeData?.users?.avatar_url && employeeData?.users?.avatar_url !== ''
                ? `${constants.API_URL}/api/avatar/${employeeData.users?.avatar_url}`
                : 'assets/images/avatars/profile.jpg'
            }
          />
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {employeeData &&
                  `${employeeData?.users?.firstName} ${employeeData?.users?.lastName}`}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
      {tabValue === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            onClick={() => addNewSalary()}
            className="whitespace-nowrap"
            variant="contained"
            color="secondary"
          >
            <span className="hidden sm:flex">Revise Salary</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default EmployeeHeader;
