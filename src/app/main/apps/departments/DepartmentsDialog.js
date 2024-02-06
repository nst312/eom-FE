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
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {
  addDepartments,
  closeDepartmentDialog,
  editDepartments,
  getAllDepartments,
  getDepartments,
} from './store/DepartmentsSlice';
import { allJobPosition } from '../job-position/store/JobPositionSlice';

const defaultValues = {
  dept_id: '',
  department_name: '',
};

const schema = yup.object().shape({
  department_name: yup.string().required('You must enter department name'),
});

function DepartmentsDialog(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();
  const departDialog = useSelector(
    ({ DepartmentApp }) => DepartmentApp.department.DepartmentDialog
  );

  const [selectValue, setSelectValue] = useState(null);

  const { handleSubmit, formState, reset, control , getValues} = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const filter = createFilterOptions();
  const { errors, isValid, dirtyFields } = formState;

  const initDialog = useCallback(() => {
    if (props.selectedId) {
      reset({
        department_name: {
          department_name: props.data?.department_name,
        },
      });
      setIsEdit(true);
    } else {
      props.setSelectedId('');
      reset({
        ...defaultValues,
        ...departDialog.data,
      });
    }
  }, [departDialog.data, props.data, departDialog.type, reset]);

  useEffect(() => {
    dispatch(getDepartments()).then((res) => {
      setDepartments(res.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    if (departDialog.props.open) {
      initDialog();
    }
  }, [departDialog.props.open, initDialog, props.selectedId]);

  function closeDialog() {
    props.setSelectedId('');
    dispatch(closeDepartmentDialog());
  }

  const getAllDepartmentsDetails = () => {
    dispatch(getAllDepartments({ page: 1, perPage: 10 })).then((res) => {
      props.setIsLastPage(false);
      props.setDepartmentDetails(res.payload);
      props.setLoadingMore(false);
      props.setLoading(false);
    });
  };

  const getAllJobpositionDetails = () => {
    dispatch(allJobPosition({ page: 1, perPage: 10 })).then((res2) => {
      props.setLoadingMore(false);
      props.setLoading(false);
    });
  };

  function onSubmit() {
    const updateDepartment = {
      id: props.data?.id,
      department_name: selectValue,
    };
    props.setLoading(true);

    if (!isEdit) {
      dispatch(addDepartments(selectValue)).then((res) => {
        if (res.payload) {
          closeDialog();
          getAllDepartmentsDetails();
          props.setIsAdd(true);
          props.setLoading(false);
        } else {
          props.setLoading(false);
        }
      });
    } else {
      dispatch(editDepartments(updateDepartment)).then((res) => {
        if (res.payload) {
          closeDialog();
          getAllDepartmentsDetails();
          getAllJobpositionDetails()
          props.setIsAdd(true);
          props.setLoading(false);
        } else {
          props.setLoading(false);
        }
      });
    }
  }

  return (
    <Dialog {...departDialog.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography
            variant="subtitle1"
            color="inherit"
            onClick={() => {
              dispatch(closeDepartmentDialog());
            }}
          >
            Department
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: 'p-0' }}>
          <div className="px-16 mt-16 sm:px-24">
            <FormControl className="mt-8 mb-16" fullWidth>
              <Controller
                name="department_name"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    className="mt-8 mb-16 w-full"
                    freeSolo
                    value={props.selectedId ? props.data?.department_name : selectValue}
                    options={departments}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option;
                      }
                      if (option.department_name) {
                        return option.department_name;
                      }

                      return option.department_name;
                    }}
                    onChange={(event, newValue) => {
                      props.setSelectedId('');
                      setSelectValue(newValue);
                      if (typeof newValue === 'string') {
                        setSelectValue({
                          department_name: newValue,
                        });
                      } else if (newValue && newValue.inputValue) {
                        setSelectValue({
                          department_name: newValue.inputValue,
                        });
                      } else {
                        setSelectValue(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      const { inputValue } = params;

                      const isExisting = options.some(
                        (option) => inputValue === option.department_name
                      );
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          inputValue,
                          department_name: `Add "${inputValue}"`,
                        });
                      }

                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="department_name"
                        label="Add Department"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </div>
        </DialogContent>
        {departDialog.type === 'new' ? (
          <DialogActions className="justify-end px-8 py-16">
            <div className="px-16">
              <Button
                className="h-40 my-12"
                disabled={!selectValue}
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
                disabled={!selectValue}
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

export default DepartmentsDialog;
