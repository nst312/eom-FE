import {Controller, useForm} from "react-hook-form";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import * as yup from "yup";
import _ from "../../../../../../@lodash";
import {addLeavesDetails, updateLeavesDetails} from "../../store/paidLeavesSlice";

const schema = yup.object().shape({
    paidLeave: yup.number()
        .required('ERROR: The number is required!')
        .test(
            'Is positive?',
            'ERROR: The number must be greater than -1!',
            (value) => value > -1
        ),

    sickLeave: yup.number()
        .required('ERROR: The number is required!')
        .test(
            'Is positive?',
            'ERROR: The number must be greater than -1!',
            (value) => value > -1
        ),
});


const PaidLeaves = (props) => {
    const dispatch = useDispatch();
    const {data, setLeaveDetails} = props;
    const defaultValues = {};
    const { control, reset, handleSubmit, formState, getValues, register, watch, setValue } = useForm(
        {
            mode: 'onChange',
            defaultValues,
            resolver: yupResolver(schema),
        }
    );

    const routeParams = useParams();
    const [isEdit, setIsEdit] = useState(false)
    // const [totalLeaves,setTotalLeaves] = useState(0);
    const[totalDuration,setTotalDuration] = useState(0);
    useEffect(() => {
        if (!data) {
            return;
        }
        reset(data, { shouldValidate: true, shouldDirty: false });
    }, [data, reset, isEdit]);




    const { isValid, dirtyFields, errors } = formState;


    const onSubmit = (leavesData)  => {

            if (!isEdit && data === undefined) {
                const leavesDetails = {
                    id: routeParams.employeeId,
                    dataLeave: {
                        paidLeave: Number(leavesData.paidLeave),
                        sickLeave: Number(leavesData.sickLeave),
                        unPaidLeave: Number(leavesData.unPaidLeave),
                    },
                };
                dispatch(addLeavesDetails(leavesDetails)).then((res) => {
                    if (res.payload) {
                        setLeaveDetails(res.payload)
                        setIsEdit(true)
                    }
                    reset(getValues(), {shouldValidate: true, shouldDirty: false});
                });
            } else {
                const leavesDetails = {
                    id: data.id,
                    dataLeave: {
                        paidLeave: Number(leavesData.paidLeave),
                        sickLeave: Number(leavesData.sickLeave),
                        unPaidLeave: Number(leavesData.unPaidLeave),
                    },
                };
                dispatch(updateLeavesDetails(leavesDetails)).then((res) => {
                    reset(getValues(), {shouldValidate: true, shouldDirty: false});
                });
            }

    }


    return (
        <>
            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col md:overflow-hidden"
            >

                <div className="flex -mx-4">
                    <Controller
                        name="paidLeave"
                        control={control}
                        // defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                // onChange={(e) => salaryLeaveModule(e,'paidLeave')}
                                className="mt-8 mb-16 mx-4"
                                variant="outlined"
                                fullWidth
                                type="number"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!errors.paidLeave}
                                helperText={errors?.paidLeave?.message}
                                placeholder="Paid Leave"
                                label="Paid Leave"
                            />
                        )}
                    />

                    <Controller
                        name="sickLeave"
                        control={control}
                        // defaultValue=""
                        min="0"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                // onChange={(e) => salaryLeaveModule(e,'sickLeave')}
                                className="mt-8 mb-16 mx-4"
                                variant="outlined"
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!errors.sickLeave}
                                helperText={errors?.sickLeave?.message}
                                type="number"
                                placeholder="Sick Leave"
                                label="Sick Leave"
                            />
                        )}
                    />

                    <Controller
                        name="unPaidLeave"
                        control={control}
                        defaultValue={0}
                        min="0"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                // onChange={(e) => salaryLeaveModule(e,'sickLeave')}
                                className="mt-8 mb-16 mx-4"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type="number"
                                placeholder="UnPaid Leave"
                                label="UnPaid Leave"
                            />
                        )}
                    />


                </div>
                 {/*<pre>{JSON.stringify(getValues(), null, ' ')}</pre>*/}
                <div className="flex justify-end">
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                    >
                        {!isEdit &&  data === undefined ? 'Save' : 'Update'}
                    </Button>
                </div>
            </form>
        </>
    );
}
export default PaidLeaves;