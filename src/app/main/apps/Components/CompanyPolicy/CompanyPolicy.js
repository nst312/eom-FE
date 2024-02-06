import { motion } from 'framer-motion';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Icon } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import withReducer from '../../../../store/withReducer';
import reducer from './store';
import CompanyPolicyDialog from './CompanyPolicyDialog';
import constants from '../../../../fuse-configs/constants';
import {
  deleteCompanyPolicy,
  openCompanyPolicyDialog,
  openEditCompanyPolicyDialog,
} from './store/companyPolicySlice';
import PERMISSION from '../../../../fuse-configs/permission.constants';
import FuseUtils from '../../../../../@fuse/utils';

const defaultValues = {
  title: '',
  description: '',
  url: '',
};

const schema = yup.object().shape({
  description: yup.string().required('Enter description.'),
  title: yup.string().required('Enter title.'),
});

function ExpandMoreIcon() {
  return null;
}

function CompanyPolicy() {
  const user = useSelector(({ auth }) => auth.user);
  const companyPolicyData = useSelector(
    ({ companyPolicyApp }) => companyPolicyApp.companyPolicy.data
  );
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { control, formState, getValues, register, watch, setValue } = methods;
  const { errors, isValid, dirtyFields } = formState;

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const onDeleteCompanyPolicy = (id) => {
    dispatch(deleteCompanyPolicy({ id })).then((res) => {});
  };

  return (
    <>
      <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
        <AppBar position="static" elevation={0}>
          <Toolbar className="px-8">
            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
              Privacy Policy
            </Typography>
          </Toolbar>
        </AppBar>
        {user?.role !== 'EMPLOYEE' && (
          <MenuItem className="mt-10">
            <ListItemIcon
              className="min-w-40"
              onClick={() => {
                dispatch(openCompanyPolicyDialog());
              }}
            >
              <Icon>add_circle_outline</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Policy" />
          </MenuItem>
        )}

        {companyPolicyData?.map((column, index) => {
          return (
            <div className="ml-20 mt-20 mb-20 mr-20" key={index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <div className="flex grow justify-between">
                    <Typography className="break-words">
                      <b> Title : </b>
                      {column.title}
                    </Typography>
                    {FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_COMPANY_POLICY_ADD]) && (
                      <ListItemIcon>
                        <Icon
                          onClick={(e) =>
                            e.stopPropagation(dispatch(openEditCompanyPolicyDialog(column)))
                          }
                        >
                          edit
                        </Icon>
                        <Icon onClick={(e) => e.stopPropagation(onDeleteCompanyPolicy(column.id))}>
                          delete
                        </Icon>
                        {column.path && (
                          <a
                            href={`${constants.API_URL}/images/${column.path}`}
                            target="download icon"
                          >
                            <Icon onClick={(e) => e.stopPropagation()} style={{ color: 'gray' }}>
                              cloud_download
                            </Icon>
                          </a>
                        )}
                      </ListItemIcon>
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="text-ellipsis overflow-hidden break-all">
                    <b> Description : </b>
                    {column.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </Card>
      <CompanyPolicyDialog />
    </>
  );
}

export default withReducer('companyPolicyApp', reducer)(CompanyPolicy);
