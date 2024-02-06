import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';
import constants from '../../fuse-configs/constants';

function UserMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
        data-tour="profile"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user?.displayName}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="textSecondary">
            {user?.role?.replaceAll('_', ' ')}
            {(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
          </Typography>
        </div>

        <Avatar
            alt="user photo"
            src={
              user?.avatar_url && user?.avatar_url !== ''
                  ? `${constants.API_URL}/api/avatar/${user.avatar_url}`
                  : 'assets/images/avatars/profile.jpg'
            }
        />
      </Button>


      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        <>

            <MenuItem component={Link} to="/company-profile" role="button">
                <ListItemIcon className="min-w-40">
                    <Icon>admin_panel_settings</Icon>
                </ListItemIcon>
                <ListItemText primary="Company Profile" />
            </MenuItem>


          <MenuItem component={Link} to="/profile" onClick={userMenuClose} role="button">
            <ListItemIcon className="min-w-40">
              <Icon>account_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              dispatch(logoutUser());
              userMenuClose();
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>exit_to_app</Icon>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </>
      </Popover>
    </>
  );
}

export default UserMenu;
