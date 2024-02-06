import React, {useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {Icon, InputAdornment} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import {darken, styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {motion} from 'framer-motion';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import _ from '../../../../@lodash'

const Root = styled('div')(({theme}) => ({
    '& .Login3-leftSection': {},

    '& .Login3-rightSection': {
        background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
            theme.palette.primary.dark,
            0.5
        )} 100%)`,
        color: theme.palette.primary.contrastText,
    },
}));

const schema = yup.object().shape({
    password: yup
        .string()
        .required('Please enter your password.')
        .min(6, 'Password is too short - should be 6 chars minimum.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/,
            'Should have atleast 1 Lowercase, 1 Uppercase, 1 Number and 1 Symbol from (! @ # $ % ^ & *)'
        ),
  newPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const defaultValues = {
    password: '',
    newPassword: '',
};

function ResetPassword(props) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {control, formState, handleSubmit} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const {isValid, dirtyFields, errors} = formState;

    const onSubmit = (data) => {
        props.onDataSubmit(data)
    };

    return (
        <Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
            <motion.div
                initial={{opacity: 0, scale: 0.6}}
                animate={{opacity: 1, scale: 1}}
                className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
            >
                <Card
                    className="Login3-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
                    square
                >
                    <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1, transition: {delay: 0.2}}}
                        >
                            <div className="flex items-center mb-48">
                                <img
                                    className="logo-icon w-100"
                                    src="assets/images/logos/eom_logo.png"
                                    alt="logo"
                                />
                            </div>
                        </motion.div>
                        <form
                            name="newPassWordForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="password"
                                control={control}
                                render={({field}) => (
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
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        size='large'>
                                                        <Icon className='text-20' color='action'>
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
                                name="newPassword"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className="mb-16"
                                        label="Confirm Password"
                                        type="password"
                                        error={!!errors.newPassword}
                                        helperText={errors?.newPassword?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            className: 'pr-2',
                                            type: showConfirmPassword ? 'text' : 'password',
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        size='large'>
                                                        <Icon className='text-20' color='action'>
                                                            {showConfirmPassword ? 'visibility' : 'visibility_off'}
                                                        </Icon>
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16"
                                aria-label="LOG IN"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                type="submit"
                            >
                                Reset Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <div className="Login3-rightSection flex hidden md:flex flex-1 items-center justify-center p-64">
                    <div className="max-w-320">
                        <motion.div
                            initial={{opacity: 0, y: 40}}
                            animate={{opacity: 1, y: 0, transition: {delay: 0.2}}}
                        >
                            <Typography
                                color="inherit"
                                className="text-32 sm:text-44 font-semibold leading-tight"
                            >
                                Welcome <br/>
                                to the <br/> Employee of the Month!
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1, transition: {delay: 0.3}}}
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

export default ResetPassword;
