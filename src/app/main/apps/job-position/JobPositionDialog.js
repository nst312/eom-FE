import { yupResolver } from "@hookform/resolvers/yup";
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
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import {
  allJobPosition,
  closeJobPositionDialog,
  createJobPosition,
  updateJobPosition,
} from "./store/JobPositionSlice";
import { getAllDepartment } from "../employees/store/employeeSlice";

const defaultValues = {
  jobPosition: "",
  department_name: "",
};

const schema = yup.object().shape({
  jobPosition: yup.string().required("Please enter a Job Position"),
});

function JobPositionDialog(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState(null);
  const dispatch = useDispatch();
  const jobDialog = useSelector(
    ({ JobPositionApp }) => JobPositionApp.jobPosition.JobPositionDialog
  );

  const { handleSubmit, formState, reset, control } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors, isValid, dirtyFields } = formState;

  const initDialog = useCallback(() => {
    if (props.selectedJobId) {
      reset({
        jobPosition: props.data.jobPosition,
        department_name: {
          id: props.data.companyDepartmentId,
          department_name: props.data.company_department.department_name,
        },
      });
      setIsEdit(true);
    } else {
      props.setSelectedId("");
      reset({
        ...defaultValues,
        ...jobDialog.data,
      });
    }
  }, [jobDialog.data, props.data, jobDialog.type, reset]);

  useEffect(() => {
    if (jobDialog.props.open) {
      initDialog();
    }
  }, [jobDialog.props.open, initDialog, props.selectedJobId]);

  useEffect(() => {
    dispatch(getAllDepartment()).then((res) => {
      setDepartments(res.payload.data);
    });
  }, [dispatch]);

  function closeDialog() {
    props.setSelectedId("");
    dispatch(closeJobPositionDialog());
  }

  function onSubmit(data) {
    props.setLoading(true);

    if (!isEdit) {
      const jobPositionDetails = {
        jobPosition: data.jobPosition,
        companyDepartmentId: data.department_name.id,
      };
      dispatch(createJobPosition(jobPositionDetails)).then((res) => {
        if (res.payload) {
          closeDialog();
          getAllJobpositionDetails();
          props.setIsAdd(true);
        } else {
          props.setLoading(false);
        }
      });
    } else {
      const jobPositionDetails = {
        id: props.data.id,
        jobPosition: data.jobPosition,
        companyDepartmentId: selectDepartment?.id || data.department_name.id,
      };

      dispatch(updateJobPosition(jobPositionDetails)).then((res) => {
        if (res.payload) {
          closeDialog();
          getAllJobpositionDetails();
          props.setIsAdd(true);
        } else {
          props.setLoading(false);
        }
      });
    }
  }

  const getAllJobpositionDetails = () => {
    dispatch(allJobPosition({ page: 1, perPage: 10 })).then((res2) => {
      props.setLoadingMore(false);
      props.setLoading(false);
    });
  };

  return (
    <Dialog
      {...jobDialog.props}
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
              dispatch(closeJobPositionDialog());
            }}
          >
            Job Position
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: "p-0" }}>
          <div className="px-16 mt-16 sm:px-24">
            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="jobPosition"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Position"
                    autoFocus
                    error={!!errors.jobPosition}
                    helperText={errors?.jobPosition?.message}
                    required
                    variant="outlined"
                  />
                )}
              />
            </FormControl>

            <FormControl className="mt-8 mb-16" fullWidth>
              <Controller
                name="department_name"
                control={control}
                // defaultValue={props.data.companyDepartmentId}
                fullWidth
                render={({ field: { onChange, value } }) => {
                  return (
                    <Autocomplete
                      className="mt-8 mb-16"
                      options={departments}
                      getOptionLabel={(option) => option.department_name}
                      value={
                        props.selectedJobId
                          ? props.data?.company_department
                          : selectDepartment
                      }
                      renderOption={(propsData, option, { inputValue }) => {
                        const matches = match(
                          option.department_name,
                          inputValue
                        );
                        const parts = parse(option.department_name, matches);

                        return (
                          <li {...propsData}>
                            <div>
                              {parts.map((part, index) => (
                                <span
                                  key={index}
                                  style={{
                                    fontWeight: part.highlight ? 700 : 400,
                                  }}
                                >
                                  {part.text}
                                </span>
                              ))}
                            </div>
                          </li>
                        );
                      }}
                      onChange={(event, newValue) => {
                        props.setSelectedId("");
                        if (newValue) {
                          onChange(newValue);
                          setSelectDepartment(newValue);
                        } else {
                          setSelectDepartment(null);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="department_name"
                          label="Department"
                          variant="outlined"
                        />
                      )}
                    />
                  );
                }}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className="justify-end px-8 py-16">
          <div className="px-16">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={
                _.isEmpty(dirtyFields) ||
                !isValid ||
                (!props.selectedJobId && selectDepartment === null)
              }
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default JobPositionDialog;
