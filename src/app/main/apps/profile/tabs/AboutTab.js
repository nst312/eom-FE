import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '@mui/material/Icon';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import moment from 'moment';
import _ from '../../../../../@lodash';
import { getUserProfile, updateUser } from '../store/profileSlice';
import { setUserData } from '../../../../auth/store/userSlice';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import FuseUtils from '../../../../../@fuse/utils';
import { showMessage } from '../../../../store/fuse/messageSlice';
import constants from '../../../../fuse-configs/constants';

const Root = styled('div')(({ theme }) => ({
  '& .productImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },

  '& .productImageUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  '& .productImageItem': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& .productImageFeaturedStar': {
        opacity: 0.8,
      },
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& .productImageFeaturedStar': {
        opacity: 1,
      },
      '&:hover .productImageFeaturedStar': {
        opacity: 1,
      },
    },
  },
}));

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function AboutTab({ data }) {
  console.log("data",data)
  const user = useSelector(({ auth }) => auth.user);
  const [imageUrl, setImageUrl] = useState({});
  const [isDisable, setDisable] = useState(true);
  const [shiftRules, setShiftRules] = useState([]);

  const shiftInTime = moment(
    shiftRules.employees?.attendanceRules[0]?.attendance.shiftInTime
  ).format('hA');
  console.log('shiftInTime', shiftInTime);
  const shiftOutTime = moment(
    shiftRules.employees?.attendanceRules[0]?.attendance.shiftOutTime
  ).format('hA');
  const durationCount = shiftRules.employees?.attendanceRules[0]?.attendance.durationCount;

  const shiftTimeData = `${shiftInTime}  -  ${shiftOutTime}`;

  const defaultValues = {
    firstName: (data && data.firstName) || '',
    lastName: (data && data.lastName) || '',
    middleName: (data && data.middleName) || '',
    displayName: (data && data.displayName) || '',
    email: (data && data.email) || '',
    // shiftTime: (data && data.shiftTime) || '',
  };
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { control, formState, getValues } = methods;

  const dispatch = useDispatch();

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    const uploadFile = {
      fileName: imageUrl,
      userId: user.id,
    };
    dispatch(getUserProfile(uploadFile)).then((res) => {
      setShiftRules(res.payload);
    });
  }, [dispatch]);

  const { reset, watch } = methods;
  const images = watch('images');

  useEffect(() => {
    if (!data) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(data);
  }, [data, reset]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const onUpdateUser = (model) => {
    const uploadFile = {
      fileName: imageUrl,
      userId: user.id,
    };
    dispatch(updateUser({ uploadFile, data: getValues() })).then((res) => {
      dispatch(
        setUserData({
          ...res.payload,
          company_name: data.companies[0].company_name,
        })
      );
    });
  };

  const handleSubmit = () => {
    const updateProfile = {
      firstName: getValues().firstName,
      middleName: getValues().middleName,
      lastName: getValues().lastName,
      displayName: getValues().displayName,
      avatar_url: getValues().avatar_url,
    };
    onUpdateUser(updateProfile);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="md:flex max-w-2xl">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Profile Information
                </Typography>
              </Toolbar>
            </AppBar>
            <div className="flex flex-col m-24">
              <div className="">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Email"
                      type="email"
                      name="email"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  )}
                />
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="First Name"
                      type="text"
                      name="firstName"
                      error={!!errors.firstName}
                      helperText={errors?.firstName?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Middle Name"
                      type="text"
                      name="middleName"
                      error={!!errors.middleName}
                      helperText={errors?.middleName?.message}
                      variant="outlined"
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
                      type="text"
                      name="lastName"
                      error={!!errors.lastName}
                      helperText={errors?.lastName?.message}
                      variant="outlined"
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
                      type="displayName"
                      error={!!errors.displayName}
                      helperText={errors?.displayName?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="shiftTime"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      value={data.employees?.attendanceRules.length === 0 ? '' : shiftTimeData}
                      label="Shift Time"
                      name="shiftTime"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  )}
                />
              </div>

              <Root>
                <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
                  <Controller
                    name="images"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <label
                        htmlFor="button-file"
                        className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                      >
                        <input
                          accept="image/*"
                          className="hidden"
                          id="button-file"
                          type="file"
                          onChange={async (e) => {
                            function readFileAsync() {
                              return new Promise((resolve, reject) => {
                                const file = e.target.files[0];
                                const extension = file.name
                                  .substring(file.name.lastIndexOf('.') + 1)
                                  .toLowerCase();
                                if (!file) {
                                  return;
                                }

                                if (
                                  extension === 'gif' ||
                                  extension === 'png' ||
                                  extension === 'bmp' ||
                                  extension === 'jpeg' ||
                                  extension === 'jpg'
                                ) {
                                  setImageUrl(file);
                                  const reader = new FileReader();

                                  reader.onload = () => {
                                    resolve({
                                      id: FuseUtils.generateGUID(),
                                      url: `data:${file.type};base64,${btoa(reader.result)}`,
                                      type: 'image',
                                    });
                                  };

                                  reader.onerror = reject;
                                  setDisable(false);
                                  reader.readAsBinaryString(file);
                                } else {
                                  setDisable(true);
                                  dispatch(
                                    showMessage({
                                      message: 'Only image allowed',
                                    })
                                  );
                                }
                              });
                            }

                            const newImage = await readFileAsync();

                            onChange([newImage]);
                          }}
                        />
                        <Icon fontSize="large" color="action">
                          cloud_upload
                        </Icon>
                      </label>
                    )}
                  />
                  {images ? (
                    <Controller
                      name="featuredImageId"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) =>
                        images?.map((media) => (
                          <div
                            onClick={() => onChange(value)}
                            onKeyDown={() => onChange(value.id)}
                            role="button"
                            tabIndex={0}
                            className={clsx(
                              'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                              media.id === value && 'featured'
                            )}
                            key={media.id}
                          >
                            <img
                              className="max-w-none w-auto h-full"
                              src={media?.url}
                              alt="product"
                            />
                          </div>
                        ))
                      }
                    />
                  ) : (
                    <Controller
                      name="featuredImageId"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <div
                          onClick={() => onChange(value)}
                          onKeyDown={() => onChange(value.id)}
                          role="button"
                          tabIndex={0}
                          className={clsx(
                            'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                            value && 'featured'
                          )}
                        >
                          <img
                            className="max-w-none w-auto h-full"
                            src={
                              user?.avatar_url && user?.avatar_url !== ''
                                ? `${constants.API_URL}/api/avatar/${user.avatar_url}`
                                : 'assets/images/avatars/profile.jpg'
                            }
                            alt="product"
                          />
                        </div>
                      )}
                    />
                  )}
                </div>
              </Root>
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  className="w-auto"
                  aria-label="Save Changes"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  onClick={() => handleSubmit()}
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default withReducer('userProfile', reducer)(AboutTab);
