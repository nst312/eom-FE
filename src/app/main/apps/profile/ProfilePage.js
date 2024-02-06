import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AboutTab from './tabs/AboutTab';
import ResetPasswordPage from './tabs/ResetPasswordTab';
import { getAllCountries } from '../../../auth/store/countrySlice';
import constants from '../../../fuse-configs/constants';
import EmployeeAddress from './tabs/EmployeeProfileAddress';
import Documents from '../Components/Document/Document';
import { getCompanyPolicy } from '../Components/CompanyPolicy/store/companyPolicySlice';
import CompanyTab from '../company-profile/tabs/CompanyTab';
import CompanyAddress from '../company-profile/tabs/CompanyAddress';
import Admin from '../company-profile/tabs/Admin';
import CompanyPolicy from '../Components/CompanyPolicy/CompanyPolicy';
import FuseUtils from '../../../../@fuse/utils';
import PERMISSION from '../../../fuse-configs/permission.constants';
import Permissions from './tabs/Permissions';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-topBg': {
    backgroundSize: 'cover!important',
    backgroundPosition: 'center center!important',
  },

  '& .FusePageSimple-header': {
    background: 'none',
    height: 220,
    minHeight: 220,
    [theme.breakpoints.down('lg')]: {
      height: 240,
      minHeight: 240,
    },
  },

  '& .FusePageSimple-wrapper': {
    background: 'transparent',
  },

  '& .FusePageSimple-content': {
    width: '100%',
    maxWidth: 1120,
    margin: 'auto',
  },

  '& .FusePageSimple-toolbar': {
    width: '100%',
    maxWidth: 1120,
    margin: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'auto',
    height: 'auto',
    aliginItesm: 'flex-start',
  },
}));

function ProfilePage() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useSelector(({ auth }) => auth.user);
  const profileData = useSelector(({ userProfile }) => userProfile.profile);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const { watch, getValues } = methods;
  const form = watch();

  useEffect(() => {
    getAllCountriesDetails();
  }, [dispatch, selectedTab]);

  const getAllCountriesDetails = () => {
    if (selectedTab === 2) {
      dispatch(getAllCountries());
    }
  };

  function handleTabChange(event, value) {
    setSelectedTab(value);
    if (value === 4) {
      dispatch(getCompanyPolicy());
    }
  }

  return (
    <FormProvider {...methods}>
      <TabContext value={selectedTab}>
        <Root
          header={
            <div className="w-full px-24  flex flex-col md:flex-row flex-1 items-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
                <Avatar
                  sx={{
                    borderWidth: 4,
                    borderStyle: 'solid',
                    borderColor: 'background.default',
                  }}
                  className="-mt-64  w-128 h-128"
                  src={
                    user?.avatar_url && user?.avatar_url !== ''
                      ? `${constants.API_URL}/api/avatar/${user.avatar_url}`
                      : 'assets/images/avatars/profile.jpg'
                  }
                />
              </motion.div>

              <div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                >
                  <Typography
                    className="md:px-16 text-24 md:text-32 font-semibold tracking-tight text-black"
                    variant="h4"
                    color="inherit"
                  >
                    {`${profileData?.firstName} ${profileData?.lastName}`}
                  </Typography>
                </motion.div>
              </div>
            </div>
          }
          contentToolbar={
            <>
              <TabList className="w-full min-h-40" onChange={handleTabChange}>
                <Tab label="About" value={0} />
                <Tab label="Address" value={1} />
                <Tab label="Change Password" value={2} />
                {!FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST]) && <Tab label="Documents" value={3} />}
                {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_PERMISSION_LIST]) &&  <Tab label="Permissions" value={4} /> }
              </TabList>
            </>
          }
          content={
            <div className="p-16 sm:p-24">
              <TabPanel value={0} className="px-0">
                <AboutTab data={profileData} />
              </TabPanel>
              <TabPanel value={1} className="px-0">
                <EmployeeAddress />
              </TabPanel>
              <TabPanel value={2} className="px-0">
                <ResetPasswordPage />
              </TabPanel>
              <TabPanel value={3} className="px-0">
                <Documents empId={user?.employee_id} />
              </TabPanel>
              <TabPanel value={4} classes="px-0">
                <Permissions />
              </TabPanel>
              {/* {selectedTab === 0 && <AboutTab data={profileData} />} */}
              {/* {selectedTab === 1 && <EmployeeAddress />} */}
              {/* {selectedTab === 2 && <ResetPasswordPage />} */}
              {/* {selectedTab === 3 && user.role === 'EMPLOYEE' && ( */}
              {/*   <Documents empId={user?.employee_id} /> */}
              {/* )} */}
            </div>
          }
        />
      </TabContext>
    </FormProvider>
  );
}

export default ProfilePage;
