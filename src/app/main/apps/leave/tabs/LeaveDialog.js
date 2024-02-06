import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from 'react-redux';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import {Controller, useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import {FormControlLabel} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import {useCallback, useEffect} from "react";
import {addLeaveRules, closeLeaveDialog, updateLeaveRules} from '../store/leaveRulesSlice';
import _ from '../../../../../@lodash';

const defaultValues = {
    name: '',
    description: '',
    maxLeavesAllowedInMonth: 0,
    leavesAllowedInYear: 0,
    continuousLeavesAllowed: 0,
    negativeLeavesAllowed: false,
    weekendsBetweenLeave: false,
    holidaysBetweenLeave: false,
    allowedUnderProbation: false,
    carryForwardEnabled: false,
};

const schema = yup.object().shape({
    name: yup.string().required('You must enter name'),
    description: yup.string().required('You must enter description'),
});

function LeavesDialog() {
    const dispatch = useDispatch();
    const leavesDialog = useSelector(({leavesApp}) => leavesApp.leaveRules?.LeavesRulesDialog);

    const closeDialog = () => {
        dispatch(closeLeaveDialog());
    };

    const {handleSubmit, formState, reset, control, getValues} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const {isValid, dirtyFields, errors} = formState;

    const initDialog = useCallback(() => {
        /**
         * Dialog type: 'edit'
         */
        if (leavesDialog.type === 'edit' && leavesDialog.data) {
            reset({...leavesDialog.data});
        }

        /**
         * Dialog type: 'new'
         */
        if (leavesDialog.type === 'new') {
            reset({
                ...defaultValues,
                ...leavesDialog.data,
            });
        }
    }, [leavesDialog?.data, leavesDialog?.type, reset]);

    useEffect(() => {
        if (leavesDialog?.props.open) {
            initDialog();
        }
    }, [leavesDialog?.props.open, initDialog]);

    const onSubmit = () => {
        const leaveData = {
            name: getValues().name,
            description: getValues().description,
            maxLeavesAllowedInMonth: Number(getValues().maxLeavesAllowedInMonth),
            leavesAllowedInYear: Number(getValues().leavesAllowedInYear),
            continuousLeavesAllowed: Number(getValues().continuousLeavesAllowed),
            negativeLeavesAllowed: getValues().negativeLeavesAllowed,
            weekendsBetweenLeave: getValues().weekendsBetweenLeave,
            holidaysBetweenLeave: getValues().holidaysBetweenLeave,
            allowedUnderProbation: getValues().allowedUnderProbation,
            carryForwardEnabled: getValues().carryForwardEnabled,
        }
        if (leavesDialog.type === "new") {
            dispatch(addLeaveRules(leaveData)).then((res) => {
                if (res) {
                    closeDialog();
                }
            })
        }
        else{
          dispatch(updateLeaveRules({ id :getValues().id, leaveData})).then((res) => {
            if (res) {
              closeDialog();
            }
          });
        }
    }

    return (
        <Dialog {...leavesDialog?.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <Typography variant="subtitle1" color="inherit" onClick={() => closeDialog()}>
                        Leave Rules
                    </Typography>
                </Toolbar>
            </AppBar>
            <form>
                <DialogContent classes={{root: 'p-0'}}>
                    <div className="px-16 mt-16 sm:px-24">
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        label="Leave Rules Name"
                                        placeholder="Leave Rules Name"
                                        autoFocus
                                        required
                                        variant="outlined"
                                        error={!!errors.name}
                                        helperText={errors?.name?.message}
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        label="Description"
                                        placeholder="Description"
                                        autoFocus
                                        required
                                        variant="outlined"
                                        error={!!errors.description}
                                        helperText={errors?.description?.message}
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <Controller
                                name="maxLeavesAllowedInMonth"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        placeholder="Max Leaves Allowed In Month"
                                        label="Max Leaves Allowed In Month"
                                        type="number"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <Controller
                                name="continuousLeavesAllowed"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        placeholder="Continuous Leaves Allowed"
                                        label="Continuous Leaves Allowed"
                                        type="number"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <Controller
                                name="leavesAllowedInYear"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="Leaves Allowed In Year"
                                        type="number"
                                        variant="outlined"
                                        placeholder="Leaves Allowed In Year"
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <Controller
                                name="negativeLeavesAllowed"
                                type="checkbox"
                                control={control}
                                defaultValue={false}
                                label="negativeLeavesAllowed"
                                render={({field: {onChange, value}}) => (
                                    <FormControlLabel name="weekendsBetweenLeave" control={<Checkbox
                                        checked={value}
                                        onChange={ev => onChange(ev.target.checked)}
                                    />} label="Negative Leaves Allowed"/>

                                )}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <Controller
                                name="weekendsBetweenLeave"
                                type="checkbox"
                                control={control}
                                defaultValue={false}
                                label="weekendsBetweenLeave"
                                render={({field: {onChange, value}}) => (
                                    <FormControlLabel name="weekendsBetweenLeave"
                                                      control={
                                                          <Checkbox
                                                              checked={value}
                                                              onChange={ev => onChange(ev.target.checked)}
                                                          />
                                                      }
                                                      label="Weekends Between Leave"/>
                                )}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <Controller
                                name="holidaysBetweenLeave"
                                type="checkbox"
                                control={control}
                                defaultValue={false}
                                label="holidaysBetweenLeave"
                                render={({field: {onChange, value}}) => (
                                    <FormControlLabel name="holidaysBetweenLeave"
                                                      control={
                                                          <Checkbox
                                                              checked={value}
                                                              onChange={ev => onChange(ev.target.checked)}
                                                          />
                                                      }
                                                      label="Holidays Between Leave"/>
                                )}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <Controller
                                name="allowedUnderProbation"
                                type="checkbox"
                                control={control}
                                defaultValue={false}
                                label="allowedUnderProbation"
                                render={({field: {onChange, value}}) => (
                                    <FormControlLabel name="allowedUnderProbation"
                                                      control={
                                                          <Checkbox
                                                              checked={value}
                                                              onChange={ev => onChange(ev.target.checked)}
                                                          />
                                                      }
                                                      label="Allowed Under Probation"/>
                                )}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <Controller
                                name="carryForwardEnabled"
                                type="checkbox"
                                control={control}
                                defaultValue={false}
                                label="carryForwardEnabled"
                                render={({field: {onChange, value}}) => (
                                    <FormControlLabel name="carryForwardEnabled"
                                                      control={
                                                          <Checkbox
                                                              checked={value}
                                                              onChange={ev => onChange(ev.target.checked)}
                                                          />
                                                      }
                                                      label="Carry Forward Enabled"/>
                                )}
                            />
                        </FormControl>
                    </div>
                </DialogContent>
                {leavesDialog.type === 'new' ? (
                    <DialogActions className="justify-end px-8 py-16">
                        <div className="px-16">
                            <Button
                                className="h-40 my-12"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                variant="contained"
                                onClick={onSubmit}
                            >
                                Add
                            </Button>
                        </div>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-end px-8 py-16">
                        <div className="px-16">
                            <Button
                                className="h-40 my-12"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                variant="contained"
                                onClick={onSubmit}
                            >
                                Save
                            </Button>
                        </div>
                    </DialogActions>
                )}
                {/*<pre>{JSON.stringify(getValues(), null, ' ')}</pre>*/}
            </form>
        </Dialog>
    );
}

export default LeavesDialog;
