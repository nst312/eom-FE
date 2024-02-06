import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FuseUtils from '../../../../../@fuse/utils';
import PERMISSION from '../../../../fuse-configs/permission.constants';

function ResumesHeader(props) {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Resumes
        </Typography>
      </div>

      <div className="flex flex-1 items-center justify-center px-12" />
      {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_RESUME_ADD]) && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            // onClick={() => addNewClient()}
            component={Link}
            to="/apps/resume/new"
            className="whitespace-nowrap"
            variant="contained"
            color="secondary"
          >
            <span className="hidden sm:flex">Create Resumes</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default ResumesHeader;
