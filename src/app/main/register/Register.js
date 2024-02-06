import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { darken, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
// import { submitRegister } from 'app/auth/store/registerSlice';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Icon, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { submitRegister } from '../../auth/store/registerSlice';
import logo from '../../../images/eom_logo.png';

const Root = styled('div')(({ theme }) => ({
  '& .Register3-leftSection': {},

  '& .Register3-rightSection': {
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
  firstName: yup
    .string()
    .trim('The contact name cannot include leading and trailing spaces')
    .required('Please enter your First Name '),
  lastName: yup
    .string()
    .trim('The contact name cannot include leading and trailing spaces')
    .required('Please enter your Last Name '),
  displayName: yup
    .string()
    .trim('The contact name cannot include leading and trailing spaces')
    .required('Please enter your Display Name – It will be shown as your username in the portal '),
  company_name: yup
    .string()
    .trim('The contact name cannot include leading and trailing spaces')
    .required('Please enter your Company’s Name '),
  email: yup.string().email('Incorrect Format ').required('Please enter your email address  '),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Entered Password is too Short – Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters..')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/,
      'Should have atleast 1 Lowercase, 1 Uppercase, 1 Number and 1 Symbol from (! @ # $ % ^ & *)'
    ),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'The Password does not match'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  displayName: '',
  company_name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTermsConditions: false,
};

function Register() {
  const dispatch = useDispatch();
  const register = useSelector(({ auth }) => auth.register);
  const { loading } = register;
  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue('email', '', { shouldDirty: true, shouldValidate: false });
  }, [reset, setValue, trigger]);

  useEffect(() => {
    register.errors.forEach((error) => {
      setError(error.type, {
        type: 'manual',
        message: error.message,
      });
    });
  }, [register.errors, setError]);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(model) {
    // dispatch(submitRegister(model)).then((res) => {
    //   console.log('res', res);
    //   dispatch(showMessage({ message: `Your account is successfully created ${model.firstName}` }));
    //   history.push({
    //     pathname: '/apps/wizard-page',
    //   });
    // });
    dispatch(submitRegister(model))
  }

  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="Register3-leftSection  flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img src={logo} alt='' />
                {/*<img*/}
                {/*  className="logo-icon w-100"*/}
                {/*  src="assets/images/logos/eom_logo.png"*/}
                {/*  alt="logo"*/}
                {/*/>*/}
              </div>
            </motion.div>

            <form
              name="registerForm"
              noValidate
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="First Name"
                    type="name"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Last Name"
                    type="name"
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="displayName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Display Name"
                    type="name"
                    error={!!errors.displayName}
                    helperText={errors?.displayName?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              <Controller
                name="company_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Company Name"
                    type="name"
                    error={!!errors.company_name}
                    helperText={errors?.company_name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              {/* <pre>{JSON.stringify(getValues(), null, ' ')}</pre> */}

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
                    InputProps={{
                      className: 'pr-2',
                      type: showCurrentPassword ? 'text' : 'password',
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            size="large"
                          >
                            <Icon className="text-20" color="action">
                              {showCurrentPassword ? 'visibility' : 'visibility_off'}
                            </Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                    label="Password (Confirm)"
                    type="password"
                    error={!!errors.passwordConfirm}
                    helperText={errors?.passwordConfirm?.message}
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      className: 'pr-2',
                      type: showConfirmPassword ? 'text' : 'password',
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            size="large"
                          >
                            <Icon className="text-20" color="action">
                              {showConfirmPassword ? 'visibility' : 'visibility_off'}
                            </Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name="acceptTermsConditions"
                control={control}

                render={({ field }) => (
                  <FormControl  className="items-center" error={!!errors.acceptTermsConditions}>
                    <FormControlLabel
                      label={
                        <p  className="text-xs" >
                          {' '}
                          I have Read & accept the{' '}
                          <a href="/terms-condition" target="Terms & Condition">
                            {' '}
                            Tearms & Conditions{' '}
                          </a>
                        </p>
                      }
                      control={<Checkbox {...field} />}
                    />
                    <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                  </FormControl>
                )}
              />

              <Button
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFields) || !isValid || loading}
                type="submit"
              >
                {loading ? 'Creating an account...' : 'Create an account'}
              </Button>
            </form>

            <div className="flex flex-col my-24 flex items-center justify-center">
              <span className="font-normal">Already have an account?</span>
              <Link className="font-normal" to="/login">
                Login
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

        <div className="Register3-rightSection hidden md:flex flex-1 items-center justify-center p-64">
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
                The Employee of the month is just a small term. You are the star of our team who
                shines and inspires us every single day.
              </Typography>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Root>
  );
}

export default Register;
