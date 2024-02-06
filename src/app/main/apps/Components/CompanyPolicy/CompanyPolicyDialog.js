import React, {useCallback, useEffect, useState} from 'react'
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {Box} from "@mui/system";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import _ from "../../../../../@lodash";
import FuseUtils from "../../../../../@fuse/utils";
import {addCompanyPolicy, closeCompanyPolicyDialog, updateCompanyPolicy} from "./store/companyPolicySlice";

const defaultValues = {
    title: '',
    description: '',
    path:'',
};

const schema = yup.object().shape({
    description: yup.string().required('Enter description.'),
    title: yup.string().required('Enter title.'),
    path: yup.string().nullable(),
});


const CompanyPolicyDialogs = () =>{



    const methods = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const companyPolicyDialog = useSelector(
        ({ companyPolicyApp }) => companyPolicyApp.companyPolicy.CompanyPolicyDialog
    );
    console.log("companyPolicyDialog",companyPolicyDialog)
    const dispatch = useDispatch();
    const [fileUrl, setFileUrl] = useState({});
    console.log("fileUrl",fileUrl.name);
    const [file, setFile] = React.useState(null);
    const { control, formState, getValues, register, watch, setValue, reset } = methods;
    const { errors, isValid, dirtyFields } = formState;

    const initDialog = useCallback(() => {
        /**
         * Dialog type: 'edit'
         */
        if (companyPolicyDialog.type === 'edit' && companyPolicyDialog.data) {
            setFile(null)
            reset({ ...companyPolicyDialog.data });
        }

        /**
         * Dialog type: 'new'
         */
        if (companyPolicyDialog.type === 'new') {
            setFile(null)
            reset({
                ...defaultValues,
                ...companyPolicyDialog.data,
            });
        }
    }, [companyPolicyDialog?.data, companyPolicyDialog?.type, reset]);

    useEffect(() => {
        if (companyPolicyDialog?.props.open) {
            initDialog();
        }
    }, [companyPolicyDialog?.props.open, initDialog]);


    const closeDialog = () => {
        dispatch(closeCompanyPolicyDialog());
    };


    const onSubmit = () =>{
        const policyData = {
            title: getValues().title,
            description: getValues().description,
            path : file
        }

        if (companyPolicyDialog.type === "new") {
            dispatch(addCompanyPolicy(policyData)).then((res) => {
                if(res){
                    closeDialog();
                }
            })
        }else{
            dispatch(updateCompanyPolicy({ id :getValues().id, data:policyData})).then((res) => {
                if (res) {
                    closeDialog();
                }
            });
        }
    }


    return(
        <>
            <div>
                <Dialog
                    {...companyPolicyDialog?.props}
                    onClose={closeDialog}
                    // onClose={handleClose}
                    fullWidth maxWidth="sm" scroll="body"
                >
                    <AppBar position="static" elevation={0} >
                        <Toolbar className="flex w-full">
                            <Typography
                                variant="subtitle1"
                                color="inherit"
                            >
                                Add Policy
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent classes={{root: 'p-0'}}>
                        <div className="px-16 mt-16 sm:px-24">
                            <FormControl className="mt-8 mb-16" required fullWidth>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Title"
                                            name="title"
                                            id="title"
                                            required
                                            error={!!errors.title}
                                            helperText={errors?.title?.message}
                                            variant="outlined"
                                            placeholder="Title"
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl className="mt-8 mb-16" required fullWidth>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Description"
                                            name="description"
                                            id="description"
                                            type="text"
                                            required
                                            rows={5}
                                            multiline
                                            fullWidth
                                            error={!!errors.description}
                                            helperText={errors?.description?.message}
                                            placeholder="Description"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl className="mt-8 mb-16" required fullWidth>
                                <Box className="flex items-center gap-28" >
                                    <Button variant="contained" component="label" >
                                        Select File
                                        <input
                                            name="path"
                                            type="file"
                                            hidden
                                            onChange={async (e) => {
                                                function readFileAsync() {
                                                    return new Promise((resolve, reject) => {
                                                        const fileName = e.target.files[0];
                                                        const extension = fileName.name
                                                            .substring(fileName.name.lastIndexOf('.') + 1)
                                                            .toLowerCase();
                                                        if (!fileName) {
                                                            return;
                                                        }

                                                        setFileUrl(fileName);
                                                        const reader = new FileReader();

                                                        reader.onload = () => {
                                                            resolve({
                                                                id: FuseUtils.generateGUID(),
                                                                url: `data:${fileName.type};base64,${btoa(reader.result)}`,
                                                                type: 'file',
                                                            });
                                                        };

                                                        reader.onerror = reject;
                                                        reader.readAsBinaryString(fileName);
                                                    });
                                                }

                                                const newImage = await readFileAsync();
                                                setFile(e.target.files[0])
                                                setValue('path', newImage.url)
                                            }}
                                        />
                                    </Button>
                                    <Typography>{file?.name || companyPolicyDialog?.data?.path}</Typography>
                                </Box>
                            </FormControl>
                        </div>

                        {companyPolicyDialog?.type === 'new' ? (
                            <DialogActions className="justify-end px-8 py-16">
                                <div className="px-16">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={_.isEmpty(dirtyFields) || !isValid}
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
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        onClick={onSubmit}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </DialogActions>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default CompanyPolicyDialogs