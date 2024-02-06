import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router';
import { Icon } from '@material-ui/core';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import { styled } from '@mui/material/styles';
import FusePageCarded from '../../../../../@fuse/core/FusePageCarded/FusePageCarded';
import EmployeeListHeader from '../employeeList/EmployeeListHeader';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCardOptionsHeader from './EmployeeCardOptionsHeader';
import EmployeeCardOptionContent from './EmployeeCardOptionContent';
import { getEmployee } from '../store/employeeSlice';
import { getAllInvitation, selectInvitations } from '../../invitation/store/invitationsSlice';

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

function EmployeeCardOptions() {


  const pageLayout = useRef(null);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalInvitation, setTotalInvitation] = useState(0)

  const onLoadingFalse = (value) => {
    setLoading(value);
  };

  const onSearch = (value) => {
    setIsSearch(value);
  };

  return (
    <>
      <Root
        header={
          <EmployeeCardOptionsHeader
            setLoading={(e) => onLoadingFalse(e)}
            loading={loading}
            pageLayout={pageLayout}
            onSearch={onSearch}
          />
        }
        content={
          <EmployeeCardOptionContent totalInvitation={totalInvitation} />
        }
        innerScroll
      />
    </>

  );
}

export default withReducer('eomApp', reducer)(EmployeeCardOptions);
