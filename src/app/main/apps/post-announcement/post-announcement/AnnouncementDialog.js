import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { createFilterOptions } from '@mui/material/Autocomplete';
import {
  addAnnouncement,
  closeAnnouncementDialog,
  updateAnnouncement,
} from '../store/announcementSlice';
import _ from '../../../../../@lodash';

const defaultValues = {
  message: '',
};

const schema = yup.object().shape({
  message: yup.string().required('You must enter message'),
});

function AnnouncementDialog() {
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector(({ auth }) => auth.user);
  const [messageData, setMessageData] = useState([]);
  const dispatch = useDispatch();
  const announceDialog = useSelector(
    ({ announcementApp }) => announcementApp.announcement.AnnouncementDialog
  );
  const [selectValue, setSelectValue] = useState(null);

  const { handleSubmit, formState, reset, control, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const filter = createFilterOptions();
  const { errors, isValid, dirtyFields } = formState;

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (announceDialog.type === 'edit' && announceDialog.data) {
      reset({ ...announceDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (announceDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...announceDialog.data,
      });
    }
  }, [announceDialog.data, announceDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (announceDialog.props.open) {
      initDialog();
    }
  }, [announceDialog.props.open, initDialog]);

  const { company_id } = user

  const closeDialog = () => {
    dispatch(closeAnnouncementDialog());
  };

  function onSubmit()  {
    if (announceDialog.type === 'new') {
      const data = {
        companyId: user.company_id,
        message: getValues().message,
      };

      dispatch(addAnnouncement(data)).then((res) => {
        if (res) {
          closeDialog();
        }
      });
    }else{
      const editData = {
        id: getValues().id,
        message: getValues().message,
        companyId: company_id
      };

      dispatch(updateAnnouncement(editData)).then((res) => {
        if (res) {
          closeDialog();
        }
      });
    }
  };

  return (
    <Dialog {...announceDialog.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit" onClick={() => closeDialog()}>
            Announcement
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: 'p-0' }}>
          <div className="px-16 mt-16 sm:px-24">
            <FormControl className="mt-8 mb-16" fullWidth>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    label="Message"
                    autoFocus
                    rows={2}
                    required
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          </div>
        </DialogContent>
        {announceDialog.type === 'new' ? (
          <DialogActions className="justify-end px-8 py-16">
            <div className="px-16">
              <Button
                className="h-40 my-12"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                variant="contained"
                onClick={onSubmit}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-end px-8 py-16">
            <div className="px-16">
              <Button
                className="h-40 my-12"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                variant="contained"
                onClick={onSubmit}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default AnnouncementDialog;
