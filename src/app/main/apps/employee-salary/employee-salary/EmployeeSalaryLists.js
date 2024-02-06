import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import EmployeeSalaryListHeader from './EmployeeSalaryListHeader';
import withReducer from '../../../../store/withReducer';
import reducer from '../store/index';
import EmployeeSalaryListTable from "./EmployeeSalaryListTable";

const Root = styled(FusePageCarded)(({ theme }) => ({
    '& .FusePageCarded-header': {
        minHeight: 72,
        height: 72,
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            minHeight: 136,
            height: 136,
        },
    },
    '& .FusePageCarded-content': {
        display: 'flex',
    },
    '& .FusePageCarded-contentCard': {
        overflow: 'hidden',
    },
}));

function EmployeeSalaryLists() {
    return <Root
        header={<EmployeeSalaryListHeader />}
        content={<EmployeeSalaryListTable/>}
        innerScroll
    />;
}

export default withReducer('salaryApp', reducer)(EmployeeSalaryLists);
