import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { selectMainTheme } from '../../../../store/fuse/settingsSlice';
import { openAnnouncementDialog } from '../store/announcementSlice';

function PostAnnouncementHeader(props) {
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
          announcement
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Announcements
        </Typography>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full h-58 max-w-512 px-8 py-4  rounded-16 shadow"
          >
            <Icon color="action">search</Icon>

            <Input
              placeholder="Search"
              className="px-16"
              disableUnderline
              fullWidth
              // value={searchText}
              inputProps={{
                'aria-label': 'Search',
              }}
            />
          </Paper>
        </ThemeProvider>
      </div>
      <div className="flex items-center">
        <DialogActions
          className="justify-end px-8 py-16"
          onClick={() => {
            dispatch(openAnnouncementDialog());
          }}
        >
          <div className="px-16">
            <Button type="submit" variant="contained" color="secondary">
              Add Announcement
            </Button>
          </div>
        </DialogActions>
      </div>
    </div>
  );
}

export default PostAnnouncementHeader;
