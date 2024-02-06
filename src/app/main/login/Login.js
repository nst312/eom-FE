import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { darken, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { FormControlLabel } from '@mui/material';
import Divider from '@mui/material/Divider';

const Root = styled('div')(({ theme }) => ({
  '& .Login3-leftSection': {},

  '& .Login3-rightSection': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter an email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/, "Should have atleast 1 Lowercase, 1 Uppercase, 1 Number and 1 Symbol from (! @ # $ % ^ & *)"),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function Login() {
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);
  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { loading } = login;

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue('email', '', { shouldDirty: true, shouldValidate: false });
    setValue('password', '', { shouldDirty: true, shouldValidate: false });
  }, [reset, setValue, trigger]);

  useEffect(() => {
    login.errors.forEach((error) => {
      setError(error.type, {
        type: 'manual',
        message: error.message,
      });
    });
  }, [login.errors, setError]);

  function onSubmit(model) {
    dispatch(submitLogin(model));
  }

  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="Login3-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img className="logo-icon w-100" src="assets/images/logos/eom_logo.png" alt="logo" />
              </div>
            </motion.div>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel label="Remember Me" control={<Checkbox {...field} />} />
                    </FormControl>
                  )}
                />

                <Link className="font-normal" to="/forgot-Password">
                  Forgot Password?
                </Link>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16"
                aria-label="LOG IN"
                disabled={_.isEmpty(dirtyFields) || !isValid || loading}
                type="submit"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="flex flex-col my-24 flex items-center justify-center">
              <span className="font-normal">Don't have an account?</span>
              <Link className="font-normal" to="/register">
                Create an account
              </Link>
            </div>
            <div className="my-10 flex items-center justify-center">
              <Divider className="w-200" />
            </div>
            <div className="flex flex-col my-10 flex items-center justify-center">
              <a href="/privacy-policy" target="Privacy Policy">
                Privacy Policy
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="Login3-rightSection flex hidden md:flex flex-1 items-center justify-center p-64">
          <div className="max-w-320">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography
                color="inherit"
                className="text-32 sm:text-44 font-semibold leading-tight"
              >
                Hello and <br />
                Well-come to Co.Hora
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography variant="subtitle1" color="inherit" className="mt-32 font-medium">
                One Place for your all monthly activities and requirements. sign up and get in to know more...
              </Typography>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Root>
  );
}

export default Login;
