import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { closeInvitationDialog, openInvitationDialog, getAllInvitation, sendInvitation } from './store/invitationsSlice';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
};

const schema = yup.object().shape({
  firstName: yup.string().required('You must enter a first name'),
  lastName: yup.string().required('You must enter a last name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function InvitationDialog(props) {
  const dispatch = useDispatch();
  const invitationDialog = useSelector(({ invitationApp }) => invitationApp.invitations.invitationDialog);

  const { handleSubmit, formState, reset, control, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors, isValid, dirtyFields } = formState;

  const initDialog = useCallback(() => {
    reset({
      ...defaultValues,
      ...invitationDialog.data,
    });
  }, [invitationDialog.data, invitationDialog.type, reset]);

  useEffect(() => {
    if (invitationDialog.props.open) {
      initDialog();
    }
  }, [invitationDialog.props.open, initDialog]);


  function closeDialog() {
    dispatch(closeInvitationDialog());
  }

  function onSubmit(data) {
    props.setLoading(true)
    dispatch(sendInvitation(data)).then((res) => {
      if (res?.payload?.data?.errors) {
        const updateData = res.payload.data.errors[Object.keys(res.payload.data.errors)[0]];
        setError(Object.keys(res.payload.data.errors)[0], { type: "focus", message: updateData }, { shouldFocus: true });
      } else {
        closeDialog();
        dispatch(getAllInvitation()).then(() => {
          props.setLoading(false);
        });
      }
      props.setLoading(false)
    }).catch((err) => {
      console.log(err);
      props.setLoading(false)
    });
  }

  return (
    <Dialog {...invitationDialog.props} onClose={closeDialog} fullWidth maxWidth='sm' scroll='body'>
      <AppBar position='static' elevation={0}>
        <Toolbar className='flex w-full'>
          <Typography variant='subtitle1' color='inherit' onClick={() => {
            dispatch(openInvitationDialog());
          }}>
            Employee Invitation
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: 'p-0' }}>
          <div className='px-16 mt-16 sm:px-24'>
            <FormControl className='mt-8 mb-16' required fullWidth>
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='First Name'
                    autoFocus
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                    required
                    variant='outlined'
                  />
                )}
              />
            </FormControl>
            <FormControl className='mt-8 mb-16' required fullWidth>
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Last Name'
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                    required
                    variant='outlined'
                  />
                )}
              />
            </FormControl>
            <FormControl className='mt-8 mb-16' required fullWidth>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Email'
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    required
                    variant='outlined'
                  />
                )}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className='justify-end px-8 py-16'>
          <div className='px-16'>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Submit
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default InvitationDialog;
