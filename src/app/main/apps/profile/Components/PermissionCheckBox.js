import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { getRoleWisePermission, updateRoleWisePermission } from '../store/permissionSlice';

function PermissionCheckBox({ roles }) {
  const dispatch = useDispatch();
  const [permissionList, setPermissionList] = useState([]);

  useEffect(() => {
    dispatch(getRoleWisePermission(roles)).then((resp) => {
      setPermissionList(resp.payload.permissions);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateRoleWisePermission({ roles, permissionList })).then(resp => {
      console.log(resp)
    });
  }

  function handleCheckbox(index) {
    const updatedPermissionList = permissionList.map((item, idx) => {
      if (idx === index) {
        return { ...item, isPermission: !item.isPermission };
      }
      return { ...item };
    });

    setPermissionList(updatedPermissionList);
  }

  const [allCheck, setAllCheck] = useState(false);

  function handleAllCheck(e) {
    setAllCheck(!allCheck)
    const checkAllPermissionList = permissionList.map((item) => {
      return {...item, isPermission: !allCheck}
    })

    setPermissionList(checkAllPermissionList)
  }

  return (
    <>
      <form>
        <FormControlLabel
          control={
            <Checkbox checked={allCheck} onChange={(e) => handleAllCheck()} />
          }
          label={"Give All Permission's"}
        />
        <div className="grid grid-cols-3">

          {permissionList.map((item, index) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.isPermission}
                    onChange={(e) => handleCheckbox(index)}
                    name={item.permission}
                  />
                }
                label={item.permission}
              />
            );
          })}
        </div>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default PermissionCheckBox;
