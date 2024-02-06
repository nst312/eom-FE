import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import OrganizationHeader from './OrganizationHeader';
import OrganizationContent from './OrganizationContent';
import withReducer from '../../../store/withReducer';
import reducer from './store';

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

function Organization() {
  return (
    <>
      <Root header={<OrganizationHeader />} content={<OrganizationContent />} innerScroll />
    </>
  );
}

export default withReducer('organizationChartApp', reducer)(Organization);
