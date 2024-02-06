import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from '../../../Components/AddressCard';
import {
  addEmployeeAddress,
  deleteEmployeeAddress,
  getEmployeeAddress,
  updateEmployeeAddress,
} from '../../store/addressSlice';
import FuseUtils from '../../../../../../@fuse/utils';
import PERMISSION from '../../../../../fuse-configs/permission.constants';

function EmployeeAddress(props) {
  const dispatch = useDispatch();
  const [allAddressData, setAllAddressData] = useState([]);
  const employeeData = useSelector(({ eomApp }) => eomApp.employeeDetails);
  const empId = employeeData?.userId || props.empId
  const userId = useSelector(({ eomApp }) => eomApp?.employeeDetails?.userId)
  const user = useSelector(({ auth }) => auth.user)

  const addressData = {
    name: '',
    street1: '',
    street2: '',
    zip: null,
    city: '',
    state: '',
    country: ''
  };

  function addNewAddress() {
    const addNewQue = [...allAddressData, addressData];
    setAllAddressData(addNewQue);
  }



  useEffect(() => {
    if (employeeData !== null) {
      getAllEmployeeAddresses();
    }
  }, [employeeData]);


  const getAllEmployeeAddresses = () => {
    dispatch(getEmployeeAddress(userId)).then((res) => {
      if (res.payload) {
        setAllAddressData(res.payload);
      }
    });
  };

  const onSubmit = ({ event, value, index }) => {
    const data = {
      ...value,
    };

    event.preventDefault();
    dispatch(addEmployeeAddress({ data, userId })).then((res) => {
      if (res.payload) {
        getAllEmployeeAddresses();
      }
    });
  };

  const onUpdate = ({ event, value, id }) => {
    event.preventDefault();
    dispatch(updateEmployeeAddress({ userId, id , value}));
  };

  const onDelete = ({ event, id, index }) => {
    event.preventDefault();
    const empData = {
      id,
      employeeId: empId,
    };
    if (id) {
      dispatch(deleteEmployeeAddress({ id, userId })).then((res) => {
        setAllAddressData([]);
        if (res) {
          const newArr = [...allAddressData];
          const data = newArr.filter((el) => el.id !== id);
          setAllAddressData(data);
        }
      });
    }
    else {
      const data = allAddressData;
      data.splice(index, 1);
      setAllAddressData([...data]);
    }
  };

  return (
    <>
      {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_ADDRESS]) &&  (
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
        const resultData = allAddressData.filter(row => row.id !== undefined);
        return (
          <AddressCard
            item={item}
            index={index}
            key={index}
            totalData={resultData.length}
            onSubmit={(data) => onSubmit(data)}
            onUpdate={(data) => onUpdate(data)}
            onDelete={(data) => onDelete(data)}
          />
        );
      })}
    </>
  );
}

export default EmployeeAddress;
