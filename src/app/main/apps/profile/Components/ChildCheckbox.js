import { useState, useEffect } from 'react';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

function ChildCheckbox({ permissionList, parentItem, setPermissionList}) {

  const [childCheckBoxList, setChildCheckBoxList] = useState([])
  const Data = permissionList.filter((el) => el.module === parentItem);

  function handleSingleCheckBox(permission) {
    const updatedData = permissionList.map((item) => {
      if (item.permission === permission) {
        return { ...item, isPermission: !item.isPermission };
      }
      return { ...item };
    });
    setPermissionList(updatedData);
  }

  useEffect(() => {
    setChildCheckBoxList(Data);
  }, [permissionList]);

  return (
    <div className="flex pl-24 flex-col">
      {childCheckBoxList.map((items) => {
        return (
          <FormControlLabel
            label={items.label}
            key={parentItem.isPermission}
            control={
              <Checkbox
                checked={items.isPermission}
                id={items.module}
                onChange={() => handleSingleCheckBox(items.permission)}
              />
            }
          />
        );
      })}
    </div>
  );
}

export default ChildCheckbox;
