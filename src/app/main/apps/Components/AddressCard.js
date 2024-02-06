import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SaveIcon from '@mui/icons-material/Save';
import Autocomplete from '@mui/material/Autocomplete';
import { InputLabel, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities } from '../../../auth/store/citySlice';
import { getAllState } from '../../../auth/store/stateSlice';
import FuseUtils from '../../../../@fuse/utils';
import PERMISSION from '../../../fuse-configs/permission.constants';

const schema = yup.object().shape({
  name: yup.string().required('Select  name.').nullable(),
  street1: yup.string().required('Street1 is required.').nullable(),
  street2: yup.string().required('Street2 is required.').nullable(),
  zip: yup.string().required('Zipcode is required.').nullable(),
  city: yup.string().required('City name is required.').nullable(),
  state: yup.string().required('State name is required.').nullable(),
  country: yup.string().required('Country name is required.').nullable(),
  country_id: yup.string().required('Country id is required.').nullable(),
  state_id: yup.string().required('State id is required.').nullable(),
  city_id: yup.string().required('City id is required.').nullable(),
});

const addressTypes = ['Permanent Residence', 'Current Residence', 'Other'];

const AddressCard = (props) => {
  const dispatch = useDispatch();
  const { item, totalData, onSubmit, onUpdate, onDelete, index } = props;
  const [addressType, setAddressType] = useState('');
  const [placeIcon, setPlaceIcon] = useState('');
  const countryData = useSelector(({ auth }) => auth.country);
  const [selectCountry, setSelectCountry] = useState('');
  const [selectState, setSelectState] = useState('');
  const [selectCity, setSelectCity] = useState('');
  const [statesData, setStatesData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const user = useSelector(({ auth }) => auth.user);
  const { control, getValues, formState, setValue, reset, watch } = useForm({
    mode: 'onChange',
    defaultValues: item,
    resolver: yupResolver(schema),
  });
  const [isDisable, setIsDisable] = useState(false);

  const watchAllField = watch();

  const { isValid, dirtyFields, errors } = formState;

  console.log('formState', formState);

  useEffect(() => {
    if (item.name) {
      onChangeName(item.name);
      handleSelectCountry(item.country_id);
      handleSelectState(item.state_id);
    }
  }, [item.name]);

  const onChangeName = (value) => {
    if (value) {
      setAddressType(value);
      const placeType = value?.trim()?.toLowerCase();
      const string1 = placeType === 'permanent residence';
      const string2 = placeType === 'current residence';

      if (value !== '' && string1) {
        setPlaceIcon('home');
      } else if (value !== '' && string2) {
        setPlaceIcon('work');
      } else {
        setPlaceIcon('location');
      }
    } else {
      setAddressType('');
      setPlaceIcon('');
    }
  };

  const onUpdateValue = (event, value) => {
    const finalData = {
      ...value,
      zip: Number(value.zip),
    };
    if (item.id) {
      onUpdate({ event, value: finalData, id: item.id });
      reset(getValues(), { shouldValidate: true, shouldDirty: false });
    } else {
      onSubmit({ event, value: finalData, id: index });
    }
  };

  function handleSelectedCountry(event) {
    handleSelectCountry(event.id);
    setValue('country', event.name, { shouldValidate: true, shouldDirty: true });
    setValue('country_id', event.id, { shouldValidate: true, shouldDirty: true });
    setValue('state', '');
    setValue('city', '');
    setValue('city_id', '');
    setValue('state_id', '');
  }

  function handleSelectedStateData(event) {
    handleSelectState(event.id);
    setValue('state', event.name, { shouldValidate: true, shouldDirty: true });
    setValue('state_id', event.id, { shouldValidate: true, shouldDirty: true });
  }

  function handleSelectedCityData(event) {
    handleSelectCity(event.id);
    setValue('city', event.name, { shouldValidate: true, shouldDirty: true });
    setValue('city_id', event.id, { shouldValidate: true, shouldDirty: true });
  }

  useEffect(() => {
    if (!item) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(item, { shouldValidate: true, shouldDirty: false });
  }, [item, reset]);

  useEffect(() => {
    if (selectState !== '') {
      dispatch(getAllCities(selectState)).then((res) => {
        setCityData(res.payload);
      });
    }
  }, [selectState]);

  useEffect(() => {
    if (selectCountry !== '') {
      dispatch(getAllState(selectCountry)).then((res) => {
        setStatesData(res.payload);
      });
    }
  }, [selectCountry]);

  const handleSelectCountry = (value) => {
    setSelectCountry(value);
  };

  const handleSelectState = (value) => {
    setSelectState(value);
  };

  const handleSelectCity = (value) => {
    setSelectCity(value);
  };
  return (
    <div className="mt-10">
      <div className="max-w-[50%] flex items-center mb-10">
        {placeIcon === 'location' && <LocationOnIcon className="text-24" />}
        {placeIcon === 'home' && <HomeIcon className="text-24" />}
        {placeIcon === 'work' && <ApartmentIcon className="text-24" />}
        <Typography className="text-ellipsis overflow-hidden ml-8" variant="h6">
          {addressType}
        </Typography>
      </div>
      <div className="flex -mx-4 px-1">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16 mx-3"
              freeSolo
              options={addressTypes}
              value={value}
              onChange={(event, newValue) => {
                onChange(newValue);
                onChangeName(newValue);
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Residence Type"
                  label="Residence Type"
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
        <Controller
          name="street1"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              required
              error={!!errors.street1}
              helperText={errors?.street1?.message}
              variant="outlined"
              fullWidth
              placeholder="Street1"
              label="Street1"
              inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          )}
        />
        <Controller
          name="street2"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              required
              error={!!errors.street2}
              helperText={errors?.street2?.message}
              variant="outlined"
              fullWidth
              placeholder="Street2"
              label="Street2"
              inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          )}
        />
      </div>

      <div className="flex -mx-4 px-1">
        <Controller
          name="zip"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-3"
              required
              fullWidth
              error={!!errors.zip}
              helperText={errors?.zip?.message}
              variant="outlined"
              placeholder="Zipcode"
              label="Zipcode"
              type="number"
              inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          )}
        />

        <FormControl className="w-full mt-8 mb-16 mx-3" variant="outlined">
          <InputLabel>Country</InputLabel>
          <Select label="Country" defaultValue={item.country} name="country">
            <MenuItem value="all">
              <em> Select country </em>
            </MenuItem>
            {countryData &&
              countryData.data.length !== 0 &&
              countryData.data.map((category) => (
                <MenuItem
                  onClick={() => handleSelectedCountry(category)}
                  value={category.name}
                  key={category.id}
                >
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl className="w-full mt-8 mb-16 mx-3" variant="outlined" name="state">
          <InputLabel>State</InputLabel>
          <Select label="State" defaultValue={item.state} name="state">
            <MenuItem value="all">
              <em> Select state </em>
            </MenuItem>
            {statesData.length > 0 &&
              statesData.map((category) => (
                <MenuItem
                  onClick={() => handleSelectedStateData(category)}
                  value={category.name}
                  key={category.id}
                >
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl className="w-full mt-8 mb-16 mx-3" variant="outlined">
          <InputLabel>City</InputLabel>
          <Select label="City" defaultValue={item.city} name="city">
            <MenuItem value="all">
              <em> Select city </em>
            </MenuItem>
            {cityData.length > 0 &&
              cityData.map((category) => (
                <MenuItem
                  onClick={() => handleSelectedCityData(category)}
                  value={category.name}
                  key={category.id}
                >
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_COMPANY_ADDRESS]) && (
        <div className="flex justify-end">
          <Button
            onClick={(e) => {
              onUpdateValue(e, getValues());
            }}
            className="whitespace-no-wrap normal-case"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            startIcon={<SaveIcon />}
          >
            {item.id ? 'Update' : 'Save'}
          </Button>
          {totalData > 1 && (
            <Button
              className="whitespace-no-wrap normal-case bg-red hover:bg-red-800 ml-10"
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                onDelete({ event: e, id: item?.id, index });
              }}
            >
              Delete
            </Button>
          )}
        </div>
      )}
      {/* <pre>{JSON.stringify(statesData, null, ' ')}</pre> */}
    </div>
  );
};

export default AddressCard;
