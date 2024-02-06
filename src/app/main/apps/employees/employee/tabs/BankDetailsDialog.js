import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {closeBankDetailsDialog, setSearchIfscData} from "../../store/bankDetailsSlice";
import _ from "../../../../../../@lodash";


const schema = yup.object().shape({
    IFSC: yup.string()
        .required("IFSC Code Is Required")
        .test(
            "IFSC Code",
            "IFSC Code must be of length 11",
            (value) => value?.length === 11
        )
        .matches(
            /^[A-Z]{4}0[A-Z0-9]{6}$/,
            "First 4 characters must be Capital alphabets and last 7 characters must be numbers"
        ),
});


function BankDetailsDialogs({bankData, setBankData, searchBankDetail}) {

    const dispatch = useDispatch();

    const defaultValues = {};
    const {control, reset, handleSubmit, formState, getValues, register, watch, setValue} = useForm(
        {
            mode: 'onChange',
            defaultValues,
            resolver: yupResolver(schema),
        }
    );


    const {isValid, dirtyFields, errors} = formState;

    const BankDetailsDialogData = useSelector(
        ({eomApp}) => eomApp.bankDetails.BankDetailsDialog
    );

    const closeDialog = () => {
        setValue('IFSC','')
        dispatch(closeBankDetailsDialog());
        reset(getValues(), { shouldValidate: true, shouldDirty: false });

    };

    const onSubmit = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`https://ifsc.razorpay.com/${getValues().IFSC}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    setBankData(result)
                    dispatch(setSearchIfscData(result))
                }
            })
            .catch(error => console.log('error', error))
    }


    return (
        <>
            <Dialog
                {...BankDetailsDialogData?.props}
                onClose={closeDialog}
                fullWidth maxWidth="sm" scroll="body"
            >
                <AppBar position="static" elevation={0}>
                    <Toolbar className="flex w-full">
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                        >
                            Find Branch
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent classes={{root: 'p-0'}}>
                    <div className="px-16 mt-16 sm:px-24">
                        <FormControl className="mt-8 mb-16" required fullWidth>
                            <div className="flex">
                                <Controller
                                    name="IFSC"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="IFSC"
                                            className="w-3/4"
                                            name="IFSC"
                                            id="IFSC"
                                            required
                                            error={!!errors.IFSC}
                                            helperText={errors?.IFSC?.message}
                                            variant="outlined"
                                            placeholder="Enter IFSC Code"
                                        />
                                    )}
                                />
                                <DialogActions className="justify-end px-8 py-16">
                                    <div className="px-16">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            onClick={onSubmit}
                                            disabled={_.isEmpty(dirtyFields) || !isValid }
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </DialogActions>
                            </div>

                        </FormControl>
                    </div>
                    {searchBankDetail !== null &&
                        <>
                    <Table>
                        {bankData.IFSC  &&
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    IFSC Code :
                                </TableCell>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    {bankData?.IFSC}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    MICR Code :
                                </TableCell>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    {bankData?.MICR}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    Bank :
                                </TableCell>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    {bankData?.BANK}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    Address :
                                </TableCell>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    {bankData?.ADDRESS}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    District :
                                </TableCell>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    {bankData?.DISTRICT}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    State :
                                </TableCell>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    {bankData?.STATE}
                                </TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    Phone Number :
                                </TableCell>
                                <TableCell align="left" style={{minWidth: 80}} className="table-right-border">
                                    {bankData?.CONTACT}
                                </TableCell>
                            </TableRow>

                        </TableHead>
                        }
                    </Table>

                        <div className="flex justify-end mt-10 mb-10 mr-10">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                onClick={closeDialog}
                                disabled={_.isEmpty(dirtyFields) || !isValid }
                            >
                                Close
                            </Button>
                        </div>
                        </>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BankDetailsDialogs;