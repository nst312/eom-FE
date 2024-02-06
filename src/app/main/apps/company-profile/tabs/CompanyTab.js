import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Icon from '@mui/material/Icon';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import _ from '../../../../../@lodash';
import withReducer from '../../../../store/withReducer';
import reducer from '../store/index';
import { updateCompany } from '../store/companyDetailsSlice';
import { setUserData } from '../../../../auth/store/userSlice';
import FuseUtils from '../../../../../@fuse/utils';
import { showMessage } from '../../../../store/fuse/messageSlice';
import constants from '../../../../fuse-configs/constants';
import PERMISSION from '../../../../fuse-configs/permission.constants';

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
  company_name: yup.string().required('Enter company name.'),
  email: yup.string().email('You must enter a valid email').required('Enter email address.'),
  gstin: yup.string().min(15, 'gst must be 15 digits'),
});

function CompanyTab({ isDisable }) {
  const user = useSelector(({ auth }) => auth.user);
  const companyData = useSelector(({ companyApp }) => companyApp?.companyProfile);
  console.log('companyData', companyData);
  const [imageUrl, setImageUrl] = useState({});
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { control, formState, getValues, register, watch } = methods;
  const { errors, isValid, dirtyFields } = formState;

  const { reset } = methods;

  useEffect(() => {
    if (!companyData) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(companyData);
  }, [companyData, reset]);

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const images = watch('images');

  const handleSubmit = () => {
    const comId = {
      id: companyData.id,
    };
    const uploadFile = {
      fileName: imageUrl,
      userId: user.id,
    };
    dispatch(updateCompany({ comId, uploadFile, data: getValues() })).then((res) => {
      dispatch(
        setUserData({ ...user, company_name: res.payload.company_name, email: user?.email })
      );
    });
  };

  return (
    <>
      <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
        <AppBar position="static" elevation={0}>
          <Toolbar className="px-8">
            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
              Company
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="flex flex-col m-24">
          <div className="flex -mx-4">
            <Controller
              name="company_name"
              control={control}
              defaultValue
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  required
                  error={!!errors.company_name}
                  helperText={errors?.company_name?.message}
                  variant="outlined"
                  id="company_name"
                  fullWidth
                  name="company_name"
                  placeholder="Registered Company Name"
                  label="Registered Company Name"
                  disabled={isDisable}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  required
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  id="email"
                  fullWidth
                  name="email"
                  placeholder="Email"
                  label="Email"
                  disabled={isDisable}
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
                  // required
                  error={!!errors.phone}
                  helperText={errors?.phone?.message}
                  variant="outlined"
                  id="phoneNumber"
                  fullWidth
                  name="phone"
                  placeholder="Phone Number"
                  label="Phone Number"
                  type="number"
                  disabled={isDisable}
                />
              )}
            />
            <Controller
              name="website"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  error={!!errors.website}
                  helperText={errors?.website?.message}
                  variant="outlined"
                  id="website"
                  fullWidth
                  name="website"
                  placeholder="Website"
                  label="Website"
                  disabled={isDisable}
                />
              )}
            />
          </div>
          <div className="flex -mx-4">
            <Controller
              name="gstin"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  error={!!errors.gstin}
                  required
                  helperText={errors?.gstin?.message}
                  variant="outlined"
                  id="gstin"
                  fullWidth
                  name="gstin"
                  placeholder="GSTIN"
                  label="GSTIN"
                  type="text"
                  disabled={isDisable}
                  inputProps={{ style: { textTransform: 'uppercase' } }}
                />
              )}
            />
            <Controller
              name="company_registry"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  error={!!errors.company_registry}
                  helperText={errors?.company_registry?.message}
                  variant="outlined"
                  id="registry"
                  fullWidth
                  name="company_registry"
                  placeholder="Company Registry"
                  label="Company Registry"
                  disabled={isDisable}
                />
              )}
            />
            <Controller
              name="tag_line"
              control={control}
              defaultValue
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  // required
                  error={!!errors.tag_line}
                  helperText={errors?.tag_line?.message}
                  variant="outlined"
                  id="tag_line"
                  fullWidth
                  name="tag_line"
                  placeholder="TagLine"
                  label="TagLine"
                  // disabled={isDisable}
                />
              )}
            />
          </div>
          <div className="w-1/2">
            {/* <Controller */}
            {/*    name="working_hour" */}
            {/*    control={control} */}
            {/*    defaultValue */}
            {/*    render={({ field }) => ( */}
            {/*        <TextField */}
            {/*            {...field} */}
            {/*            {...register('working_hour', { */}
            {/*              valueAsNumber: true, */}
            {/*            })} */}
            {/*            className="mt-8 mb-16 mx-4" */}
            {/*            error={!!errors.working_hour} */}
            {/*            helperText={errors?.working_hour?.message} */}
            {/*            variant="outlined" */}
            {/*            id="workHour" */}
            {/*            fullWidth */}
            {/*            name="working_hour" */}
            {/*            placeholder="Working Hour" */}
            {/*            label="Working Hour" */}
            {/*            type="number" */}
            {/*            disabled={isDisable} */}
            {/*        /> */}
            {/*    )} */}
            {/* /> */}
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

                                reader.readAsBinaryString(file);
                              } else {
                                dispatch(showMessage({ message: 'Only image allowed' }));
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
                            companyData?.company_logo && companyData?.company_logo !== ''
                              ? `${constants.API_URL}/api/avatar/companyLogo/${companyData.company_logo}`
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
          </div>
          {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_COMPANY_ADDRESS]) && (
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
          )}
        </div>
      </Card>
    </>
  );
}

export default withReducer('companyApp', reducer)(CompanyTab);
