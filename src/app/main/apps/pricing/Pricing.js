import Button from '@mui/material/Button';
import { Check } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import './pricing.css';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

function Pricing() {
  return (
    <>
      <div className="container">
        <h2 className="pricing-container-text">
          {' '}
          Want To See the plan? Switch To Desktop Version{' '}
        </h2>
      </div>
      <div className="container position-relative py-40 pricing-container">
        <div>
          <div className="grid grid-cols-5 heading-grid">
            <div className="col-span-2 p-10 flex flex-col justify-center items-center gap-10">
              <img src="/assets/images/pricing/supplies.png" width={200} />
              <h2 className="font-bold"> Features </h2>
            </div>
            <div className="p-10  flex flex-col justify-center items-center">
              <div className="w-96 h-96 rounded-full flex justify-center items-center bg-green-500 mb-4">
                <img src="/assets/images/pricing/kite.png" width={50} />
              </div>
              <div className="flex flex-col gap-4 items-center text-center">
                <h2 className="font-bold"> Free Forever </h2>
                <h3 className="text-14 font-bold">No Hidden Charges</h3>
                <h3 className="text-14 font-bold">No Credit Card Required</h3>
                <h3 className="text-14 text-gray-600">&#8377;0/month</h3>
                <Button className="w-full  rounded-4" variant="contained">
                  Select Plan
                </Button>
              </div>
            </div>
            <div className="p-10 px-52 flex flex-col justify-center items-center">
              <div className="w-96 h-96 rounded-full flex justify-center items-center bg-yellow-500 mb-4">
                <img src="/assets/images/pricing/plane.png" width={50} />
              </div>
              <div className="flex flex-col gap-4 items-center text-center">
                <h2 className="font-bold"> Professional </h2>
                <h3 className="text-14 font-bold">1499/Month/upto 25 emp</h3>
                <h3 className="text-14 font-bold">50 per additional emp 26-50</h3>
                <h3 className="text-14 text-gray-600">&#8377;40 per additional emp 51+</h3>
                <Button className="w-full rounded-4" variant="outlined">
                  Cancel
                </Button>
              </div>
            </div>
            <div className="p-10  bg-pink-A200 flex flex-col justify-center items-center">
              <div className="w-96 h-96 rounded-full flex justify-center items-center bg-pink-A100 mb-4">
                <img src="/assets/images/pricing/rocket.png" width={50} />
              </div>
              <div className="flex flex-col gap-4 items-center grow justify-between text-center text-white">
                <h2 className="font-bold"> Enterprise </h2>
                <h3 className="text-14 font-bold">Custom Pricing</h3>
                <Button className="w-full text-white border-white rounded-4" variant="outlined">
                  Current Plan
                </Button>
                <h3 className="text-14 font-bold">Valid till 03/10/2022</h3>
              </div>
            </div>
          </div>
          {/* HR Management */}
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <Typography color="primary" className="font-bold ">
                HR Management
              </Typography>
            </div>
            <div />
            <div />
            <p />
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Reminders and Alerts</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Automated Birthday/Anniversary Messages</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Login using OTP</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Employee Self Onboarding with Docs</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Data Storage</p>
            </div>
            <p className="px-20">250 MB</p>
            <p className=" px-20"> Unlimited </p>
            <p className=" px-20">Unlimited</p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Employee Database Management</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />{' '}
            </p>
            <p className="text-blue-700 px-20">
              <Check />{' '}
            </p>
          </div>
          <div className="grid grid-cols-5 ">
            <div className="col-span-2 p-6 flex flex-col px-20 pb-20 gap-10">
              <p>Verification Dashboard</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />{' '}
            </p>
            <p className="text-blue-700 px-20">
              <Check />{' '}
            </p>
          </div>
          {/* Leave & Attendance */}
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <Typography color="primary" className="font-bold ">
                Leave & Attendance
              </Typography>
            </div>
            <div />
            <div />
            <p />
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Web Clock for Attendance</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Customizable Leave Rules</p>
            </div>
            <p className="px-20"> 2 </p>
            <p className="px-20"> Unlimited </p>
            <p className="px-20"> Unlimited </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Customizable Attendance Rules</p>
            </div>
            <p className="px-20"> 2 </p>
            <p className="px-20"> Unlimited </p>
            <p className="px-20"> Unlimited </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Attendance Penalty Rules</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>GPS Attendance</p>
            </div>
            <p className="font-bold px-20">
              {' '}
              <Checkbox color="primary" className="p-0" />
              &#8377;20/user/month{' '}
            </p>
            <p className="text-blue-700 px-20">
              {' '}
              <Check />{' '}
            </p>
            <p className="text-blue-700 px-20">
              {' '}
              <Check />{' '}
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Attendance IP Restriction</p>
            </div>
            <p className="font-bold px-20">
              {' '}
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month{' '}
            </p>
            <p className="font-bold px-20">
              {' '}
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month{' '}
            </p>
            <p className="text-blue-700 px-20">
              {' '}
              <Check />{' '}
            </p>
          </div>
          <div className="grid grid-cols-5 ">
            <div className="col-span-2 p-6 flex flex-col px-20 pb-20 gap-10">
              <p>Geo-Fencing</p>
            </div>
            <p className="font-bold px-20">
              {' '}
              <Checkbox color="primary" className="p-0" />
              &#8377;20/user/month
            </p>
            <p className="font-bold px-20">
              {' '}
              <Checkbox color="primary" className="p-0" />
              &#8377;20/user/month
            </p>
            <p className="text-blue-700 px-20">
              {' '}
              <Check />{' '}
            </p>
          </div>
          {/* Payroll */}
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <Typography color="primary" className="font-bold ">
                Payroll
              </Typography>
            </div>
            <div />
            <div />
            <p />
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Customizable Salary Structure</p>
            </div>
            <p className="px-20"> 2 </p>
            <p className="px-20"> Unlimited </p>
            <p className="px-20"> Unlimited </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Bank Integration for Salary Payout from any current account</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Audit Logs</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Salary Payout</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Bank Transfer through NEFT</p>
            </div>
            <p className="px-20">Unlimited</p>
            <p className="px-20">Unlimited</p>
            <p className="px-20">Unlimited</p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Bank Transfer through via KredPay</p>
            </div>
            <p className="px-20">Unlimited</p>
            <p className="px-20">Unlimited</p>
            <p className="px-20">Unlimited</p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>PF, ESI, PT & TDS Statutory calculation</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>PF, ESI Challan Generation</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>JV Outputs for Finance(Quickbooks)</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>From 16 & 12BB</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>From 24Q</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Income Tax Projections for Employee</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Income Tax Computation</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;20/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5 ">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10 pb-20">
              <p>Payslips Bulk Download</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          {/* Expense Management */}
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <Typography color="primary" className="font-bold ">
                Expense Management
              </Typography>
            </div>
            <div />
            <div />
            <p />
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Expense Payout</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10  pb-20">
              <p>Expense Approval Workflow</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;20/user/month
            </p>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;20/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          {/*   Additional Features */}
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <Typography color="primary" className="font-bold ">
                Additional Features
              </Typography>
            </div>
            <div />
            <div />
            <p />
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>ESS Portal</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Mobile Application</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5 ">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10 pb-20">
              <p>Kredily Bazaar</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          {/*   Implementation & Support */}
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <Typography color="primary" className="font-bold ">
                Implementation & Support
              </Typography>
            </div>
            <div />
            <div />
            <p />
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Setup Support - 2 Hours (Available for first 15 Days</p>
            </div>
            <p className="text-blue-700 px-20" />
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Live Webinar</p>
            </div>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Support via Email</p>
            </div>
            <p className="text-blue-700 px-20" />
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Support via Chat & Phone (Minimum 20 Active Employee)</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;20/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Multi-company Support</p>
            </div>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="font-bold px-20">
              <Checkbox color="primary" className="p-0" />
              &#8377;10/user/month
            </p>
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Training for employees</p>
            </div>
            <p className="text-blue-700 px-20" />
            <p className="text-blue-700 px-20" />
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-6 flex flex-col px-20 gap-10">
              <p>Biometric integration for Attendance (Set-up charges Rs. 5000)</p>
            </div>
            <p className="text-blue-700 px-20" />
            <p className="text-blue-700 px-20" />
            <p className="text-blue-700 px-20">
              <Check />
            </p>
          </div>
        </div>
        <div
          className="w-100 sticky bottom-0 left-[50%] border-1 bg-white"
          style={{ background: '#F0F7F7' }}
        >
          <h2 className="text-center py-10">Plan Summary</h2>
          <Divider />
          <div className="grid grid-cols-3 gap-10 p-10">
            <div className="border-r-1 px-10">
              <div className="grid grid-cols-2 mb-10">
                <p>Request Plan</p>
                <p>Professional</p>
              </div>
              <div className="grid grid-cols-2 mb-10 items-center">
                <p>Select No Of Employee's</p>
                <TextField variant="standard" />
              </div>
            </div>
            <div className="border-r-1 px-10">
              <div className="grid grid-cols-2 mb-10">
                <p>Request Plan</p>
                <p> 0/user/month </p>
              </div>
              <div className="grid grid-cols-2 mb-10 items-center">
                <p>Total Add on price</p>
                <p> 0/month </p>
              </div>
              <div className="grid grid-cols-2 mb-10 items-center">
                <p>Plan Price</p>
                <p> 1,499/month </p>
              </div>
            </div>
          </div>
          <div className="p-10">
            <div className="px-10">
              <h3 className="mb-10">Total 0/month</h3>
              <Button variant="contained" className="rounded-4">
                Send Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
