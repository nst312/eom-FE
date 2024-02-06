import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem } from '@mui/lab';
import Button from '@mui/material/Button';
import ChildCheckbox from './ChildCheckbox';
import { getRoleWisePermission, updateRoleWisePermission } from '../store/permissionSlice';

const dummyArray = [
  {
    id: 1,
    module: 'Invoices',
    label: 'Can Add Invoice',
    permission: 'can-add-invoice',
    isPermission: true,
  },
  {
    id: 2,
    module: 'Invoices',
    label: 'Can Delete Invoice',
    permission: 'can-delete-invoice',
    isPermission: true,
  },
  {
    id: 3,
    module: 'Invoices',
    label: 'Can update Invoice',
    permission: 'can-update-invoice',
    isPermission: true,
  },
  {
    id: 4,
    module: 'Invoices',
    label: 'Can Show Invoice',
    permission: 'can-show-invoice',
    isPermission: true,
  },
  {
    id: 5,
    module: 'Department',
    label: 'Can Add Department',
    permission: 'can-add-department',
    isPermission: false,
  },

  {
    id: 9,
    module: 'Job Description',
    label: 'Can Add Job Description',
    permission: 'can-add-job-description',
    isPermission: false,
  },
  {
    id: 10,
    module: 'Job Description',
    label: 'Can Delete Job Description',
    permission: 'can-delete-job-department',
    isPermission: true,
  },
  {
    id: 11,
    module: 'Job Description',
    label: 'Can update Job Description',
    permission: 'can-update-job-department',
    isPermission: true,
  },
  {
    id: 12,
    module: 'Job Description',
    label: 'Can Show Job Description',
    permission: 'can-show-job-department',
    isPermission: true,
  },
  {
    id: 6,
    module: 'Department',
    label: 'Can Delete Department',
    permission: 'can-delete-department',
    isPermission: true,
  },
  {
    id: 7,
    module: 'Department',
    label: 'Can update Department',
    permission: 'can-update-department',
    isPermission: true,
  },
  {
    id: 8,
    module: 'Department',
    label: 'Can Show Department',
    permission: 'can-show-department',
    isPermission: true,
  },
];

function ParentPermissionCheckBox({ roles }) {
  const [permissionList, setPermissionList] = useState([]);
  const [isAllSelect, setIsAllSelect] = useState(true);
  const [allCheckBoxSelect, setAllCheckBoxSelect] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoleWisePermission(roles)).then((resp) => {
      setPermissionList(resp.payload.permissions);
    });
  }, []);

  const allLabel = permissionList.map((item) => item.module);
  const uniqueArrayModule = new Set([...allLabel]);
  const newArrayData = [...uniqueArrayModule];

  function handleSubmit() {
    dispatch(updateRoleWisePermission({ roles, permissionList })).then(resp => {
      window.location.reload(false);
    });
  }

  function handleChildCheckBox(e, module) {
    setIsAllSelect(!isAllSelect);

    const filterData = permissionList.map((el) => {
      if (el.module === module) {
        return { ...el, isPermission: isAllSelect };
      }
      return { ...el };
    });

    setPermissionList(filterData);
  }
  function checkingAllCheck(item) {
    const filteringTheArray = permissionList.filter((el) => el.module === item);
    const gettingPermissionValue = filteringTheArray.map((el) => el.isPermission);

    return gettingPermissionValue.every((el) => el === true);
  }
  function checkingAllCheckBoxField() {
    const gettingPermissionValue = permissionList.map((el) => el.isPermission);
    return gettingPermissionValue.every((el) => el === true);
  }
  function handleAllCheckBox(e) {
    setAllCheckBoxSelect(!allCheckBoxSelect);
    const toggleThePermission = permissionList.map((item) => {
      return {
        ...item,
        isPermission: !allCheckBoxSelect,
      };
    });
    setPermissionList(toggleThePermission);
  }

  return (
    <div>
      <div>
        <FormControlLabel
          label="Give All Permission"
          control={
            <Checkbox checked={checkingAllCheckBoxField()} onChange={(e) => handleAllCheckBox(e)} />
          }
        />
      </div>
      <div className="grid md:grid-cols-3 gap-20">
        {newArrayData.map((item) => {
          return (
            <>
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
              >
                <TreeItem
                  nodeId="1"
                  label={
                    <FormControlLabel
                      label={item}
                      key={item}
                      control={
                        <Checkbox
                          id={item}
                          checked={checkingAllCheck(item)}
                          onChange={(e) => handleChildCheckBox(e, item)}
                        />
                      }
                    />
                  }
                >
                  <ChildCheckbox
                    permissionList={permissionList}
                    parentItem={item}
                    setPermissionList={setPermissionList}
                  />
                </TreeItem>
              </TreeView>
            </>
          );
        })}
      </div>

      <Button variant="contained" className="mt-10" onClick={handleSubmit}>
        Update Permission
      </Button>
    </div>
  );
}

export default ParentPermissionCheckBox;
