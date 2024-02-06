import {
  Typography,
  Card,
  Box,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { AcUnit, Done } from '@mui/icons-material';

const WizardWelcomeCard = ({progress}) => {

  return (
    <Card className='w-full pl-72 pr-20 py-28 rounded-4 sm:pl-96 pr-20'>
      <Box className='flex gap-24'>
        <Box>
          <Typography variant='h6'>Welcome, Faizan Shaikh</Typography>
          <Typography fontSize='16px' fontWeight='normal'>
            Hey There! Welcome to Employee Of The Month.
            This Setup Wizard will get you started using Employee Of The Month.
            Please bear in mind that Employee Of The Month has a host of advanced features and settings that you will discover with continued use.
            Let's get going!
          </Typography>
          <Box className='mt-16'>
            <Box className='flex justify-between mb-8'>
              <Typography fontSize='16px' fontWeight='normal'>Progress...</Typography>
              <Typography variant='body2' color='text.secondary'>{`${Math.round(progress)}%`}</Typography>
            </Box>
            <Box>
              <LinearProgress
                sx={{ height: 15, borderRadius: 5 }}
                variant='determinate'
                value={progress} />
            </Box>
          </Box>
        </Box>
        <Box className='flex justify-end'>
          <Box className='flex justify-center items-center rounded-full bg-orange-100' sx={{ width: '80px', height: '80px' }}>
            <AcUnit className="text-orange-400 text-52"/>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default WizardWelcomeCard;
