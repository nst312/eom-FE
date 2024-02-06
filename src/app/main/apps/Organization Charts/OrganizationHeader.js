import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@mui/material/Icon';
import { selectMainTheme } from '../../../store/fuse/settingsSlice';

function OrganizationHeader(props) {
  const mainTheme = useSelector(selectMainTheme);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          account_tree
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Organization Charts
        </Typography>
      </div>

      {/* <div className="flex items-center"> */}
      {/*   <DialogActions */}
      {/*     className="justify-end p-0" */}
      {/*   > */}
      {/*     <div> */}
      {/*       <Button type="submit" variant="contained" color="secondary"> */}
      {/*         Add Expense Category */}
      {/*       </Button> */}
      {/*     </div> */}
      {/*   </DialogActions> */}
      {/* </div> */}
    </div>
  );
}

export default OrganizationHeader;
