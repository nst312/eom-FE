import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { assignManagerToEmployee, getEmployeeManager, updateManagerToEmployee } from '../../store/employeesDetailSlice';
import _ from '../../../../../../@lodash';

const schema = yup.object().shape({
  manager_name: yup.object().required('Select Employee'),
})

function AssignManager({ employeeList, employeeId }) {
  const [managerId, setManagerId] = useState('');
  const [employeeManagerTableId, setEmployeeManagerTableId] = useState(null)

  const defaultValues = {
    manager_name: '',
  };

  const { control, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  console.log(getValues())

  const { isValid, dirtyFields, errors } = formState;

  console.log('dirtyFields', dirtyFields)

  const dispatch = useDispatch();

  function onSubmit() {
    dispatch(
      assignManagerToEmployee({
        employeeId: Number(employeeId),
        managerId: getValues()?.manager_name?.id,
      })
    ).then((resp) => getEmployeeManagerFunction());
  }


  function onUpdate() {
    dispatch(
      updateManagerToEmployee({
        id: employeeManagerTableId,
        employeeId: Number(employeeId),
        managerId: getValues()?.manager_name?.id,
      })
    )
  }

  function getEmployeeManagerFunction() {
    dispatch(getEmployeeManager(employeeId)).then((resp) => {
      console.log(resp.payload)
      setManagerId(resp.payload[0]);
      setEmployeeManagerTableId(resp.payload[0].id)
    });
  }



  useEffect(() => {
    getEmployeeManagerFunction()
  }, []);

  return (
    <form className='mb-10'>
      <Controller
        name="manager_name"
        control={control}
        render={({ field: { onChange, value } }) => {
          let newData = employeeList.find((item) => item.id === managerId?.managerId);
          if (!newData) {
            newData = '';
          }
          return (
            <Autocomplete
              freeSolo
              options={employeeList || []}
              getOptionLabel={(option) => option?.users?.displayName || ''}
              value={newData}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Find Employee"
                  label="Manager Name"
                  className="mt-8 mb-16 mx-4"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />
      {!managerId ? (
        <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)} disabled={isValid ? false : true}>
          Assign
        </Button>
      ) : (
        <Button variant="contained" type="submit" onClick={handleSubmit(onUpdate)} disabled={_.isEmpty(dirtyFields)}>
          Update
        </Button>
      )}
    </form>
  );
}

export default AssignManager;
