import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { styled, darken } from '@mui/material/styles';
import { forgetPassword } from './store/forgotPasswordSlice';

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
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const defaultValues = {
  email: '',
};

function ForgetPassword() {
  const { control, setValue, formState, handleSubmit, trigger, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const forgotPassword = useSelector(({ forgotPasswordApp }) => forgotPasswordApp.forgotPassword);
  const { isValid, dirtyFields, errors } = formState;
  const dispatch = useDispatch();

  useEffect(() => {
    setValue('email', '', { shouldDirty: true, shouldValidate: false });
  }, [reset, setValue, trigger]);

  useEffect(() => {
    forgotPassword.errors.forEach((error) => {
      setError(error.type, {
        type: 'manual',
        message: error.message,
      });
    });
  }, [forgotPassword.errors, setError]);

  function onSubmit(values) {
    dispatch(forgetPassword(values));
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
                name="recoverForm"
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
                        autoFocus
                        type="email"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    className="w-224 mx-auto mt-16"
                    aria-label="Reset"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                  >
                      Send reset link
                  </Button>
              </form>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                  <Link className="font-normal" to="/login">
                      Go back to login
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
                  We all forger things. Keep Calm and reset here...
              </Typography>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Root>
  );
}

export default ForgetPassword;
