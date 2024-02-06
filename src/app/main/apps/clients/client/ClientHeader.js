import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import constants from '../../../../fuse-configs/constants';
import { addClient, updateClientDetails } from '../store/clientDetailSlice';
import _ from '../../../../../@lodash';

function ClientHeader(props) {
  const { clientData, lastSegment } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { watch, getValues, formState,  } = methods;
  const { isValid, dirtyFields } = formState;
  const images = watch('images');
  const theme = useTheme();

  const handleSubmit = () => {
    if (lastSegment === 'new') {
      const data = {
        fileName: props.imageUrl,
        ...getValues(),
        client_type: getValues().client_type ?? 'COMPANY',
      };
      dispatch(addClient(data)).then((res) => {
        if (res.payload) {
          navigate(`/apps/client/${res.payload.id}`);
        }
      });
    } else {
      const data = {
        id: lastSegment,
        fileName: props.imageUrl,
        data: getValues(),
      };
      dispatch(updateClientDetails(data));
    }
  };

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            role="button"
            color="inherit"
            onClick={() => navigate('/apps/clients')}
          >
            <Icon className="text-20">
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">Clients</span>
          </Typography>
        </motion.div>
        <div className="flex items-center max-w-full">
          <img
            className="w-32 sm:w-48 rounded"
            src={images?.url ||( clientData.avatar_url !== null && clientData.avatar_url !== '' &&  lastSegment !== 'new'
                ? `${constants.API_URL}/api/clients/logo/${clientData.avatar_url}`
                : images?.url || 'assets/images/avatars/profile.jpg')
            }
          />

          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {clientData?.client_name}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="px-16">
          <Button type="submit" disabled={lastSegment === 'new' &&  _.isEmpty(dirtyFields) || !isValid} variant="contained" color="secondary" onClick={handleSubmit}>
            {lastSegment === 'new' ? 'Save' : 'Update'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ClientHeader;
