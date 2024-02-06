import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { getAllDepartments, selectDepartment } from './store/DepartmentsSlice';
import DepartmentsDialog from './DepartmentsDialog';
import DepartmentsHeader from './DepartmentsHeader';
import DepartmentsTable from './DepartmentsTable';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageCarded-content': {
    display: 'flex',
  },
  '& .FusePageCarded-contentCard': {
    overflow: 'hidden',
  },
}));

function Departments() {
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
      <Root
        header={<DepartmentsHeader setLoading={(e) => onLoadingFalse(e)} loading={loading}  onSearch={onSearch}/>}
        content={
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
        }
        innerScroll
      />

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

export default withReducer('DepartmentApp', reducer)(Departments);
