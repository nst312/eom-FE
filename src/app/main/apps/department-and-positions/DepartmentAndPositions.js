import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import DepartmentCardTable from './DepartmentCardTable';
import DialogActions from '@mui/material/DialogActions';
import { openDepartmentDialog } from '../departments/store/DepartmentsSlice';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import JobCardTable from './JobCardTable';

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
}));

function DepartmentAndPosition() {

  const dispatch = useDispatch();

  return (
    <div className='grid md:grid-cols-2 gap-[100px] p-24 px-[40px]'>
      <div className='p-24 shadow-2xl'>
        <DepartmentCardTable />
      </div>
      <div className='p-24 shadow-2xl'>
        <JobCardTable />
      </div>
    </div>
  );
}

export default DepartmentAndPosition;
