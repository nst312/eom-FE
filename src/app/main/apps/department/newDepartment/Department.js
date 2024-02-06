import FusePageCarded from '@fuse/core/FusePageCarded';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import DepartmentHeader from './DepartmentHeader';
import {
  addDepartments,
  editDepartments,
  getAllDepartments,
  getDepartment,
  removeDepartments,
} from '../store/DepartmentSlice';
import reducer from '../store';
import withReducer from '../../../../store/withReducer';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
}));

const schema = yup.object().shape({
  department_name: yup.string().required('Enter department name.'),
});

function Department() {
  const [tabValue, setTabValue] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [selectValue, setSelectValue] = useState(null);
  const [allDept, setAllDept] = useState([]);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const filter = createFilterOptions();
  const [fields, setFields] = useState('');

  const dispatch = useDispatch();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { control } = methods;

  const updateDepartment = (id, departmentName) => {
      setSelectValue('')
    setInEditMode({
      status: true,
      rowKey: id,
    });

    setFields(departmentName);
  };

  const submitDepartment = (id, departmentName) => {
    const data = {
      deptId: id,
      departmentName,
    };
    if (departmentName !== '') {
      dispatch(editDepartments(data)).then((res) => {
        if (res.payload) {
          setInEditMode({
            status: false,
            rowKey: null,
          });
          const newArr = [...allDept];
          const index = newArr.findIndex((item) => item.id === id);
          newArr.splice(index, 1, { ...res.payload });
          setAllDept(newArr);
        } else {
          // Todo: need to check;
        }
      });
    }
  };

  useEffect(() => {
    dispatch(getAllDepartments()).then((res) => {
      setAllDept(res.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDepartment()).then((res) => {
      setDepartments(res.payload);
    });
  }, [dispatch]);

  function onSubmit() {
    dispatch(addDepartments(selectValue)).then((res) => {
      if (res.payload) {
        const newArr = [...allDept];
        setAllDept([...newArr, res.payload]);
        setSelectValue(null);
      } else {
        // Todo: need to check;
      }
    });
  }

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  const removeDepartment = (id) => {
    dispatch(removeDepartments(id)).then((res) => {
      if (res) {
        const newArr = [...allDept];
        const data = newArr.filter((el) => el.id !== id);
        setAllDept(data);
      }
    });
  };

  const sortArr = allDept.sort(function (a, b) {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });

  return (
    <FormProvider {...methods}>
      <Root
        header={<DepartmentHeader />}
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64' }}
          />
        }
        content={
          <div className="p-16 sm:p-24 max-w-full">
            <div className="flex gap-10">
              <Controller
                name="department_name"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    className="mt-8 mb-16 w-full sm:w-1/4"
                    freeSolo
                    value={selectValue}
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
                        setInEditMode({
                            status: false,
                            rowKey: null
                        })
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

              <Button
                className="h-40 my-12"
                disabled={!selectValue}
                variant="contained"
                onClick={onSubmit}
              >
                Add
              </Button>
            </div>

            {sortArr.map((item, idx) => {
              return (
                <div key={`${item}-${idx}`}>
                  <FormControl className="mt-8 mb-16 sm:w-1/4 contents" required fullWidth>
                    {inEditMode.status && inEditMode.rowKey === item.id ? (
                      <>
                        <Controller
                          name="department_name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              className='w-3/12'
                              {...field}
                              label="Edit Department"
                              autoFocus
                              required
                              variant="outlined"
                              onChange={(event) => {
                                setFields(event.target.value);
                              }}
                              value={fields}
                            />
                          )}
                        />
                          <Button
                              className="h-40 my-12 ml-10"
                              variant="contained"
                              onClick={() => submitDepartment(item.id, fields)}
                          >
                            Save
                          </Button>

                          <Button
                              className="h-40 my-12 ml-10"
                              variant="contained"
                              onClick={() => setInEditMode({ status: false })}
                          >
                            Cancel
                          </Button>

                      </>
                    ) : (
                      <>
                        <div className="mt-8 mb-16 flex">
                          <div className="mt-8 mb-16 sm:w-1/4">
                            <Typography className="mt-8 mb-16">
                              {item?.department_name || ''}
                            </Typography>
                          </div>

                          <Button
                            className="h-40 my-12 ml-10"
                            variant="contained"
                            onClick={() => updateDepartment(item.id, item.department_name)}
                          >
                            Edit
                          </Button>

                          <Button
                            className="h-40 my-12 ml-10"
                            variant="contained"
                            onClick={() => removeDepartment(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </FormControl>
                </div>
              );
            })}
          </div>
        }
      />
    </FormProvider>
  );
}

export default withReducer('departmentApp', reducer)(Department);
