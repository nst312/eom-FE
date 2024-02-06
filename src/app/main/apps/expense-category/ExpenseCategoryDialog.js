import {yupResolver} from "@hookform/resolvers/yup";
import _ from "@lodash";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {useEffect, useState, useCallback} from "react";
import {
    closeExpenseCategoryDialog,
    createExpenseCategory,
    updateExpenseCategory
} from "./store/ExpenseCategorySlice";

const defaultValues = {
    category: "",
};

const schema = yup.object().shape({
    category: yup.string().required("You must enter Expense category"),
});

function ExpenseCategoryDialogs(props) {
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const expenseDialog = useSelector(
        ({expenseCategoryApp}) => expenseCategoryApp.expenseCategory.ExpenseCategoryDialog
    );
    console.log("expenseDialog", expenseDialog)


    const user = useSelector(({auth})=> auth.user)

    const {handleSubmit, formState, reset,getValues, control} = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema),
    });

    const {errors, isValid, dirtyFields} = formState;


    const initDialog = useCallback(() => {
        /**
         * Dialog type: 'edit'
         */
        if (expenseDialog.type === 'edit' && expenseDialog.data) {
            reset({ ...expenseDialog.data });
        }

        /**
         * Dialog type: 'new'
         */
        if (expenseDialog.type === 'new') {
            reset({
                ...defaultValues,
                ...expenseDialog.data,
            });
        }
    }, [expenseDialog.data, expenseDialog.type, reset]);


    useEffect(() => {
        if (expenseDialog.props.open) {
            initDialog();
        }
    }, [expenseDialog.props.open, initDialog]);




    function closeDialog() {
        dispatch(closeExpenseCategoryDialog());
    }

    function onSubmit(data) {

        if (expenseDialog.type === 'new') {
            const expenseDetails = {
                category: getValues().category,
                companyId: user.company_id,
            };
            dispatch(createExpenseCategory(expenseDetails)).then((res) => {
                if (res.payload) {
                    closeDialog();
                    props.setIsAdd(true);
                } else {
                    props.setLoading(false);
                }
            });
        } else {
            const expenseDetails = {
                id: getValues().id,
                category: getValues().category,
            };

            dispatch(updateExpenseCategory(expenseDetails)).then((res) => {
                console.log("res",res)
                if (res.payload) {
                    closeDialog();
                    props.setIsAdd(true);
                } else {
                    props.setLoading(false);
                }
            });
        }
    }


    return (
        <Dialog
            {...expenseDialog.props}
            onClose={closeDialog}
            fullWidth
            maxWidth="sm"
            scroll="body"
        >
            <AppBar position="static" elevation={0}>
                <Toolbar className="flex w-full">
                    <Typography
                        variant="subtitle1"
                        color="inherit"
                        onClick={() => {
                            dispatch(closeExpenseCategoryDialog());
                        }}
                    >
                        Expense Category
                    </Typography>
                </Toolbar>
            </AppBar>

            <form onSubmit={handleSubmit(onSubmit)} >
                <DialogContent classes={{root: "p-0"}}>
                    <div className="px-16 mt-16 sm:px-24">
                        <FormControl className="mt-8 mb-16" required fullWidth>
                            <Controller
                                name="category"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="Expense Category"
                                        autoFocus
                                        error={!!errors.category}
                                        helperText={errors?.category?.message}
                                        required
                                        variant="outlined"
                                    />
                                )}
                            />
                        </FormControl>
                    </div>
                </DialogContent>
                {expenseDialog.type === 'new' ? (
                <DialogActions className="justify-end px-8 py-16">
                    <div className="px-16">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={
                                _.isEmpty(dirtyFields) ||
                                !isValid
                            }
                        >
                            Add
                        </Button>
                    </div>
                </DialogActions>
                    ) : (
                        <DialogActions className="justify-end px-8 py-16">
                            <div className="px-16">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    disabled={
                                        _.isEmpty(dirtyFields) ||
                                        !isValid
                                    }
                                >
                                    Save
                                </Button>
                            </div>
                        </DialogActions>
                    )}
            </form>
        </Dialog>
    );
}

export default ExpenseCategoryDialogs;
