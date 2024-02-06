import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import IconButton from '@mui/material/IconButton';

import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { resetPassword } from '../store/resetPasswordSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  password: yup.string().required('You must enter a Password'),

  newPassword: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/, "Should have atleast 1 Lowercase, 1 Uppercase, 1 Number and 1 Symbol from (! @ # $ % ^ & *)"),

  passwordConfirm: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/, "Should have atleast 1 Lowercase, 1 Uppercase, 1 Number and 1 Symbol from (! @ # $ % ^ & *)"),
});

const defaultValues = {
  password: '',
  newPassword: '',
};

function ResetPasswordPage() {
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const dispatch = useDispatch();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    dispatch(resetPassword(data));
  }

  return (
    <div className="flex flex-col flex-auto items-center justify-center p-16 sm:p-32">
      <div className="flex flex-col items-center justify-center w-full">
        <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
          <AppBar position="static" elevation={0}>
            <Toolbar className="px-8">
              <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
                Change password
              </Typography>
            </Toolbar>
          </AppBar>

          <div className="flex flex-col m-24">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  label="Current Password"
                  type="password"
                  name="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  // required
                  fullWidth
                />
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  label="New Password"
                  type="password"
                  name="newPassword"
                  error={!!errors.newPassword}
                  helperText={errors?.newPassword?.message}
                  InputProps={{
                    className: 'pr-2',
                    type: showPassword ? 'text' : 'password',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                          <Icon className="text-20" color="action">
                            {showPassword ? 'visibility' : 'visibility_off'}
                          </Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  // required
                  fullWidth
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  label="Confirm Password"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  InputProps={{
                    className: 'pr-2',
                    type: showConfirmPassword ? 'text' : 'password',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} size="large">
                          <Icon className="text-20" color="action">
                            {showConfirmPassword ? 'visibility' : 'visibility_off'}
                          </Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
              <div className="flex justify-end">
                  <Button
                      variant="contained"
                      color="primary"
                      className="w-auto"
                      aria-label="Reset"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                  >
                      Update
                  </Button>
              </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
