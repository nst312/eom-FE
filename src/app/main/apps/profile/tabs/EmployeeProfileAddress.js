import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from '../../Components/AddressCard';
import { getAllState } from '../../../../auth/store/stateSlice';
import { getAllCities } from '../../../../auth/store/citySlice';
import { getAllCountries } from '../../../../auth/store/countrySlice';
import {
  addEmployeeAddress,
  deleteEmployeeAddress,
  getEmployeeAddress,
   updateEmployeeAddress
} from "../store/employeeAddressSlice";
import withReducer from "../../../../store/withReducer";
import reducer from "../store";

function EmployeeAddress() {
  const dispatch = useDispatch();
  const [allAddressData, setAllAddressData] = useState([]);
  const userId = useSelector(({auth}) => auth?.user?.id)
  const user = useSelector(({ auth }) => auth.user);
  const countryData = useSelector(({ auth }) => auth.country);
  const stateDetails = useSelector(({ auth }) => auth.state);
  const citiesDetails = useSelector(({ auth }) => auth.city);
  const [selectCountry, setSelectCountry] = useState('');
  const [selectState, setSelectState] = useState('');
  const [selectCity, setSelectCity] = useState('');
  const [statesData, setStatesData] = useState([])
  const [citiesData, setCitiesData] = useState([])


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
        setStatesData(res.payload.data)
      })
    }
  }, [dispatch, selectCountry]);

  useEffect(() => {
    if (selectState !== '') {
      dispatch(getAllCities(selectState)).then((res) => {
        if (res.payload) {
          setCitiesData(res.payload.data)
        } else {
          setCitiesData([])
        }
      })
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
    getAllEmployeeAddresses();
  }, []);

  const getAllEmployeeAddresses = () => {
    dispatch(getEmployeeAddress(userId)).then((res) => {
      if (res.payload) {
        setAllAddressData(res.payload);
      }
    });
  };

  const onSubmit = ({ event, value, index }) => {
    event.preventDefault();
    dispatch(addEmployeeAddress({ value , userId })).then((res) => {
      if (res.payload) {
        getAllEmployeeAddresses();
      }
    });
  };

  const onUpdate = ({ event, value, id }) => {
    event.preventDefault();
    dispatch(updateEmployeeAddress({userId, id, value }));
  };

  const onDelete = ({ event, id, index }) => {
    event.preventDefault();
    if (id) {
      dispatch(deleteEmployeeAddress({ id, userId })).then((res) => {
        setAllAddressData([])
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
    setSelectCountry(value)
  }

  const handleSelectState = (value) => {
    setSelectState(value)
  }

  const handleSelectCity = (value) => {
    setSelectCity(value)
  }

  return (
    <>
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

export default withReducer('employeeAddress', reducer)(EmployeeAddress);
