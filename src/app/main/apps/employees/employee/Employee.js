import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EmployeeDetails from './tabs/EmployeeDetails';
import EmployeeHeader from './EmployeeHeader';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import EmployeeAddress from './tabs/EmployeeAddress';
import EmployeeSalary from './tabs/EmplopyeeSalary';
import EmployeeSalaryList from './tabs/EmployeeSalaryList';
import { getEmployeeSalaryDetails } from '../store/empSalarySlice';
import { getEmployeeDetails } from '../store/employeesDetailSlice';
import { getAllCountries } from '../../../../auth/store/countrySlice';
import BankDetails from './tabs/BankDetails';
import PaidLeaves from './tabs/PaidLeaves';
import { getLeavesDetails } from '../store/paidLeavesSlice';
import SalaryHistory from './tabs/SalaryHistory';
import { getSalaryHistory } from '../store/salaryHistorySlice';
import {getBankDetailsData} from "../store/bankDetailsSlice";
import Documents from "../../Components/Document/Document";
import { selectEmployee } from '../store/employeeSlice';

const Root = styled(FusePageCarded)(({theme}) => ({
    '& .FusePageCarded-header': {
        minHeight: 72,
        height: 72,
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            minHeight: 136,
            height: 136,
        },
    },
}));

function Employee() {
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);
    const employeeData = useSelector(({eomApp}) => eomApp.employeeDetails);
    const empData = useSelector(({eomApp}) => eomApp?.empSalary?.data);
    const [empDetails, setEmpDetails] = useState([]);
    const [bankDetails, setBankDetails] = useState(null );
    const [salaryHistoryDetails, setSalaryHistoryDetails] = useState([]);
    console.log("salaryHistoryDetails",bankDetails);
    const [leaveDetails, setLeaveDetails] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const routeParams = useParams();
    const employees = useSelector(selectEmployee);

  const handleClickEditable = (value) => {
        setIsEditable(value);
    };

    useEffect(() => {
        getAllCountriesDetails()
    }, [dispatch, tabValue]);

    useEffect(() => {
        dispatch(getEmployeeDetails(routeParams));
    }, [dispatch, routeParams]);

    const getAllCountriesDetails = () => {
        if (tabValue === 1) {
            dispatch(getAllCountries());
        }
    }

    const getSalaryListData = () => {
        dispatch(getEmployeeSalaryDetails({employeeId: routeParams.employeeId, page: 1, perPage: 10})).then((res) =>{
          if (res.payload.data.length !== 0){
            setEmpDetails(res.payload.data)
            setIsEditable(true)
          }else{
            setIsEditable(false)
          }
        })
    };

    const getSalaryHistoryData = () => {
        dispatch(getSalaryHistory({ employeeId: routeParams.employeeId, page: 1, perPage: 10 })).then((res)=>{
            setSalaryHistoryDetails(res.payload)
        })
    }

    const getBankData = () =>{
        dispatch(getBankDetailsData(routeParams)).then((res)=>{
            if(res.payload) {
                setBankDetails(res.payload)
            }else{
                setBankDetails(null)
            }
        })
    }

    const getLeaveDetails = () =>{
        dispatch(getLeavesDetails(routeParams)).then((res)=>{
            setLeaveDetails(res.payload)
        })
    }

    function handleTabChange(event, value) {
        setTabValue(value);
        if (value === 4) {
            getSalaryListData();
        }else{
            setEmpDetails([])
        }

        if (value ===  2){
            getBankData()
        }else{
            setBankDetails({})
        }

        if(value === 3){
            getLeaveDetails()
        }else {
            setLeaveDetails({})
        }

        if(value === 6){
            getSalaryHistoryData()
        }else {
            setSalaryHistoryDetails([])
        }
    }

  return (
    <>
      <Root
        header={
          <EmployeeHeader
            tabValue={tabValue}
            employeeData={employeeData}
            isEditable={isEditable}
            handleClickEdit={handleClickEditable}
          />
        }
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64' }}
          >
            <Tab className="h-64" label="Details" />
            <Tab className="h-64" label="Addresses" />
            <Tab className="h-64" label="Bank Account" />
            <Tab className="h-64" label="Paid Leaves" />
            <Tab className="h-64" label="Salary" />
            <Tab className="h-64" label="Salary Structure" />
            <Tab className="h-64" label="Slip History " />
            <Tab className="h-64" label="Documents" />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <EmployeeDetails employeeData={employeeData} employeesList={employees} />
            </div>

            <div className={tabValue !== 1 ? 'hidden' : ''}>
              {tabValue === 1 && <EmployeeAddress employeeData={employeeData} />}
            </div>
            <div className={tabValue !== 2 ? 'hidden' : ''}>
              {tabValue === 2 && <BankDetails getBankDetails={bankDetails} setBankDetails={setBankDetails} />}
            </div>

            <div className={tabValue !== 3 ? 'hidden' : ''}>
              {tabValue === 3 && (
                <PaidLeaves setLeaveDetails={setLeaveDetails} data={leaveDetails} />
              )}
            </div>
            <div className={tabValue !== 4 ? 'hidden' : ''}>
              {tabValue === 4 && (
                <EmployeeSalary
                  employeeData={employeeData}
                  isEditable={isEditable}
                  empData={empDetails.length > 0 ? empDetails : []}
                  getSalaryListData={getSalaryListData}
                  handleClickEditable={handleClickEditable}
                />
              )}
            </div>
            <div className={tabValue !== 5 ? 'hidden' : ''}>
              {tabValue === 5 && (
                <EmployeeSalaryList userId={employeeData && employeeData.userId} />
              )}
            </div>
            <div className={tabValue !== 6 ? 'hidden' : ''}>
              {tabValue === 6 && (
                <SalaryHistory
                  setSalaryHistoryDetails={setSalaryHistoryDetails}
                  salaryHistoryDetail={salaryHistoryDetails}
                />
              )}
            </div>
              <div>
                  {tabValue === 7 && (
                    <Documents empId={employeeData?.id} />
                  )}
              </div>
          </div>
        }
        innerScroll
      />
    </>
  );
}

export default withReducer('eomApp', reducer)(Employee);
