import { createContext, useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import { getAllCountries } from '../../../../auth/store/countrySlice';
import ClientHeader from './ClientHeader';
import ClientDetails from './tab/ClientDetails';
import { getClientDetails } from '../store/clientDetailSlice';
import ClientConst from './ClientConstant';
import { ClientContext } from '../ClientContext';


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

function Client() {
  const dispatch = useDispatch();
  const clientData = useSelector(({ clientsApp }) => clientsApp.client);

  // form
  const methods = useForm({
    mode: 'onChange',
    defaultValues : ClientConst.defaultValues,
    resolver: yupResolver(ClientConst.schema),
  });

  const [clientDetails, setClientDetails] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const routeParams = useParams();
  const lastSegment = window.location.pathname.split('/').pop();
  const [imageUrl, setImageUrl] = useState({});



  const handleClickEditable = (value) => {
    setIsEditable(value);
  };

  useEffect(() => {
    getAllCountriesDetails();
  }, [dispatch]);

  useEffect(() => {
    if (lastSegment !== 'new') {
      dispatch(getClientDetails(routeParams)).then((res) => {
        if (res.payload) {
          setClientDetails(res.payload);
          setIsEditable(true);
        } else {
          setIsEditable(false);
          setClientDetails({});
        }
      });
    } else {
      setClientDetails({});
    }
  }, [dispatch, routeParams]);

  const getAllCountriesDetails = () => {
    dispatch(getAllCountries());
  };

  return (
    <FormProvider {...methods}>
      <Root
        header={
          <ClientHeader
            clientData={clientData}
            lastSegment={lastSegment}
            isEditable={isEditable}
            imageUrl={imageUrl}
            handleClickEdit={handleClickEditable}
          />
        }
        contentToolbar={
          <Tabs
            value={0}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64' }}
          >
            <Tab className="h-64" label="Details" />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
              <ClientContext.Provider value={clientDetails}>
                <ClientDetails setImageUrl={setImageUrl}/>
              </ClientContext.Provider>
          </div>
        }
        innerScroll
      />
    </FormProvider>
  );
}

export default withReducer('clientsApp', reducer)(Client);
