import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import clsx from 'clsx';
import Icon from '@mui/material/Icon';
import Radio from '@mui/material/Radio';
import FuseUtils from '../../../../../../@fuse/utils';
import { showMessage } from '../../../../../store/fuse/messageSlice';
import ClientAddress from './ClientAddress';
import { addressContext, ClientContext } from '../../ClientContext';
import constants from '../../../../../fuse-configs/constants';


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

function ClientDetails({ setImageUrl }) {
  const dispatch = useDispatch();
  const clientData = useContext(ClientContext);
  const [company, setCompany] = useState('');

  useEffect(() => {
    if (clientData.client_type === 'INDIVIDUAL') {
      setCompany('2');
    } else {
      setCompany('1');
    }
  }, [clientData.client_type]);

  const methods = useFormContext();
  const { control, reset, formState, watch, setValue } = methods;

  const images = watch('images');

  const { errors } = formState;

  useEffect(() => {
    if (!clientData) {
      return;
    }
    /**
     * Reset the form on product state changes
     */

    reset(clientData, { shouldValidate: true, shouldDirty: false });
  }, [clientData, reset]);

  const handleChangeClient = (event) => {
    setCompany(event);
    if (event === '1') {
      setValue('client_type', 'COMPANY');
    } else {
      setValue('client_type', 'INDIVIDUAL');
    }
  };

  return (
    <>
      <div className="mt-10 inline-block display-flex w-full">
        <Typography className="font-bold inline-block display-flex">Client Type</Typography>
        <FormControlLabel
          value="1"
          className="mx-16"
          id="type"
          name="client_type"
          checked={company === '1'}
          onChange={(e) => handleChangeClient(e.target.value)}
          control={<Radio />}
          label="Company"
        />

        <FormControlLabel
          value="2"
          className="mx-16"
          id="type"
          name="client_type"
          checked={company === '2'}
          onChange={(e) => handleChangeClient(e.target.value)}
          control={<Radio />}
          label="Individual"
        />
      </div>
      <div className="flex -mx-4 mt-[15px]">
        <Controller
          name="client_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              required
              className="mt-8 mb-16 mx-4"
              variant="outlined"
              fullWidth
              placeholder="Name"
              label="Name"
            />
          )}
        />

        <Controller
          name="contact_number"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              required
              error={!!errors.contact_number}
              helperText={errors?.contact_number?.message}
              variant="outlined"
              fullWidth
              placeholder="Contact"
              label="Contact"
              type="number"
            />
          )}
        />
      </div>
      <div className="flex -mx-4">
        <Controller
          name="work_email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              required
              error={!!errors.work_email}
              helperText={errors?.work_email?.message}
              variant="outlined"
              fullWidth
              placeholder="Work Email"
              label="Work Email"
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
              // required
              // error={!!errors.website}
              // helperText={errors?.website?.message}
              className="mt-8 mb-16 mx-4"
              variant="outlined"
              fullWidth
              placeholder="Website"
              label=" Website"
            />
          )}
        />
        <Controller
          name="gstin"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              // required
              // error={!!errors.gstin}
              // helperText={errors?.gstin?.message}
              className="mt-8 mb-16 mx-4"
              variant="outlined"
              fullWidth
              // value={value}
              placeholder="GSTIN"
              label=" GSTIN"
              inputProps={{ style: { textTransform: 'uppercase' } }}
            />
          )}
        />
      </div>

      <addressContext.Provider value={clientData.address}>
        <ClientAddress />
      </addressContext.Provider>

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

                    onChange(newImage);
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
              render={({ field: { onChange, value } }) => (
                <div
                  onClick={() => onChange(value)}
                  onKeyDown={() => onChange(value.id)}
                  role="button"
                  tabIndex={0}
                  className={clsx(
                    'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                    images.id === value && 'featured'
                  )}
                  key={images.id}
                >
                  <img className="max-w-none w-auto h-full" src={images?.url} alt="product" />
                </div>
              )}
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
                      clientData?.avatar_url && clientData?.avatar_url !== ''
                        ? `${constants.API_URL}/api/clients/logo/${clientData.avatar_url}`
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
      {/* <pre>{JSON.stringify(getValues(), null, ' ')}</pre> */}
    </>
  );
}

export default ClientDetails;
