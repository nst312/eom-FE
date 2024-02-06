import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import EmployeeListHeader from './EmployeeListHeader';
import EmployeeListTable from './EmployeeListTable';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import Tour from 'reactour';
import { useSelector } from 'react-redux';
import EmployeeCardOptions from '../employeeDashboard/EmployeeCardOptions';

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

function EmployeeList() {
  const pageLayout = useRef(null);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  const onLoadingFalse = (value) => {
    setLoading(value);
  };

  const onSearch = (value) => {
    setIsSearch(value);
  };

  const user = useSelector(({ auth }) => auth.user);

  const [stepsEnabled, setStepsEnabled] = useState(true);

  const steps = [
    {
      selector: '[data-tour="invitations"]',
      content: "What to see the invitation that you have send"
    },
  ];

  const walkthroughEmployeeList = localStorage.getItem("walkthroughEmployeeList");

  return (
    <>
      <Root
        header={
          <EmployeeListHeader
            setLoading={(e) => onLoadingFalse(e)}
            loading={loading}
            pageLayout={pageLayout}
            onSearch={onSearch}
          />
        }
        content={
          <EmployeeListTable
            setLoading={(e) => onLoadingFalse(e)}
            loading={loading}
            search={isSearch}
          />
        }
        innerScroll
      />
      {
        walkthroughEmployeeList == "1" ? null :  (
          user.role === "CEO" && (
            <Tour
              steps={steps}
              isOpen={stepsEnabled}
              onRequestClose={() => {
                console.log("closed");
                localStorage.setItem("walkthroughEmployeeList","1");
                setStepsEnabled(false);
              }}
            />
          )
        )
      }
    </>
  );
}

export default withReducer('eomApp', reducer)(EmployeeList);
// <Root
//   header={<EmployeeListHeader pageLayout={pageLayout} onSearch={onSearch}  />}
//   content={<EmployeeListTable search={isSearch} />}
//   innerScroll
// />;
