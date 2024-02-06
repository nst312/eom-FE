import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Avatar from "@mui/material/Avatar";
import { Chip } from "@mui/material";
import {StarsRounded} from "@mui/icons-material";
import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import BasicTable from "./DashboardTable";
import withReducer from "../../../store/withReducer";
import reducer from "./store";
import {getAllRatings} from "./store/dashboardSlice";
import constants from '../../../fuse-configs/constants';
import LeaderBoard from './LeaderBoard';

const Root = styled('div')(({ theme }) => ({
  '& .PricingStyle3Page-header': {
    height: 500,
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
  },
  // '& .PricingStyle3Page-price': {
  //   backgroundColor: theme.palette.primary[600],
  //   color: theme.palette.getContrastText(theme.palette.primary[600]),
  // },
  '& .avatar': {
    background: theme.palette.background.default,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    '& > img': {
      borderRadius: '50%',
    },
  }
}));

const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

function DashboardTableHead(props) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState([]);
  const arrayMove = (arr, oldIndex, newIndex) => {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  };

  let data = rating.map((item, index) => {
    if (index <= 2) {
      return item;
    }
  });

  data = arrayMove(data, 0, 1);

  useEffect(() => {
    dispatch(getAllRatings()).then((res) => {
      if (res.payload.length !== 0){
        setRating(res.payload);
        props.setLoading(false)
      }else{
        props.setLoading(false)
        setRating([])
      }

    });
  }, [dispatch]);

  return (
    <Root className="w-full">
      <div className="PricingStyle3Page-header flex">
        <div className="p-24 w-full max-w-2xl mx-auto">
          <div className="text-center my-128 mx-24 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            >
              <Typography color="inherit" className="font-bold text-32 md:text-52">
                Employee Of The Month
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography color="inherit" className="text-16 opacity-75 mt-16 mx-auto max-w-512">
                A very Congratulations to the winner and great work. Don't get down next month, new
                month , new opportunities. Great Job Team.
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="-mt-192">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex items-center justify-center flex-wrap"
          >
            {!props.loading && rating.length !== 0 ? (
              data.map((product, index) => {
                return (
                  index <= 2 &&
                  product !== undefined && (
                    <>
                      <motion.div variants={item} className="w-full max-w-320 sm:w-1/3 p-12">
                        <Card className="relative rounded-16">
                          <CardContent className="text-center p-0">
                            <div className="PricingStyle3Page-price flex items-end justify-center py-16 px-32">
                              <Avatar
                                className="avatar w-80 h-80 p-8 box-content "
                                alt="user photo"
                                src={
                                  product?.avatar_url !== null && product.totalRating !== 0
                                    ? `${constants.API_URL}/api/avatar/${product?.avatar_url}`
                                    : 'assets/images/avatars/profile.jpg'
                                }
                              />
                            </div>
                            <div className="PricingStyle3Page-price flex items-end justify-center py-16 px-32 mt-[-45px]">
                              <img src={product?.medal} className="h-64 z-[1]" alt="medal" />
                            </div>

                            <div className="flex justify-center">
                              {product.totalRating !== 0 ?
                                  (<Typography className="text-lg font-semibold">
                                    {product?.firstName} {product?.lastName}
                                  </Typography>) :
                                  (
                                      <Typography className="text-lg font-semibold">
                                        Player Name
                                      </Typography>
                                  )
                              }
                            </div>
                            <div className="flex justify-center">
                              <Chip
                                icon={<StarsRounded />}
                                className="font-semibold text-base"
                                label={product?.totalRating}
                              />
                            </div>
                          </CardContent>
                          {index === 1 && (
                            <div className="flex justify-center">
                              <Typography className="text-lg font-semibold">Winner</Typography>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    </>
                  )
                );
              })
            ) : (!props.loading &&
              <LeaderBoard />
            )}
          </motion.div>
        </div>
        {!props.loading &&
        <BasicTable rating={rating} />
        }
      </div>
    </Root>
  );
}

export default withReducer('ratingApp', reducer)(DashboardTableHead);
