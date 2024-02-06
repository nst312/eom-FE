import withReducer from 'app/store/withReducer';
import {Box} from '@mui/material';
import {useState} from 'react';
import Button from '@mui/material/Button';
import {ArrowRightAlt} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import reducer from './store';
import WizardHeadingCard from './components/WizardHeadingCard';
import WizardWelcomeCard from './components/WizardWelcomeCard';
import WizardEmployeeCard from './components/WizardEmployeeCard';
import WizardLeaveRulesCard from './components/WizardLeaveRulesCard';
import WizardConfirmationDialog from './components/WizardConfirmationDialog';
import WizardSuccessDialog from './components/WizardSuccessDialog';
import {addAttendanceShift, addWizardCsv, addWizardIndividual} from './store/WizardSlice';
import WizardAttendanceCard from './components/WizardAttendanceCard';
import {addLeaveRules} from "../wizard-page/store/WizardSlice";

const WizardPage = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(10);
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkLeave, setBulkLeave] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onDashboard = () => {
    navigate('/apps/dashboard');
  };
  const user = useSelector(({ auth }) => auth.user);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccessOpen = () => {
    if (tabIndex === 0 && employees.length !== 0) {
      const invitations = {
        invitations: employees,
      };
      setLoading(true);
      // dispatch(addWizardIndividual(invitations)).then((res) => {
      //   addAttendanceShiftForEmployee();
      //   addLeaveRulesForEmployee();
      //   if (res.payload.message) {
      //     setOpen(false);
      //     setSuccessOpen(true);
      //   } else {
      //     setOpen(false);
      //   }
      //   setLoading(false);
      // });

        dispatch(addWizardIndividual({invitations, addAttendanceShiftForEmployee, addLeaveRulesForEmployee, setOpen, setSuccessOpen, setLoading}))
    } else {
      setLoading(true);
      dispatch(addWizardCsv(bulkFile[0])).then((res) => {
        addAttendanceShiftForEmployee();
        addLeaveRulesForEmployee();
        if (res.payload.data) {
          setOpen(false);
          setSuccessOpen(true);
        } else {
          setOpen(false);
        }
        setLoading(false);
      });
    }
  };

  const addAttendanceShiftForEmployee = () => {
    if (employees.length !== 0) {
      setLoading(true);
      dispatch(addAttendanceShift({ companyId: user.company_id, attendanceData })).then((res) => {
      });
    }
  };

  const addLeaveRulesForEmployee = () => {
    if (employees.length !== 0) {
      setLoading(true);
      dispatch(addLeaveRules(bulkLeave)).then((res) => {
        console.log("res",res);
      });
    }
  };



  return (
    <Box className="flex justify-center mx-32 mt-32">
      <Box className="flex flex-col gap-28 xl:w-3/4 md:w-11/12 sm:w-full">
        <WizardHeadingCard />
        <WizardWelcomeCard progress={progress} />
        <WizardEmployeeCard
          setBulkFile={setBulkFile}
          employees={employees}
          setEmployees={setEmployees}
          progress={progress}
          setProgress={setProgress}
          bulkFile={bulkFile}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
        <WizardAttendanceCard
          setProgress={setProgress}
          progress={progress}
          attendance={attendance}
          setAttendance={setAttendance}
          attendanceData={attendanceData}
          setAttendanceData={setAttendanceData}
        />
        <WizardLeaveRulesCard
            // onSubmitLeave={onSubmitLeave}
          progress={progress}
          bulkLeave={bulkLeave}
          setBulkLeave={setBulkLeave}
          setProgress={setProgress}
        />
        <Box className="flex justify-center mb-24">
          <Button
            className="rounded-2 text-16"
            style={{ width: 200, height: 60 }}
            variant="contained"
            disabled={progress !== 100}
            onClick={handleOpen}
          >
            Invite Employees
          </Button>
        </Box>
        <Box className="flex justify-end mb-24">
          <Button size="large" variant="text" onClick={onDashboard} endIcon={<ArrowRightAlt />}>
            Go to Dashboard
          </Button>
        </Box>
      </Box>
      {open && (
        <WizardConfirmationDialog
          open={open}
          loading={loading}
          handleSuccessOpen={handleSuccessOpen}
          addAttendanceShiftForEmployee={addAttendanceShiftForEmployee}
          addLeaveRulesForEmployee={ addLeaveRulesForEmployee}
          handleClose={handleClose}
        />
      )}
      {!loading && successOpen && (
        <WizardSuccessDialog
          open={successOpen}
          handleSuccess={() => {
            setSuccessOpen(false);
            onDashboard();
          }}
        />
      )}
    </Box>
  );
};

export default withReducer('wizardApp', reducer)(WizardPage);
