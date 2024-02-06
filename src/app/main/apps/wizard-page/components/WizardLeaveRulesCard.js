import {Box, Typography} from '@mui/material';
import {useState} from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import {ArrowRightAlt, DateRange, Done,} from '@mui/icons-material';
import Button from '@mui/material/Button';
import LeaveRulesTable from './LeaveRulesTable';


const WizardLeaveRulesCard = ({ progress, bulkLeave, setBulkLeave, setProgress}) => {
  const [expanded, setExpanded] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleAccordion = (panel) => (event, _expanded) => {
    setExpanded(_expanded ? panel : false);
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
              <Typography variant='h6'>Set Leave Rules</Typography>
              <Typography fontSize='16px' fontWeight='normal'>
                Create and define your leave rules.
                These rules will be applied to all employees from the effective date of the leave cycle or DOJ whichever is later.
              </Typography>
            </Box>
            <Box className='flex justify-end'>
              <Box
                className='flex justify-center items-center rounded-full bg-purple-100'
                sx={{ width: '80px', height: '80px' }}
              >
                <DateRange className="text-purple-400 text-52" />
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails className='p-0'>
          <Box className='pl-76 sm:w-full'>
            <LeaveRulesTable setBulkLeave={setBulkLeave}  />
          </Box>
          <Box className='flex justify-end'>
            <Button
              size='large'
              variant='contained'
              endIcon={<ArrowRightAlt />}
              onClick={savedProcessed}
              disabled={bulkLeave.length <= 0 || progress === 100}
            >
              Saved and Processed
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default WizardLeaveRulesCard;
