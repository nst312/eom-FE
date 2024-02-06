import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnnouncement } from '../post-announcement/store/announcementSlice';
import AnnoncementCarousel from './AnnoncementCarousel';
import FuseUtils from '../../../../@fuse/utils';
import PERMISSION from '../../../fuse-configs/permission.constants';
import Tour from "reactour";

function MainDashboard() {
  const dispatch = useDispatch();

  const container = {
    show: {
      transition: {
        staggerChildren: 0,
      },
    },
  };

  const [announcement, setAnnouncement] = useState(null);
  const user = useSelector(({ auth }) => auth.user);

    const { company_id } = user



  const mainDashboardItem = [
    {
      id: 'directory',
      title: 'Directory',
      img: 'Directory',
      url: '/apps/employees/list',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST]),
      tour: "second"
    },
    {
      id: 'attendance',
      title: 'Attendance',
      img: 'Attendance',
      url: '#',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'payslipgenerator',
      title: 'Payslip Generator',
      img: 'Payroll',
      url: '#',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'reports',
      title: 'Reports',
      img: 'Attendance',
      url: '#',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'payrolls',
      title: 'Payrolls',
      img: 'Payroll',
      url: '#',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'expense',
      title: 'Expense',
      img: 'Payroll',
      url: '#',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'leave',
      title: 'Leave',
      img: 'Leave_1',
      url: '/apps/admin-leave/leavelist',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'Notifications',
      title: 'Notifications',
      img: 'Notification',
      url: '/apps/announcement',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'company_profile',
      title: 'Company Profile',
      img: 'Company Profile',
      url: '/company-profile',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])

    },
    {
      id: 'my_profile',
      title: 'My Profile',
      img: 'My Profile',
      url: '/profile',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'organization_charts',
      title: 'Organization Charts',
      img: 'Organization Chart',
      url: '#',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'calendar',
      title: 'Calendar',
      img: 'Calendar',
      url: '/apps/calendar',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
    {
      id: 'setting',
      title: 'Setting',
      img: 'Notification',
      url: '#',
      auth: FuseUtils.checkPermission(user.permissions, [PERMISSION.CAN_EMPLOYEE_LIST])
    },
  ];

  const [stepsEnabled, setStepsEnabled] = useState(true);

  const steps = [
    {
      selector: '[data-tour="Employees"]',
      content: "From here! you can add employees!"
    },
    {
      selector: '[data-tour="profile"]',
      content: "For Editing your Profile you can click here!"
    }
  ];

  const stepsForEmployee = [
    {
      selector: '[data-tour="profile"]',
      content: "For Editing your Profile you can click here!"
    }
  ];


  useEffect(() => {
    dispatch(getAllAnnouncement({ page: 1, perPage: 10, companyId:company_id })).then((data) =>
      setAnnouncement(data.payload)
    );
  }, []);

  const firstTimeInWebsite = localStorage.getItem("walkthroughDashboard");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-8 px-10 py-28">
        <div className='col-span-2 order-3 md:order-1'/>
        <div className="p-12 lg:ltr:pr-0 lg:rtl:pl-0 col-span-4 order-2 md:order-2">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {mainDashboardItem.map((item) => {
              if(item.auth) {
                return <DashboardItem item={item} key={item.id} />;
              } else {
                return null
              }
            })}
          </motion.div>
        </div>
        <div className="col-span-2 p-24 order-1 md:order-3">
          <AnnoncementCarousel announcement={announcement} />
        </div>
        {
          firstTimeInWebsite == "1" ? null :  (
            user.role === "CEO" && (
              <Tour
                steps={steps}
                isOpen={stepsEnabled}
                onRequestClose={() => {
                  console.log("closed");
                  localStorage.setItem("walkthroughDashboard","1");
                  setStepsEnabled(false);
                }}
              />
            )
          )
        }

        {
          firstTimeInWebsite == "1" ? null :  (
            user.role === "EMPLOYEE" && (
              <Tour
                steps={stepsForEmployee}
                isOpen={stepsEnabled}
                onRequestClose={() => {
                  console.log("closed");
                  localStorage.setItem("walkthroughDashboard","1");
                  setStepsEnabled(false);
                }}
              />
            )
          )
        }

      </div>
    </>
  );
}

function DashboardItem(props) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const { id, title, img, url, auth, tour } = props.item;

  return (
    <motion.div variants={item} className="widget flex w-full p-12">
      <Link
        to={url}
        className="w-full no-underline decoration-0 "
        style={{ textDecoration: 'none' }}
        data-tour={tour ? tour : null}
      >
        <Paper className="w-full rounded-8 shadow gap-10 py-40 hover:shadow-6 h-full">
          <div className="flex items-center flex-col justify-between px-4 pt-8 gap-20 h-full">
            <div className="text-center">
              <img src={`/assets/images/maindashboard/${img}.svg`} className="w-44" />
            </div>
            <Typography className="text-16 font-600 text-center">{title}</Typography>
          </div>
        </Paper>
      </Link>
    </motion.div>
  );
}

export default MainDashboard;
