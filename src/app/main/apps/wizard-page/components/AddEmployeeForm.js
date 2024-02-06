import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FormControl from '@mui/material/FormControl';
import _ from '../../../../../@lodash';
import { sendInvitation } from '../../invitation/store/invitationsSlice';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../../../store/fuse/messageSlice';

const schema = yup.object().shape({
  firstName: yup.string().required('You must enter a first name'),
  lastName: yup.string().required('You must enter a last name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});
const AddEmployeeForm = ({ numOfEmp, employees, setEmployees }) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, formState, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const { errors, dirtyFields, isValid } = formState;

  const onSubmit = (values) => {
    if (numOfEmp > employees.length) {
      let arr = [...employees];
      arr = [...arr, values];
      setEmployees(arr);
      dispatch(showMessage({ variant: 'success', message: 'Employee added successfully.' }));
      reset();
    } else {
      dispatch(showMessage({ variant: 'error', message: 'Please increase employee size.' }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className='grid grid-cols-2 gap-16'>
        <FormControl>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                label='First name'
                variant='outlined'
                fullWidth
                required
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Last name'
                variant='outlined'
                fullWidth
                required
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            )}
          />
        </FormControl>
        <FormControl className='col-start-1 col-end-3'>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Email'
                variant='outlined'
                fullWidth
                required
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            )}
          />
        </FormControl>
        <Button
          className='col-start-1 col-end-3 rounded-2'
          size='large'
          fullWidth
          type='submit'
          variant='contained'
          color='secondary'
          disabled={_.isEmpty(dirtyFields) || !isValid}
        >
          Invite Employee
        </Button>
      </Box>
    </form>
  );
};

export default AddEmployeeForm;
