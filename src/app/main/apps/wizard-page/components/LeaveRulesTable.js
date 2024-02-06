import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {Add, CancelOutlined} from '@mui/icons-material';
import Button from '@mui/material/Button';
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form';
import * as yup from 'yup';
import React, {useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import _ from "lodash";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';

const columns = [
  { id: 'name', label: 'Leave Name' },
  { id: 'maxLeavesAllowedInMonth', label: 'Month Leave', align: 'left' },
  { id: 'continuousLeavesAllowed', label: 'Continuous Leave', align: 'left' },
  { id: 'leavesAllowedInYear', label: 'Year Leave', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

const rows = [
  {
    name: 'Sick Leave',
    maxLeavesAllowedInMonth: 6,
    continuousLeavesAllowed:1,
    leavesAllowedInYear: 72,
  },
];

const leave = {
  name: '',
  maxLeavesAllowedInMonth: '',
  continuousLeavesAllowed: '',
  leavesAllowedInYear: '',
};

const schema = yup.object().shape({
  test: yup.array().of(
    yup
      .object()
      .shape({
        name: yup.string().required('Leave name required'),
        maxLeavesAllowedInMonth: yup.mixed().required('Leave count required'),
        continuousLeavesAllowed: yup.mixed().required('Leave count required'),
        leavesAllowedInYear: yup.mixed().required('Leave count required'),
      })
      .required('Must have fields')
  ),
});

let renderCount = 0;
const LeaveRulesTable = ({ setBulkLeave}) => {

  const [leaves, setLeaves] = useState(rows);

  const { control, formState, watch, getValues, handleSubmit, reset } = useForm({
    defaultValues: {
      test : leaves,
    },
    validationSchema: schema,
    mode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'test',
  });

  const value = useWatch({
    control,
    name: 'test',
  });

  const { errors } = formState;
  // eslint-disable-next-line no-plusplus
  renderCount++;

  useEffect(() => {
    const result = _.map(fields, object => {
      return _.omit(object, ['id'])
    })
    setBulkLeave(value);
  }, [fields]);



  return (
    <form >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {fields.length > 0 && (
            <TableBody>
              {fields.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell component="th" scope="row" align="left">
                      <FormControl>
                        <Controller
                          name={`test[${index}].name`}
                          defaultValue={`${row.name}`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              required
                              size="small"
                              error={!!errors.name}
                              helperText={errors.name?.message}
                            />
                          )}
                        />
                      </FormControl>
                    </TableCell>
                    <TableCell align="left">
                      <FormControl>
                        <Controller
                          name={`test[${index}].maxLeavesAllowedInMonth`}
                          defaultValue={`${row.maxLeavesAllowedInMonth}`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              required
                              size="small"
                              error={!!errors.maxLeavesAllowedInMonth}
                              helperText={errors?.maxLeavesAllowedInMonth?.message}
                            />
                          )}
                        />
                      </FormControl>
                    </TableCell>
                    <TableCell align="left">
                      <FormControl>
                        <Controller
                            name={`test[${index}].continuousLeavesAllowed`}
                            defaultValue={`${row.continuousLeavesAllowed}`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    required
                                    size="small"
                                    error={!!errors.continuousLeavesAllowed}
                                    helperText={errors?.continuousLeavesAllowed?.message}
                                />
                            )}
                        />
                      </FormControl>
                    </TableCell>
                    <TableCell align="left">
                      <FormControl>
                        <Controller
                            name={`test[${index}].leavesAllowedInYear`}
                            defaultValue={`${row.leavesAllowedInYear}`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    required
                                    size="small"
                                    error={!!errors.leavesAllowedInYear}
                                    helperText={errors?.leavesAllowedInYear?.message}
                                />
                            )}
                        />
                      </FormControl>
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => remove(index)}
                        endIcon={<CancelOutlined />}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Button
        className="mt-16"
        size="small"
        variant="text"
        onClick={() => append(leave)}
        startIcon={<Add />}
      >
        Add Another Leave Type
      </Button>
       {/*<pre>{JSON.stringify(getValues(), null, ' ')}</pre>*/}
    </form>
  );
};

export default LeaveRulesTable;
