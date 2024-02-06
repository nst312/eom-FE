import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import DepartmentsTable from '../departments/DepartmentsTable';
import { getAllDepartments, openDepartmentDialog, selectDepartment } from '../departments/store/DepartmentsSlice';
import withReducer from '../../../store/withReducer';
import reducer from '../departments/store';
import DepartmentsDialog from '../departments/DepartmentsDialog';
import Typography from '@mui/material/Typography';

function DepartmentCardTable() {
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [departmentDetails, setDepartmentDetails] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const departments = useSelector(selectDepartment);
  const departDialog = useSelector(
    ({ DepartmentApp }) => DepartmentApp.department.DepartmentDialog
  );
  const totalCount = useSelector(({ DepartmentApp }) => DepartmentApp.department.totalCount);
  const [isSearch, setIsSearch] = useState(false);

  const onSearch = (value) => {
    setIsSearch(value);
  };

  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getAllDepartmentDetails();
    }
    if (!isLastPage && departmentDetails.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [dispatch, atEnd, loadingMore]);

  useEffect(() => {
    if (atEnd) {
      setDepartmentDetails([...departmentDetails, ...departments]);
      setAtEnd(false);
    } else {
      setDepartmentDetails(departments);
    }
  }, [departments]);

  const onLoadingFalse = (value) => {
    setLoading(value);
  };

  const onAddDepartment = (value) => {
    setIsAdd(value);
  };
  const handleChangeDepartment = (data) => {
    setDepartmentData(data);
  };

  const onSelectId = (value) => {
    setSelectedId(value);
  };

  const getAllDepartmentDetails = () => {
    dispatch(getAllDepartments({ page, perPage: 10 })).then((res) => {
      setDepartmentDetails(res.payload);
      setLoadingMore(false);
      setLoading(false);
    });
  };

  return (
    <>
      <div>
        <Typography textAlign='center' variant="subtitle1" color="inherit" className="text-24">Department</Typography>
      </div>
      <DepartmentsTable
        getAllDepartmentDetails={getAllDepartmentDetails}
        setIsLastPage={setIsLastPage}
        departmentDetails={departmentDetails}
        setPage={setPage}
        setAtEnd={setAtEnd}
        totalCount={totalCount}
        loadingMore={loadingMore}
        setLoadingMore={setLoadingMore}
        setLoading={(e) => onLoadingFalse(e)}
        atEnd={atEnd}
        loading={loading}
        isAdd={isAdd}
        setIsAdd={(e) => onAddDepartment(e)}
        selectedId={selectedId}
        setDepartmentDetails={setDepartmentDetails}
        setSelectedId={setSelectedId}
        departmentData={(e) => handleChangeDepartment(e)}
      />
      <div className="flex items-center justify-center py-12">
        <DialogActions
          className="justify-end p-0"
          onClick={() => {
            dispatch(openDepartmentDialog());
          }}
        >
          <div>
            <Button type="submit" variant="contained" color="secondary">
              Add New
            </Button>
          </div>
        </DialogActions>
      </div>
      {departDialog?.props.open && (
        <DepartmentsDialog
          page={page}
          setIsLastPage={setIsLastPage}
          setLoadingMore={setLoadingMore}
          departmentDetails={getAllDepartmentDetails}
          setDepartmentDetails={setDepartmentDetails}
          selectedId={selectedId}
          setSelectedId={onSelectId}
          setLoading={(e) => onLoadingFalse(e)}
          loading={loading}
          setPage={setPage}
          setIsAdd={onAddDepartment}
          loadingMore={loadingMore}
          data={departmentData}
        />
      )}
    </>
  );
}

export default withReducer('DepartmentApp', reducer)(DepartmentCardTable);
