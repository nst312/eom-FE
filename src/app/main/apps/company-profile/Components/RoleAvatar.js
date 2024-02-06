import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserByRole } from '../store/adminSlice';

function RoleAvatar({ name, role }) {
  const dispatch = useDispatch();

  const [user, setUser] = useState([]);

  useEffect(() => {
    dispatch(getUserByRole(role)).then((resp) => {
      setUser(resp.payload);
    });
  }, [dispatch]);

  return (
    <div className="mb-20">
      {user.length === 0 &&  <div className=" pr-46 p-10 inline-flex  items-center border-1 rounded-[500px] mr-10">
        <Typography className="mx-12"> Not Assigned</Typography>
      </div>}
      {user.map((item) => {
        return (
          <div className=" pr-46 p-10 inline-flex  items-center border-1 rounded-[500px] mr-10">
            <Avatar alt="Hello"> P </Avatar>
            <Typography className="mx-12"> {item.firstName} </Typography>
          </div>
        );
      })}
    </div>
  );
}

export default RoleAvatar;
