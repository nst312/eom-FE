import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Icon from '@mui/material/Icon';

function ResumeHeader(props) {
  const navigate = useNavigate();
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const navbar = useSelector(({ fuse }) => fuse.navbar);
  const toolbarTheme = useSelector(selectToolbarTheme);
  const user = useSelector(({ auth }) => auth.user);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color="default"
        sx={{ backgroundColor: toolbarTheme.palette.background.paper }}
        position="static"
      >
        <Toolbar className="p-0 min-h-48 md:min-h-64">
          <div className="flex flex-1 px-16 items-center">
            <Typography
              className="flex items-center mr-12"
              role="button"
              color="inherit"
              onClick={() => navigate('/apps/resumes/all')}
            >
              <Icon className="text-20">arrow_back</Icon>
            </Typography>
            <Typography
              className="username text-18 whitespace-nowrap font-semibold"
              color="inherit"
            >
              Resumes
            </Typography>
          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto">
            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === 'right' && (
            <>
              <Hidden lgDown>
                {!navbar.open && <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ResumeHeader);
