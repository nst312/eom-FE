import {yupResolver} from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import {LocalizationProvider} from '@mui/lab';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Box} from '@mui/system';
import FuseUtils from '../../../../../../@fuse/utils';
import {addExpense, closeExpenseDialog, getExpenseCategory, updateExpense,} from '../store/expenseSlice';
import _ from "../../../../../../@lodash";

const defaultValues = {
    expenseDate: '',
  category: null,
  submittedAmount: 0,
  description: '',
  path: '',
};

const schema = yup.object().shape({
    submittedAmount: yup.string().required('You must enter submittedAmount'),
    description: yup.string().required('You must enter description'),
});

function ExpenseDialog() {
  const expenseDialog = useSelector(({ expenseApp }) => expenseApp.expense.ExpenseDialog);
  const [file, setFile] = React.useState('');
  const dispatch = useDispatch();
  const [selectExpense, setSelectExpense] = useState(null);
  const [expenseCategory, setExpenseCategory] = useState([]);
 const [date,setDate] = useState('')

  const { handleSubmit, formState, reset, control, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors, isValid, dirtyFields } = formState;

  const initDialog = useCallback(() => {
    if (expenseDialog.type === 'edit' && expenseDialog.data) {
      reset({ ...expenseDialog.data, category: getValues()?.category?.category});
    }

    /**
     * Dialog type: 'new'
     */
    if (expenseDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...expenseDialog.data,
      });
    }
  }, [expenseDialog.data, expenseDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (expenseDialog.props.open) {
      initDialog();
    }
  }, [expenseDialog.props.open, initDialog]);

  useEffect(() => {
    dispatch(getExpenseCategory()).then((res) => {
      setExpenseCategory(res.payload.data);
    });
  }, []);


  const closeDialog = () => {
      setDate('')
      setFile('')
      setSelectExpense(null)
      dispatch(closeExpenseDialog());
  };

  function onSubmit() {
    const finalDate = date !== '' ? date.toISOString() : getValues().expenseDate;
    const categoryId = selectExpense !== null ? getValues().category.id : getValues().categoryId
    const formData = new FormData();
    formData.append('expenseDate', finalDate);
    formData.append('categoryId', categoryId);
    formData.append('submittedAmount', getValues().submittedAmount);
    formData.append('description', getValues().description);
    formData.append('path', file);
    if (expenseDialog.type === 'new') {
      dispatch(addExpense(formData)).then((res) => {
        if (res) {
          closeDialog();
        }
      });
    } else {
      dispatch(updateExpense({ id: getValues().id, formData })).then((res) => {
        if (res) {
          closeDialog();
        }
      })
    }
  }

  const handleChangeDate = (item) =>{
    setValue('expenseDate',item)
      setDate(item)
  }


  return (
    <Dialog {...expenseDialog.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit" onClick={() => closeDialog()}>
            Expense
          </Typography>
        </Toolbar>
      </AppBar>
      <form>
        <DialogContent classes={{ root: 'p-0' }}>
          <div className="px-16 mt-16 sm:px-24">
            <FormControl className="mt-4" fullWidth>
              <Controller
                name="expenseDate"
                control={control}
                render={({ field }) => {
                  return(
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        {...field}
                        label="Expense"
                        onChange={(e) => handleChangeDate(e)}
                        renderInput={(params) => (
                            <TextField
                            className="mt-8 mb-16 mx-3"
                            fullWidth
                            {...params}
                            error={!!errors.expenseDate}
                            helperText={errors?.expenseDate?.message}
                            required
                            />
                        )}
                    />
                  </LocalizationProvider>
                )}}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <Autocomplete
                          freeSolo
                          value={selectExpense || expenseDialog?.data?.category}
                          options={expenseCategory}
                          getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                              return option;
                            }

                            if (option.category) {
                              return option.category;
                            }

                            return option.category;
                          }}
                          onChange={(event, newValue) => {
                            setValue('category', newValue)
                            if (typeof newValue === 'string') {
                              setSelectExpense({
                                category: newValue,
                              });
                            } else if (newValue && newValue.inputValue) {
                              setSelectExpense({
                                category: newValue.inputValue,
                              });
                            } else {
                              setSelectExpense(newValue);
                            }
                          }}
                          selectOnFocus
                          clearOnBlur
                          handleHomeEndKeys
                          renderInput={(params) => (
                            <TextField
                                {...params}
                                margin="normal"
                                className="mt-8 mb-16 mx-3"
                                variant="outlined"
                                label="Category"
                                error={!!errors.category}
                                helperText={errors?.category?.message}
                                required
                            />
                          )}
                      />
                  )}
              />
            </FormControl>
            <FormControl className="mt-4" fullWidth>
              <Controller
                name="submittedAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount"
                    variant="outlined"
                    className="mt-8 mb-16 mx-4"
                    type="number"
                    required
                    error={!!errors.submittedAmount}
                    helperText={errors?.submittedAmount?.message}
                  />
                )}
              />
            </FormControl>
            <FormControl className="mt-4" fullWidth>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    label="Description"
                    autoFocus
                    rows={4}
                    required
                    error={!!errors.description}
                    helperText={errors?.description?.message}
                    variant="outlined"
                    className="mt-8 mb-16 mx-4"
                  />
                )}
              />
            </FormControl>
            <FormControl className="mt-8"  fullWidth>
              <Box className="flex items-center gap-28">
                <Button variant="contained" component="label">
                  Select File
                  <input
                    name="path"
                    type="file"
                    hidden
                    onChange={async (e) => {
                      function readFileAsync() {
                        return new Promise((resolve, reject) => {
                          const fileName = e.target.files[0];
                          const extension = fileName.name
                            .substring(fileName.name.lastIndexOf('.') + 1)
                            .toLowerCase();
                          if (!fileName) {
                            return;
                          }
                          const reader = new FileReader();

                          reader.onload = () => {
                            resolve({
                              id: FuseUtils.generateGUID(),
                              url: `data:${fileName.type};base64,${btoa(reader.result)}`,
                              type: 'file',
                            });
                          };

                          reader.onerror = reject;
                          reader.readAsBinaryString(fileName);
                        });
                      }

                      const newImage = await readFileAsync();
                      setFile(e.target.files[0]);
                      setValue('path', newImage.url);
                    }}
                  />
                </Button>
                <Typography>{file?.name || expenseDialog?.data?.path}</Typography>
              </Box>
            </FormControl>
          </div>
        </DialogContent>
        {expenseDialog.type === 'new' ? (
          <DialogActions className="justify-end px-8 py-16">
            <div className="px-16">
              <Button
                  type="submit"
                  color="secondary"
                  className="h-40 my-12"
                  disabled={_.isEmpty(dirtyFields) || !isValid || date === '' || selectExpense === null}
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
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
                variant="contained"
                onClick={handleSubmit(onSubmit)}
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

export default ExpenseDialog;
