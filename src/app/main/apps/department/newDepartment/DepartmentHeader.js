import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import _ from '@lodash';
import {Link} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import React from "react";

function DepartmentHeader(props) {
  const methods = useFormContext();
  const { formState,watch,getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const departmentName = watch('name');
  const images = watch('images');
  const theme = useTheme()
  const featuredImageId = watch('featuredImageId');

  function handleSubmit() {
    console.log('handle Submit',getValues());
  }

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
              className="flex items-center sm:mb-12"
              component={Link}
              role="button"
              to="/apps/departmentList"
              color="inherit"
          >
            {/*<Icon className="text-20">*/}
            {/*  {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}*/}
            {/*</Icon>*/}
            {/*<span className="hidden sm:flex mx-4 font-medium">Department</span>*/}
          </Typography>
        </motion.div>



        <div className="flex items-center max-w-full">
          <Icon
              component={motion.span}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
              className="text-24 md:text-32"
          >
            wysiwyg
          </Icon>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {departmentName || 'Departments'}
              </Typography>
              {/*<Typography variant="caption" className="font-medium">*/}
              {/*  Department Detail*/}
              {/*</Typography>*/}
            </motion.div>
          </div>
        </div>
      </div>


      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {/*<Button*/}
        {/*  className="whitespace-nowrap mx-4"*/}
        {/*  variant="contained"*/}
        {/*  color="secondary"*/}
        {/*  disabled={_.isEmpty(dirtyFields) || !isValid}*/}
        {/*  onClick={() => handleSubmit()}*/}
        {/*>*/}
        {/*  Save*/}
        {/*</Button>*/}
      </motion.div>
    </div>
  );
}

export default DepartmentHeader;
