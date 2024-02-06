import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import SalaryHistoryHeader from './SalaryHistoryHeader';
import withReducer from '../../../../store/withReducer';
import reducer from '../store/index';
import EmployeeSalaryListTable from './SalaryHistoryListTable';

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

function SalaryHisotryLists() {
  return (
    <Root header={<SalaryHistoryHeader />} content={<EmployeeSalaryListTable />} innerScroll />
  );
}

export default withReducer('salaryHistoryApp', reducer)(SalaryHisotryLists);
