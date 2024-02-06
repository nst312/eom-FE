import {Controller, get, useForm} from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@mui/material/InputAdornment';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addEmployeeSalaryDetails, updateEmployeeSalaryDetails } from '../../store/empSalarySlice';
import FuseLoading from '../../../../../../@fuse/core/FuseLoading';
import Autocomplete from "@mui/material/Autocomplete";

const schema = yup.object().shape({
  basic: yup.number().typeError('basic is required').positive().integer().required(),
});

const EmployeeSalary = (props) => {
  const { isEditable, getSalaryListData, handleClickEditable, empData, employeeData } = props;

  const dispatch = useDispatch();
  // const empData = useSelector(({ eomApp }) => eomApp?.empSalary?.data);
  const defaultValues = {
    gross: isEditable
      ? empData.length !== 0 && empData[0]?.gross === 0
        ? null
        : empData && empData[0]?.gross
      : null,
    hra: isEditable
      ? empData.length !== 0 && empData[0].hra === 0
        ? null
        : empData.length !== 0 && empData[0].hra
      : null,
    specialAllowance: isEditable
      ? empData.length !== 0 && empData[0].specialAllowance === 0
        ? null
        : empData.length !== 0 && empData[0].specialAllowance
      : null,
    basic: isEditable
      ? empData.length !== 0 && empData[0].basic === 0
        ? null
        : empData.length !== 0 && empData[0].basic
      : null,
    conveyance: isEditable
      ? empData.length !== 0 && empData[0].conveyance === 0
        ? null
        : empData.length !== 0 && empData[0].conveyance
      : null,
    lta: isEditable
      ? empData.length !== 0 && empData[0].lta === 0
        ? null
        : empData.length !== 0 && empData[0].lta
      : null,
    medical: isEditable
      ? empData.length !== 0 && empData[0].medical === 0
        ? null
        : empData.length !== 0 && empData[0].medical
      : null,
    professionalTax: isEditable
      ? empData.length !== 0 && empData[0].professionalTax === 0
        ? null
        : empData.length !== 0 && empData[0].professionalTax
      : null,
    tds: isEditable
      ? empData.length !== 0 && empData[0].tds === 0
        ? null
        : empData.length !== 0 && empData[0].tds
      : null,
      month: isEditable
          ? empData.length !== 0 && empData[0].month === 0
              ? null
              : empData.length !== 0 && empData[0].month
          : null,
      leave: isEditable
          ? empData.length !== 0 && empData[0].leave === 0
              ? null
              : empData.length !== 0 && empData[0].leave
          : null,

  };
  const [loading, setLoading] = useState(false);

  const routeParams = useParams();
  const { control, reset, handleSubmit, formState, getValues, register, watch, setValue } = useForm(
    {
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema),
    }
  );
  const watchAllFields = watch();

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (!defaultValues) {
      return;
    }
    reset(defaultValues);
  }, [empData, reset, isEditable]);

  useEffect(() => {}, [getValues]);

  const onSubmit = () => {

    if (isEditable) {
      dispatch(
        updateEmployeeSalaryDetails({ id: empData && empData[0]?.id, data: getValues() })
      ).then((res) => {
        setLoading(true);
        if (res.payload) {
          getSalaryListData();
          setLoading(false);
        }
      });
    } else {
      dispatch(addEmployeeSalaryDetails({ empId: routeParams.employeeId, data: getValues() })).then(
        (res) => {
          setLoading(true);
          if (res.payload) {
            getSalaryListData();
            setLoading(false);
          }
          handleClickEditable(true);
        }
      );
    }
  };

  if (loading) {
    return <FuseLoading />;
  }

  const totalCount =
    getValues().basic +
    getValues().hra +
    getValues().specialAllowance +
    getValues().conveyance +
    getValues().medical;

  const checkTotal = getValues().gross === Math.round(totalCount);

  const leave =  getValues().gross/30
    const leave1 = leave * getValues().leave

  const totalSalary =
      (getValues().basic +
    getValues().hra +
    getValues().specialAllowance +
    getValues().conveyance +
    getValues().medical -
    getValues().professionalTax) ;

  const netSalary = (getValues().gross * getValues().tds) / 100;
  const netTotal = Math.round(getValues().gross - netSalary - getValues().professionalTax -leave1) ;

  const tdsCalculate = getValues().gross >= 58334 ? netTotal : totalSalary;

  const netPaySalary = totalSalary - tdsCalculate- leave1;

  const professionalTax = () => {
    if (employeeData.type !== 'INTERN') {
      if (getValues().gross >= 12000) {
        return setValue('professionalTax', 200);
      }
      if (getValues().gross >= 9000 && getValues().gross < 12000) {
        return setValue('professionalTax', 150);
      }
      if (getValues().gross >= 6000 && getValues().gross < 9000) {
        return setValue('professionalTax', 80);
      }
      if (getValues().gross >= 3000 && getValues().gross < 6000) {
        return setValue('professionalTax', 20);
      }
      return setValue('professionalTax', 0);
    }
  };

  const onHandleChange = (e) => {
    const totalTds = e * 12;
    setValue('gross', e);
    setValue('hra', (e * 20) / 100);
    setValue('specialAllowance', (e * 10) / 100);
    setValue('medical', (e * 5) / 100);
    setValue('basic', (e * 60) / 100);
    setValue('conveyance', (e * 5) / 100);
    professionalTax();
    if (totalTds >= 58334 * 12) {
      setValue('tds', 10);
    } else {
      setValue('tds', 0);
    }
  };
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];


  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
          <div className="flex -mx-4">
              <Controller
                  name="month"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <Autocomplete
                          className="mt-8 mb-16 mx-3"
                          freeSolo
                           options={months}
                          value={value}
                          onChange={(event, newValue) => {
                              if (newValue) {
                                  onChange(newValue);
                              }
                          }}
                          fullWidth
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  placeholder="Month"
                                  label="Month"
                                  variant="outlined"
                                  error={!!errors.name}
                                  helperText={errors?.name?.message}
                                  InputLabelProps={{
                                      shrink: true,
                                  }}
                              />
                          )}
                      />
                  )}
              />
          </div>
        <div className="flex -mx-4">


          <Controller
            name="gross"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('gross', {
                  valueAsNumber: true,
                })}
                onChange={(e) => onHandleChange(e.target.value)}
                required
                className="mt-8 mb-16 mx-4"
                error={!!errors.gross}
                helperText={errors?.gross?.message}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="gross"
                label="Gross Salary"
                type="number"
              />
            )}
          />
          <Controller
            name="basic"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('basic', {
                  valueAsNumber: true,
                })}
                required
                className="mt-8 mb-16 mx-4"
                error={!!errors.basic}
                helperText={errors?.basic?.message}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Basic"
                label="Basic Salary"
                type="number"
              />
            )}
          />
        </div>
        <div className="flex -mx-4">
          <Controller
            name="hra"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('hra', {
                  valueAsNumber: true,
                })}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="HRA"
                label="HRA"
                type="number"
              />
            )}
          />

          <Controller
            name="specialAllowance"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('specialAllowance', {
                  valueAsNumber: true,
                })}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Special Allowance"
                label="Special Allowance"
                type="number"
              />
            )}
          />
        </div>

        <div className="flex -mx-4">
          <Controller
            name="conveyance"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('conveyance', {
                  valueAsNumber: true,
                  required: true,
                })}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="conveyance"
                label="Conveyance"
                type="number"
              />
            )}
          />
          <Controller
            name="medical"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('medical', {
                  valueAsNumber: true,
                })}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Medical"
                label="Medical"
                type="number"
              />
            )}
          />
        </div>

        <div className="flex -mx-4">
          <Controller
            name="professionalTax"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('professionalTax', {
                  valueAsNumber: true,
                })}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Professional Tax"
                label="Professional Tax"
                type="number"
              />
            )}
          />

          <Controller
            name="tds"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('tds', {
                  valueAsNumber: true,
                })}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Tds"
                label="TDS"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            )}
          />
            <Controller
                name="leave"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        {...register('leave', {
                            valueAsNumber: true,
                        })}
                        className="mt-8 mb-16 mx-4"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="leave"
                        label="leave"
                        type="number"
                    />
                )}
            />


        </div>
        <div className="flex -mx-4">
          <Controller
            name="NetPay"
            control={control}
            render={({ field }) => (
              <TextField
                className="mt-8 mb-16 mx-4"
                value={netTotal}
                disabled
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="NetPay"
                label="Net Pay"
                type="number"
              />
            )}
          />
        </div>
        {getValues().gross < tdsCalculate && !checkTotal && (
          <Typography className="text-red">
            Please Manage Salary Details based on Gross salary
          </Typography>
        )}
        <div className="flex justify-end">
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={!checkTotal}
            type="submit"
          >
            {isEditable ? 'Update' : 'Save'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EmployeeSalary;
