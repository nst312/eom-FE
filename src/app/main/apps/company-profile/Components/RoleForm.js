import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import { asignRole, getAllUser, getUserByRole } from '../store/adminSlice';
import { showMessage } from '../../../../store/fuse/messageSlice';

const schema = yup.object().shape({
  name: yup.object().required('Select  name.').nullable(),
});
const defaultValues = {
  name: '',
};

function RoleForm({ role , setIsSubmit, isSubmit}) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [userList, setUserList] = useState([]);


  const { control, getValues, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid } = formState;

  function onSubmit(e) {
    e.preventDefault();
    const data = {
      userId: getValues()?.name?.id,
      role,
    };
    dispatch(asignRole(data)).then((resp) => {
      if (resp) {
        setShowForm(false);
        getUserByRoleFunction(role);
        setIsSubmit(!isSubmit)
      }
    });
  }

  useEffect(() => {
    dispatch(getAllUser()).then((resp) => {
      setUserList(resp.payload);
    });
  }, [dispatch]);

  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserByRoleFunction(role);
  }, [dispatch, isSubmit]);

  function getUserByRoleFunction(role) {
    dispatch(getUserByRole(role)).then((resp) => {
      setUser(resp.payload);
    });
  }

  function removeUserRole(id) {
    const data = {
      userId: id,
      role: 'EMPLOYEE',
    };

    dispatch(asignRole(data)).then((resp) => {
      if (resp) {
        setShowForm(false);
        getUserByRoleFunction(role);
        dispatch(
          showMessage({
            message: 'Deleted the Role',
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          })
        );
      }
    });
  }

  return (
    <>
      <div className="mb-20">
        {user?.length === 0 && (
          <div className=" pr-46 p-10 inline-flex  items-center border-1 rounded-[500px] mr-10">
            <Typography className="mx-12"> Not Assigned </Typography>
          </div>
        )}
        {user?.map((item) => {
          return (
            <div className=" pr-46 p-10 inline-flex  items-center border-1 rounded-[500px] mr-10">
              <Avatar alt="Hello"> {item.firstName.charAt(0)} </Avatar>
              <Typography className="mx-12"> {item.firstName} </Typography>
              <CloseIcon cursor={"pointer"} onClick={() => removeUserRole(item.id)} />
            </div>
          );
        })}
      </div>
      {showForm && (
        <Box>
          <Divider />
          <Typography
            variant="body1"
            className="font-bold mt-20"
            color="text.secondary"
            gutterBottom
          >
            Find Employee
          </Typography>
          <form onSubmit={onSubmit}>
            <div className="flex -mx-4 px-1">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    className="mt-8 mb-16 mx-3"
                    freeSolo
                    options={userList || []}
                    getOptionLabel={(option) => option.firstName || ''}
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Find Employee"
                        label="User Name"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                )}
              />
            </div>
            <div className="flex items-center gap-10 mb-10">
              <Button type="submit" variant="contained" disabled={!isValid}>
                Save
              </Button>
              <Button variant="contained" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      )}

      {!showForm && (
        <Button variant="contained" onClick={() => setShowForm(true)}>
          Add
        </Button>
      )}
    </>
  );
}

export default RoleForm;
