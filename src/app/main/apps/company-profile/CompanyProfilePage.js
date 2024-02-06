import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CompanyTab from './tabs/CompanyTab';
import { getAllCountries } from '../../../auth/store/countrySlice';
import constants from '../../../fuse-configs/constants';
import { getCompany } from './store/companyDetailsSlice';
import { getCompanyPolicy } from '../Components/CompanyPolicy/store/companyPolicySlice';
import Admin from './tabs/Admin';
import CompanyPolicy from '../Components/CompanyPolicy/CompanyPolicy';
import CompanyAddress from './tabs/CompanyAddress';
import PERMISSION from '../../../fuse-configs/permission.constants';
import FuseUtils from '../../../../@fuse/utils';

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

function CompanyProfilePage() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useSelector(({ auth }) => auth.user);
  // const [isDisable, setIsDisable] = useState(true);
  const companyData = useSelector(({ companyApp }) => companyApp?.companyProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(getCompany());
      // if (user.role === 'COMPANY_ADMIN') {
      //   setIsDisable(false);
      // }
    }
  }, [user]);

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
    if (selectedTab === 1) {
      dispatch(getAllCountries());
    }
    if (selectedTab === 3) {
      dispatch(getCompanyPolicy());
    }
  };

  function handleTabChange(event, value) {
    if (value === 4) navigate('/apps/wizard-page');
    setSelectedTab(value);
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
                    companyData && companyData?.company_logo !== ''
                      ? `${constants.API_URL}/api/avatar/companyLogo/${companyData?.company_logo}`
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
                    {companyData?.company_name}
                  </Typography>
                </motion.div>
              </div>
            </div>
          }
          contentToolbar={
            <>
              <TabList className="w-full min-h-40" onChange={handleTabChange}>
                <Tab label="Company" value={0} />
                <Tab label="Company Address" value={1} />
                {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_USER_LIST]) && (
                  <Tab label="Admin" value={2} />
                )}
                <Tab label="Policy" value={3} />
                <Tab label="Wizard" value={4} />
              </TabList>
            </>
          }
          content={
            <div className="p-16 sm:p-24">
              <TabPanel value={0} className="px-0">
                <CompanyTab />
              </TabPanel>
              <TabPanel value={1} className="px-0">
                <CompanyAddress />
              </TabPanel>
              <TabPanel value={2} className="px-0">
                <Admin />
              </TabPanel>
              <TabPanel value={3} className="px-0">
                <CompanyPolicy />
              </TabPanel>
            </div>
          }
        />
      </TabContext>
    </FormProvider>
  );
}

export default CompanyProfilePage;
