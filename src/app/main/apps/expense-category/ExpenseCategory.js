import FusePageCarded from '@fuse/core/FusePageCarded';
import {styled} from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import reducer from './store';
import ExpenseCategoryHeader from "./ExpenseCategoryHeader";
import ExpenseCategoryDialog from "./ExpenseCategoryDialog";
import ExpenseCategoryTable from "./ExpenseCategoryTable";

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

function ExpenseCategory() {
    const [loading, setLoading] = useState(true);
    const [expenseDetails, setExpenseDetails] = useState([]);
    const expenseDialog = useSelector(
        ({ expenseCategoryApp }) => expenseCategoryApp?.expenseCategory.ExpenseCategoryDialog
    );

    const onLoadingFalse = (value) => {
        setLoading(value);
    };



    return (
        <>
            <Root
                header={<ExpenseCategoryHeader setLoading={(e) => onLoadingFalse(e)} loading={loading} />}
                content={
                    <ExpenseCategoryTable
                        expenseDetails={expenseDetails}
                        setExpenseDetails={setExpenseDetails}
                    />
                }
                innerScroll
            />

            {expenseDialog.props.open && (
                <ExpenseCategoryDialog/>
            )}
        </>
    );
}

export default withReducer('expenseCategoryApp', reducer)(ExpenseCategory);
