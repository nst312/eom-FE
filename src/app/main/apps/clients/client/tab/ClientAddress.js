import React, { useContext, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities } from '../../../../../auth/store/citySlice';
import { showMessage } from '../../../../../store/fuse/messageSlice';
import { getAllState } from '../../../../../auth/store/stateSlice';
import  { addressContext } from '../../ClientContext';

const addressTypes = ['Permanent Residence', 'Current Residence', 'Other'];


function ClientAddress(){
  const dispatch = useDispatch();
  const countryData = useSelector(({ auth }) => auth.country);
  const [statesData, setStatesData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [countryName, setCountryName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const addressData = useContext(addressContext);
  const methods = useFormContext();
  const { control,  setValue } = methods;

  useEffect(() =>{
    if (addressData?.country_id){
      setCountryName(addressData?.country)
      setCountryId(addressData?.country_id)
    }

    if (addressData?.state_id){
      setStateName(addressData?.state)
      setStateId(addressData?.state_id)
    }

    if (addressData?.city_id){
      setCityName(addressData?.city)
      setCityId(addressData?.city_id)
    }
  },[addressData])


  useEffect(() => {
    if (stateId !== '' && stateId !== null) {
      dispatch(getAllCities(stateId)).then((res) => {
        if (!res.payload?.statusCode) {
          setCityData(res.payload);
        } else {
          dispatch(showMessage({ message: 'City is not exists'}));
          setCityData([]);
        }

      });
    }
  }, [stateId, stateName]);

  useEffect(() => {
    if (countryId !== '' && countryId !== null) {
      dispatch(getAllState(countryId)).then((res) => {
        if (!res.payload?.statusCode) {
          setStatesData(res.payload);
        } else {
          dispatch(showMessage({ message: 'State is not exists'}));
          setStatesData([]);
        }
      });
    }
  }, [countryId, countryName]);


  const handleChangeCountry = (value) => {
    setStatesData([]);
    setCityData([]);
    if (value !== null) {
      setValue('address.country_id', value.id);
      setStateName('')
      setCityName('')
      setCountryId(value.id)
    }
  };

  const handleChangeState = (value) => {
    setCityName('')
    if (value !== null){
      setValue('address.state_id', value.id);
      setStateName(value.name)
      setStateId(value.id)
    }else{
      setCityData([])
    }

  };

  const handleChangeCity = (value) => {
    setValue('address.city_id', value.id, { shouldValidate: true, shouldDirty: true });
    setCityName(value.name)
    setCityId(value.id)
  };

  return(
    <>
      <div className="mt-10">
        <div className="flex -mx-4 px-1">
          <Controller
            name="address.name"
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
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Residence Type"
                    label="Residence Type"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />
          <Controller
            name="address.street1"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                variant="outlined"
                fullWidth
                placeholder="Street1"
                label="Street1"
              />
            )}
          />
          <Controller
            name="address.street2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-4"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
                placeholder="Street2"
                label="Street2"
              />
            )}
          />
        </div>

        <div className="flex -mx-4 px-1">
          <Controller
            id="country"
            name="address.country_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={countryData.data ?? []}
                getOptionLabel={(option)=>(option.name?option.name:'')}
                className="mt-8 mb-16 mx-4"
                fullWidth
                required
                value={{name: countryName} }
                onChange={(event, newValue) => {
                  if (newValue.name){
                    setCountryName(newValue.name)
                  }else{
                    setCountryName('')
                  }
                  handleChangeCountry(newValue);
                  setCityId('')
                  setStateId('')
                }}
                renderInput={(params) => <TextField {...params} label="Country" />}
              />
            )}
          />


          <Controller
            id="state"
            name="address.state_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={statesData ?? []}
                getOptionLabel={(option)=>(option.name?option.name:'')}
                className="mt-8 mb-16 mx-4"
                fullWidth
                required
                value={{name: stateName} }
                onChange={(event, newValue) => {
                  if (newValue.name){
                    setStateName(newValue.name)
                  }else{
                    setStateName('')
                  }
                  setCityId('')
                  handleChangeState(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="State" />}
              />
            )}
          />

          <Controller
            id="city"
            name="address.city_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={cityData ?? []}
                getOptionLabel={(option)=>(option.name?option.name:'')}
                className="mt-8 mb-16 mx-4"
                fullWidth
                required
                value={{name: cityName} }
                onChange={(event, newValue) => {
                  if (newValue.name){
                    setCityName(newValue.name)
                  }else{
                    setCityName('')
                  }
                  handleChangeCity(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="City" />}
              />
            )}
          />



          <Controller
            name="address.zip"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16 mx-3"
                fullWidth
                // helperText={errors?.zip?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                placeholder="Zipcode"
                label="Zipcode"
                type="number"
              />
            )}
          />

        </div>
      </div>
    </>
  )
}

export default ClientAddress