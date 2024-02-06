import { motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Chip } from '@mui/material';
import { StarsRounded } from '@mui/icons-material';


const item = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

const LeaderBoard = () => {
  return (
    <>
      <motion.div variants={item} className="w-full max-w-320 sm:w-1/3 p-12">
        <Card className="relative rounded-16">
          <CardContent className="text-center p-0">
            <div className="PricingStyle3Page-price flex items-end justify-center py-16 px-32">
              <Avatar
                className="avatar w-80 h-80 p-8 box-content "
                alt="user photo"
                src="assets/images/avatars/profile.jpg"
              />
            </div>
            <div className="PricingStyle3Page-price flex items-end justify-center py-16 px-32 mt-[-45px]">
              <img src="assets/images/trophy/silver.png" className="h-64 z-[1]" />
            </div>

            <div className="flex justify-center">
              <Typography className="text-lg font-semibold" />
            </div>
            <div className="flex justify-center">
              <Chip icon={<StarsRounded />} className="font-semibold text-base" label={0} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="w-full max-w-320 sm:w-1/3 p-12 mt-[-41px]">
        <Card className="relative rounded-16" raised>
          <CardContent className="text-center p-0 ">
            <div className="PricingStyle3Page-price flex items-end justify-center py-16 px-32 ">
              <Avatar
                className="avatar w-80 h-80 p-8 box-content "
                alt="user photo"
                src="assets/images/avatars/profile.jpg"
              />
            </div>
            <div className="PricingStyle3Page-price flex items-end justify-center py-16 px-32 mt-[-45px]">
              <img src="assets/images/trophy/gold.png" className="h-64 z-[1]" />
            </div>
            <div className="flex justify-center">
              <Typography className="text-lg font-semibold" />
            </div>
            <div className="flex justify-center">
              <Chip icon={<StarsRounded />} className="font-semibold text-base" label={0} />
            </div>
          </CardContent>
          <div className="flex justify-center">
            <Typography className="text-lg font-semibold">Winner</Typography>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item} className="w-full max-w-320 sm:w-1/3 p-12">
        <Card className="relative rounded-16">
          <CardContent className="text-center p-0">
            <div className="PricingStyle3Page-price flex items-end justify-center py-16 px-32">
              <Avatar
                className="avatar w-80 h-80 p-8 box-content "
                alt="user photo"
                src="assets/images/avatars/profile.jpg"
              />
            </div>
            <div className="PricingStyle3Page-price flex items-end justify-center py-16 px-32 mt-[-45px]">
              <img src="assets/images/trophy/bronze.png" className="h-64 z-[1]" />
            </div>
            <div className="flex justify-center">
              <Typography className="text-lg font-semibold" />
            </div>
            <div className="flex justify-center">
              <Chip icon={<StarsRounded />} className="font-semibold text-base" label={0} />
            </div>
          </CardContent>

          <div className="flex flex-col items-center justify-center pb-32 px-32" />
        </Card>
      </motion.div>
    </>
  );
};

export default LeaderBoard;
