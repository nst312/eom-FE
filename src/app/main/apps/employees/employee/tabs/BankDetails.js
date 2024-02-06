import {Controller, useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useParams} from 'react-router-dom';
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {useDispatch, useSelector} from "react-redux";
import BankDetailsDialogs from "./BankDetailsDialog";
import {addBankDetails, openBankDetailsDialog, updateBankDetails} from "../../store/bankDetailsSlice";

const schema = yup.object().shape({
    bankName:yup.string().required('Bank name is required'),
    BRANCH:yup.string().required('Branch name is required'),
    CITY:yup.string().required('City is required'),
    accountTitle:yup.string().required('accountTitle is required'),
    accountNumber: yup.number().typeError('Account Number is always in Number').positive().integer().required(),
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
    type:yup.string().required('type is required'),
});

const BankDetails = ({getBankDetails}) => {
    const dispatch = useDispatch();
    const routeParams = useParams();
    const [bankData, setBankData] = useState({});
    const [isEdit, setIsEdit] = useState(false)
    const searchBankDetail = useSelector(({eomApp}) => eomApp.bankDetails.searchData);
    const defaultValues = {};
    const { control, reset, handleSubmit, formState, getValues, register, watch, setValue } = useForm(
        {
            mode: 'onChange',
            defaultValues,
            resolver: yupResolver(schema),
        }
    );
    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        if (!getBankDetails) {
            return;
        }
        /**
         * Reset the form on product state changes
         */
        reset(getBankDetails, { shouldValidate: true, shouldDirty: false });
    }, [getBankDetails, reset, isEdit]);

    const optiones = [
        { label: 'Current Account', value: 'CURRENT_ACCOUNT' },
        { label: 'Saving Account', value: 'SAVING_ACCOUNT' },
    ];

    useEffect(() => {
        if(searchBankDetail === null && getBankDetails && getBankDetails.id)
        {
           setValue('CITY',getBankDetails.city)
           setValue('IFSC',getBankDetails.ifsc)
           setValue('BRANCH',getBankDetails.branch)
           setValue('BANK',getBankDetails.BANK)
           setValue('type',getBankDetails.accountType)
        }
if (searchBankDetail !== null ){
        setValue('CITY',searchBankDetail.CITY)
        setValue('IFSC',searchBankDetail.IFSC)
        setValue('BRANCH',searchBankDetail.BRANCH)
        setValue('bankName',searchBankDetail.BANK)
}
    }, [searchBankDetail,getBankDetails]);



    const onSubmit = () => {
        const bankDetails = {
            id: routeParams.employeeId,
            data: {
                bankName: getValues().bankName,
                accountNumber: getValues().accountNumber,
                ifsc: getValues().IFSC,
                branch: getValues().BRANCH,
                city: getValues().CITY,
                accountTitle:getValues().accountTitle,
                accountType:getValues().type,
            },
        };
        if (!getBankDetails && !getBankDetails?.id) {
        dispatch(addBankDetails(bankDetails)).then((res) => {
            if (res.payload){
                setIsEdit(true)
            }
            reset(getValues(), { shouldValidate: true, shouldDirty: false });
        })
    } else {
            const data = {...bankDetails, bankId: getBankDetails.id}
            dispatch(updateBankDetails(data)).then((res)=> {
                reset(getValues(), { shouldValidate: true, shouldDirty: false });
            })
        }
    }

  return(
      <>
                <form
                     noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col md:overflow-hidden"
                >
                    <div className="flex -mx-4">
                        <Controller
                            name="accountTitle"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16 mx-4"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!errors.accountTitle}
                                    helperText={errors?.accountTitle?.message}
                                    placeholder="Account Title"
                                    label="Account Title"
                                />
                            )}
                        />
                    </div>
                    <div className="mb-16 text-right">
                        <Button
                            className="whitespace-no-wrap  normal-case"
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                dispatch(openBankDetailsDialog());
                            }}
                        >
                            Find My Branch
                        </Button>
                    </div>
                    <div className="flex -mx-4">
                        <Controller
                            name="bankName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16 mx-4"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!errors.bankName}
                                    helperText={errors?.bankName?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Bank Name"
                                    label="Bank Name"
                                />
                            )}
                        />
                        <Controller
                            name="CITY"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16 mx-4"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!errors.CITY}
                                    helperText={errors?.CITY?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="City"
                                    label="City"
                                />
                            )}
                        />

                    </div>
                    <div className="flex -mx-4">
                        <Controller
                            name="BRANCH"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16 mx-4"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!errors.BRANCH}
                                    helperText={errors?.BRANCH?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Branch Name"
                                    label="Branch Name"
                                />
                            )}
                        />
                        <Controller
                            name="IFSC"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16 mx-4"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!errors.IFSC}
                                    helperText={errors?.IFSC?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="IFSC Code"
                                    label="IFSC Code"
                                />
                            )}
                        />

                    </div>
                    <div className="flex -mx-4">
                        <Controller
                            name="type"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    id="grouped-demo"
                                    options={optiones}
                                    fullWidth
                                    className=" mt-8 mb-16 mx-4"
                                    required
                                    value={value}
                                    groupBy={(option) => option.firstLetter}
                                    getOptionLabel={(option) => {
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        if (option.label) {
                                            return option.label;
                                        }
                                        return option.label;
                                    }}
                                    onChange={(event, newValue) => {
                                        onChange(newValue.value);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            error={!!errors.type}
                                            helperText={errors?.type?.message}
                                            FormHelperTextProps={{ style: { color: 'red' } }}
                                            variant="outlined"
                                            placeholder="Account Type"
                                        />
                                    )}
                                />
                            )}
                        />
                        <Controller
                            name="accountNumber"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    // onChange={(e) => salaryLeaveModule(e,'paidLeave')}
                                    className="mt-8 mb-16 mx-4"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!errors.accountNumber}
                                    helperText={errors?.accountNumber?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Account Number"
                                    label="Account Number"
                                />
                            )}
                        />
                    </div>

                    <div className="flex justify-end mt-9">
                        <Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            disabled={_.isEmpty(dirtyFields) && !isValid}
                        >
                            {isEdit || getBankDetails ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </form>
          <BankDetailsDialogs
              setBankData={setBankData}
              bankData={bankData}
              searchBankDetail={searchBankDetail}
          />
      </>
  )
}
export default BankDetails;

