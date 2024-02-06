import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from '../../Components/AddressCard';
import {
  addCompanyAddress,
  deleteCompanyAddress,
  getCompanyAddress,
  updateCompanyAddress,
} from '../store/companyAddressSlice';
import { getAllState } from '../../../../auth/store/stateSlice';
import { getAllCities } from '../../../../auth/store/citySlice';
import { getAllCountries } from '../../../../auth/store/countrySlice';
import FuseUtils from '../../../../../@fuse/utils';
import PERMISSION from '../../../../fuse-configs/permission.constants';

function CompanyAddress() {
  const dispatch = useDispatch();
  const [allAddressData, setAllAddressData] = useState([]);
  console.log('allAddressData', allAddressData);
  const countryData = useSelector(({ auth }) => auth.country);
  const stateDetails = useSelector(({ auth }) => auth.state);
  const citiesDetails = useSelector(({ auth }) => auth.city);
  const [selectCountry, setSelectCountry] = useState('');
  const user = useSelector(({ auth }) => auth.user);
  console.log('user');
  const [selectState, setSelectState] = useState('');
  const [selectCity, setSelectCity] = useState('');
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  const addressData = {
    name: '',
    street1: '',
    street2: '',
    zip: '',
    city: '',
    state: '',
    country: '',
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  useEffect(() => {
    if (selectCountry !== '') {
      dispatch(getAllState(selectCountry)).then((res) => {
        setStatesData(res.payload.data);
      });
    }
  }, [dispatch, selectCountry]);

  useEffect(() => {
    if (selectState !== '') {
      dispatch(getAllCities(selectState)).then((res) => {
        if (res.payload) {
          setCitiesData(res.payload.data);
        } else {
          setCitiesData([]);
        }
      });
    }
  }, [dispatch, selectState]);

  function addNewAddress() {
    const addNewQue = [...allAddressData, addressData];
    setAllAddressData(addNewQue);
    if (allAddressData.length > 2) {
      executeScroll();
    }
  }

  useEffect(() => {
    getAllCompanyAddresses();
  }, []);

  const getAllCompanyAddresses = () => {
    dispatch(getCompanyAddress()).then((res) => {
      if (res.payload) {
        setAllAddressData(res.payload);
      }
    });
  };

  const onSubmit = ({ event, value, index }) => {
    event.preventDefault();
    dispatch(addCompanyAddress(value)).then((res) => {
      if (res.payload) {
        getAllCompanyAddresses();
      }
    });
  };

  const onUpdate = ({ event, value, id }) => {
    event.preventDefault();
    dispatch(updateCompanyAddress({ id, value }));
  };

  const onDelete = ({ event, id, index }) => {
    event.preventDefault();
    if (id) {
      dispatch(deleteCompanyAddress(id)).then((res) => {
        setAllAddressData([]);
        if (res) {
          const newArr = [...allAddressData];
          const data = newArr.filter((el) => el.id !== id);
          setAllAddressData(data);
        }
      });
    } else {
      const data = allAddressData;
      data.splice(index, 1);
      setAllAddressData([...data]);
    }
  };

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

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
    <>
      {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_COMPANY_ADDRESS]) &&  (
        <div className="mb-16 text-right">
          <Button
            className="whitespace-no-wrap  normal-case"
            variant="contained"
            color="secondary"
            // disabled={!canBeSubmitted()}
            onClick={addNewAddress}
          >
            Add Address
          </Button>
        </div>
      )}
      {allAddressData.map((item, index) => {
        return (
          <form noValidate className="flex flex-col md:overflow-hidden" ref={myRef} key={index}>
            <AddressCard
              item={item}
              index={index}
              totalData={allAddressData.length}
              countryData={countryData}
              stateDetails={stateDetails}
              citiesDetails={citiesDetails}
              statesData={statesData}
              citiesData={citiesData}
              selectCountry={selectCountry}
              selectState={selectState}
              selectCity={selectCity}
              handleSelectCountry={handleSelectCountry}
              handleSelectState={handleSelectState}
              handleSelectCity={handleSelectCity}
              onSubmit={(data) => onSubmit(data)}
              onUpdate={(data) => onUpdate(data)}
              onDelete={(data) => onDelete(data)}
            />
          </form>
        );
      })}
    </>
  );
}

export default CompanyAddress;
