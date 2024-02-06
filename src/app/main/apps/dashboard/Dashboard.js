import { styled } from '@mui/material/styles';
import { useState } from 'react';
import DashboardTableHead from './DashboardTableHead';
import FusePageSimple from '../../../../@fuse/core/FusePageSimple';
import FuseLoading from '../../../../@fuse/core/FuseLoading';
import FuseProgress from '../Components/FuseProgress';

const Root = styled(FusePageSimple)(({ theme }) => ({}));

function Dashboard() {
  const [loading, setLoading] = useState(true);

  const onLoadingFalse = (value) => {
    setLoading(value)
  }
  return(
    <>
      {loading &&
        <div className='flex absolute z-50 bottom-0 left-0 right-0 top-0 bg-[#0000001a]'>
          <FuseProgress />
        </div>
      }
      <Root content={<DashboardTableHead  setLoading={(e) => onLoadingFalse(e)} loading={loading}/>} innerScroll />
  </>)
}

export default Dashboard;
