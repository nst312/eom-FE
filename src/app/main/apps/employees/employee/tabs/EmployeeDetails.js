import { Controller, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { updateEmployeeDetails, getAllEmployee } from '../../store/employeesDetailSlice';
import _ from '../../../../../../@lodash';
import { getAllDepartment } from '../../store/employeeSlice';
import { allJobPosition } from '../../../job-position/store/JobPositionSlice';
import AssignManager from './AssignManager';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number must be 10 digits')
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits'),

  personal_email: yup
    .string()
    .email('You must enter a valid email')
    .required('You must enter a email'),
});

function EmployeeDetails({ employeeData, employeesList }) {
  // const helperTestClasses = helperTextStyles();
  const [jobPositionData, setJobPositionData] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const options = jobPositionData.map((option) => {
    const firstLetter = option.company_department.department_name.toUpperCase();
    return {
      firstLetter,
      ...option,
    };
  });

  const dispatch = useDispatch();

  const defaultValues = {
    firstName: (employeeData && employeeData.firstName) || '',
    middleName: (employeeData && employeeData.middleName) || '',
    lastName: (employeeData && employeeData.lastName) || '',
    profile_email: (employeeData && employeeData.profile_email) || '',
    jobPositionId: (employeeData && employeeData?.jobPositionId) || '',
    birth_date: (employeeData && employeeData?.birth_date) || '',
    joining_date: (employeeData && employeeData?.joining_date) || '',
    empType: (employeeData && employeeData?.empType) || '',
    employee_code: (employeeData && employeeData?.empType) || '',
  };
  const [departments, setDepartments] = useState([]);
  const [selectJobValue, setSelectJobValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const optiones = [
    { label: 'INTERN', value: 'INTERN' },
    { label: 'ON PROBATION', value: 'ON_PROBATION' },
    { label: 'PERMANENT', value: 'PERMANENT' },
  ];

  const { control, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const routeParams = useParams();
  const { isValid, dirtyFields, errors } = formState;
  const helperText = 'Job position is required';

  useEffect(() => {
    getAllJobPosition();
  }, []);

  const getAllJobPosition = () => {
    dispatch(allJobPosition({ page: 1, perPage: 50 })).then((res) => {
      if (res.payload) {
        setJobPositionData(res.payload);
      } else {
        setJobPositionData([]);
      }
    });
  };

  useEffect(() => {
    if (!employeeData) {
      return;
    }
    /**
     * Reset the form on product state changes
     */

    if (employeeData.jobPosition) {
      setSelectJobValue(
        `${employeeData.jobPosition?.company_department?.department_name} - ${employeeData?.jobPosition?.jobPosition}`
      );
    } else {
      setSelectJobValue('');
    }
    reset(employeeData);
  }, [employeeData, reset]);

  useEffect(() => {
    dispatch(getAllDepartment()).then((res) => {
      setDepartments(res.payload.data);
    });
  }, [dispatch]);

  const onSubmit = (emp) => {
    const _data = getValues();

    let i = 0;
    const strLength = _data.empType.length;
    for (i; i < strLength; i++) {
      _data.empType = _data.empType.replace(' ', '_').toUpperCase();
    }
    const data = {
      id: routeParams.employeeId,
      data: {
        firstName: emp.users.firstName,
        middleName: emp.users.middleName,
        lastName: emp.users.lastName,
        personal_email: emp.personal_email,
        work_email: emp.work_email,
        phone: emp.phone,
        phone2: emp.phone2,
        joining_date: emp.joining_date,
        birth_date: emp.birth_date,
        jobPositionId: selectJobValue.id || emp.jobPositionId,
        employee_code: emp.employee_code,
      },
      empType: _data.empType,
    };

    if (selectJobValue === '') {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      dispatch(updateEmployeeDetails(data));
    }
  };

  useEffect(() => {
      const filterEmployeeList = employeesList.filter((item) => item.id !== Number(routeParams.employeeId))
      setEmployeeList(filterEmployeeList);
  }, []);

  return (
    <>
      <AssignManager employeeList={employeeList} employeeId={routeParams.employeeId} />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <div className="flex -mx-4 gap-4">
          <Controller
            name="users.firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                placeholder="First Name"
                label="First Name"
              />
            )}
          />

          <Controller
            name="users.middleName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                placeholder="Middle Name"
                label="Middle Name"
              />
            )}
          />

          <Controller
            name="users.lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                placeholder="Last Name"
                label="Last Name"
              />
            )}
          />
        </div>

        <div className="flex -mx-4">
          <Controller
            name="personal_email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                required
                error={!!errors.personal_email}
                helperText={errors?.personal_email?.message}
                variant="outlined"
                fullWidth
                placeholder="Personal Email"
                label="Personal Email"
              />
            )}
          />

          <Controller
            name="work_email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                error={!!errors.work_email}
                helperText={errors?.work_email?.message}
                variant="outlined"
                fullWidth
                placeholder="Work Email"
                label="Work Email"
                disabled
              />
            )}
          />
        </div>

        <div className="flex -mx-4">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                required
                error={!!errors.phone}
                helperText={errors?.phone?.message}
                variant="outlined"
                fullWidth
                placeholder="Phone Number"
                label="Phone Number"
                type="number"
              />
            )}
          />

          <Controller
            name="phone2"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                placeholder="Phone Number2"
                label="Phone Number2"
                type="number"
              />
            )}
          />

          <Controller
            name="employee_code"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                placeholder="Employee Code"
                label="Employee Code"
              />
            )}
          />
        </div>

        <div className="flex -mx-4">
          <Controller
            name="joining_date"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  {...field}
                  label="Joining Date"
                  renderInput={(params) => (
                    <TextField className="mt-8 mb-16 mx-4" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="birth_date"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  {...field}
                  label="Birth Date"
                  renderInput={(params) => (
                    <TextField className="mt-8 mb-16 mx-4" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </div>

        <div className="flex -mx-4">
          <Controller
            name="jobPosition"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name }, fieldState: { error } }) => {
              return (
                <Autocomplete
                  id="grouped-demo"
                  value={selectJobValue}
                  className="w-1/2 mt-8 mb-16 mx-4"
                  options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (option.jobPosition) {
                      return option.jobPosition;
                    }
                    return option.jobPosition;
                  }}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      onChange(newValue);
                      setSelectJobValue(newValue);
                    } else {
                      setSelectJobValue('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Job Position"
                      id="jobPosition"
                      name="jobPosition"
                      required
                      fullWidth
                      error={!!errors.jobPosition}
                      helperText={errorMessage && helperText}
                      FormHelperTextProps={{ style: { color: 'red' } }}
                      variant="outlined"
                      placeholder="jobPosition"
                    />
                  )}
                />
              );
            }}
          />

          <Controller
            name="empType"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                id="grouped-demo"
                options={optiones}
                className="w-1/2 mt-8 mb-16 mx-4"
                required
                // value={value}
                value={value.replaceAll('_', ' ')}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.label) {
                    return option.label;
                  }
                  return option.label;
                }}
                onChange={(event, newValue) => {
                  onChange(newValue.label);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    error={!!errors.empType}
                    helperText={errors?.empType?.message}
                    FormHelperTextProps={{ style: { color: 'red' } }}
                    variant="outlined"
                    placeholder="Emp Type"
                  />
                )}
              />
            )}
          />
        </div>

        <div className="flex justify-end mt-9">
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            type="submit"
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Save
          </Button>
        </div>
        {/* <pre>{JSON.stringify(getValues(), null, ' ')}</pre> */}
      </form>
    </>
  );
}

export default EmployeeDetails;
