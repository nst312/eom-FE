import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import reducer from '../store';
import ExpenseHeader from "../Expense-list/ExpenseHeader";
import {openExpenseDialog} from "../store/expenseSlice";
import FusePageCarded from "../../../../../../@fuse/core/FusePageCarded";
import withReducer from "../../../../../store/withReducer";
import ExpenseDialog from "./ExpenseDialog";
import ExpenseList from "../Expense-list/ExpenseList";
import ExpenseStatusDialog from "./ExpenseStatusDialog";
import Tour from 'reactour';

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

const Expense = () => {
    const [selectedId, setSelectedId] = useState('');
    const onSelectId = (value) => {
        setSelectedId(value);
    };

  const [stepsEnabled, setStepsEnabled] = useState(true);

  const steps = [
    {
      selector: '[data-tour="Expense Category"]',
      content: "To Add Expenses, First you have to add Expenses Categories"
    },
    {
      selector: '[data-tour="add expense"]',
      content: "You can add expense by clicking here!"
    },
  ];

  const user = useSelector(({ auth }) => auth.user);

  const walkthroughExpense = localStorage.getItem("walkthroughExpense");

  return (
        <>
            <Root
                header={
                    <ExpenseHeader
                        // setLoading={(e) => onLoadingFalse(e)}
                        // loading={loading}
                        // onSearch={onSearch}
                    />
                }
                content={<ExpenseList />}
                innerScroll
            />

            <ExpenseDialog selectedId={selectedId} setSelectId={onSelectId} />

            <ExpenseStatusDialog/>

          {
            walkthroughExpense == "1" ? null :  (
              user.role === "CEO" && (
                <Tour
                  steps={steps}
                  isOpen={stepsEnabled}
                  onRequestClose={() => {
                    console.log("closed");
                    localStorage.setItem("walkthroughExpense","1");
                    setStepsEnabled(false);
                  }}
                />
              )
            )
          }


        </>
    );
};

export default withReducer('expenseApp', reducer)(Expense);
