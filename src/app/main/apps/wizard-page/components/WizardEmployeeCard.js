import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ArrowRightAlt, Done, Downloading, UploadFile } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Button from '@mui/material/Button';
import FileSaver from 'file-saver';
import { useDispatch } from 'react-redux';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import excelDemoFile from './Sample.csv';
import AddEmployeeForm from './AddEmployeeForm';
import { showMessage } from '../../../../store/fuse/messageSlice';

const companySize = [
  {
    value: '0-19',
    label: '0-19',
  },
  {
    value: '50-100',
    label: '50-100',
  },
  {
    value: '100-200',
    label: '100-200',
  },
];

const WizardEmployeeCard = ({ bulkFile, setBulkFile, employees, setEmployees, progress, setProgress,setTabIndex, tabIndex }) => {
  const [expanded, setExpanded] = useState(false);
  const [size, setSize] = useState('0-19');
  const [numOfEmp, setNumOfEmp] = useState(1);
  const [uploadFile, setUploadFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  console.log('upload file', uploadFile && uploadFile[0].name);

  useEffect(() => {
    if (uploadFile) {
      setBulkFile(uploadFile);
      dispatch(showMessage({ variant: 'success', message: 'File attached successfully.' }));
    }
  }, [uploadFile]);


  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const toggleAccordion = (panel) => (event, _expanded) => {
    setExpanded(_expanded ? panel : false);
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleDownloadFile = () => {
    FileSaver.saveAs(excelDemoFile, 'Sample-Excel.csv');
  };

  const savedProcessed = () => {
    setProgress(progress + 30);
    setExpanded(false);
    setSuccess(true);
  };

  return (
    <Box className='w-full rounded-4'>
      <Accordion
        className='pl-20 pr-20 py-28 sm:pl-20 pr-20'
        variants={item}
        expanded={expanded}
        onChange={toggleAccordion(true)}
      >
        <AccordionSummary className='p-0'>
          <Box className='flex gap-24'>
            <Box
              className={`flex justify-center items-center border-1 rounded-full bg-gray-300 mr-12 ${success ? 'bg-[#FF1F30]' : 'text-gray-400'}`}
              sx={{ minWidth: '40px', height: '40px' }}>
              <Done className={`${success ? 'text-[#FFFFFF]' : 'text-gray-400'} text-28`} />
            </Box>
            <Box>
              <Typography variant='h6'>Add Employees</Typography>
              <Typography fontSize='16px' fontWeight='normal'>
                Let's add Employees! Start by updating the size of the company and the actual employee count.
                You can choose between adding employees individually or uploading the details in bulk.
              </Typography>
            </Box>
            <Box className='flex justify-end'>
              <Box
                className='flex justify-center items-center rounded-full bg-cyan-100'
                sx={{ width: '80px', height: '80px' }}
              >
                <CreateNewFolderIcon className='text-cyan-400 text-52' />
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails className='p-0'>
          <Box className='pl-76 xl:w-1/2 md:w-3/5 sm:w-full'>
            <Box className='flex gap-28 mt-8'>
              <TextField
                id='outlined-select-size'
                select
                variant='outlined'
                label='Company Size'
                value={size}
                fullWidth
                onChange={(e) => setSize(e.target.value)}
              >
                {companySize.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                type="number"
                id='filled-required'
                label='Number of Employees'
                value={numOfEmp}
                variant='outlined'
                fullWidth
                onChange={(e) => setNumOfEmp(+e.target.value)}
              />
            </Box>
            <Box sx={{ typography: 'body1' }} className='mt-16'>
              <TabContext value={tabIndex}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleTabChange}>
                    <Tab label={`Individual Add (${employees.length})`} style={{ fontSize: '16px' }} value={0}
                      className="w-1/2"
                    />
                    <Tab label='Bulk Add' style={{ fontSize: '16px' }} value={1} className='w-1/2' />
                  </TabList>
                </Box>
                <TabPanel value={0} className='px-0'>
                  <AddEmployeeForm numOfEmp={numOfEmp} employees={employees} setEmployees={setEmployees} />
                </TabPanel>
                <TabPanel value={1}>
                  <Box>
                    <Typography fontSize='15px' className='mb-24'>
                      Standard dummy text ever since the 1500s, when an unknown printer took a
                      galley of type and scrambled it to make
                    </Typography>
                    <Box className='flex justify-center items-center gap-16'>
                      <Button
                        size='large'
                        variant='contained'
                        className='rounded-2'
                        endIcon={<Downloading />}
                        onClick={handleDownloadFile}
                      >
                        Download Demo CSV
                      </Button>
                      <input
                        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                        hidden
                        id='raised-button-file'
                        onChange={(e) => setUploadFile(e.target.files)}
                        type='file'
                      />
                      <label htmlFor='raised-button-file'>
                        <Button
                          size='large'
                          variant='contained'
                          component='span'
                          className='rounded-2'
                          endIcon={<UploadFile />}
                        >
                          Upload CSV
                        </Button>
                      </label>
                      {
                        uploadFile && uploadFile[0].name
                      }
                    </Box>
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
          <Box className='flex justify-end'>
            <Button
              size='large'
              variant='contained'
              endIcon={<ArrowRightAlt />}
              onClick={savedProcessed}
              disabled={employees.length < numOfEmp && bulkFile === null || progress === 100}
            >
              Saved and Processed
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default WizardEmployeeCard;
