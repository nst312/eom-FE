import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import Works from './Tab/Works';
import Certificate from './Tab/Certificate';
import IDs from "./Tab/Ids";

function Documents({ empId }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="md:flex max-w-2xl">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons={false}
                    className="w-full px-24 -mx-4 min-h-40"
                    classes={{
                      indicator: 'flex justify-center bg-transparent w-full h-full',
                    }}
                    TabIndicatorProps={{
                      children: (
                        <Box
                          sx={{ bgcolor: 'text.disabled' }}
                          className="w-full h-full bg-white rounded-full opacity-20"
                        />
                      ),
                    }}
                  >
                    <Tab
                      className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="IDs"
                    />
                    <Tab
                      className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Certificate"
                    />

                    <Tab
                      className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Works"
                    />
                  </Tabs>
                </Typography>
              </Toolbar>
            </AppBar>
            <div className="flex flex-col m-24">
              {selectedTab === 0 && <IDs />}
              {selectedTab === 1 && <Certificate />}
              {selectedTab === 2 && <Works />}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default Documents;
