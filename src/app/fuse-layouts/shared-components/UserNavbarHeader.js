import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import constants from '../../fuse-configs/constants';



const StyledAppBar = styled(AppBar)(({ theme }) => ({
  '& .username, & .email': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },

  '& .avatar': {
    background: theme.palette.background.default,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    '& > img': {
      borderRadius: '50%',
    },
  },
}));




function UserNavbarHeader(props) {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <StyledAppBar
      position="static"
      color="primary"
      className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
    >
      {user.role === "EMPLOYEE" &&
        <Typography className="username text-18 whitespace-nowrap font-semibold mb-4" color="inherit">
          {user?.jobPosition?.jobPosition.length > 20 ? `${user?.jobPosition?.jobPosition.substring(0, 20)}...` : user?.jobPosition?.jobPosition}
        </Typography>
      }
      <Typography
        className="email text-13 opacity-50 whitespace-nowrap font-medium"
        color="inherit"
      >
        {user?.email}
      </Typography>
      <div data-tour="third" className="flex items-center justify-center absolute bottom-0 -mb-44">
        <Avatar
          className="avatar w-72 h-72 p-8 box-content"
          alt="user photo"
          src={
            user?.avatar_url && user?.avatar_url !== ''
              ? `${constants.API_URL}/api/avatar/${user.avatar_url}`
              : 'assets/images/avatars/profile.jpg'
          }
        />
      </div>
    </StyledAppBar>
  );
}

export default UserNavbarHeader;
