import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import DepartmentListHeader from './DepartmentListHeader';
import DepartmentListTable from './DepartmentListTable';

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

function DepartmentList() {
  return <Root header={<DepartmentListHeader />} content={<DepartmentListTable />} innerScroll />;
}

export default DepartmentList;
