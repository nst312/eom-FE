import { Box } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import { useState } from 'react';
import { ArrowRightAlt, Done, Fingerprint } from '@mui/icons-material';
import { Typography } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import AddAttendanceShift from './AddAttendanceShift';

const WizardAttendanceCard = ({progress, setProgress, setAttendance, attendance, attendanceData, setAttendanceData}) => {
  const [expanded, setExpanded] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleAccordion = (panel) => (event, _expanded) => {
    setExpanded(_expanded ? panel : false);
  };

  const savedProcessed = () => {
    setProgress(progress + 30);
    setExpanded(false);
    setSuccess(true);
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Box className="w-full rounded-4">
      <Accordion
        className="pl-20 pr-20 py-28 sm:pl-20 pr-20"
        variants={item}
        expanded={expanded}
        onChange={toggleAccordion(true)}
      >
        <AccordionSummary className="p-0">
          <Box className="flex gap-24">
            <Box
              className={`flex justify-center items-center border-1 rounded-full bg-gray-300 mr-12 ${
                success ? 'bg-[#FF1F30]' : 'text-gray-400'
              }`}
              sx={{ minWidth: '40px', height: '40px' }}
            >
              <Done className={`${success ? 'text-[#FFFFFF]' : 'text-gray-400'} text-28`} />
            </Box>
            <Box>
              <Typography variant="h6">Set Attendance Shift</Typography>
              <Typography fontSize="16px" fontWeight="normal">
                Define and assign a default shift rule for your organization. You can create more
                shift rules and assign them individually within the module as well.
              </Typography>
            </Box>
            <Box className="flex justify-end">
              <Box
                className="flex justify-center items-center rounded-full"
                sx={{ width: '80px', height: '80px', backgroundColor: 'hsl(166deg 100% 89%)' }}
              >
                <Fingerprint className="text-56" sx={{ color: 'hsl(168deg 69% 45%)' }} />
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails className="p-0">
          <AddAttendanceShift attendance={attendance} setAttendance={setAttendance} attendanceData={attendanceData} setAttendanceData={setAttendanceData} />
          <Box className="flex justify-end">
            <Button
              size="large"
              variant="contained"
              endIcon={<ArrowRightAlt />}
              onClick={savedProcessed}
              disabled={attendanceData.length <= 0 || progress === 100}
            >
              Saved and Processed
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default WizardAttendanceCard;
